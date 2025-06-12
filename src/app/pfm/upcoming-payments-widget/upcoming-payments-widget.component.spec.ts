import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPaymentsWidgetComponent } from './upcoming-payments-widget.component';

describe('UpcomingPaymentsWidgetComponent', () => {
  let component: UpcomingPaymentsWidgetComponent;
  let fixture: ComponentFixture<UpcomingPaymentsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingPaymentsWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingPaymentsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
