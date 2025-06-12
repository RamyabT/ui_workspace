import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletQuickActionComponent } from './wallet-quick-action.component';

describe('WalletQuickActionComponent', () => {
  let component: WalletQuickActionComponent;
  let fixture: ComponentFixture<WalletQuickActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletQuickActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletQuickActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
