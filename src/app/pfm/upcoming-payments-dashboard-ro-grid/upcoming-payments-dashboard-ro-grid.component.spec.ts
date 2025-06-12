import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPaymentsDashboardRoGridComponent } from './upcoming-payments-dashboard-ro-grid.component';

describe('UpcomingPaymentsDashboardRoGridComponent', () => {
  let component: UpcomingPaymentsDashboardRoGridComponent;
  let fixture: ComponentFixture<UpcomingPaymentsDashboardRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingPaymentsDashboardRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingPaymentsDashboardRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
