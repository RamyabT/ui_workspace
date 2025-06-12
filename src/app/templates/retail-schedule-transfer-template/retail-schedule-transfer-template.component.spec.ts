import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailScheduleTransferTemplateComponent } from './retail-schedule-transfer-template.component';

describe('RetailSchedulePaymentTemplateComponent', () => {
  let component: RetailScheduleTransferTemplateComponent;
  let fixture: ComponentFixture<RetailScheduleTransferTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailScheduleTransferTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailScheduleTransferTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
