import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCardCarouselComponent } from './debitcard-carousel.component';

describe('DebitCardCarouselComponent', () => {
  let component: DebitCardCarouselComponent;
  let fixture: ComponentFixture<DebitCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
