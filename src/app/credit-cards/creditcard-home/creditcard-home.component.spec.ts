import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardHomeComponent } from './creditcard-home.component';

describe('CreditcardHomeComponent', () => {
  let component: CreditcardHomeComponent;
  let fixture: ComponentFixture<CreditcardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
