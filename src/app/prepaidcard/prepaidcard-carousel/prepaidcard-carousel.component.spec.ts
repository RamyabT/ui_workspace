import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidCardCarouselComponent } from './prepaidcard-carousel.component';

describe('PrepaidCardCarouselComponent', () => {
  let component: PrepaidCardCarouselComponent;
  let fixture: ComponentFixture<PrepaidCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
