import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../../model/employee';
import { Country } from '../../model/country';
import { JobTittle } from '../../model/jobtittle';

import * as moment from 'moment';

import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
	
	employee: Employee;
	countries: Country[];
	jobtittles: JobTittle[];

	maxDate : Date;//for to date_born
	
	employeeForm = new FormGroup({
		name: new FormControl('',Validators.compose([
			Validators.required,
			Validators.maxLength(16)
		])),
	    date_born: new FormControl('',Validators.required),
	    country: new FormControl('',Validators.required),
	    user_name: new FormControl('',Validators.compose([
	    	Validators.required,
	    	Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
    	])),
	    date_hire: new FormControl('',Validators.required),
		status: new FormControl('',Validators.required),
		area: new FormControl('',Validators.required),
		job_tittle: new FormControl('',Validators.required),
		tip_rate: new FormControl({value:'',disabled: true})
  	});

  	constructor(

  		private employeeService: EmployeeService,
  		private router: Router) { }

  	ngOnInit() {
  		this.getCountries();
  		this.getJobTittles();
  		this.ageMin18();
  	}

  	getCountries(): void {
  		 this.employeeService
  		 	.getCountries()
      		.subscribe(countries => {
      			this.countries = countries      			
      		},
      		(err) => console.error('Error consult Employes'));      		
	}

	getJobTittles(): void {
  		 this.employeeService
  		 	.getJobTittles()
      		.subscribe(jobtittles => {
      			this.jobtittles = jobtittles      			
      		},
      		(err) => console.error('Error consult JobTittles'));      		
	}	

	addEmployee(employee:Employee): void {
		  
	  this.employeeService.addEmployee(employee)
	    .subscribe(employee => {	      
	      this.router.navigate(['/employees']);
	    });
	}

	ageMin18(){
		var date = moment().subtract(18, 'years');;		
		this.maxDate = new Date(date.year(), date.day(), date.date());		
	}
  	
	onSubmit() {
	  // TODO: Use EventEmitter with form value
	  //console.warn(this.employeeForm.value);
	  let employee = new Employee(this.employeeForm.value,'');
	  this.addEmployee(employee);	  	
	}

}
