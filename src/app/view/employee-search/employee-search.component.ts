import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';

import { Employee } from '../../model/employee'
import { EmployeeService } from '../../services/employee.service'

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

	employees$: Observable<Employee[]>;
  	private searchTerms = new Subject<string>();

  	constructor( private employeeService:EmployeeService) { }

  	ngOnInit() {
  		this.employees$ = this.searchTerms.pipe(
	      // wait 300ms after each keystroke before considering the term
	      debounceTime(300),

	      // ignore new term if same as previous term
	      distinctUntilChanged(),

	      // switch to new search observable each time the term changes
	      switchMap((term: string) => this.employeeService.searchEmployees(term)),
	    );
  	}

  	search(term: string): void {
    	this.searchTerms.next(term);
  	}

}
