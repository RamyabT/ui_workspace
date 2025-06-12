import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiPaymentOptionsControlComponent } from './emi-payment-options-control.component';

describe('EmiPaymentOptionsControlComponent', () => {
  let component: EmiPaymentOptionsControlComponent;
  let fixture: ComponentFixture<EmiPaymentOptionsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiPaymentOptionsControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmiPaymentOptionsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
