
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent implements OnInit {

  
  submitted = false;

  constructor(/*private employeeService: EmployeeService,*/ private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
   this.submitted = true;
    //this.employeeService.addEmployee(this.employee)
    //.subscribe((data: any) => console.log(data), (error: any) => console.log(error));
    
    this.router.navigate(['/auth/container/employe']);
    
  }

 
}

