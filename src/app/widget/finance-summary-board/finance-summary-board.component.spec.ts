import { ComponentFixture, TestBed } from '@angular/core/testing';
import { financeSummaryBoardComponent } from './finance-summary-board.component';



describe('financeSummaryBoardComponent', () => {
  let component: financeSummaryBoardComponent;
  let fixture: ComponentFixture<financeSummaryBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ financeSummaryBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(financeSummaryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
