import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbSchedulePaymentsRoGridComponent } from './fb-schedule-payments-ro-grid.component';

describe('FbSchedulePaymentsRoGridComponent', () => {
  let component: FbSchedulePaymentsRoGridComponent;
  let fixture: ComponentFixture<FbSchedulePaymentsRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbSchedulePaymentsRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbSchedulePaymentsRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
