import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsContainerComponent } from './payments-container.component';

describe('PaymentsContainerComponent', () => {
  let component: PaymentsContainerComponent;
  let fixture: ComponentFixture<PaymentsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
