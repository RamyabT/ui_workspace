import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionsPanelComponent } from './actions-panel.component';

describe('RetailSchedulePaymentTemplateComponent', () => {
  let component: ActionsPanelComponent;
  let fixture: ComponentFixture<ActionsPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
