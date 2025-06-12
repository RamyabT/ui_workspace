import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletConfirmationReceiptFormComponent } from './wallet-confirmation-receipt-form.component';


describe('WalletConfirmationReceiptFormComponent', () => {
  let component: WalletConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<WalletConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
