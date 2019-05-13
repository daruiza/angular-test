import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Employee } from '../../model/employee';
import { Country } from '../../model/country';
import { JobTittle } from '../../model/jobtittle';
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

	employee: Employee;	
	countries: Country[];
	jobtittles: JobTittle[];
	//employeeForm : FormGroup;

	employeeForm = new FormGroup({
		name: new FormControl({ value:'', disabled: true }),
		date_born: new FormControl({value:'',disabled: true}),
		country: new FormControl({value:'',disabled: true}),
		user_name: new FormControl({value:'',disabled: true}),
		date_hire: new FormControl({value:'',disabled: true}),
		status: new FormControl({value:'',disabled: true}),
		area: new FormControl({value:'',disabled: true}),
		job_tittle: new FormControl({value:'',disabled: true}),
		tip_rate: new FormControl({value:'',disabled: true})    
  	});

  	constructor(
  		private router: Router,
  		private route: ActivatedRoute,
  		private employeeService: EmployeeService,
  		private location: Location
  	) {	

  	}

  	ngOnInit() {
  		//init from employe  		
  		this.getCountries();
  		this.getJobTittles();
  		this.getEmployee();  		
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

  	getEmployee(): void {
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.employeeService.getEmployee(id)
	    .subscribe(employee => {
	    		this.employee = employee;
	    		this.employeeForm.patchValue({'name':employee.name});
	    		this.employeeForm.patchValue({'date_born':employee.date_born});
	    		this.employeeForm.patchValue({'country':employee.country});
	    		this.employeeForm.patchValue({'user_name':employee.user_name});
	    		this.employeeForm.patchValue({'date_hire':employee.date_hire});
	    		this.employeeForm.patchValue({'status':employee.status});
	    		this.employeeForm.patchValue({'area':employee.area});
	    		this.employeeForm.patchValue({'job_tittle':employee.job_tittle});
	    		this.employeeForm.patchValue({'tip_rate':employee.tip_rate});
	    		this.employeeForm.get('tip_rate').disable();	    		
	    	},
    	);
	}

	onEdit(){
		this.router.navigate(['/employeeedit/'+this.route.snapshot.paramMap.get('id')]);		
	}

}