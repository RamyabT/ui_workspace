import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidcardConfirmationReceiptFormComponent } from './prepaidcard-confirmation-receipt-form.component';

describe('PrepaidcardConfirmationReceiptFormComponent', () => {
  let component: PrepaidcardConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<PrepaidcardConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidcardConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidcardConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
