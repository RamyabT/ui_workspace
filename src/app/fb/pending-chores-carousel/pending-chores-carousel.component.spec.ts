import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingChoresCarouselComponent } from './pending-chores-carousel.component';

describe('PendingChoresCarouselComponent', () => {
  let component: PendingChoresCarouselComponent;
  let fixture: ComponentFixture<PendingChoresCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingChoresCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingChoresCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
