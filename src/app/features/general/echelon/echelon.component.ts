import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { APIResponse, Echelon } from 'src/app/shared/model';

@Component({
  selector: 'app-echelon',
  templateUrl: './echelon.component.html',
  styleUrls: ['./echelon.component.css']
})
export class EchelonComponent implements OnInit {

  dep!: Echelon;
  deps!: Array<Echelon>;
  selectDep!: Array<Echelon>;
  canUpd!: boolean;
  isGroup!: boolean;

  constructor(private ds: DataService, private toarts: ToastrService) {
    this.initView();
    this.reloadFunc();
  }

  ngOnInit() {
  }

  reloadFunc() {
    this.getEchelon();
  }

  initView() {
    this.dep = {} as Echelon;
    this.selectDep = new Array<Echelon>();
    this.deps = new Array<Echelon>();
    this.canUpd = false;
    this.isGroup = false;
  }

  getEchelon() {
    this.ds.get(`/echelon/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.deps = resp.data;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onCreate() {
    this.ds.post(`/echelon/create/`, this.dep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.success('Echelon enregistré avec success');
        this.dep = {} as Echelon;
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onUpdate() {
    this.ds.put(`/echelon/update/${this.dep.id}`, this.dep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.info('Echelon modifié avec success');
        this.dep = {} as Echelon;
        this.reloadFunc();
        this.canUpd = false;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDelete(id: number) {
    this.ds.delete(`/echelon/delete/${id}`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression de Echelon éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDeleteAll() {
    this.ds.post(`/echelon/delete/all`, this.selectDep).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression des echelons éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onBeforeUpdate(d: Echelon) {
    try {
      this.dep.id = d.id;
      this.dep.name = d.name;
      this.canUpd = true;
    } catch (error) {
      this.toarts.error(error as string | undefined);
    }
  }

  onSelectAll(event) {
    try {
      this.selectDep = new Array<Echelon>();
      const checked = event.target.checked;
      this.deps.forEach((item) => {
        item.selected = checked;
        if (checked == true || JSON.stringify(this.selectDep) === JSON.stringify([])) {
          let b = {} as Echelon;
          b.name = item.name;
          b.id = item.id;
          this.selectDep.push(b);
        } else {
          this.selectDep = new Array<Echelon>();
        }
      });
     

      if(this.selectDep.length === 0){
        this.isGroup = false ;
      } else {
        this.isGroup = true;
      }
    } catch (error) {

    }
  }

  onSelected(event, d: Echelon) {
    try {
      let idx = this.selectDep.indexOf(d);
      if (event.target.checked) {
        this.selectDep.push(d);
      } else {
        this.selectDep.splice(idx, 1);
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
