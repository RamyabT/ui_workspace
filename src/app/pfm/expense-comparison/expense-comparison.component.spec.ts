import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseComparisonComponent } from './expense-comparison.component';

describe('ExpenseComparisonComponent', () => {
  let component: ExpenseComparisonComponent;
  let fixture: ComponentFixture<ExpenseComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
