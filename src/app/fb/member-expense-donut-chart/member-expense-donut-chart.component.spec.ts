import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExpenseDonutChartComponent } from './member-expense-donut-chart.component';

describe('MemberExpenseDonutChartComponent', () => {
  let component: MemberExpenseDonutChartComponent;
  let fixture: ComponentFixture<MemberExpenseDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberExpenseDonutChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberExpenseDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
