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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { CasatransactiondtlsService } from "../casatransactiondtls-service/casatransactiondtls.service";
import {ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { ObapplicantsignatureService } from "src/app/onboarding/obapplicantsignature-service/obapplicantsignature.service";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { ViewChequeImageComponent } from "../view-cheque-image/view-cheque-image.component";
import moment from "moment";
import { CustomDatePipe } from "src/app/common/pipe/custom-date/custom-date.pipe";
import { TranslateService } from "@ngx-translate/core";

export class RetailViewCasaTranDtlsFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  transactionDate: any = {
    minDate: new Date("2023-07-01"),
    maxDate: new Date("2023-07-31"),
  }
}


@Injectable()
export class RetailViewCasaTranDtlsFormComponentHelper extends BaseFpxFormHelper<RetailViewCasaTranDtlsFormComponentState>{
  transactionDetails: any = {};
  viewChequeImg:boolean=false
  constructor(
    private _router: Router,
    public _appConfig: AppConfigService,
    public deviceDetectorService: DeviceDetectorService,
    private _casaTransactionDtls:CasatransactiondtlsService,
    private route: ActivatedRoute,
    protected _accountsSpaceMgr:AccountsSpaceManager,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    public _obService: ObapplicantsignatureService,
    private customDatePipe:CustomDatePipe,
    private _translate: TranslateService,
  ) {
    super(new RetailViewCasaTranDtlsFormComponentState());
  }

  override doPreInit(): void {
    this.transactionDetails=this._appConfig.getData('casatransactionData');
  }


  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.transactionDetails.transactionDate=this.customDatePipe.transform(moment(this.transactionDetails.transactionDate),'YYYY-MM-DD');
    this.setValue('transactionDate', this.transactionDetails.transactionDate);
    this.setValue('transactionDescription',this.transactionDetails.transactionDescription);
    this.setValue('transactionReference',this.transactionDetails.transactionReference);
    this.setValue('balance',this.transactionDetails.balance);
    if(this.transactionDetails.debitCreditFlag == 'D'){
      this.setValue('transactionType',this._translate.instant('RetailViewCasaTranDtlsForm.outgoingTransaction'));
    }
    else{
      this.setValue('transactionType',this._translate.instant('RetailViewCasaTranDtlsForm.incomingTransaction'));
    }
    
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  getChequeImage(data:any){
    if(this.transactionDetails.chequeImage){
    } else {
      this.showSpinner();
      this._casaTransactionDtls.fetchChequeImage(data).subscribe({
        next: (res:any) => {
          this.transactionDetails.chequeImage = res;
          this.hideSpinner();
          this.viewChequeImage(this.transactionDetails);
        },
        error: (err:any) => {
          this.showSpinner();
        }
      });
    }
  }

  viewChequeImage(data:any){
    const fpxModal = new FpxModal();
    fpxModal.setComponent(ViewChequeImageComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    fpxModal.setData({
      chequeImage: data?.chequeImage,
    });
    this.openModal(fpxModal);
  }

  getAccountDetails(){
    let casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    let selectedAccount = casaAccounts.filter((item:any) => item.accountNumber === accountNumber);
    return selectedAccount?.[0]?.accountCurrency;
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(payload==0){
      // this._dialogRef.close(0);
    }
    else{
      this.downloadImage();
    }
  }

  downloadImage() {
    const blobData = this._obService.base64ToBlob(this.transactionDetails.chequeImage);
    let documentURL = URL.createObjectURL(
      new Blob([blobData], { type: "image/png" })
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = documentURL;
    const fileName = "View_Cheque.png";
    downloadLink.download = fileName;
    downloadLink.click();
    this.viewChequeImg=false;
  }

  getAbsoluteValue(value: any | undefined): any {
    value = value?.toString().replaceAll(',', '')
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: any | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}