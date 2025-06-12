import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardSpendingSummaryComponent } from './creditcard-spending-summary.component';

describe('CreditcardSpendingSummaryComponent', () => {
  let component: CreditcardSpendingSummaryComponent;
  let fixture: ComponentFixture<CreditcardSpendingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardSpendingSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardSpendingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
