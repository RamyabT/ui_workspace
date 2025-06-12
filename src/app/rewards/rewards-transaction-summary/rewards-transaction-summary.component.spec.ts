import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsTransactionSummaryComponent } from './rewards-transaction-summary.component';

describe('RewardsTransactionSummaryComponent', () => {
  let component: RewardsTransactionSummaryComponent;
  let fixture: ComponentFixture<RewardsTransactionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsTransactionSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardsTransactionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
