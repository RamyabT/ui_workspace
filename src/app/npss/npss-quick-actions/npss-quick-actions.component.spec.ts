import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpssQuickActionsComponent } from './npss-quick-actions.component';

describe('NpssQuickActionsComponent', () => {
  let component: NpssQuickActionsComponent;
  let fixture: ComponentFixture<NpssQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpssQuickActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpssQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
