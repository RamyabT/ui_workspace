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
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";

export class OtherRequestContextualMenuState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    otherRequestList: any;
}

@Injectable()
export class OtherRequestContextualMenuHelper extends BaseFpxFormHelper<OtherRequestContextualMenuState>{
    addressInfo!: FormGroup;
    accountNumber: any;
    fromDate: any;
    toDate: any;
    showTransferHistory: boolean = false;
    doShowMoreQuickActions: boolean = false;
    isPopup: boolean = false;
    activeMenu: string = "";
    cardData: any;

    constructor(
        private _router: Router,
        private _appConfig: AppConfigService,
        private cd: ChangeDetectorRef,
        public device: DeviceDetectorService
    ) {
        super(new OtherRequestContextualMenuState());
    }

    override doPreInit(): void {

    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        this.state.otherRequestList = [
        //   {
        //       serviceCode: "RETAILADHOCACCSTMT"
        //   },
          {
              serviceCode: "RETAILIBANLETTER"
          },
          {
              serviceCode: "RETAILTAXSTMT"
          },
          {
              serviceCode: "RETAILLIABILITY"
          },
          {
              serviceCode: "RETAILNOLIABILITY"
          },
          {
              serviceCode: "RETAILSRVREQBALCONFIRM"
          },
          {
             serviceCode: "RETAILBUSINESSDDREQINFO"
          },
          {
            serviceCode: "RETAILINDIVIDUALDDREQINFO"
         },
         {
            serviceCode: "RETAILNOTIFYGOINGOVERSEAS"
         }
      ];
      this.cd.detectChanges();
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();
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