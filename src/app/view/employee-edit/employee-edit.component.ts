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
	selector: 'app-employee-edit',
	templateUrl: './employee-edit.component.html',
	styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

	employee: Employee;
	countries: Country[];
	jobtittles: JobTittle[];
	message: String = '';
	maxDate: string;

	employeeForm = new FormGroup({
		name: new FormControl('', Validators.compose([
			Validators.required,
			Validators.maxLength(16)
		])),
		date_born: new FormControl('', Validators.required),
		country: new FormControl('', Validators.required),
		user_name: new FormControl('', Validators.compose([
			Validators.required,
			Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
		])),
		date_hire: new FormControl('', Validators.required),
		status: new FormControl('', Validators.required),
		area: new FormControl('', Validators.required),
		job_tittle: new FormControl('', Validators.required),
		tip_rate: new FormControl({ value: '', disabled: true })
	});

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private employeeService: EmployeeService,
		private location: Location
	) {
		this.maxDate = '';
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
				this.employeeForm.patchValue({ 'name': employee.name });
				this.employeeForm.patchValue({ 'date_born': employee.date_born });
				this.employeeForm.patchValue({ 'country': employee.country });
				this.employeeForm.patchValue({ 'user_name': employee.user_name });
				this.employeeForm.patchValue({ 'date_hire': employee.date_hire });
				this.employeeForm.patchValue({ 'status': employee.status });
				this.employeeForm.patchValue({ 'area': employee.area });
				this.employeeForm.patchValue({ 'job_tittle': employee.job_tittle });
				this.employeeForm.patchValue({ 'tip_rate': employee.tip_rate });

				if (employee.job_tittle == 14 || employee.job_tittle == 15) {
					this.employeeForm.get('tip_rate').enable();
				} else {
					this.employeeForm.get('tip_rate').reset();
					this.employeeForm.get('tip_rate').disable();
				}

			},
			);
	}

	updateEmployee(employee: Employee): void {
		this.employeeService.updateEmployee(employee)
			.subscribe(employee => {
				this.router.navigate(['/employeeedit/' + this.route.snapshot.paramMap.get('id')]);
				this.message = this.message + '<li>Employye Edit Ok</li>';
			});
	}

	onSubmit() {
		// TODO: Use EventEmitter with form value
		//console.warn(this.employeeForm.value);

		let employee = new Employee(this.employeeForm.value, this.route.snapshot.paramMap.get('id'));
		this.updateEmployee(employee);
	}


}
