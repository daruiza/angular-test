import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, MatTableModule, MatNativeDateModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './view/background/background.component';
import { NavigationComponent } from './view/navigation/navigation.component';
import { EmployeeListComponent } from './view/employee-list/employee-list.component';
import { EmployeeFormComponent } from './view/employee-form/employee-form.component';
import { EmployeeEditComponent } from './view/employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './view/employee-view/employee-view.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JobtittledropdownComponent } from './view/jobtittledropdown/jobtittledropdown.component';
import { EmployeeSearchComponent } from './view/employee-search/employee-search.component';

import { AngularErfModule } from 'angular-erf';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    NavigationComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeEditComponent,
    EmployeeViewComponent,
    JobtittledropdownComponent,
    EmployeeSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserAnimationsModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularErfModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
