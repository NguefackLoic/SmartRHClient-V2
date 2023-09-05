import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { APIResponse, Category, Echelon, SalaireBase } from 'src/app/shared/model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  dep!: Category;
  deps!: Array<Category>;
  echs!: Array<Echelon>;
  selectDep!: Array<Category>;
  salbas!: Array<SalaireBase>;
  canUpd!: boolean;
  categoryId!: number;
  canUpdGrp!: boolean;
  isGroup!: boolean;

  constructor(private ds: DataService, private toarts: ToastrService) {
    this.initView();
    this.reloadFunc();
  }

  ngOnInit() {
  }

  reloadFunc() {
    this.getCategorie();
    this.getEchelon();
  }

  initView() {
    this.dep = {} as Category;
    this.selectDep = new Array<Category>();
    this.deps = new Array<Category>();
    this.echs = new Array<Echelon>();
    this.salbas = new Array<SalaireBase>();
    this.canUpd = false;
    this.canUpdGrp = false;
    this.isGroup = false;
  }

  getCategorie() {
    this.ds.get(`/category/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.deps = resp.data;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }


  getEchelon() {
    this.ds.get(`/echelons/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.echs = resp.data;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onGetCatSalary() {
    this.ds.get(`/category/${this.categoryId}`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.salbas = resp.data;
        if (this.salbas != null && this.salbas.length > 0) {
          this.echs.forEach((x) => {
            const e = this.salbas.find(y => y.echId === x.id);
            if (e !== undefined) {
              e.echName = x.name;
              this.salbas[this.salbas.findIndex(w => w.id === e.id)] = e;
            }
          });
        } else {
          this.salbas = new Array<SalaireBase>();
          this.echs.forEach(z => {
            const s = {} as SalaireBase;
          
            s.echName = z.name;
            s.catId = this.categoryId;
            this.salbas.push(s);
          }); //console.log(this.salbas);
        }
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onCreate() {
    this.ds.post(`/category/create/`, this.dep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.success('Categorie enregistré avec success');
        this.dep = {} as Category;
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onCreateSal() {
    this.ds.post(`/category/salaire/base/`, this.salbas).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.success('Categorie enregistré avec success');
        this.initView();
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onUpdate() {
    this.ds.put(`/category/update/${this.dep.id}`, this.dep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.info('Categorie modifié avec success');
        this.dep = {} as Category;
        this.reloadFunc();
        this.canUpd = false;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDelete(id: number) {
    this.ds.delete(`/category/delete/${id}`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression de Categorie éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDeleteAll() {
    this.ds.post(`/category/delete/all`, this.selectDep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression des Categories éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onBeforeUpdate(d: Category) {
    try {
      this.dep.id = d.id;
      this.dep.name = d.name;
      this.dep.salaire = d.salaire;
      this.canUpd = true;
    } catch (error) {
      this.toarts.error(error as string | undefined);
    }
  }

  onSelectAll(event) {
    try {
      this.selectDep = new Array<Category>();
      const checked = event.target.checked;
      this.deps.forEach((item) => {
        item.selected = checked;
        if (checked == true || JSON.stringify(this.selectDep) === JSON.stringify([])) {
          let b = {} as Category;
          b.name = item.name;
          b.id = item.id;
          this.selectDep.push(b);
        } else {
          this.selectDep = new Array<Category>();
        }
      });


      if (this.selectDep.length === 0) {
        this.isGroup = false;
      } else {
        this.isGroup = true;
      }
    } catch (error) {

    }
  }

  onSelected(event, d: Category) {
    try {
      let idx = this.selectDep.indexOf(d);
      if (event.target.checked) {
        this.selectDep.push(d);
      } else {
        this.selectDep.splice(idx, 1);
      }

      if (this.selectDep.length === 0) {
        this.isGroup = false;
      } else {
        this.isGroup = true;
      }

    } catch (error) {

    }
  }


}
