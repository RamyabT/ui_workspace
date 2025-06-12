import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSummaryCardComponent } from './wallet-summary-card.component';

describe('WalletSummaryCardComponent', () => {
  let component: WalletSummaryCardComponent;
  let fixture: ComponentFixture<WalletSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletSummaryCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
