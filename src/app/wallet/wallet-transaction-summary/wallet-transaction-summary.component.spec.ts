import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTransactionSummaryComponent } from './wallet-transaction-summary.component';

describe('WalletTransactionSummaryComponent', () => {
  let component: WalletTransactionSummaryComponent;
  let fixture: ComponentFixture<WalletTransactionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletTransactionSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletTransactionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
