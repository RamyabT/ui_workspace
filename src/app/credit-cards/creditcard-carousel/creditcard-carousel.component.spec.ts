import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardCarouselComponent } from './creditcard-carousel.component';

describe('CreditCardCarouselComponent', () => {
  let component: CreditCardCarouselComponent;
  let fixture: ComponentFixture<CreditCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
