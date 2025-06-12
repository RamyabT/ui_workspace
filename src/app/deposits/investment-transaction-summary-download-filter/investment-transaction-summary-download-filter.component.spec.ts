import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTransactionSummaryDownloadFilterComponent } from './investment-transaction-summary-download-filter.component';

describe('InvestmentTransactionSummaryDownloadFilterComponent', () => {
  let component: InvestmentTransactionSummaryDownloadFilterComponent;
  let fixture: ComponentFixture<InvestmentTransactionSummaryDownloadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentTransactionSummaryDownloadFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentTransactionSummaryDownloadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
