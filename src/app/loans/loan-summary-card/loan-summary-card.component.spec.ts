import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSummaryCardComponent } from './loan-summary-card.component';

describe('LoanSummaryCardComponent', () => {
  let component: LoanSummaryCardComponent;
  let fixture: ComponentFixture<LoanSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanSummaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
