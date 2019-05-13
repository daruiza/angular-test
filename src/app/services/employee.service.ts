import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Employee } from '../model/employee';
import { Country } from '../model/country';
import { JobTittle } from '../model/jobtittle';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

	private employeesUrl = 'api/employees';  // URL to web api
	private areasUrl = 'api/areas';  // URL to web api
	private jobtittlesUrl = 'api/jobtittles';  // URL to web api
	private countriesUrl = 'api/countries';  // URL to web api

	httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

  	constructor(private http: HttpClient) { }

  	getEmployees(): Observable<Employee[]> {
		return this.http.get<Employee[]>(this.employeesUrl)
    		.pipe(
      			tap(_ => this.log('fetched employees')),
      			catchError(this.handleError<Employee[]>('getEmployees', []))
    		);
	}

	getEmployee(id: number): Observable<Employee> {		
	  	const url = `${this.employeesUrl}/${id}`;
	  	return this.http.get<Employee>(url).pipe(
	    	tap(_ => this.log(`fetched employee id=${id}`)),
	    	catchError(this.handleError<Employee>(`getEmployee id=${id}`))
	  	);
	}

	updateEmployee(employee: Employee): Observable<any> {
	  return this.http.put(this.employeesUrl, employee, this.httpOptions).pipe(
	    tap(_ => this.log(`updated employee id=${employee.id}`)),
	    catchError(this.handleError<any>('updateEmployee'))
	  );
	}

	addEmployee(employee: Employee): Observable<Employee> {
	  return this.http.post<Employee>(this.employeesUrl, employee, this.httpOptions).pipe(
	    tap((newEmployee: Employee) => this.log(`added employee id=${newEmployee.id}`)),
	    catchError(this.handleError<Employee>('addEmployee'))
	  );
	}

	searchEmployees(term: string): Observable<Employee[]> {
	  if (!term.trim()) {
	    // if not search term, return empty hero array.
	    return of([]);
	  }
	  return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
	    tap(_ => this.log(`found employee matching "${term}"`)),
	    catchError(this.handleError<Employee[]>('searchEmployee', []))
	  );
	}

	deleteEmployee (employee: Employee | number): Observable<Employee> {
	  const id = typeof employee === 'number' ? employee : employee.id;
	  const url = `${this.employeesUrl}/${id}`;

	  return this.http.delete<Employee>(url, this.httpOptions).pipe(
	    tap(_ => this.log(`deleted employee id=${id}`)),
	    catchError(this.handleError<Employee>('deleteEmployee'))
	  );
	}


	getCountries(): Observable<Country[]> {
		return this.http.get<Country[]>(this.countriesUrl)
    		.pipe(
      			tap(_ => this.log('fetched countries')),
      			catchError(this.handleError<Country[]>('getCountries', []))
    		);
	}

	getJobTittles(): Observable<JobTittle[]> {
		return this.http.get<JobTittle[]>(this.jobtittlesUrl)
    		.pipe(
      			tap(_ => this.log('fetched jobTittle')),
      			catchError(this.handleError<JobTittle[]>('getJobTittles', []))
    		);
	}

	private log(message: string) {
	  console.log(`EmployeeService: ${message}`);
	}
	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {
	 
	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead
	 
	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);
	 
	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}	
}
