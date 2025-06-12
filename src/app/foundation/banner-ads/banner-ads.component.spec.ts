import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAdsComponent } from './banner-ads.component';

describe('BannerAdsComponent', () => {
  let component: BannerAdsComponent;
  let fixture: ComponentFixture<BannerAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
