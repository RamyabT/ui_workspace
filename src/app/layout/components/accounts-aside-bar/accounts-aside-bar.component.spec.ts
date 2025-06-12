import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAsideBarComponent } from './accounts-aside-bar.component';

describe('AccountsAsideBarComponent', () => {
  let component: AccountsAsideBarComponent;
  let fixture: ComponentFixture<AccountsAsideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsAsideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
