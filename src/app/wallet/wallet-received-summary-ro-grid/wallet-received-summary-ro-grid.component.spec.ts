import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletReceivedSummaryRoGridComponent } from './wallet-received-summary-ro-grid.component';

describe('WalletReceivedSummaryRoGridComponent', () => {
  let component: WalletReceivedSummaryRoGridComponent;
  let fixture: ComponentFixture<WalletReceivedSummaryRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletReceivedSummaryRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletReceivedSummaryRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
