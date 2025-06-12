import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChilderGoalSummaryCarouselComponent } from './childer-goal-summary-carousel.component';

describe('ChilderGoalSummaryCarouselComponent', () => {
  let component: ChilderGoalSummaryCarouselComponent;
  let fixture: ComponentFixture<ChilderGoalSummaryCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChilderGoalSummaryCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChilderGoalSummaryCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
