import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { APIResponse, JobTitle } from 'src/app/shared/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.css']
})
export class PosteComponent implements OnInit {
  pos!: JobTitle;
  poss!: Array<JobTitle>;
  selectJob!: Array<JobTitle>;
  canUpd!: boolean;
  isGroup!: boolean;

  constructor(private ds: DataService, private toarts: ToastrService) {
    this.initView();
    this.reloadFunc();
   }

  ngOnInit() {
  }

  reloadFunc() {
    this.getPoste();
  }

  initView() {
    this.pos = {} as JobTitle;
    this.poss = new Array<JobTitle>();
    this.selectJob = new Array<JobTitle>();
    this.canUpd = false;
    this.isGroup = false;
  }

  getPoste() {
    this.ds.get(`/poste/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      //console.log(resp);
      if (resp.status === 200) {
        this.poss = resp.data;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onCreate() {
    this.ds.post(`/poste/create/`, this.pos).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.success('Poste enregistré avec success');
        this.pos = {} as JobTitle;
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onUpdate() {
    this.ds.put(`/poste/update/${this.pos.id}`, this.pos).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.info('Poste modifié avec success');
        this.pos = {} as JobTitle;
        this.reloadFunc();
        this.canUpd = false;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onDelete(id: number) {
    this.ds.delete(`/poste/delete/${id}`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression du poste éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onBeforeUpdate(d: JobTitle) {
    try {
      this.pos.id = d.id;
      this.pos.name = d.name;
      //this.pos.minSalry = d.minSalry;
      //this.pos.maxSalry = d.maxSalry;
      this.canUpd = true;
    } catch (error) {

    }
  }

  onDeleteAll() {
    this.ds.post(`/poste/delete/all`, this.selectJob).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.warning('Suppression des postes éffectué');
        this.reloadFunc();
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onSelectAll(event) {
    try {
      this.selectJob = new Array<JobTitle>();
      const checked = event.target.checked;
      this.poss.forEach((item) => {
        item.selected = checked;
        if (checked == true || JSON.stringify(this.selectJob) === JSON.stringify([])) {
          this.selectJob.push(item);
        } else {
          this.selectJob = new Array<JobTitle>();
        }
      });
      //console.log(this.selectJob);

      if(this.selectJob.length === 0){
        this.isGroup = false ;
      } else {
        this.isGroup = true;
      }
    } catch (error) {

    }
  }

  onSelected(event, d: JobTitle) {
    try {
      let idx = this.selectJob.indexOf(d);
      if (event.target.checked) {
        this.selectJob.push(d);
        //console.log(this.selectJob);
      } else {
        this.selectJob.splice(idx, 1);
        //console.log(this.selectJob);
      }

      if(this.selectJob.length === 0){
        this.isGroup = false ;
      } else {
        this.isGroup = true;
      }

    } catch (error) {

    }
  }


}
