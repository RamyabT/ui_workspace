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
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { TranslateService } from "@ngx-translate/core";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { AppConfigService } from "@dep/services";
import { FileOpenerService } from "@dep/native";
import { WalletsummaryService } from "../wallet-summary-service/walletsummary.service";
import { wallet } from "../wallet-summary-service/walletsummary.model";

export class WalletDetailFormState extends BaseFpxComponentState {
    showSuggestion: boolean = false;
    details: any;
    hasLocData: boolean= false
    adressInfo: any
    fields: string[] = [
        "walletId",
        "walletName",
        "availableBalance",
        "status",
        "openingDate",
        "currency"
       
    ];
    fieldsFormat: string[] =
        [
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
             
    ];

    scanfields: string[] = [
        "scanPayLimitMax",
        "scanpayLimit",
       
    ];

    onlinePurchase: string[] = [
        "onlinePurchaseLimitMax",
        "onlinePurchaseLimit",
       
    ];

    locFields: string[] = [
        "lineOfCreditAmount",
        "availableFunds",
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
export class WalletDetailFormHelper extends BaseFpxFormHelper<WalletDetailFormState> {
    result: any;
    accountNumber: string = "";

    constructor(
        private _httpProvider: HttpProviderService,
        private _router: Router,
        private _accountsService: AccountsService,
        private _casaAccountsService: WalletsummaryService,
        private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _fileOpener: FileOpenerService,
        private route: ActivatedRoute,
        private _translate: TranslateService,
        private _appConfig: AppConfigService,
        public device: DeviceDetectorService,
    ) {
        super(new WalletDetailFormState());
        route.queryParams.subscribe((params: any) => {
            if (params && params.rid) this.handleFormOnLoad();
        });
    }

    override doPreInit() {
        this.setServiceCode('RETAILCASADETAILS');
        this.removeShellBtn("BACK");
        this.addShellButton('RetailDepositDetailsForm.downloadDetail', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
        this.setShellBtnMethod('DOWNLOAD', this.onDownloadAccountsDetailsClick.bind(this));
    }

    public handleFormOnLoad() {
        // WRITE CODE HERE TO HANDLE
        this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
        let keys: any = {
            walletAccountNumber: this.accountNumber
        }
        this._casaAccountsService.findByKey(keys)().subscribe({
            next: (res) => {
                let d = res as wallet;
                this.state.details = d;
                // address
                // if (d?.addressInfo != '' && d?.addressInfo != undefined) {

                //     d.addressInfo = res?.addressInfo[0]?.buildingId + ', ' + res?.addressInfo[0]?.buildingName + ', ' + res?.addressInfo[0]?.city + ', ' +
                //         res?.addressInfo[0]?.stateName + ', ' + res?.addressInfo[0]?.countryName+","+res?.addressInfo[0]?.zipCode
                //     this.state.adressInfo = d.addressInfo;
                // }
                // else {
                //     d.addressInfo = '-';
                // }
                // //routing Code mask
                // if (d?.BICCode != '' && d?.BICCode != undefined) {
                //     var str = d?.BICCode;
                //     // str = str.substring(0, str.length - 3);
                //     // str = str + 'XXX';
                //     d.BICCode = str;
                // }
                // else {
                //     d.BICCode = '-';
                // }
                // this.state.details = d;
                // LOC account check
                // let count = 0;
        // if (this.state.details) {
                // this.state.locFields.forEach((element: any) => {
                //     if (this.state.details[element] && count == 0) {
                //         this.state.hasLocData = true;
                //         count += count;
                //     }
                // })
        //}

                // if (this.state.details.openingBalance == 0 || this.state.details.openingBalance == '' || this.state.details.openingBalance == undefined) {
                //     this.state.details.openingBalance = "0";
                // }
                // if (this.state.details.accountNickname == '') {
                //     this.state.details.accountNickname = '-';
                // }
                // if (this.state.details.accountName == '' || this.state.details.accountName == undefined) {
                //     this.state.details.accountName = '-';
                // }
                // if (this.state.details.branchDesc == '' || this.state.details.branchDesc == undefined) {
                //     this.state.details.branchDesc = '-';
                // }
                // if (this.state.details.openDate == '' || this.state.details.openDate == undefined) {
                //     this.state.details.openDate = '-';
                // }
                // if (this.state.details.accountTypeDesc == '' || this.state.details.accountTypeDesc == undefined) {
                //     this.state.details.accountTypeDesc = '-';
                // }
                // if (this.state.details.productDesc == '' || this.state.details.productDesc == undefined) {
                //     this.state.details.productDesc = '-';
                // }
                // if(this.state.details.holdBalance == 0 || this.state.details.holdBalance== '' || this.state.details.holdBalance==undefined){
                //     this.state.details.holdBalance = '0' ; 
                // }
                // if (this.state.details.relationshipNumber == '' || this.state.details.relationshipNumber == undefined) {
                //     this.state.details.relationshipNumber = '-';
                // }
                // if (this.state.details.transitNumber == '' || this.state.details.transitNumber == undefined) {
                //     this.state.details.transitNumber = '-';
                // }
                // if (this.state.details.institutionNumber == '' || this.state.details.institutionNumber == undefined) {
                //     this.state.details.institutionNumber = '-';
                // }
                // if (this.state.details.paymentDueDate == '' || this.state.details.paymentDueDate == undefined) {
                //     this.state.details.paymentDueDate = '-';
                // }
                // if(this.state.details.atmLimit== '' || this.state.details.atmLimit==undefined){
                //     this.state.details.atmLimit = '-' ; 
                // }
                // if(this.state.details.posLimit== '' || this.state.details.posLimit==undefined){
                //     this.state.details.posLimit = '-' ; 
                // }
                // if(this.state.details.lineOfCreditAmount== '' || this.state.details.lineOfCreditAmount==undefined){
                //     this.state.details.lineOfCreditAmount = '-' ; 
                // }
                // if(this.state.details.availableFunds== '' || this.state.details.availableFunds==undefined){
                //     this.state.details.availableFunds = '-' ; 
                // }
                // if(this.state.details.lineOfCreditInterestRate== '' || this.state.details.lineOfCreditInterestRate==undefined){
                //     this.state.details.lineOfCreditInterestRate = '-' ; 
                // }
                // if(this.state.details.currentInterestRate== '' || this.state.details.currentInterestRate==undefined){
                //     this.state.details.currentInterestRate = '-' ; 
                // }


            },
            error: (error) => {
                if(error.status='500'){
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

    onDownloadAccountsDetailsClick() {
        // WRITE CODE HERE TO HANDLE 
        // let customerCode =this.getRoutingParam('customerCode');
        this._accountsService.downloadAccountDetails(this.accountNumber).subscribe({
            next: (response: any) => {
                if (this.device.isHybrid()) {
                    this._fileOpener.openPDF(response);
                  } 
                  else{
                let documentURL = URL.createObjectURL(
                    new Blob([response.body], { type: "application/pdf" })
                );
                const downloadLink = document.createElement("a");
                downloadLink.href = documentURL;
                const fileName = "accountDetails.pdf";
                downloadLink.download = fileName;
            }
            }
        });

    }

    public override doPostInit(): void {
        if(!this.accountNumber) this.handleFormOnLoad();
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

    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}

