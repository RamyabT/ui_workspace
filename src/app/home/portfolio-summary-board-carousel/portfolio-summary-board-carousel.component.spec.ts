import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioSummaryBoardCarouselComponent } from './portfolio-summary-board-carousel.component';



describe('PortfolioSummaryBoardCarouselComponent', () => {
  let component: PortfolioSummaryBoardCarouselComponent;
  let fixture: ComponentFixture<PortfolioSummaryBoardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioSummaryBoardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSummaryBoardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
