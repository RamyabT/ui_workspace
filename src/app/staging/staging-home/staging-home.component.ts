import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { extend } from 'hammerjs';
import { AccessDeniedFormComponent } from '../access-denied-form/access-denied-form.component';
import { AppConfigService, UserAuthService } from '@dep/services';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { APPCONSTANTS } from '@dep/constants';
import { DeviceDetectorService } from '@dep/core';
import { NativeStorageManager } from '@dep/native';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { MessageInterceptsComponent } from 'src/app/layout/components/message-intercepts/message-intercepts.component';

@Component({
  selector: 'app-staging-home',
  templateUrl: './staging-home.component.html',
  styleUrls: ['./staging-home.component.scss']
})
export class StagingHomeComponent extends BaseFpxFunctionality implements OnInit {

  protected statusCode: string = "";
  constructor(
    private _loginService: TestLoginService,
    private _userService: UserAuthService,
    private _device: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager,
    private _bannerAdsService: BannerAdsService,
    private _appConfig:AppConfigService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log("ON STAGING ")
  }

  public setPageDependency(payload: any): void {
    let requestPayload = payload?.requestPayload || payload?.processResponse?.requestPayload;
    console.log(requestPayload)
    
    this.statusCode = requestPayload?.statusCode;
    this._userService.accessDenied = false;

    if (this.statusCode) {
      this._userService.accessDenied = true;

      if (this.statusCode == "UserVersionCheck") {
        this._angularRouter.navigate([
          "prelogin-space",
          "entry-shell",
          "staging",
          "terms-and-conditions"
        ]);
      } else {
        let closeHandler: any;
        let skip: boolean = false;
        let update: boolean = false;
        switch (this.statusCode) {
          case "SuspendedCIF":
            closeHandler = this.suspendedCloseHandler;
            break;
          case "DormantAccount":
            closeHandler = this.dormantAccCloseHandler;
            break;
          case "InactiveAccount":
            closeHandler = this.inactiveAccCloseHandler;
            break;
          case "NationalIdGettingExpired":
            closeHandler = this.nationalIdGettingExpiredCloseHandler;
            skip = true;
            update = true;
            break;
          case "NationalIdExpired":
            closeHandler = this.nationalIdExpiredCloseHandler;
            update = true;
            break;
          case "PassportGettingExpired":
            closeHandler = this.passportGettingExpiredCloseHandler;
            skip = true;
            update = true;
            break;
          case "PassportExpired":
            closeHandler = this.passportExpiredCloseHandler;
            update = true;
            break;
        }

        let modal = new FpxModal();
        modal.setComponent(AccessDeniedFormComponent);
        modal.setPanelClass('warning-popup');
        modal.setDisableClose(true);
        modal.setData({
          statusCode: this.statusCode,
          skip: skip,
          update: update
        });
        modal.setAfterClosed(closeHandler.bind(this));
        this.openModal(modal);
      }

    } else {
      let status = payload?.requestStatus || requestPayload?.taskName || payload.taskName;
      console.log(status)
      if (status == "SuccessEnd") {
        // this._angularRouter.navigate(['home']);
        this.allowLogin();
      }
    }
  }

  private suspendedCloseHandler(response: any) {
    if (response.action == "CLOSE") {
      this._loginService.logout();
    }
  }

  private dormantAccCloseHandler(response: any) {
    if (response.action == "CLOSE") {
      this._loginService.logout();
    }
  }

  private inactiveAccCloseHandler(response: any) {
    if (response.action == "CLOSE") {
      this._loginService.logout();
    }
  }

  private nationalIdGettingExpiredCloseHandler(response: any) {
    if (response.action == "UPDATE") {
      this._angularRouter.navigate([
        "prelogin-space",
        "entry-shell",
        "staging",
        "update-document-form"
      ], {
        queryParams: {
          forceUpdate: "1",
          id: "0"
        }
      });
    } else if (response.action == "SKIP") {
      this._userService.accessDenied = false;
      this.allowLogin();
    }
  }

  private nationalIdExpiredCloseHandler(response: any) {
    if (response.action == "UPDATE") {
      this._angularRouter.navigate([
        "prelogin-space",
        "entry-shell",
        "staging",
        "update-document-form"
      ], {
        queryParams: {
          forceUpdate: "1",
          id: "0"
        }
      });
    }
  }

  private passportGettingExpiredCloseHandler(response: any) {
    if (response.action == "UPDATE") {
      this._angularRouter.navigate([
        "prelogin-space",
        "entry-shell",
        "staging",
        "update-document-form"
      ], {
        queryParams: {
          forceUpdate: "1",
          id: "1"
        }
      });
    } else if (response.action == "SKIP") {
      this._userService.accessDenied = false;
      this.allowLogin();
    }
  }

  private passportExpiredCloseHandler(response: any) {
    if (response.action == "UPDATE") {
      this._angularRouter.navigate([
        "prelogin-space",
        "entry-shell",
        "staging",
        "update-document-form"
      ], {
        queryParams: {
          forceUpdate: "1",
          id: "1"
        }
      });
    }
  }

  allowLogin() {
    console.log("staging")
    if (this._device.isHybrid() && this._device.getDeviceInfo().os.toLowerCase() == "ios" && APPCONSTANTS.enableApplePay) {
      this._nativeStorageMgr.loadData("appPayIntroFlag").then(
        (res: any) => {
          if (res) {
            this._angularRouter.navigate(['home']);
          } else {
            this._angularRouter.navigate(["staging/app-pay-intro"]);
          }
        }
      ).catch(
        (err: any) => {
          this._angularRouter.navigate(["staging/app-pay-intro"]);
        }
      );
    } else {
      this.checkMessageIntercepts();
    }
  }


  checkMessageIntercepts() {
    let interceptsServiceCode = this._device.isMobile() ? "RETAILMOBINTERCEPTS" : "RETAILDESKINTERCEPTS";
    this._bannerAdsService.fetchIntercepts({ serviceCode: interceptsServiceCode }).subscribe({
      next: (res: any) => {
        if (res) {
          setTimeout(() => {
            this.openInterceptMessage(res)
          }, 500);
        }
      }
    });
  }

  openInterceptMessage(interceptData: any) {
    let modal = new FpxModal();
    modal.setComponent(MessageInterceptsComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'intercepts-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Selected Account',
      data: interceptData
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let requestURLInfo = this._appConfig.getData('requestURLInfo') || null;
    if (requestURLInfo) {
      if (['receiveMoneyRequest', 'fulFillRequest', 'reclaimMoneyRequest'].includes(requestURLInfo?.requestType)) {
        this._angularRouter.navigate(['etransfers-space']);
      } else {
        this._angularRouter.navigate(['home']);
      }
    }
    else {
      this._angularRouter.navigate(['home']);
    }
  }

}
