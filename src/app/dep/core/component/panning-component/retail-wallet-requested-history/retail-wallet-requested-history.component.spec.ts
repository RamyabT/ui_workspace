import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailWalletRequestedHistoryComponent } from './retail-wallet-requested-history.component';

describe('RetailWalletRequestedHistoryComponent', () => {
  let component: RetailWalletRequestedHistoryComponent;
  let fixture: ComponentFixture<RetailWalletRequestedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailWalletRequestedHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailWalletRequestedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
