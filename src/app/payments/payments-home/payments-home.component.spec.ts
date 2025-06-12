import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsHomeComponent } from './payments-home.component';

describe('PaymentsHomeComponent', () => {
  let component: PaymentsHomeComponent;
  let fixture: ComponentFixture<PaymentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
