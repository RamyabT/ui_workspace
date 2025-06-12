import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasaSummaryCardCarouselComponent } from './casa-summary-card-carousel.component';

describe('CasaSummaryCardCarouselComponent', () => {
  let component: CasaSummaryCardCarouselComponent;
  let fixture: ComponentFixture<CasaSummaryCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasaSummaryCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasaSummaryCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
