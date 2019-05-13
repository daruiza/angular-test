import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobtittledropdownComponent } from './jobtittledropdown.component';

describe('JobtittledropdownComponent', () => {
  let component: JobtittledropdownComponent;
  let fixture: ComponentFixture<JobtittledropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobtittledropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobtittledropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
