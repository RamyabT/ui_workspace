import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RetailScheduleTransfersMobTemplateComponent } from './retail-view-schedule-transfers-mob-template.component';


describe('RetailScheduleTransfersMobTemplateComponent', () => {
  let component: RetailScheduleTransfersMobTemplateComponent;
  let fixture: ComponentFixture<RetailScheduleTransfersMobTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailScheduleTransfersMobTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailScheduleTransfersMobTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
