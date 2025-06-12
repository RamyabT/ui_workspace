import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { UserNameComponent } from './user-name/user-name.component';
import { PasswordComponent } from './password/password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyUserIdComponent } from './verify-user-id/verify-user-id.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FpxCoreModule } from '@fpx/core';
import { MaterialModule } from '@dep/core';
import { TranslateModule } from '@ngx-translate/core';
import { RetailForgotPasswordFormComponent } from './retail-forgot-password-form/retail-forgot-password-form.component';
import { UserNameControlComponent } from './username-control/username-control.component';
import { RetailForgotPasswordFormHelper } from './retail-forgot-password-form/retail-forgot-password-form.helper';
import { ForgotpasswordService } from './login-validator-services/forgot-password-validator.service';
import { ResetPasswordService } from './resetpassword-service/ResetPassword.service';
import { RetailResetPasswordFormComponent } from './retail-reset-password-form/retail-reset-password-form.component';
import { RetailSelfRegisterFormComponent } from './retail-self-register-form/retail-self-register-form.component';
import { RetailselfregisterService } from './retailselfregister-service/retailselfregister.service';
import { CustomerIdControlComponent } from '../prelogin/customer-id-control/customer-id-control.component';
import { RetailunlockuserService } from './retailunlockuser-service/retailunlockuser.service';
import { RetailCustomerVerificationFormComponent } from './retail-customer-verification-form/retail-customer-verification-form.component';
import { RetailforgotusernameService } from './retailforgotusername-service/retailforgotusername.service';
import { ChangepassService } from './changepass-service/changepass.service';
import { RetailChangePasswordFormComponent } from './retail-change-password-form/retail-change-password-form.component';
import { RetailUnlockuserFormComponent } from './retail-unlockuser-form/retail-unlockuser-form.component';
import { IdentificationModeControlComponent } from './identification-mode-control/identification-mode-control.component';
import { FoundationModule } from '../foundation/foundation.module';
import { TestLoginFormComponent } from './test-login-form/test-login-form.component';
import { RetailSelfRegConfigControlComponent } from './retail-self-reg-config-control/retail-self-reg-config-control.component';
import { SelfregconfigService } from './selfregconfig-service/selfregconfig.service';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { LoginConfirmationFormComponent } from './login-confirmation-form/login-confirmation-form.component';
import { MpinLoginFormComponent } from './mpin-login-form/mpin-login-form.component';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';
import { SelfRegConfirmationReceiptFormComponent } from './self-reg-confirmation-receipt-form/self-reg-confirmation-receipt-form.component';
import { NPSSLoginService } from './services/npss-login.service';
import { NPSSLoginFormComponent } from './npss-login-form/npss-login-form.component';
import { NativeStorageManager } from '@dep/native';
import { NPSSFailureFormComponent } from './npss-failure-confirmation-form/npss-failure-confirmation-form';
import { NPSSSuccessFormComponent } from './npss-success-confirmation-form/npss-success-confirmation-form.component';
import { ObVerifyTFAService } from '../onboarding/verifytfa-service/verify-tfa.service';
import { TermspublishService } from '../prelogin/termspublish-service/termspublish.service';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UserNameComponent,
    PasswordComponent,
    VerifyUserIdComponent,
    LoginFormComponent,
    RetailForgotPasswordFormComponent,
    UserNameControlComponent,
    RetailResetPasswordFormComponent,
    RetailSelfRegisterFormComponent,
    IdentificationModeControlComponent,
    RetailChangePasswordFormComponent,
    RetailUnlockuserFormComponent,
    RetailCustomerVerificationFormComponent,
    CustomerIdControlComponent,
    TestLoginFormComponent,
    RetailSelfRegConfigControlComponent,
    LoginConfirmationFormComponent,
    MpinLoginFormComponent,
    SelfRegConfirmationReceiptFormComponent,
    NPSSLoginFormComponent,
    NPSSSuccessFormComponent,
    NPSSFailureFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FpxCoreModule,
    MaterialModule,
    TranslateModule,
    FoundationModule,
    DebitcardModule,
    CreditCardsModule,
    HammerModule


  ],
  providers: [
    RetailForgotPasswordFormHelper,
    ForgotpasswordService, ResetPasswordService,
    RetailselfregisterService,
    ChangepassService,
    RetailunlockuserService,
    RetailforgotusernameService,
    SelfregconfigService,
    NPSSLoginService,
    TermspublishService,
    ObVerifyTFAService
  ],
  exports: [
    UserNameComponent,
    PasswordComponent,
    VerifyUserIdComponent,
    LoginFormComponent,
    RetailForgotPasswordFormComponent,
    UserNameControlComponent,
    RetailResetPasswordFormComponent,
    RetailSelfRegisterFormComponent,
    IdentificationModeControlComponent,
    RetailChangePasswordFormComponent,
    RetailUnlockuserFormComponent,
    RetailCustomerVerificationFormComponent,
    CustomerIdControlComponent,
    TestLoginFormComponent,
    RetailSelfRegConfigControlComponent,
    LoginConfirmationFormComponent,
    SelfRegConfirmationReceiptFormComponent,
    NPSSLoginFormComponent,
    NPSSSuccessFormComponent,
    NPSSFailureFormComponent
  ]
})
export class LoginModule { }
