import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExpenseCategorizationtionCarouselComponent } from './member-expense-categorizationtion-carousel.component';

describe('MemberExpenseCategorizationtionCarouselComponent', () => {
  let component: MemberExpenseCategorizationtionCarouselComponent;
  let fixture: ComponentFixture<MemberExpenseCategorizationtionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberExpenseCategorizationtionCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberExpenseCategorizationtionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
