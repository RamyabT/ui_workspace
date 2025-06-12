import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidcardHomeComponent } from './prepaidcard-home.component';

describe('PrepaidcardHomeComponent', () => {
  let component: PrepaidcardHomeComponent;
  let fixture: ComponentFixture<PrepaidcardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepaidcardHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepaidcardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
