import { Injectable } from "@angular/core";
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
    FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MembershipService } from '../membership-service/membership.service';
import { Membership } from '../membership-service/membership.model';
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { TranslateService } from "@ngx-translate/core";
import { CurrencyPipe } from "@angular/common";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
export class RetailMembershipAccountDetailsFormState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    details: any;
    hasLocData: boolean = false
    adressInfo: any
    fields: string[] = [
        "relationshipNumber",
        "institutionNumber",
        "transitNumber",
        "BICCode",
        "holdBalance",
        "currentInterestRate"
    ];
    fieldsFormat: string[] =
        [
            "text",
            "text",
            "text",
            "text",
            "amount",
            "percentage"
        ];
}

@Injectable()
export class RetailMembershipAccountDetailsFormHelper extends BaseFpxFormHelper<RetailMembershipAccountDetailsFormState> {
    result: any;
    accountNumber: string = "";

    constructor(
        private retailMembershipAccountDetailsFormService: MembershipService,
        private _httpProvider: HttpProviderService,
        private _router: Router,
        private _activeSpaceInfoService: ActiveSpaceInfoService,
        private _translate: TranslateService,
        private route: ActivatedRoute,
        private _appConfig: AppConfigService,
        protected device: DeviceDetectorService,
        public currency: CurrencyPipe
    ) {
        super(new RetailMembershipAccountDetailsFormState());
        route.queryParams.subscribe((params: any) => {
            if (params && params.rid) this.handleFormOnLoad();
        });
    }

    override doPreInit() {
        this.setServiceCode('RETAILMEMBERSHIP');
        this.removeShellBtn("BACK");
    }
    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
        let keys: any = {
            accountNumber: this.accountNumber
        }
        this.retailMembershipAccountDetailsFormService.findByKey(keys)().subscribe({
            next: (res) => {
                let d = res as Membership;
                this.state.details = d;
            },
            error: (error) => {
                if (error.status = '500') {
                    let errMsg: any;
                    let titleMsg: any;
                    titleMsg = this._translate.instant('DEFAULT.dataErr');
                    errMsg = this._translate.instant('DEFAULT.dataErrMsg')
                    const fpxModal = new FpxModal();
                    fpxModal.setComponent(DepAlertComponent);
                    fpxModal.setDisableClose(false);
                    fpxModal.setPanelClass('dep-alert-popup');
                    fpxModal.setBackDropClass('dep-popup-back-drop');
                    fpxModal.setData({
                        title: titleMsg,
                        message: errMsg
                    });
                    fpxModal.setAfterClosed(this.MenuClose);
                    this.openModal(fpxModal);

                }

            }
        })
    }

    public override doPostInit(): void {
        if (!this.accountNumber) this.handleFormOnLoad();
    }

    MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
        setTimeout(() => {
            if (this.device.isMobile()) {
                this._router.navigate(['/home']);
            }
            else {
                if (this._appConfig.hasData('moduleRefresh$')) {
                    this._appConfig.getData('moduleRefresh$').subject.next({ action: 'ACCOUNTSQUICKACTION', data: { serviceCode: null } });
                }
                this._router.navigate(['accounts-space/membership']);
            }
        });
    }
    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}


