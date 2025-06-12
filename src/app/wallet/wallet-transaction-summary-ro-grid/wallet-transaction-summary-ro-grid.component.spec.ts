import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTransactionSummaryRoGridComponent } from './wallet-transaction-summary-ro-grid.component';

describe('WalletTransactionSummaryRoGridComponent', () => {
  let component: WalletTransactionSummaryRoGridComponent;
  let fixture: ComponentFixture<WalletTransactionSummaryRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletTransactionSummaryRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletTransactionSummaryRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
