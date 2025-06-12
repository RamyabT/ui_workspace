import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsMoneyFlowComponent } from './accounts-money-flow.component';

describe('AccountsMoneyFlowComponent', () => {
  let component: AccountsMoneyFlowComponent;
  let fixture: ComponentFixture<AccountsMoneyFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsMoneyFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsMoneyFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
