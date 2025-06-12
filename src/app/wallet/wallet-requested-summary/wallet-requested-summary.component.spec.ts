import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRequestedSummaryComponent } from './wallet-requested-summary.component';

describe('WalletRequestedSummaryComponent', () => {
  let component: WalletRequestedSummaryComponent;
  let fixture: ComponentFixture<WalletRequestedSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletRequestedSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletRequestedSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
