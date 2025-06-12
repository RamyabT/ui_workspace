import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { APPCONSTANTS } from '@dep/constants';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService, AppUpgradeService, CustomCurrAmountService, DepHttpConfig, HealthCheckService, LanguageService } from '@dep/services';
import { SkinManager } from '@dep/ui';
import { BaseFpxFunctionality, FpxModal, HttpRequest } from '@fpx/core';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AESService } from '@dep/services';
import { DepAppVersionUpdateComponent } from '../dep/core/component/dep-app-version-update/dep-app-version-update.component';

@Component({
  selector: 'app-app-launcher',
  templateUrl: './app-launcher.component.html',
  styleUrls: ['./app-launcher.component.scss']
})
export class AppLauncherComponent extends BaseFpxFunctionality {

  appTenantId: string = "";
  appEntity: string = "";
  CONFIG_PATH: string = "./assets/config/";

  constructor(
    private _appConfig: AppConfigService,
    private _skinManager: SkinManager,
    @Inject(DOCUMENT) private document: Document,
    private _httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private _languageService: LanguageService,
    private _depHttpConfig: DepHttpConfig,
    private _device: DeviceDetectorService,
    private _spinnerDialog: SpinnerDialog,
    private _aesService: AESService,
    private _appVersionUpdateService: AppUpgradeService,
    private _customCurrencyList: CustomCurrAmountService,
    private _healthCheckService: HealthCheckService
  ) {
    super();

    activatedRoute.queryParams.subscribe(params => {
      let tenantId = params["tenantId"] || localStorage.getItem('tenantId') || environment.defaultTenant;
      let entity = params["entity"] || '';
      
      if (!tenantId) {
        console.error("Please provide TenantId.");
      } else {
        this.appTenantId = tenantId;
        this.appEntity = entity;

        this.loadAppConfig();
      }
    });
  }

  // ngOnInit(): void {

  // }

  // ngAfterViewInit() {
  //   let noCatch = Math.floor(Math.random() * 999999);
  //   let appConstantsPath = "./assets/tenant-config/" + this._appConfig.getTenantId().toLowerCase() + "/ui-attributes/app-constants.json?nocache=" + noCatch;
  //   this._appConfig.loadConfig(appConstantsPath).subscribe({
  //     next: (res: any) => {
  //       if (res.landingPath) APPCONSTANTS.landingPath = res.landingPath;
  //       if (res.redirectOnAuthFailure) APPCONSTANTS.redirectOnAuthFailure = res.redirectOnAuthFailure;

  //       const depWebTitle = this.document.getElementById('depWebTitle') as HTMLTitleElement;
  //       depWebTitle.innerHTML = res.title;
  //       this._appConfig.setData('requestURLInfo', this.getAllRoutingParam());
  //       localStorage.setItem('requestURLInfo', JSON.stringify(this.getAllRoutingParam()));
  //       let queryParams: any = this.getAllRoutingParam();
  //       if(queryParams.requestId && queryParams.requestType){
  //         if(this._device.isMobile()){
  //           this._angularRouter.navigate(['/elaunch'], { queryParams: queryParams });
  //         }
  //         else {
  //           this._angularRouter.navigate(this.getAcutalPath(queryParams.requestType), { queryParams: queryParams });
  //         }
  //       }
  //       else {
  //         this._angularRouter.navigate([APPCONSTANTS.landingPath]);
  //       }
  //     },
  //     error: (err: any) => {
  //       this._angularRouter.navigate([APPCONSTANTS.landingPath]);
  //     }
  //   }
  //   );

  // }

