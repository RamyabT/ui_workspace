import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmTransactionSummaryCardComponent } from './pfm-transaction-summary-card.component';

describe('PfmTransactionSummaryCardComponent', () => {
  let component: PfmTransactionSummaryCardComponent;
  let fixture: ComponentFixture<PfmTransactionSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmTransactionSummaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfmTransactionSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
