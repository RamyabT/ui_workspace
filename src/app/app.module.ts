import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DepHammerConfig, DeviceDetectorService, MaterialModule, appInitializer } from '@dep/core';
import { Device } from '@ionic-native/device/ngx';
import { Dialogs } from '@awesome-cordova-plugins/dialogs/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FPXAuthService, FPXFileUploadService, FPX_ENVIRONMENT, FpxAmountConfig, FpxAppConfig, FpxCoreModule, FpxCurrAmountService, FpxDateConfiguration, FpxFakeAmountService, FpxFlagConfiguration, FpxFormControlErrorMessage, FpxHttpConfig, FpxHttpProviderService, HttpProviderService } from '@fpx/core';
import { AppConfigService, CommonValidatorService, CustomCurrAmountService, CustomDateService, CustomErrorMessageService, CustomFileUploadService, CustomProcessService, CustomMenuService, UserAuthService, DepHttpConfig, DepHttpProviderService, HealthCheckService, LanguageService, RefreshHandlerService } from '@dep/services';
import { environment } from '../environments/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FpxLayoutModule, FpxMenuService, FpxProcessService, FpxShellService } from '@fpx/layout';
import { shellRouting } from './shell-routing.module';
import { DefaultFormControlTemplateComponent } from './templates/default-form-control-template/default-form-control-template.component';
import type { FaceTecSDK as FaceTecSDKType } from "../../facetec-core-sdk/FaceTecSDK.js/FaceTecSDK";
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { CameraPreview } from '@awesome-cordova-plugins/camera-preview/ngx';
import { DisplayGridTemplateComponent } from './templates/display-grid-template/display-grid-template.component';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ShellService } from '@dep/services';
import { DepCoreModule } from './dep/core/dep-core.module';
import { DropdownTemplateComponent } from './templates/dropdown-template/dropdown-template.component';
import { TemplatesModule } from './templates/templates.module';
import { ContactFindOptions, Contacts } from '@ionic-native/contacts/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { FileUploadTemplateComponent } from './templates/file-upload-template/file-upload-template.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { FormGroupDirective, FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { HttpStatusModule } from './http-status/http-status.module';
import { CheckNetworkStatusService } from './dep/native/check-network-status.service';
import { HttpResponseInceptor } from './http-interceptor';
import { HTTP } from '@ionic-native/http/ngx';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { AppModuleDeclarationExtension, AppModuleImportExtension } from './app-routing-extension';
import { ScreenBusyComponent } from './layout/components/screen-busy/screen-busy.component';
import { CommonService } from './foundation/validator-service/common-service';
import { AppLauncherComponent } from './app-launcher/app-launcher.component';
import { radioButtonTemplateComponent } from './templates/radio-button-template/radio-button-template.component';
import { createTranslateLoader } from './dep/services/language/custom-translate-loader';
import { CustomLanguageService } from './dep/services/language/custom-language.service';
import { customAmountService } from './dep/services/fpx-curr-amount/fpx-amount-config.service';
import { OverlayComponent } from './overlay/overlay/overlay.component';
import { OktaIntegrationModule } from './okta-integration/okta-integration.module';
import { OktaAuthService } from './okta-integration/okta/okta-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DefaultFormControlTemplateComponent,
    DisplayGridTemplateComponent,
    DropdownTemplateComponent,
    FileUploadTemplateComponent,
    ScreenBusyComponent,
    radioButtonTemplateComponent,
    ...AppModuleDeclarationExtension,
    AppLauncherComponent,
    OverlayComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FpxCoreModule.forRoot({
      FPX_FILE_UPLOAD_SERVICE: {
        provide: FPXFileUploadService,
        useClass: CustomFileUploadService,
      },
      FPX_HTTP_PROVIDER_INTERCEPTOR: {
        provide: HttpProviderService,
        useExisting: DepHttpProviderService,
      },
      FPX_AUTH_SERVICE: {
        provide: FPXAuthService,
        useExisting: UserAuthService,
      },
      FPX_CURRENCY_AMOUNT_SERVICE: {
        provide: FpxCurrAmountService,
        useExisting: CustomCurrAmountService,
      },
      FPX_AMOUNT_CONFIG: {
        provide: FpxAmountConfig,
        useExisting: customAmountService,
      },
      FPX_ERROR_MESSAGE : {
        provide : FpxFormControlErrorMessage,
        useExisting : CustomErrorMessageService
      },
      FPX_APP_CONFIG: {
        provide: FpxAppConfig,
        useExisting: AppConfigService
      },
      FPX_DATE_CONFIG: {
        provide: FpxDateConfiguration,
        useExisting: CustomDateService,
      },
      FPX_HTTP_CONFIG: {
        provide: FpxHttpConfig,
        useExisting: DepHttpConfig
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [CustomLanguageService],
      },
    }),
    FpxLayoutModule.forRoot({
      FPX_ROUTES: shellRouting,
      FPX_PROCESS_SERVICE: {
        provide: FpxProcessService,
        useExisting: CustomProcessService
      },
      FPX_MENU_SERVICE: {
        provide: FpxMenuService,
        useExisting: CustomMenuService
      },
      FPX_SHELL_SERVICE: {
        provide: FpxShellService,
        useExisting: ShellService
      }
    }),
    MaterialModule,
    DepCoreModule,
    TemplatesModule,
    HttpStatusModule,
    NgIdleKeepaliveModule.forRoot(),
    OktaIntegrationModule,
    ...AppModuleImportExtension
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [DeviceDetectorService, RefreshHandlerService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInceptor, multi: true },
    { provide: FPX_ENVIRONMENT, useValue: environment },
    { provide: HAMMER_GESTURE_CONFIG, useClass: DepHammerConfig },
    Device,
    Dialogs,
    UniqueDeviceID,
    AppVersion,
    CommonValidatorService,
    Camera,
    CameraPreview,
    FileOpener,
    FileTransfer,
    SocialSharing,
    Contacts,
    Diagnostic,
    BarcodeScanner,
    HTTP,
    SpinnerDialog,
    FormGroupDirective,
    CommonService,
    OktaAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare global {
  const FaceTecSDK: typeof FaceTecSDKType;
}