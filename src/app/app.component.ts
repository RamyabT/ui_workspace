import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed, SpinnerService } from '@fpx/core';
import { UserAuthService } from './dep/services/user-auth/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { AppConfigService, AppUpgradeService, CustomErrorMessageService, DepHttpConfig, LanguageService } from '@dep/services';
import { fromEvent } from 'rxjs';
import { CheckNetworkStatusService } from './dep/native/check-network-status.service';
import { NoNetworkComponent } from './http-status/no-network/no-network.component';
import { BreakpointService, DeviceDetectorService } from '@dep/core';
import { DepAppVersionUpdateComponent } from './dep/core/component/dep-app-version-update/dep-app-version-update.component';
import { APPCONSTANTS } from '@dep/constants';
import { OktaAuthService } from './okta-integration/okta/okta-auth.service';
import { DepConfirmationComponent } from './dep/core/component/dep-confirmation/dep-confirmation.component';
import { TestLoginService } from './login/test-services/test-login.service';
import moment from 'moment-timezone';
declare let window: any;
const SIGN_IN_STEPS: any = {
  INIT: "show_login",
  FETCH_PROFILE: "fetch_profile",
  DONE: "done"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseFpxFunctionality implements OnInit {
  title = 'DEPRETAILK1-UI';
  networkModal = new FpxModal();
  protected screenBusySpinnerImage: string = "";
  hideLoader: boolean | undefined =  false
  splashShown = false;
  doShowBestPreferViewMsg: boolean = false;

  constructor(
    public loadingSpinner: SpinnerService,
    private _languageService: LanguageService,
    private _appConfig: AppConfigService,
    private checkNetworkStatusService: CheckNetworkStatusService,
    private ngZone: NgZone,
    protected _device: DeviceDetectorService,
    private _appVersionUpdateService: AppUpgradeService,
    protected _userService: UserAuthService,
    private _oktaAuthService: OktaAuthService,
    private _router:Router,
    private _test:TestLoginService,
    private _breakpointService:BreakpointService
    
  ) {
    super();
  }

  @HostListener('window:beforeunload',['$event'])
  handleBeforeUnload(event:BeforeUnloadEvent){
    console.log(event)
    if(this._router.url.includes('/entry-shell')){
      event.preventDefault();
      event.returnValue = '';
    }
   
  }



 


  ngOnInit(): void { 
    sessionStorage.setItem('isOktaLogin', 'true');
    sessionStorage.setItem('portfolioShowAds', "true");
    this.reload();
  }
  ngAfterViewInit() {
    var that = this;

    // this._breakpointService.registerChannelChange(this);
    this._breakpointService.registerOrientationChange(this);

    this.checkNetworkStatusService.checkNetworkStatus().subscribe({
      next: (res: any) => {
        that.ngZone.run(() => {
          if (res) {
            this._matDialog.closeAll();
          }
          else {
            this.noNetworkAlert();
          }
        });
      }
    });

    if(this._device.isHybrid() && APPCONSTANTS.checkAppVersionUpdates){
      this._appConfig.appVersionUpdate$.asObservable().subscribe({
        next: (res:any) => {
          this.checkAppVerisonUpdate();
        }
      });
    }

    this._appConfig.appSpinner$.asObservable().subscribe({
      next: (res:boolean = false) => {
        if(res){
          this.showSpinner();
        } else {
          this.hideSpinner();
        }
      }
    })

  }

  checkAppVerisonUpdate(){
    let deviceInfo = this._device.getDeviceInfo();
    this._appVersionUpdateService.updateVersionDetails({appVersion:deviceInfo.appVersion,os:deviceInfo.os}).subscribe(res => {
      if (res?.updateAvailable == "1") {
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAppVersionUpdateComponent);
        fpxModal.setDisableClose(true);
        fpxModal.setPanelClass("popup-s");
        fpxModal.setBackDropClass(["dep-popup-back-drop", "app-version-update-check"]);
        fpxModal.setData({
          title: 'VERSION_UPDATE.title',
          description: 'VERSION_UPDATE.description',
          mandatory : res.mandatory,
          updateAvailable : res.updateAvailable
        });
        this.openModal(fpxModal);
      }
    });
  }

  noNetworkAlert() {
    this.networkModal.setComponent(NoNetworkComponent);
    this.networkModal.setPanelClass('dep-alert-popup');
    this.networkModal.setBackDropClass('dep-popup-back-drop');
    this.networkModal.setDisableClose(true);
    this.networkModal.setAfterClosed(this.flashCardModelAfterClose);
    this.openModal(this.networkModal);
  }
  flashCardModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
  }

  async reload() {
    // if(sessionStorage.getItem('signInStep') == SIGN_IN_STEPS.DONE) {
    //   await this._oktaAuthService.signOut();
    // }
    this._appConfig.clearData();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    // let lang = localStorage.getItem('lang') || "En";
    // this._languageService.switchLanguage(lang);
  }

  notifyOrientationChange(isPortrait:boolean){
    if(this._device.isMobile() && isPortrait != undefined && !isPortrait){
      this.doShowBestPreferViewMsg = true;
    } else {
      this.doShowBestPreferViewMsg = false;
    }
  }
  
  // @HostListener('contextmenu', ['$event']) onRightClick(event: any) {
  //   if (APPCONSTANTS.appBlockCutCopyPaste && !event.target.closest('[allowCutCopyPaste]')) event.preventDefault();
  // }

  // @HostListener('paste', ['$event']) blockPaste(event: any) {
  //   if (APPCONSTANTS.appBlockCutCopyPaste && !event.target.closest('[allowCutCopyPaste]')) event.preventDefault();
  // }

  // @HostListener('copy', ['$event']) blockCopy(event: any) {
  //   if (APPCONSTANTS.appBlockCutCopyPaste && !event.target.closest('[allowCutCopyPaste]')) event.preventDefault();
  // }

  // @HostListener('cut', ['$event']) blockCut(event: any) {
  //   if (APPCONSTANTS.appBlockCutCopyPaste && !event.target.closest('[allowCutCopyPaste]')) event.preventDefault();
  // }

  // @HostListener('window:popstate', ['$event']) onPopState(event: any) {
  //   console.log('Back button pressed');
  //   event.preventDefault();
  //   window.history.pushState(null, document.title, window.location.pathname);
  // }
  @HostListener('document:keydown', ['$event']) blocktabClick(e: KeyboardEvent) {
    const reviewMode = document.querySelector('.review-form');
    const tabRestict = document.querySelector('.tab-restict');
    if (e?.key === 'Tab' && (reviewMode || tabRestict)) {
      e.preventDefault();
    }
  }
  ngOnDestroy(){
    if(this._device.isHybrid()) {
      if (window.cordova && window.cordova.InAppBrowser) {
        window.cordova.InAppBrowser.closeAll();
      }
    }
    this._matDialog.closeAll();
  }

}
