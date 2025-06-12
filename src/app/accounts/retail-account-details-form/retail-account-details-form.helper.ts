import { inject, Injectable, Input } from "@angular/core";
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
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { TranslateService } from "@ngx-translate/core";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { AppConfigService, UserAuthService } from "@dep/services";
import { CurrencyPipe } from "@angular/common";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { MatDialogRef } from "@angular/material/dialog";
import { AccountSharingInformationComponent } from "../account-sharing-information/account-sharing-information.component";
import { APPCONSTANTS } from "@dep/constants";


export class RetailAccountDetailsFormState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    details: any;
    hasLocData: boolean = false;
    hasDcData:boolean=false;
    adressInfo: any
    fields: string[] = [
        // "customerCode",
        // "branchDesc",
        // "accountTypeDesc",
        // "productDesc",
        // "accountNumber",
        // "iban",
        "relationshipNumber",
        "institutionNumber",
        "transitNumber",
        "BICCode",
        // "accountCurrency",
        // "countryName",
        // "accountName",
        // "accountNickname",
        // "addressInfo",
        // "openingBalance",
        // "actualBalance",
        "currentInterestRate"
        // "atmLimit",
        // "posLimit",
        // "openDate",
        // "accountStatus"
    ];
    fieldsFormat: string[] =
        [
            // "text",
            // "text",
            // "text",
            // "text",
            // "text",
            // "text",
            "text",
            "text",
            "text",
            "text",
            // "text",
            // "text",
            // "text",
            // "text",
            // "text",
            // "amount",
            // "amount",
            "percentage"
            // "amount",
            // "amount",
            // "date",
            // "text"
        ];

      dclimitFields:string[]=[
        "atmLimit",
        "posLimit",
      ];
      dclimitFieldsFormat:string[]=[
        "amount",
         "amount"
      ];

    locFields: string[] = [
        "lineOfCreditAmount",
        "availableFunds",
        "lineOfCreditInterestRate",
        "paymentDueDate"
    ];
    locRequiredFields: string[] = [
        "lineOfCreditAmount",
        "lineOfCreditInterestRate",
        "paymentDueDate"
    ];
    locFileldsFormart: string[] = [
        "amount",
        "amount",
        "percentage",
        "date"
    ];
}

@Injectable()
export class RetailAccountsDetailsFormHelper extends BaseFpxFormHelper<RetailAccountDetailsFormState> {
    result: any;
    accountNumber: string = "";
    isAccountDetailsApiFailed: boolean = false;
    //selectedData: any;
    //protected _appConfig: AppConfigService = inject(AppConfigService);
      //@Input('selectedData') selectedData: any;
      protected appConstant: any = APPCONSTANTS;
    errorTitle: any;
    errorMessage: any;

    constructor(
        private _httpProvider: HttpProviderService,
        private _router: Router,
        private _accountsService: AccountsService,
        private _casaAccountsService: CasaaccountService,
        private _activeSpaceInfoService: ActiveSpaceInfoService,
        private route: ActivatedRoute,
        public _device: DeviceDetectorService,
        private _dialogRef: MatDialogRef<any>,
        private _translate: TranslateService,
        private _appConfig: AppConfigService,
        public device: DeviceDetectorService,
        public currency: CurrencyPipe,
         
        private _userAuth: UserAuthService,
    ) {
        super(new RetailAccountDetailsFormState());
        route.queryParams.subscribe((params: any) => {
            if (params && params.rid) this.handleFormOnLoad();
        });
    }

