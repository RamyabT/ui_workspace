import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationReceiptFormComponent } from './confirmation-receipt-form.component';

describe('ConfirmationReceiptFormComponent', () => {
  let component: ConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<ConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
