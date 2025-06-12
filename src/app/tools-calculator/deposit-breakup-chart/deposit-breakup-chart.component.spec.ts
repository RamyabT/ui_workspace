import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleCircularProgressChartComponent } from './deposit-breakup-chart.component';

describe('SampleCircularProgressChartComponent', () => {
  let component: SampleCircularProgressChartComponent;
  let fixture: ComponentFixture<SampleCircularProgressChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleCircularProgressChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleCircularProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
