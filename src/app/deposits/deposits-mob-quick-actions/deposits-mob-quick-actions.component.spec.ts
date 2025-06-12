import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsMobQuickActionsComponent } from './deposits-mob-quick-actions.component';

describe('DepositsMobQuickActionsComponent', () => {
  let component: DepositsMobQuickActionsComponent;
  let fixture: ComponentFixture<DepositsMobQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsMobQuickActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsMobQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
