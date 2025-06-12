import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ETransferConfirmationReceiptFormComponent } from './etransfer-confirmation-receipt-form.component';


describe('TransferConfirmationReceiptFormComponent', () => {
  let component: ETransferConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<ETransferConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ETransferConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ETransferConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
