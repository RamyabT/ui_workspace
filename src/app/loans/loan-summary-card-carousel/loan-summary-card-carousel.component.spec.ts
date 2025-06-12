import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSummaryCardCarouselComponent } from './loan-summary-card-carousel.component';

describe('LoanSummaryCardCarouselComponent', () => {
  let component: LoanSummaryCardCarouselComponent;
  let fixture: ComponentFixture<LoanSummaryCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanSummaryCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanSummaryCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
