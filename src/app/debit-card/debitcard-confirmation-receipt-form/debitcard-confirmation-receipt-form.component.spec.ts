import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardConfirmationReceiptFormComponent } from './debitcard-confirmation-receipt-form.component';

describe('DebitcardConfirmationReceiptFormComponent', () => {
  let component: DebitcardConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<DebitcardConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitcardConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
