import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositQuickActionsComponent } from './deposit-quick-actions.component';

describe('DepositQuickActionsComponent', () => {
  let component: DepositQuickActionsComponent;
  let fixture: ComponentFixture<DepositQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositQuickActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
