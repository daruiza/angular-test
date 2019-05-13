import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from '../model/employee'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

	createDb() {
	    const employees = [
	      { id: 11, name: 'Raigoza', date_born:'1991-03-04',country:2,user_name:'ramo',date_hire:'2013-05-23',status:true,area:'1',job_tittle:13,tip_rate:0.04 },      
	      { id: 12, name: 'Pedra', date_born:'1986-03-04',country:1,user_name:'pedra',date_hire:'2014-04-03',status:true,area:'1',job_tittle:14,tip_rate:0.04 },
	      { id: 13, name: 'Sandro', date_born:'1989-12-04',country:3,user_name:'sandro',date_hire:'2016-11-26',status:true,area:'2',job_tittle:21,tip_rate:0.04 },
	      { id: 14, name: 'Camilo Pablo', date_born:'1981-02-21',country:1,user_name:'cami',date_hire:'2011-11-26',status:true,area:'2',job_tittle:22,tip_rate:0.04 },
	      { id: 15, name: 'Martha Rosa', date_born:'1984-12-04',country:3,user_name:'sandro',date_hire:'2016-11-26',status:true,area:'2',job_tittle:23,tip_rate:0.04 },
	      { id: 16, name: 'Harol Pepe', date_born:'1985-08-04',country:3,user_name:'harol',date_hire:'2017-10-21',status:true,area:'1',job_tittle:14,tip_rate:0.04 },
	      /*
	      { id: 17, name: 'Gabriel Pineda', date_born:'1982-02-04',country:3,user_name:'gabi',date_hire:'2012-05-04',status:true,area:'1',job_tittle:15,tip_rate:0.04 },
	      { id: 18, name: 'Gamboa', date_born:'1987-01-04',country:3,user_name:'gambo',date_hire:'2011-04-09',status:true,area:'2',job_tittle:22,tip_rate:0.04 },
	      { id: 19, name: 'Carlos arturo', date_born:'1990-09-04',country:3,user_name:'arturo',date_hire:'2010-12-20',status:true,area:'2',job_tittle:24,tip_rate:0.04 }      
	      */
	    ];

	    const areas = [
	      { id: 1, name: 'Services' },
	      { id: 2, name: 'Kitchen' }      
	    ];

	    const jobtittles = [
	      { id: 11, name: 'Manager', area_id: 1 },
	      { id: 12, name: 'Host', area_id: 1 },      
	      { id: 13, name: 'Tuttofore', area_id: 1 },
	      { id: 14, name: 'Waitress', area_id : 1 },
	      { id: 15, name: 'Dining room manager', area_id: 1 },
	      { id: 21, name: 'Chef', area_id: 2 },
	      { id: 22, name: 'Sous Chef',area_id: 2 },
	      { id: 23, name: 'Dishwasher',area_id: 2 },
	      { id: 24, name: 'Cook',area_id: 2 }
	      
	    ];

	    const countries = [
	      { id: 1, name: 'Panama' },
	      { id: 2, name: 'Colombia' },      
	      { id: 3, name: 'Brazil' },
	      { id: 4, name: 'Argentina' },            
	      { id: 4, name: 'Uruguay' }
	    ];

	    return {employees,areas,jobtittles,countries};
  	}

  	/*to generate a new id*/
  	genId(employees: Employee[]): number {
		return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
	}
}
