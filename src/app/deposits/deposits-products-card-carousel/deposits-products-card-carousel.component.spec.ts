import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsProductsCardCarouselComponent } from './deposits-products-card-carousel.component';

describe('DepositsProductsCardCarouselComponent', () => {
  let component: DepositsProductsCardCarouselComponent;
  let fixture: ComponentFixture<DepositsProductsCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsProductsCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsProductsCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
