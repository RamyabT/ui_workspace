import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSummaryBoardComponent } from './credit-card-summary-board.component';

describe('CreditCardSummaryBoardComponent', () => {
  let component: CreditCardSummaryBoardComponent;
  let fixture: ComponentFixture<CreditCardSummaryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardSummaryBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardSummaryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
