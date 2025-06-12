import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsNavigationFormComponent } from './payments-navigation-form.component';

describe('PaymentsNavigationFormComponent', () => {
  let component: PaymentsNavigationFormComponent;
  let fixture: ComponentFixture<PaymentsNavigationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsNavigationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsNavigationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
