import { RetailChangePasswordFormComponent } from './retail-change-password-form/retail-change-password-form.component';
import { ChangepasswordService } from './changepassword-service/changepassword.service';
import { FoundationModule } from '../foundation/foundation.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FpxCoreModule } from '@fpx/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../dep/core/material.module';
import { LoginModule } from '../login/login.module';
import { ServiceRequestModule } from '../service-request/service-request.module';
import { RetailChangeMpinFormComponent } from './retail-change-mpin-form/retail-change-mpin-form.component';
import { RetailChangeMpinFormHelper } from './retail-change-mpin-form/retail-change-mpin-form.helper';
import { ChangempinService } from './changempin-service/changempin.service';
import { MpinPasswordControlComponent } from './mpin-password-control/mpin-password-control.component';
import { RetailManageAlertsFormComponent } from './retail-manage-alerts-form/retail-manage-alerts-form.component';
import { RetailManageAlertsRoGridComponent } from './retail-manage-alerts-ro-grid/retail-manage-alerts-ro-grid.component';
import { UseralertcfgService } from './useralertcfg-service/useralertcfg.service';
import { DepCoreModule } from '../dep/core/dep-core.module';
import { RetailMyProfileFormComponent } from './retail-my-profile-form/retail-my-profile-form.component';
import { RetailProfilePicPreviewFormComponent } from './retail-profile-pic-preview-form/retail-profile-pic-preview-form.component';
import { PasswordComponent } from '../login/password/password.component';
import { ManageBiometricFormComponent } from './manage-biometric-form/manage-biometric-form.component';
import { FxratesService } from './fxrates-service/fxrates.service';
import { RetailFXRatesFormComponent } from './retail-fx-rates-form/retail-fx-rates-form.component';
import { RetailFXRatesRoGridComponent } from './retail-fx-rates-ro-grid/retail-fx-rates-ro-grid.component';
import { SettingsConfirmationReceiptFormComponent } from './settings-confirmation-receipt-form/settings-confirmation-receipt-form.component';
import { RetailProfileDetailsFormComponent } from "./retail-profile-details-form/retail-profile-details-form.component";
import { CustomerinfologService } from "./customerinfolog-service/customerinfolog.service";
import { UserdeviceService } from './userdevice-service/userdevice.service';
import { RetailManageAuthenticatedDeviceRoGridComponent } from './retail-manage-authenticated-device-ro-grid/retail-manage-authenticated-device-ro-grid.component';
import { RetailManageAuthenticatedDeviceFormComponent } from './retail-manage-authenticated-device-form/retail-manage-authenticated-device-form.component';
import { ManagetransactionlimitsService } from './managetransactionlimits-service/managetransactionlimits.service';
import { DebitcardModule } from '../debit-card/debitcard.module';
import { ManageServiceLimitsComponent } from './retail-manage-service-limits-form/retail-manage-service-limits-form.component';
import { ProfileMobileNumberControlComponent } from './profile-mobile-number-control/profile-mobile-number-control.component';
import { RetailUpdateProfileDocFormComponent } from './retail-update-profile-doc-form/retail-update-profile-doc-form.component';
import { UpdatedocumentreqService } from './updatedocumentreq-service/updatedocumentreq.service';
import { RetailProfileDocUploadFormComponent } from './retail-profile-doc-upload-form/retail-profile-doc-upload-form.component';
import { DocumentIdControlComponent } from './controls/document-id-control/document-id-control.component';
import { DocumentIdService } from './controls/documentId-service/documentId.service';
import { UploadTypeComponent } from './controls/upload-type/upload-type.component';
import { UploadTypeService } from './controls/upload-type/upload-type.service';
import { ProfileDocUploadControlComponent } from './controls/profile-doc-upload-control/profile-doc-upload-control.component';
import { RetailCustomerDocumentDetailsRoGridComponent } from './retail-customer-document-details-ro-grid/retail-customer-document-details-ro-grid.component';
import { CustomerdocumentdtlsService } from './customerdocumentdtls-service/customerdocumentdtls.service';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { EnableBiometricFormComponent } from './enable-biometric-form/enable-biometric-form.component';
import { UtilityModule } from '../utility/utility.module'

const components = [
  RetailChangeMpinFormComponent,
  MpinPasswordControlComponent,
  RetailManageAlertsFormComponent,
  RetailManageAlertsRoGridComponent,
  RetailMyProfileFormComponent,
  RetailProfilePicPreviewFormComponent,
  RetailChangePasswordFormComponent,
  ManageBiometricFormComponent,
  RetailFXRatesFormComponent,
  RetailFXRatesRoGridComponent,
  SettingsConfirmationReceiptFormComponent,
  RetailProfileDetailsFormComponent,
  RetailManageAuthenticatedDeviceFormComponent,
  RetailManageAuthenticatedDeviceRoGridComponent,
  ManageServiceLimitsComponent,
  ProfileMobileNumberControlComponent,
  RetailUpdateProfileDocFormComponent,
  RetailProfileDocUploadFormComponent,
  DocumentIdControlComponent,
  UploadTypeComponent,
  ProfileDocUploadControlComponent,
  RetailCustomerDocumentDetailsRoGridComponent,
  SettingsHomeComponent,
  EnableBiometricFormComponent
]

@NgModule({
  declarations: [
  ...components
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FpxCoreModule,
    TranslateModule,
    FoundationModule,
    MaterialModule,
    DepCoreModule,
    LoginModule,
    DebitcardModule,
    UtilityModule
  ],
  providers: [
    RetailChangeMpinFormHelper,
    ChangempinService,
    ChangepasswordService,
    UseralertcfgService,
    FxratesService,
    CustomerinfologService,
    UserdeviceService,
    ManagetransactionlimitsService,
    UpdatedocumentreqService,
    DocumentIdService,
    UploadTypeService,
    CustomerdocumentdtlsService,
  ],
  exports: [
   ...components
  ]
})
export class SettingsModule { }
