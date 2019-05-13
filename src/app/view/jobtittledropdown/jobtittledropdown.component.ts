import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JobTittle } from '../../model/jobtittle'

@Component({
  selector: 'app-jobtittledropdown',
  templateUrl: './jobtittledropdown.component.html',
  styleUrls: ['./jobtittledropdown.component.css']
})
export class JobtittledropdownComponent implements OnInit {

	@Input()
	employeeForm: FormGroup;

	@Input()
	jobtittles: JobTittle[];

	jobtittlesarea: JobTittle[];	

  	constructor() {
  	}

  	ngOnInit() {
  		this.onChanges();
  	}

  	/* 
  	dofilter(event) {		
		//filter jobtittles in jobtittlesarea		
		this.jobtittlesarea =  this.jobtittles.filter(jobtittle => jobtittle.area_id == event.value)
		this.employeeForm.patchValue({job_tittle:this.jobtittlesarea[0].id});
		//this.jobTittlechange({target:{value:this.jobtittlesarea[0].id}});
	}
	
	jobTittlechange(event){
		if(event.target.value == 14 || event.target.value == 15){
			this.employeeForm.get('tip_rate').enable();
		}else{
			this.employeeForm.get('tip_rate').reset();
            this.employeeForm.get('tip_rate').disable();
		}
	}
	*/
	
	onChanges() {
	    this.employeeForm.get('job_tittle').valueChanges
	    .subscribe(selectedJobTittle => {
		        if(selectedJobTittle == 14 || selectedJobTittle == 15){
					this.employeeForm.get('tip_rate').enable();
				}else{
					this.employeeForm.get('tip_rate').reset();
		            this.employeeForm.get('tip_rate').disable();
				}
	    	}
	    );

	    this.employeeForm.get('area').valueChanges
	    .subscribe(selectedArea => {
		        this.jobtittlesarea =  this.jobtittles.filter(jobtittle => jobtittle.area_id == selectedArea)
				this.employeeForm.patchValue({job_tittle:this.jobtittlesarea[0].id});
	    	}
	    );
	}

}
