import { ChangeDetectorRef, Inject, Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
    BaseFpxComponentState,
    BaseFpxFormHelper,
    HttpProviderService,
    IHttpSuccessPayload,
    RoutingInfo,
    BaseFpxChangeHandler,
    BaseFpxControlEventHandler,
    HttpRequest,
    SpinnerService,
    ILookupResponse,
    FpxModal,
    FpxActionMap,
    CriteriaQuery,
    FpxHttpOptions,
    FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, UserAuthService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { NativeStorageManager } from "@dep/native";
import { SettingsService } from "src/app/foundation/validator-service/settings.service";
import { APPCONSTANTS } from "@dep/constants";

export class SettingsContextualMenuState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
}

@Injectable()
export class SettingsContextualMenuHelper extends BaseFpxFormHelper<SettingsContextualMenuState>{
    addressInfo!: FormGroup;
    accountNumber: any;
    fromDate: any;
    toDate: any;
    showTransferHistory: boolean = false;
    doShowMoreQuickActions: boolean = false;
    isPopup: boolean = false;
    activeMenu: string = "";
    cardData: any;
    settingsMenu: any = []

    constructor(
        private _router: Router,
        private _appConfig: AppConfigService,
        private cd: ChangeDetectorRef,
        public device: DeviceDetectorService,
        public _settingsService: SettingsService,
        private _nativeStorageMgr: NativeStorageManager,
        private _userService: UserAuthService
    ) {
        super(new SettingsContextualMenuState());
    }

    override doPreInit(): void {

    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        // this.settingsMenu = [
        //     {
        //       serviceCode: "RETAILMANAGEALERTS"
        //     },
        //     {
        //       serviceCode: "RETAILSTNGCHANGEPASSWORD"
        //     },
        //     // {
        //     //   serviceCode: "RETAILLOGOUTANDFEEDBACK"
        //     // },
        //     {
        //       serviceCode: "RETAILVIEWMYPROFILE"
        //     },
        //     {
        //       serviceCode: "MANAGEAUTHDEVICE"
        //     },
        //     {
        //       serviceCode: "RETAILVIEWFXRATES"
        //     },
        //     {
        //       serviceCode: "RETAILMANAGELIMITS"
        //     }
        //   ]

        this.settingsMenu = [
          {
            serviceCode: "RETAILVIEWMYPROFILE"
          },
          {
            serviceCode: "RETAILSTNGCHANGEPASSWORD"
          },
          {
            serviceCode: "RETAILMANAGEALERTS"
          },
          // {
          //   serviceCode: "RETAILLOGOUTANDFEEDBACK"
          // },
          {
            serviceCode: "RETAILMANAGELIMITS"
          },
          {
            serviceCode: "MANAGEAUTHDEVICE"
          },
          {
            serviceCode: "RETAILVIEWFXRATES"
          }
        ]
          
          if(this.device.isHybrid()){
            this._nativeStorageMgr.loadData("deviceAuthInfo").then(
              (result:any) => {
                let data = JSON.parse(atob(result));
                if(data.userId == this._userService.userId){
                  this.settingsMenu.push(
                    ...APPCONSTANTS.settingsHybridMenus
                  );
                }
              }
            )
          }
        this.cd.detectChanges();
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();


        
  if (this._appConfig.hasData('settingsActionPublisher$')) {
    this._appConfig.getData('settingsActionPublisher$').observable.subscribe(
      (res: any) => {
        if(res?.action == "QUICKACTION"){
          this.activeMenu = res?.data?.serviceCode;
        }
      }
    );
  }

    }

    openLink(payment: any) {
        let service = this._appConfig.getServiceDetails(payment.serviceCode);
        this.activeMenu = payment.serviceCode;
        this._router.navigate(service.servicePath);
    }

    closeContextMenu() {
        // this._dialogRef.close();
      }

    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}