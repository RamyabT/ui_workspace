import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmbConfirmationReceiptFormComponent } from './smb-confirmation-receipt-form.component';

describe('SmbConfirmationReceiptFormComponent', () => {
  let component: SmbConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<SmbConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmbConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmbConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
