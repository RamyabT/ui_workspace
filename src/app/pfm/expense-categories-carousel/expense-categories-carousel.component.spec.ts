import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseCategoriesWidgetComponent } from './expense-categories-carousel.component';

describe('ExpenseCategoriesWidgetComponent', () => {
  let component: ExpenseCategoriesWidgetComponent;
  let fixture: ComponentFixture<ExpenseCategoriesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCategoriesWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseCategoriesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
