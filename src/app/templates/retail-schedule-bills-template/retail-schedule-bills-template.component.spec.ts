import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailScheduleBillsTemplateComponent } from './retail-schedule-bills-template.component';

describe('RetailSchedulePaymentTemplateComponent', () => {
  let component: RetailScheduleBillsTemplateComponent;
  let fixture: ComponentFixture<RetailScheduleBillsTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailScheduleBillsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailScheduleBillsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
