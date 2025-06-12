import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsModuleHeaderComponent } from './accounts-module-header.component';

describe('AccountsModuleHeaderComponent', () => {
  let component: AccountsModuleHeaderComponent;
  let fixture: ComponentFixture<AccountsModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
