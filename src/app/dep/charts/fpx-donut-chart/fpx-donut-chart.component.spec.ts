import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxDonutChartComponent } from './fpx-donut-chart.component';

describe('FpxDonutChartComponent', () => {
  let component: FpxDonutChartComponent;
  let fixture: ComponentFixture<FpxDonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpxDonutChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpxDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
