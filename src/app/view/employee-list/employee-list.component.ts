import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material';
import { MatSort, MatTableModule, MatTableDataSource } from '@angular/material';

import { EmployeeService } from '../../services/employee.service'
import { Employee } from '../../model/employee'


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

	employees:Employee[];	
	displayedColumns: string[] = ['name', 'date_born', 'user_name', 'date_hire','options'];	

  	constructor(private employeeService: EmployeeService) {  		
  	}  	

  	ngOnInit() {
  		this.getEmployees();  		
  	}

  	getEmployees(): void {
  		 this.employeeService
  		 	.getEmployees()
      		.subscribe(employees => {
      			this.employees = employees;      			      			
      		},
      		(err) => console.error('Error consult Employes'),
      		() => this.getCallback());      		
	}

	getCallback(){
		for (var i = this.employees.length - 1; i >= 0; i--) {
			this.age(this.employees[i]);
		}
		console.log("Assign Age Ok")
	}

	delete(employee: Employee): void{
		this.employees = this.employees.filter(h => h !== employee);
  		this.employeeService.deleteEmployee(employee).subscribe();  		
	}

	/*Helpers*/
	age(employee:Employee){		
		let dob = new Date(
			parseInt(employee.date_born.split("-")[0]),
			parseInt(employee.date_born.split("-")[1]),
			parseInt(employee.date_born.split("-")[2]));
	    let diff_ms = Date.now() - dob.getTime();
	    let age_dt = new Date(diff_ms);	

	    employee.date_born = Math.abs(age_dt.getUTCFullYear() - 1970).toString();	    
	}

	  
}

