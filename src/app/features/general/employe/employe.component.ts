import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addEmploye(){
    this.router.navigate(["employe"]);
  }

}
