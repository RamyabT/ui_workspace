import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanContextualActionsComponent } from './loan-contextual-actions.component';

describe('LoanContextualActionsComponent', () => {
  let component: LoanContextualActionsComponent;
  let fixture: ComponentFixture<LoanContextualActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanContextualActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanContextualActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
