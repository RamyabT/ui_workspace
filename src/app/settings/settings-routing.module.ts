import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailChangeMpinFormComponent } from './retail-change-mpin-form/retail-change-mpin-form.component';
import { RetailManageAlertsFormComponent } from './retail-manage-alerts-form/retail-manage-alerts-form.component';
import { RetailMyProfileFormComponent } from './retail-my-profile-form/retail-my-profile-form.component';
import { RetailProfilePicPreviewFormComponent } from './retail-profile-pic-preview-form/retail-profile-pic-preview-form.component';
import { RetailChangePasswordFormComponent } from './retail-change-password-form/retail-change-password-form.component';
import { ManageBiometricFormComponent } from './manage-biometric-form/manage-biometric-form.component';
import { RetailFXRatesFormComponent } from './retail-fx-rates-form/retail-fx-rates-form.component';
import { SettingsConfirmationReceiptFormComponent } from './settings-confirmation-receipt-form/settings-confirmation-receipt-form.component';
import { RetailProfileDetailsFormComponent } from './retail-profile-details-form/retail-profile-details-form.component';
import { RetailManageAuthenticatedDeviceFormComponent } from './retail-manage-authenticated-device-form/retail-manage-authenticated-device-form.component';
import { ManageServiceLimitsComponent } from './retail-manage-service-limits-form/retail-manage-service-limits-form.component';
import { RetailUpdateProfileDocFormComponent } from './retail-update-profile-doc-form/retail-update-profile-doc-form.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { EnableBiometricFormComponent } from './enable-biometric-form/enable-biometric-form.component';
import { FailureResultFormComponent } from '../foundation/failure-result-form/failure-result-form.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsHomeComponent,
  },
  {
    path: 'my-profile',
    component: RetailMyProfileFormComponent,
    data: {
      title: 'RETAILVIEWMYPROFILE.title'
    }
  },
  {
    path: 'profile-details',
    component: RetailProfileDetailsFormComponent,
    data: {
      title: 'Profile Details'
    }
  },
  {
    path: 'profile-pic-preview',
    component: RetailProfilePicPreviewFormComponent,
    data: { title: "RETAILSETTINGS.RETAILPROFILEPICPREVIEW", module: 'settings' }
  },
  {
    path: 'retail-change-mpin-form',
    component: RetailChangeMpinFormComponent,
    data: { title: "RetailChangeMpinForm.title", module: "settings" }
  },
  {
    path: 'retail-manage-alerts-form',
    component: RetailManageAlertsFormComponent,
    data: { title: "RETAILSETTINGS.RETAILMANAGEALERTS", module: 'settings' }
  },
  {
    path: 'retail-user-alert-template',
    component: RetailManageAlertsFormComponent,
    data: { title: "RETAILSETTINGS.RETAILMANAGEALERTS", module: 'settings' }
  },
  {
    path: 'retail-change-password-form',
    component: RetailChangePasswordFormComponent,
    data: { title: "RetailChangePasswordForm.title", module: 'settings' }
  },
  {
    path: 'retail-manage-biometric-form',
    component: ManageBiometricFormComponent,
    data: { title: "RetailManageBiometricForm.title", module: "settings" }
  },
  {
    path: 'retail-fx-rates-form',
    component: RetailFXRatesFormComponent,
    data: { title: "RETAILSETTINGS.FXRATES", module: 'settings' }
  },
  {
    path: 'settings-confirmation-receipt-form',
    component: SettingsConfirmationReceiptFormComponent,
    data: { title: "settingsConfirmationReceiptForm.title" }
  },
  {
    path: 'manage-authenticated-device-form',
    component: RetailManageAuthenticatedDeviceFormComponent,
    data: { title: "RETAILSETTINGS.MANAGEMYDEVICE", module: 'settings' }
  },
  {
    path: 'retail-manage-service-limits-form',
    component: ManageServiceLimitsComponent,
    data: { title: "ManageServiceLimits.title", module: 'settings' }
  },
  {
    path: 'retail-update-profile-doc-form',
    component: RetailUpdateProfileDocFormComponent,
    data: { title: "RetailUpdateProfileDocForm.title", module: 'settings' }
  },
  {
    path: 'enable-biometric',
    component: EnableBiometricFormComponent,
    data: { title: "SettingsEnableBiometricForm.title", module: 'settings' }
  },
  {
    path: 'failure-result',
    component: FailureResultFormComponent,
    data: { title: 'FailureResultForm.title' }
 }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
