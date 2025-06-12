import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExpenseCategorizationtionComponent } from './member-expense-categorizationtion.component';

describe('MemberExpenseCategorizationtionComponent', () => {
  let component: MemberExpenseCategorizationtionComponent;
  let fixture: ComponentFixture<MemberExpenseCategorizationtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberExpenseCategorizationtionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberExpenseCategorizationtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
