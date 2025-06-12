import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersQuickActionsComponent } from './transfers-quick-actions.component';

describe('TransfersQuickActionsComponent', () => {
  let component: TransfersQuickActionsComponent;
  let fixture: ComponentFixture<TransfersQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersQuickActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfersQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
