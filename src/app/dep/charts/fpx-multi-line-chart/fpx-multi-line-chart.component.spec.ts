import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpxMultiLineChartComponent } from './fpx-multi-line-chart.component';

describe('FpxMultiLineChartComponent', () => {
  let component: FpxMultiLineChartComponent;
  let fixture: ComponentFixture<FpxMultiLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpxMultiLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FpxMultiLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
