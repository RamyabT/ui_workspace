import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailFbmemberScheduleTemplateComponent } from './retail-fbmember-schedule-template.component';

describe('RetailFbmemberScheduleTemplateComponent', () => {
  let component: RetailFbmemberScheduleTemplateComponent;
  let fixture: ComponentFixture<RetailFbmemberScheduleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailFbmemberScheduleTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailFbmemberScheduleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
