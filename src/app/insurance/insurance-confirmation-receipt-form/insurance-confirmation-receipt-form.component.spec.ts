import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceConfirmationReceiptFormComponent } from './insurance-confirmation-receipt-form.component';


describe('InsuranceConfirmationReceiptFormComponent', () => {
  let component: InsuranceConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<InsuranceConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
