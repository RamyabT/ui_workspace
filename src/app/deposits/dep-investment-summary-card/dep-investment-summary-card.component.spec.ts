import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepInvestmentSummaryCardComponent } from './dep-investment-summary-card.component';

describe('DepInvestmentSummaryCardComponent', () => {
  let component: DepInvestmentSummaryCardComponent;
  let fixture: ComponentFixture<DepInvestmentSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepInvestmentSummaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepInvestmentSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
