import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelfRegConfirmationReceiptFormComponent } from './self-reg-confirmation-receipt-form.component';



describe('SelfRegConfirmationReceiptFormComponent', () => {
  let component: SelfRegConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<SelfRegConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfRegConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfRegConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
