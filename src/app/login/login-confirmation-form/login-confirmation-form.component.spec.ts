import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginConfirmationFormComponent } from './login-confirmation-form.component';
// import { LoginConfirmationFormComponent } from '../confirmation-receipt-form/confirmation-receipt-form.component';

// import { LoginConfirmationFormComponent } from './confirmation-receipt-form.component';

describe('LoginConfirmationFormComponent', () => {
  let component: LoginConfirmationFormComponent;
  let fixture: ComponentFixture<LoginConfirmationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginConfirmationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginConfirmationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
