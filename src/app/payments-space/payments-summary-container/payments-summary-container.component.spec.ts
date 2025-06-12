import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSummaryContainerComponent } from './payments-summary-container.component';

describe('PaymentsSummaryContainerComponent', () => {
  let component: PaymentsSummaryContainerComponent;
  let fixture: ComponentFixture<PaymentsSummaryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsSummaryContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsSummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