    override doPreInit() {
        this.setServiceCode('RETAILCASADETAILS');
        this.removeShellBtn("BACK");
        this.hideShellActions();
    }
    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        this.getAccountDetails();
        if (this._appConfig.hasData('refreshAccountDetails$')) {
            this._appConfig.getData('refreshAccountDetails$').unsubscribe();
            this._appConfig.getData('refreshAccountDetails$').observable.subscribe(
              (res: any) => {
                this.getAccountDetails();
              }
            );
        }
    }

    getAccountDetails() {
        this.state.hasLocData = false;
        this.state.hasDcData = false;
        this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
        let keys: any = {
            accountNumber: this.accountNumber || this._appConfig.getData('CASAACCOUNTSLIST')[0].accountNumber
        }
        this._casaAccountsService.findByKey(keys)().subscribe({
            next: (res) => {
                let d = res as Casaaccount;
                this.state.details = d;
                this.state.details.accountNumber=this.state.details.accountNumber?.slice(2);
                if(this.state.details.currentInterestRate){
                    let formatInterest=this.currency.transform(this.state.details.currentInterestRate, ' ', false)
                    this.state.details.currentInterestRate=formatInterest;
                }
                if(this.state.details.lineOfCreditInterestRate){
                    let formatInterest=this.currency.transform(this.state.details.lineOfCreditInterestRate, ' ', false)
                    this.state.details.lineOfCreditInterestRate=formatInterest;
                }
                // LOC account check
                let count = 0;
                if (this.state.details) {
                    this.state.locFields.forEach((element: any) => {
                        if (this.state.details[element] && count == 0) {
                            count += count;
                        }
                    })
                    this.state.locRequiredFields.forEach((element: any) => {
                        if(this.state.details.hasOwnProperty(element) && this.state.details[element]) {
                            this.state.hasLocData = true;
                        }
                    })
                }
                // this.state.details.atmLimit='500';
                // this.state.details.posLimit='500';
                let count1=0;
                if (this.state.details) {
                    this.state.dclimitFields.forEach((element: any) => {
                        if (this.state.details[element] && count1 == 0) {
                            this.state.hasDcData = true;
                            count1 += count1;
                        }
                    })
                }
                this.isAccountDetailsApiFailed = false;  
            },
            error: (error) => {
                this.state.details = [];
                this.isAccountDetailsApiFailed = true;  
                if (error.status == 500) {
                    this.errorTitle = this._translate.instant('RetailAccountDetailsForm.dataErrorTitle');
                    this.errorMessage = this._translate.instant('RetailAccountDetailsForm.DataError')
                }
                else if (error.status == 404) {
                    this.errorTitle = this._translate.instant('RetailAccountDetailsForm.serviceUnavailableTitle');
                    this.errorMessage = this._translate.instant('RetailAccountDetailsForm.serverError');
                }
                else if (error.status == 504) {
                    this.errorTitle = this._translate.instant('RetailAccountDetailsForm.timeOutTitle');
                    this.errorMessage = this._translate.instant('RetailAccountDetailsForm.TimeOutError');
                }
            }
        })
    }
    onDownloadAccountsDetailsClick() {
        // WRITE CODE HERE TO HANDLE 
        // let customerCode =this.getRoutingParam('customerCode');
        this._accountsService.downloadAccountDetails(this.accountNumber).subscribe({
            next: (response: any) => {
                let documentURL = URL.createObjectURL(
                    new Blob([response.body], { type: "application/pdf" })
                );
                const downloadLink = document.createElement("a");
                downloadLink.href = documentURL;
                const fileName = "accountDetails.pdf";
                downloadLink.download = fileName;
            }
        });

    }

    public override doPostInit(): void {
        if (!this.accountNumber) this.handleFormOnLoad();
    }

    onPopup() {
        if (this._device.isMobile()) {
          let modal = new FpxModal();
          modal.setComponent(DepTooltipComponent);
          modal.setPanelClass("dep-tooltip-popup");
          modal.setDisableClose(false);
          modal.setAfterClosed(this.contextmenuModelAfterClose);
          modal.setData({
            title: "RetailAccountDetailsForm.debitCardLimitToolTip.title",
            message: "RetailAccountDetailsForm.debitCardLimitToolTip.message",
    
          });
          this.openModal(modal);
        }
        else{
            let modal = new FpxModal();
            modal.setComponent(DepAlertComponent);
            modal.setPanelClass("dep-alert-popup");
            modal.setBackDropClass(["etransfer-send-limits"]);
            modal.setDisableClose(false);
            modal.setAfterClosed(this.contextmenuModelAfterClose);
            modal.setData({
              title: "RetailAccountDetailsForm.debitCardLimitToolTip.title",
              message: "RetailAccountDetailsForm.debitCardLimitToolTip.message",
              okBtnLbl: "Close"
            });
            this.openModal(modal);
          }
      }
      contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
        this._dialogRef.close(0);
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
                this._router.navigate(['accounts-space/accounts']);
            }
        });
    }

    shareInfo($event: MouseEvent) {
        if (this.device.isMobile()) {
            this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
            let keys: any = {
              accountNumber: this.accountNumber || this._appConfig.getData('CASAACCOUNTSLIST')[0].accountNumber
            }
            this._casaAccountsService.findByKey(keys)().subscribe({
              next: (res) => {
                let d = res as Casaaccount;
                this.state.details = d;
                this.state.details.accountNumber=this.state.details.accountNumber?.slice(2);
                let modal = new FpxModal();
                modal.setComponent(AccountSharingInformationComponent);
                modal.setPanelClass('dep-alert-popup');
                modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
                modal.setDisableClose(true);
                modal.setAfterClosed(this.contextmenuModelAfterClose);
                modal.setData({
                  title: 'Share',
                  accountInfo: this.state.details
        
                });
                this.openModal(modal);
              }
            })
        }
        else{
            $event.stopPropagation();
            if(APPCONSTANTS.showOrganizationName) this.state.details.accountName = this._userAuth.organizationName;
    
        // let accountInfo: string = APPCONSTANTS.shareAccountInfoData(this.state.details);
    
        let modal = new FpxModal();
        modal.setComponent(AccountSharingInformationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass(['dep-popup-back-drop', 'accounts-sharing-info-popup-back-drop']);
        modal.setDisableClose(true);
        modal.setData({
          title: 'Success',
          subTitle: 'Copied to clipboard',
          accountInfo:  this.state.details
        });
        modal.setAfterClosed(this.accountInfoShareAfterClose);
        this.openModal(modal)
        }
       
        // console.log(this.selectedData);
        
        // this._casaAccountsService.shareAccountInfo(this.state.details, false);
}
    
      accountInfoShareAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
        console.log(payload)
        console.log(addtionalData)
      }

      getAbsoluteValue(value: any | undefined): any {
        value = value?.toString().replaceAll(',', '');
        return value ? Math.abs(value) : 0;
      }
    
      checkNegativeValue(value: any | undefined): string {
        return value && value < 0 ? '-' : '';
      }
   
}

