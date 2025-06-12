import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfaDeliveryModeFormComponent } from './tfa-delivery-mode-form.component';

describe('TfaDeliveryModeFormComponent', () => {
  let component: TfaDeliveryModeFormComponent;
  let fixture: ComponentFixture<TfaDeliveryModeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfaDeliveryModeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TfaDeliveryModeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
