import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSpendingChartComponent } from './member-spending-chart.component';

describe('MemberSpendingChartComponent', () => {
  let component: MemberSpendingChartComponent;
  let fixture: ComponentFixture<MemberSpendingChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSpendingChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSpendingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
