import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSummaryCardCarouselComponent } from './wallet-summary-card-carousel.component';

describe('WalletSummaryCardCarouselComponent', () => {
  let component: WalletSummaryCardCarouselComponent;
  let fixture: ComponentFixture<WalletSummaryCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletSummaryCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletSummaryCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
