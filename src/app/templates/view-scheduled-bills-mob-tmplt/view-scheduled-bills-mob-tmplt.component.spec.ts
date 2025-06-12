import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailStopChequeRevokeTemplateComponent } from './retail-stop-cheque-revoke-template.component';

describe('RetailSchedulePaymentTemplateComponent', () => {
  let component: RetailStopChequeRevokeTemplateComponent;
  let fixture: ComponentFixture<RetailStopChequeRevokeTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailStopChequeRevokeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailStopChequeRevokeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