  // getAcutalPath(requestType: string): string[] {
  //   switch(requestType){
  //     case 'receiveMoneyRequest':
  //       return ['etransfers-space','entry-shell','etransfers','retail-etransfer-receive-money-form'];
  //     case 'reclaimMoneyRequest':
  //       return ['etransfers-space','entry-shell','etransfers','retail-etransfer-reclaim-money-form'];
  //     case 'fulFillRequest':
  //       return ['etransfers-space','entry-shell','etransfers','retail-etransfer-fulfill-request-money'];
  //     default:
  //       return [APPCONSTANTS.landingPath];
  //   }
  // }
  loadAppConfig() {
    let noCatch = Math.floor(Math.random() * 999999);
    let uiAttributesPath: string = "";

    uiAttributesPath = `./assets/tenant-config/${this.appTenantId.toLowerCase()}/`;
    if (this.appEntity) {
      uiAttributesPath = `./assets/tenant-config/${this.appTenantId.toLowerCase()}/entity/${this.appEntity.toLowerCase()}/`;
    }

    const $config = this._httpClient.get<any>(this.CONFIG_PATH + "config.json?noCatch=" + noCatch).pipe(catchError((error: any) => { return of(null) }));
    const $service = this._httpClient.get<any>(uiAttributesPath + "service.json?noCatch=" + noCatch).pipe(catchError((error: any) => { return of(null) }));
    const $process = this._httpClient.get<any>(uiAttributesPath + "process.json?noCatch=" + noCatch).pipe(catchError((error: any) => { return of(null) }));
    const contextPath = uiAttributesPath + "context-menu-list.json";

    forkJoin([$config, $service, $process]).subscribe({
      next: ([config, service, process]) => {
        Object.keys(config).forEach((key: any) => {
          environment[key as keyof typeof environment] = config[key];
        });

        this.loadSkin();

        let lang = localStorage.getItem('lang') || "En";
        this._languageService.switchLanguage(lang);

        this._appConfig.setServiceJson(service);
        this._appConfig.setProcessJson(process);
        this._appConfig.setContextMenuJson(contextPath);

        this.loadDefaultAppConstants();

      }, error: (err: any) => {
        console.error("Please check the App Config.");
      },
    });
  }

  loadSkin() {
    if (this.appTenantId && this.appEntity) {
      localStorage.setItem('tenantId', this.appTenantId);
      this._appConfig.setTenantId(this.appTenantId);
      sessionStorage.setItem("entity", this.appEntity);
      this._appConfig.setEntityBrand(this.appEntity);
    } else if (this.appTenantId) {
      this._appConfig.resetEntityBrand();
      localStorage.setItem('tenantId', this.appTenantId);
      this._appConfig.setTenantId(this.appTenantId);
    }
  }

  loadDefaultAppConstants() {
    let noCatch = Math.floor(Math.random() * 999999);

    let appConstantsPath = this._skinManager.getAssetFolderPath() + "ui-attributes/app-constants.json?nocache=" + noCatch;
    this._appConfig.loadConfig(appConstantsPath).subscribe({
      next: (res: any) => {
        if (res.landingPath) APPCONSTANTS.landingPath = res.landingPath;
        if (res.redirectOnAuthFailure) APPCONSTANTS.redirectOnAuthFailure = res.redirectOnAuthFailure;

        const depWebTitle = this.document.getElementById('depWebTitle') as HTMLTitleElement;
        depWebTitle.innerHTML = res.title;
        this._appConfig.setData('requestURLInfo', this.getAllRoutingParam());
        this.onAppReady();
      },
      error: (err: any) => {
        this.onAppReady();
      }
    });
  }

  onAppReady() {
    this._depHttpConfig.setHttpDepedency();
    this._appConfig.setDepedentComponent();
    this.doHealthCheck();
  }

  doHealthCheck() {
    this._appConfig.visibleSpinner(true);

    this._healthCheckService.checkApplicationStatus().subscribe({
      next: (res: any) => {
        console.log("health check application status: ", res);
        this._appConfig.visibleSpinner(false);

        if (res?.httpStatus == 200) {
          console.log("CheckApplicationStatus: Service up");

          if (environment.requestMask) {
            this.doSecureSession();
          } else {
            this.doLoadAppConstant();
          }
        }
        else {
          console.log("CheckApplicationStatus: Service down");
          this._angularRouter.navigate([
            "display-shell",
            "http-status",
            "service-unavailable",
          ]);
        }
      },
      error: (error: any) => {
        console.log("error from check application status: ", error);
        this._appConfig.visibleSpinner(false);
        this._angularRouter.navigate([
          "display-shell",
          "http-status",
          "service-unavailable",
        ]);
      }
    });
  }

