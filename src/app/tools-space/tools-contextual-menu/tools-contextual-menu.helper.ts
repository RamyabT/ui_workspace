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

export class ToolsContextualMenuState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
}

@Injectable()
export class ToolsContextualMenuHelper extends BaseFpxFormHelper<ToolsContextualMenuState>{
    addressInfo!: FormGroup;
    accountNumber: any;
    fromDate: any;
    toDate: any;
    showTransferHistory: boolean = false;
    doShowMoreQuickActions: boolean = false;
    isPopup: boolean = false;
    activeMenu: string = "";
    cardData: any;
    toolsList = [
      {
          serviceCode: "RETAILDEPOSITCALCULATOR"
      },
      {
          serviceCode: "RETAILLOANCALCULATOR"
      }  
  ];

    constructor(
        private _router: Router,
        private _appConfig: AppConfigService,
        private cd: ChangeDetectorRef,
        public device: DeviceDetectorService,
        public _settingsService: SettingsService,
        private _nativeStorageMgr: NativeStorageManager,
        private _userService: UserAuthService
    ) {
        super(new ToolsContextualMenuState());
    }

    override doPreInit(): void {

    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();


   

    }

    openLink(item:any) {
      let service = this._appConfig.getServiceDetails(item?.serviceCode);
      this._router.navigate(service.servicePath);
  }
  

    closeContextMenu() {
        // this._dialogRef.close();
      }

    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}