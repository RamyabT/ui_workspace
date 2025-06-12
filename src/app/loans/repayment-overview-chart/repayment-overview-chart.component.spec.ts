import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentOverviewChartComponent } from './repayment-overview-chart.component';

describe('RepaymentOverviewChartComponent', () => {
  let component: RepaymentOverviewChartComponent;
  let fixture: ComponentFixture<RepaymentOverviewChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepaymentOverviewChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepaymentOverviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
