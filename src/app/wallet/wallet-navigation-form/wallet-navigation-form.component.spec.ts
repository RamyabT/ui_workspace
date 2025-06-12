import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletNavigationFormComponent } from './wallet-navigation-form.component';

describe('WalletNavigationFormComponent', () => {
  let component: WalletNavigationFormComponent;
  let fixture: ComponentFixture<WalletNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
