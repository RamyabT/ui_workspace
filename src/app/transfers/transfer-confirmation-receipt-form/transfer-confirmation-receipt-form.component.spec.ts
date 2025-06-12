import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferConfirmationReceiptFormComponent } from './transfer-confirmation-receipt-form.component';

describe('TransferConfirmationReceiptFormComponent', () => {
  let component: TransferConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<TransferConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
