import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsSummaryCardCarouselComponent } from './deposits-summary-card-carousel.component';

describe('DepositsSummaryCardCarouselComponent', () => {
  let component: DepositsSummaryCardCarouselComponent;
  let fixture: ComponentFixture<DepositsSummaryCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsSummaryCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsSummaryCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
