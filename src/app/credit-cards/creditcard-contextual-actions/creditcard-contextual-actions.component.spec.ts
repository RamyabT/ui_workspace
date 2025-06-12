import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardContextualActionsComponent } from './creditcard-contextual-actions.component';

describe('CreditcardContextualActionsComponent', () => {
  let component: CreditcardContextualActionsComponent;
  let fixture: ComponentFixture<CreditcardContextualActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardContextualActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardContextualActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
