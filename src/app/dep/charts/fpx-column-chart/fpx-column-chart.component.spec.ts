import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxColumnChartComponent } from './fpx-column-chart.component';

describe('FpxColumnChartComponent', () => {
  let component: FpxColumnChartComponent;
  let fixture: ComponentFixture<FpxColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpxColumnChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpxColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
