import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagingHomeComponent } from './staging-home/staging-home.component';
import { RetailUpdateProfileDocFormComponent } from '../settings/retail-update-profile-doc-form/retail-update-profile-doc-form.component';
import { LoginReadTermsAndConditionsComponent } from './login-read-terms-and-conditions/login-read-terms-and-conditions.component';
import { VerifyOtpFormComponent } from '../foundation/verify-otp-form/verify-otp-form.component';
import { StagingConfirmationReceiptFormComponent } from './staging-confirmation-receipt-form/staging-confirmation-receipt-form.component';
import { AppPayIntroComponent } from './app-pay-intro/app-pay-intro.component';

const routes: Routes = [
  {
    path: '',
    component: StagingHomeComponent,
    data: { title: "" }
  },
  {
    path: 'update-document-form',
    component: RetailUpdateProfileDocFormComponent,
    data: { title: "RetailUpdateProfileDocForm.title", module: "staging" }
  },
  {
    path: 'terms-and-conditions',
    component: LoginReadTermsAndConditionsComponent,
    data: { title: "ReadTermsAndConditions.title" }
  },
  {
    path: 'verify-tfa',
    component: VerifyOtpFormComponent,
    data: { title: "verifyTfa.title" }
  },
  {
    path: 'staging-confirmation-receipt-form',
    component: StagingConfirmationReceiptFormComponent,
    data: { title: "StagingResultPage.title" }
  },
  {
    path: 'app-pay-intro',
    component: AppPayIntroComponent,
    data: { title: "" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagingRoutingModule { }
