import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRequestedSummaryRoGridComponent } from './wallet-requested-summary-ro-grid.component';

describe('WalletRequestedSummaryRoGridComponent', () => {
  let component: WalletRequestedSummaryRoGridComponent;
  let fixture: ComponentFixture<WalletRequestedSummaryRoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletRequestedSummaryRoGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletRequestedSummaryRoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
