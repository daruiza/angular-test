import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './view/employee-list/employee-list.component';
import { EmployeeFormComponent } from './view/employee-form/employee-form.component';
import { EmployeeViewComponent } from './view/employee-view/employee-view.component';
import { EmployeeEditComponent } from './view/employee-edit/employee-edit.component'

const routes: Routes = [
	{ path: '', redirectTo: '/employees', pathMatch: 'full' },
	{ path: 'employees', component: EmployeeListComponent },
	{ path: 'employeeview/:id', component: EmployeeViewComponent },
	{ path: 'employeeedit/:id', component: EmployeeEditComponent },
	{ path: 'employeenew', component: EmployeeFormComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
