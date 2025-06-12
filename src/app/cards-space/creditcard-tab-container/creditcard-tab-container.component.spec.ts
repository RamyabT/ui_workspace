import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardTabContainerComponent } from './creditcard-tab-container.component';

describe('CreditCardTabContainerComponent', () => {
  let component: CreditCardTabContainerComponent;
  let fixture: ComponentFixture<CreditCardTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardTabContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
