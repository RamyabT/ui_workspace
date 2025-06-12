import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceSummaryCardCarouselComponent } from './insurance-summary-card-carousel.component';

describe('InsuranceSummaryCardCarouselComponent', () => {
  let component: InsuranceSummaryCardCarouselComponent;
  let fixture: ComponentFixture<InsuranceSummaryCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceSummaryCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceSummaryCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
