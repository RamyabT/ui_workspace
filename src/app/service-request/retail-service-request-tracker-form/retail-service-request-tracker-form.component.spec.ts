import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailServiceRequestTrackerFormComponent } from './retail-service-request-tracker-form.component';

describe('RetailServiceRequestTrackerFormComponent', () => {
  let component: RetailServiceRequestTrackerFormComponent;
  let fixture: ComponentFixture<RetailServiceRequestTrackerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailServiceRequestTrackerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailServiceRequestTrackerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
