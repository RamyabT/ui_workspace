
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardModuleHeaderComponent } from './creditcard-module-header.component';

describe('AccountsModuleHeaderComponent', () => {
  let component: CreditCardModuleHeaderComponent;
  let fixture: ComponentFixture<CreditCardModuleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardModuleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardModuleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});