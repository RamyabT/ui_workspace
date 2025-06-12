import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailSchedulePaymentTemplateComponent } from './retail-schedule-payment-template.component';

describe('RetailSchedulePaymentTemplateComponent', () => {
  let component: RetailSchedulePaymentTemplateComponent;
  let fixture: ComponentFixture<RetailSchedulePaymentTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailSchedulePaymentTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSchedulePaymentTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
