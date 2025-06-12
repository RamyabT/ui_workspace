import { VerifyOtpFormComponent } from './verify-otp-form/verify-otp-form.component';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RetailAddressDetailsFormComponent } from './retail-address-details-form/retail-address-details-form.component';
import { EnableBiometricFormComponent } from './enable-biometric-form/enable-biometric-form.component';
import { OtpCancelFormComponent } from './otp-cancel-form/otp-cancel-form.component';
import { TFADeliveryModeFormComponent } from './tfa-delivery-mode-form/tfa-delivery-mode-form.component';

const routes: Routes = [
  {
    path: 'delivery-mode-selection',
    component: TFADeliveryModeFormComponent,
    data: { title: "tfaDeliveryMode.deliveryMode.title" }
  },
  {
    path: 'verify-tfa',
    component: VerifyOtpFormComponent,
    data: { title: "verifyTfa.title" }
  },
  {
    path: 'retail-address-details-form',
    component: RetailAddressDetailsFormComponent
  },
  {
    path: 'enable-biometric',
    component: EnableBiometricFormComponent,
    data: { title: "RetailEnableBiometricForm.title" }
  },
  {
    path: 'otp-cancel-form',
    component: OtpCancelFormComponent,
    data: { title: "OtpCancelForm.title" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationRoutingModule { }
