import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagingConfirmationReceiptFormComponent } from './staging-confirmation-receipt-form.component';

describe('StagingConfirmationReceiptFormComponent', () => {
  let component: StagingConfirmationReceiptFormComponent;
  let fixture: ComponentFixture<StagingConfirmationReceiptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StagingConfirmationReceiptFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagingConfirmationReceiptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
