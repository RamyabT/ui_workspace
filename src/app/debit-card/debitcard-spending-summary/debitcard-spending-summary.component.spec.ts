import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardSpendingSummaryComponent } from './debitcard-spending-summary.component';

describe('DebitcardSpendingSummaryComponent', () => {
  let component: DebitcardSpendingSummaryComponent;
  let fixture: ComponentFixture<DebitcardSpendingSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitcardSpendingSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitcardSpendingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
