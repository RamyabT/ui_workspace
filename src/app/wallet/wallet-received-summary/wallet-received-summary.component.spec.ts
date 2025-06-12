import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReceivedSummaryComponent } from './wallet-received-summary.component';

describe('WalletReceivedSummaryComponent', () => {
  let component: WalletReceivedSummaryComponent;
  let fixture: ComponentFixture<WalletReceivedSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletReceivedSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletReceivedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
