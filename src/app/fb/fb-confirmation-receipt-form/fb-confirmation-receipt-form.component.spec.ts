import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FbConfirmationReceiptFormComponent } from './fb-confirmation-receipt-form.component';


describe('FbConfirmationReceiptFormComponent', () => {
  let component: FbConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<FbConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
