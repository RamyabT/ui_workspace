import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailWalletReceivedHistoryComponent } from './retail-wallet-received-history.component';

describe('RetailWalletReceivedHistoryComponent', () => {
  let component: RetailWalletReceivedHistoryComponent;
  let fixture: ComponentFixture<RetailWalletReceivedHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailWalletReceivedHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailWalletReceivedHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
