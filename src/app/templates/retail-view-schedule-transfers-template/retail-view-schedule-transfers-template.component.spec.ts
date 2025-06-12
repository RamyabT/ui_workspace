import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RetailScheduleTransfersTemplateComponent } from './retail-view-schedule-transfers-template.component';


describe('RetailScheduleTransfersTemplateComponent', () => {
  let component: RetailScheduleTransfersTemplateComponent;
  let fixture: ComponentFixture<RetailScheduleTransfersTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailScheduleTransfersTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailScheduleTransfersTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
