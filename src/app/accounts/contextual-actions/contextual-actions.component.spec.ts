import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualActionsComponent } from './contextual-actions.component';

describe('ContextualActionsComponent', () => {
  let component: ContextualActionsComponent;
  let fixture: ComponentFixture<ContextualActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextualActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextualActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
