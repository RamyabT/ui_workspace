import { ComponentFixture, TestBed } from '@angular/core/testing';
import { financeSummaryBoardCarouselComponent } from './finance-summary-board-carousel.component';



describe('financeSummaryBoardCarouselComponent', () => {
  let component: financeSummaryBoardCarouselComponent;
  let fixture: ComponentFixture<financeSummaryBoardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ financeSummaryBoardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(financeSummaryBoardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
