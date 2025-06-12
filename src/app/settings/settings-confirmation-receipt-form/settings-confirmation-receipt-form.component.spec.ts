import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsConfirmationReceiptFormComponent } from './settings-confirmation-receipt-form.component';



describe('SettingsConfirmationReceiptFormComponent', () => {
  let component: SettingsConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<SettingsConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
