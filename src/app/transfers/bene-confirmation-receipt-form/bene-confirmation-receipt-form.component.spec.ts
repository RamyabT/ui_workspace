import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneConfirmationReceiptFormComponent } from './bene-confirmation-receipt-form.component';

describe('BeneConfirmationReceiptFormComponent', () => {
  let component: BeneConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<BeneConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
