import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCardCarouselComponent } from './member-card-carousel.component';

describe('MemberCardCarouselComponent', () => {
  let component: MemberCardCarouselComponent;
  let fixture: ComponentFixture<MemberCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCardCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
