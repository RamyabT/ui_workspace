import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.component';
import { VerifyUserIdComponent } from './verify-user-id/verify-user-id.component';
import { RetailForgotPasswordFormComponent } from './retail-forgot-password-form/retail-forgot-password-form.component';
import { RetailResetPasswordFormComponent } from './retail-reset-password-form/retail-reset-password-form.component';
import { RetailChangePasswordFormComponent } from './retail-change-password-form/retail-change-password-form.component';
import { RetailUnlockuserFormComponent } from './retail-unlockuser-form/retail-unlockuser-form.component';
import { RetailSelfRegisterFormComponent } from './retail-self-register-form/retail-self-register-form.component';
import { RetailCustomerVerificationFormComponent } from './retail-customer-verification-form/retail-customer-verification-form.component';
import { TestLoginFormComponent } from './test-login-form/test-login-form.component';
import { LoginConfirmationFormComponent } from './login-confirmation-form/login-confirmation-form.component';
import { SelfRegConfirmationReceiptFormComponent } from './self-reg-confirmation-receipt-form/self-reg-confirmation-receipt-form.component';
import { NPSSLoginFormComponent } from './npss-login-form/npss-login-form.component';
import { MpinLoginFormComponent } from './mpin-login-form/mpin-login-form.component';
import { NPSSFailureFormComponent } from './npss-failure-confirmation-form/npss-failure-confirmation-form';
import { NPSSSuccessFormComponent } from './npss-success-confirmation-form/npss-success-confirmation-form.component';
import { EnableBiometricFormComponent } from '../foundation/enable-biometric-form/enable-biometric-form.component';


const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'npsslogin',
    component: NPSSLoginFormComponent
  },
  {
    path: 'mpin-login-form',
    component: MpinLoginFormComponent
  },
  {
    path: 'verify-user',
    component: VerifyUserIdComponent
  },
  {
    path: 'retail-forgot-password-form',
    component: RetailForgotPasswordFormComponent,
    data: { title: "RetailForgotPasswordForm.title" }
  },
  {
    path: 'retail-reset-password-form',
    component: RetailResetPasswordFormComponent,
    data: { title: "RetailResetPasswordForm.title" }
  },

   {
    path: 'login-confirmation-receipt',
    component: LoginConfirmationFormComponent,
    data: { title: "confirmationReceiptForm.title" }
  },
  {
    path: 'self-reg-confirmation-receipt',
    component: SelfRegConfirmationReceiptFormComponent,
    data: { title: "confirmationReceiptForm.title" }
 },
  {
    path: 'retail-change-password-form',
    component: RetailChangePasswordFormComponent,
    data: { title: "RetailChangePasswordForm.title" }
  },
  {
    path: 'retail-unlockuser-form',
    component: RetailUnlockuserFormComponent,
    data: { title: 'RetailUnlockuserForm.title' }
  },
  {
    path: 'retail-self-register-form',
    component: RetailSelfRegisterFormComponent,
    data: { title: "Self Registration" }
  },
  {
    path: 'retail-customer-verification-form',
    component: RetailCustomerVerificationFormComponent,
    data: { title: "RetailCustomerVerificationForm.userNameTitle" }
  },
  {
    path: 'login-form',
    component: TestLoginFormComponent
  },
   {
    path : 'test-login-form',
    component : TestLoginFormComponent
  },
  {
    path: 'npss-success-form',
    component: NPSSSuccessFormComponent

  },
  {
    path: 'npss-failure-form',
    component: NPSSFailureFormComponent
  },
  {
    path: "enable-biometric",
    component: EnableBiometricFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoginRoutingModule { }
