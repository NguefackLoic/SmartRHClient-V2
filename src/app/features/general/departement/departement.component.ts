import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { APIResponse, Departement, DepartResponseType, Employe } from 'src/app/shared/model';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

 
  dep!: Departement;
  deps!: Array<DepartResponseType>;
  selectDep!: Array<Departement>;
  emps!: Array<Employe>;
  canUpd!: boolean;
  isGroup!: boolean;

  constructor(private ds: DataService, private toarts: ToastrService) {
    this.initView();
    this.reloadFunc();
  }

  ngOnInit() {
  }

  reloadFunc() {
    this.getDepartement();
    this.getEmployes();
  }

  initView() {
    this.dep = {} as Departement;
    this.selectDep = new Array<Departement>();
    this.deps = new Array<DepartResponseType>();
    this.emps = new Array<Employe>();
    this.canUpd = false;
    this.isGroup = false;
  }

  getDepartement() {
    this.ds.get(`/departements/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.deps = resp.data;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  getEmployes() {
    this.ds.get(`/departement/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.emps = resp.data;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onCreate() {
    this.ds.post(`/departement/create/`, this.dep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.success('Departement enregistré avec success');
        this.dep = {} as Departement;
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onUpdate() {
    this.ds.put(`/departement/update/${this.dep.id}`, this.dep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.info('Departement modifié avec success');
        this.dep = {} as Departement;
        this.reloadFunc();
        this.canUpd = false;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDelete(id: number) {
    this.ds.delete(`/departements/delete/${id}`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression du departement éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDeleteAll() {
    this.ds.post(`/departement/delete/all`, this.selectDep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression des departements éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onBeforeUpdate(d: Departement) {
    try {
      this.dep.id = d.id;
      this.dep.name = d.name;
      this.dep.manager = d.manager;
      this.canUpd = true;
    } catch (error) {
      this.toarts.error(error as string | undefined);
    }
  }

  onSelectAll(event) {
    try {
      this.selectDep = new Array<Departement>();
      const checked = event.target.checked;
      this.deps.forEach((item) => {
        item.selected = checked;
        if (checked == true || JSON.stringify(this.selectDep) === JSON.stringify([])) {
          let b = {} as Departement;
          b.name = item.name;
          b.id = item.id;
          if(item.manager != null){
            b.manager = item.manager.id;
          }
          this.selectDep.push(b);
        } else {
          this.selectDep = new Array<Departement>();
        }
      });
      //console.log(this.selectDep);

      if(this.selectDep.length === 0){
        this.isGroup = false ;
      } else {
        this.isGroup = true;
      }
    } catch (error) {

    }
  }

  onSelected(event, d: Departement) {
    try {
      let idx = this.selectDep.indexOf(d);
      if (event.target.checked) {
        this.selectDep.push(d);
        //console.log(this.selectDep);
      } else {
        this.selectDep.splice(idx, 1);
        //console.log(this.selectDep);
      }

      if(this.selectDep.length === 0){
        this.isGroup = false ;
      } else {
        this.isGroup = true;
      }

    } catch (error) {

    }
  }

}
