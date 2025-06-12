import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailWalletTransactionHistoryComponent } from './retail-wallet-transaction-history.component';

describe('RetailWalletTransactionHistoryComponent', () => {
  let component: RetailWalletTransactionHistoryComponent;
  let fixture: ComponentFixture<RetailWalletTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailWalletTransactionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailWalletTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