  doSecureSession() {
    if (this._device.isHybrid()) {
      this._spinnerDialog.show("", "", true);
    }

    this._aesService.getSecureSession().subscribe({
      next: (sessionRes: any) => {
        sessionStorage.setItem('secureKey', sessionRes?.body?.secureKey);
        sessionStorage.setItem('sessionId', sessionRes?.body?.sessionId);

        this._depHttpConfig.enablePayloadMask();
        this._aesService.generateSecurityToken();

        this._aesService.keyExchange().subscribe({
          next: (keyExchangeRes: any) => {
            if (this._device.isHybrid()) {
              this._spinnerDialog.hide();
            }
            this.doLoadAppConstant();
          },
          error: (error: any) => {
            this.gotoServiceUnavailable();
          }
        });
      },
      error: (err: any) => {
        this.gotoServiceUnavailable();
      }
    });

  }

  doLoadAppConstant() {
    this._appConfig.getAppConstant().subscribe({
      next: res => {
        if (res) {
          this._appConfig.visibleSpinner(false);

          Object.keys(res).forEach((key) => {
            if (key in APPCONSTANTS) {
              (APPCONSTANTS as any)[key] = res[key];
            }
          });
          this._appConfig.baseCurrency = APPCONSTANTS.baseCurrency;
          this._appConfig.baseCurrencyDesc = APPCONSTANTS.baseCurrencyDesc;
          this._appConfig.baseCountry = APPCONSTANTS.baseCountryCode;
          this.doAppUpgradeCheck();
        }
      },
      error: error => {
        console.log("error from getting app constant: ", error);
        this._appConfig.visibleSpinner(false);

        this.doAppUpgradeCheck();
      }
    });
  }

  doAppUpgradeCheck() {
    if (this._device.isHybrid()) {
      this._appConfig.visibleSpinner(true);

      let deviceInfo = this._device.getDeviceInfo();
      this._appVersionUpdateService.updateVersionDetails({ appVersion: deviceInfo.appVersion, os: deviceInfo.os }).subscribe({
        next: (res: any) => {
          this._appConfig.visibleSpinner(false);

          if (res?.updateAvailable == "1") {
            const fpxModal = new FpxModal();
            fpxModal.setComponent(DepAppVersionUpdateComponent);
            fpxModal.setDisableClose(true);
            fpxModal.setPanelClass("popup-s");
            fpxModal.setBackDropClass(["dep-popup-back-drop", "app-version-update-check"]);
            fpxModal.setData({
              title: 'VERSION_UPDATE.title',
              description: 'VERSION_UPDATE.description',
              mandatory: res.mandatory,
              updateAvailable: res.updateAvailable
            });
            fpxModal.setAfterClosed(this.doLoadCurrencyList);
            this.openModal(fpxModal);
          } else {
            this.doLoadCurrencyList();
          }
        }, error: (error: any) => {
          this._appConfig.visibleSpinner(false);
          this.doLoadCurrencyList();
        }
      });
    } else {
      this.doLoadCurrencyList();
    }
  }

  doLoadCurrencyList(){
    this._appConfig.visibleSpinner(true);

    this._customCurrencyList.fetchCurrency().subscribe({
      next: (res: any) => {
        this._appConfig.visibleSpinner(false);
        this._appConfig.setCurrencyList(res);

        this.doInitializeApplication();

      }, error: (error: any) => {
        this.doInitializeApplication();
      }
    });
  }

  doInitializeApplication() {
    // Check if we have a return URL from a refresh
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl) {
      sessionStorage.removeItem('returnUrl');
      this._angularRouter.navigateByUrl(returnUrl);
    } else {
      this._angularRouter.navigate([APPCONSTANTS.landingPath]);
    }
  }

  gotoServiceUnavailable() {
    this._appConfig.visibleSpinner(false);
    this._angularRouter.navigate(["display-shell", "http-status", "service-unavailable"]);
  }

}
