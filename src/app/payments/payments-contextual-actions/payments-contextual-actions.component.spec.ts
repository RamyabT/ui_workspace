import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsContextualActionsComponent } from './payments-contextual-actions.component';

describe('PaymentsContextualActionsComponent', () => {
  let component: PaymentsContextualActionsComponent;
  let fixture: ComponentFixture<PaymentsContextualActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsContextualActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsContextualActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
