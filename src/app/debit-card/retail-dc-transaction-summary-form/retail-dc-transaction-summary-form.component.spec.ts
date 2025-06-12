import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailDcTransactionSummaryFormComponent } from './retail-dc-transaction-summary-form.component';

describe('RetailDcTransactionSummaryFormComponent', () => {
  let component: RetailDcTransactionSummaryFormComponent;
  let fixture: ComponentFixture<RetailDcTransactionSummaryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailDcTransactionSummaryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailDcTransactionSummaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
