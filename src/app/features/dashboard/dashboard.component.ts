import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { APIResponse, Company } from 'src/app/shared/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  comp!: Company;
  comps!: Array<Company>;
  canUpd!: boolean;

  constructor(private router: Router, private ds: DataService, private toarts: ToastrService) {
    this.initView();
    this.reloadFunc();
   }

  ngOnInit(): void {
  }
  
  addClient(){
    this.router.navigate(["client"]);
  }

  reloadFunc() {
    this.getCompany();
  }

  initView() {
    this.comp = {} as Company;
    this.comps = new Array<Company>();
    this.canUpd = false;
  }

  getCompany() {
    this.ds.get(`/client/`).subscribe((res: HttpResponse<APIResponse>) => {
      const resp = JSON.parse(res.body!.toString()) as APIResponse;
      if (resp.status === 200) {
        this.comps = resp.data;
      }
    }, (err: any) => {
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
      this.toarts.error(error as string | undefined);
    }
  }
}
