import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementOverviewChartComponent } from './disbursement-overview-chart.component';

describe('DisbursementOverviewChartComponent', () => {
  let component: DisbursementOverviewChartComponent;
  let fixture: ComponentFixture<DisbursementOverviewChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisbursementOverviewChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisbursementOverviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
