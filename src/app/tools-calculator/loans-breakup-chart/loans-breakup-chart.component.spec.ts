import { ComponentFixture, TestBed } from '@angular/core/testing';

import { loansBreakupChartComponent } from './loans-breakup-chart.component';

describe('loansBreakupChartComponent', () => {
  let component: loansBreakupChartComponent;
  let fixture: ComponentFixture<loansBreakupChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ loansBreakupChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(loansBreakupChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
