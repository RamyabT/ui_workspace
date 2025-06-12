import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfConfirmationReceiptFormComponent } from './wf-confirmation-receipt-form.component';

describe('WfConfirmationReceiptFormComponent', () => {
  let component: WfConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<WfConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WfConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
