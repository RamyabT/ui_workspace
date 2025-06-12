import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBreakdownChartComponent } from './assets-breakdown-chart.component';

describe('AssetBreakdownChartComponent', () => {
  let component: AssetBreakdownChartComponent;
  let fixture: ComponentFixture<AssetBreakdownChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBreakdownChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetBreakdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
