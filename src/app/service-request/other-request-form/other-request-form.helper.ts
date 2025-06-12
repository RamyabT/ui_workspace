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

export class OtherRequestFormState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    otherRequestList: any;
}

@Injectable()
export class OtherRequestFormHelper extends BaseFpxFormHelper<OtherRequestFormState>{
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
        super(new OtherRequestFormState());
    }

    override doPreInit(): void {
        this.removeShellBtn('BACK');
        if(this.getRoutingParam().routeFrom != 'otherModule') {
            this._router.navigate(['service-request-space','servicerequest']);
        }
        if(!this.device.isMobile()){
            this._appConfig.getData('moduleRefresh$').observable.subscribe(
              (res:any) => {
                if(res?.event == 'onFormClose'){
                  this.activeMenu = '';
                  setTimeout(()=>{
                    this.activeMenu = '';
                  });
                }
              }
            );
          }
    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        this.state.otherRequestList = [
            {
                serviceCode: "RETAILSERVICEADHOCREQ"
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
        this.doShowMoreQuickActions = false;
    }

    closeContextMenu() {
        // this._dialogRef.close();
      }

    showMoreQuickActions() {
        this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
    }

    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}