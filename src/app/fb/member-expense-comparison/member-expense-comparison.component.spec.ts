import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExpenseComparisonComponent } from './member-expense-comparison.component';

describe('MemberExpenseComparisonComponent', () => {
  let component: MemberExpenseComparisonComponent;
  let fixture: ComponentFixture<MemberExpenseComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberExpenseComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberExpenseComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
