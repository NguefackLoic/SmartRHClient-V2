import { HttpResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr';
import { APIResponse, Company } from 'src/app/shared/model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  comp!: Company;
  comps!: Array<Company>;
  canUpd!: boolean;

  constructor(private ds: DataService, private toarts: ToastrService) { 
    this.initView();
    this.reloadFunc();
  }
  ngOnInit() {
  }

  reloadFunc() {
    
  }

  initView() {
    this.comp = {} as Company;
    this.comps = new Array<Company>();
    this.canUpd = false;
  }

  
  onCreate() {
    this.ds.post(`/client/create/`, this.comp).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.success('Les informations de l\'entreprise enregistré avec success');
        this.comp = {} as Company;
        this.reloadFunc();
      }
    }, (err: any) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onUpdate() {
    this.ds.put(`/client/update/${this.comp.id}`, this.comp).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.toarts.info('Les informations de l\'entreprise modifié avec success');
        this.comp = {} as Company;
        this.reloadFunc();
        this.canUpd = false;
      }
    }, (err) => {
      this.toarts.error('ERREUR SERVEUR CONTACTEZ VOTRE ADMINISTRATEUR');
    });
  }

  onBeforeUpdate(c: Company) {
    try {
      this.comp.id = c.id;
      this.comp.adress = c.adress;
      this.comp.email = c.email;
      this.comp.tel = c.tel;
      this.comp.rc = c.rc;
      this.comp.rSocial = c.rSocial;
      this.comp.numContri = c.numContri;
      this.comp.numCnps = c.numCnps;
      this.comp.cle = c.cle;
      this.canUpd = true;
      this.comps = new Array<Company>();
    } catch (error) {
      this.toarts.error();
    }
  }
   

  
  toggleNotificationsMenu(){

  }

  closeNotificationsMenu(){}

  toggleProfileMenu() {}
  closeProfileMenu(){}
  togglePagesMenu(){}
  toggleTheme(){}

}
