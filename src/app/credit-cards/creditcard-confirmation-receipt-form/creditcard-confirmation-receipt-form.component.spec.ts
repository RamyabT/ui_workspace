import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardConfirmationReceiptFormComponent } from './creditcard-confirmation-receipt-form.component';

describe('CreditcardConfirmationReceiptFormComponent', () => {
  let component: CreditcardConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<CreditcardConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
