import { Injectable, inject } from "@angular/core";
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
import { Router } from "@angular/router";
import { CreditcardService } from '../creditcard-service/creditcard.service';
import { Creditcard } from '../creditcard-service/creditcard.model';
import { AppConfigService } from "@dep/services";
import { CurrencyPipe } from "@angular/common";
import moment from "moment";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { DeviceDetectorService } from "@dep/core";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { FileOpenerService } from "src/app/dep/native/file-opener.service";
export class RetailCreditcardDetailsFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  creditLimit: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  validThru: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  validFrom: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  issueDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  overDueAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  outstandingAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  lastPaymentReceived: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  FieldId_1: any = {
    text: " Sample text"
  }
  FieldId_3: any = {
    text: " Sample text"
  }
  cardData!: Creditcard;
}


@Injectable()
export class RetailCreditcardDetailsFormHelper extends BaseFpxFormHelper<RetailCreditcardDetailsFormState>{
  cardData!: Creditcard;
  creditcardDetails: any;
  result: any;
  constructor(private retailCreditcardDetailsFormService: CreditcardService,
    private _appConfig: AppConfigService,
    private commonService: CommonService,
    private device: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    public currency: CurrencyPipe, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailCreditcardDetailsFormState());
    }
   
  override doPreInit(): void {
    // this.setServiceCode("RETAILCCDETAILS");
    this.setServiceCode("RETAILFLASHCREDITCARD");
    this.removeShellBtn('BACK');
    this.state.cardData = this._appConfig.getData('creditCardData') 
    this.setValue('cardReference',this.state.cardData?.cardRefNumber);
  this.addShellButton('retaildebitcardform.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
  this.setShellBtnMethod('DOWNLOAD', this.downloadAdvice.bind(this));
 }
 
 downloadAdvice(payload: any) {
    
  this.commonService.downloadCCDetails(this.getValue('cardReference')).subscribe({
    next: (response: any) => {
      if (this.device.isHybrid()) {
        this._fileOpener.openPDF(
          response,
          "application/pdf",
          "CreditCardDetails.pdf"
        );
      } else {
        let documentURL = URL.createObjectURL(
          new Blob([response.body], { type: "application/pdf" })
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = documentURL;
        const fileName = "CreditCardDetails.pdf";
        downloadLink.download = fileName;
        // downloadLink.click();
      }
    }
  });
// }
}
   

  public override doPostInit(): void {
    let key: any = {
      cardRefNumber: this.state.cardData?.cardRefNumber,
    };
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    this.retailCreditcardDetailsFormService
      .findByKey(key)()
      .subscribe((res) => {
        console.log("creditcard service", res);
        this.creditcardDetails = res;
        this.setValue('cardCategory', this.creditcardDetails.cardCategory);
        // this.setValue('cardType',this.creditcardDetails.cardType);
        this.setValue('validFrom', this.creditcardDetails.validFrom);
        // this.setValue("validThru", this.creditcardDetails.validThru);
        this.setValue('currency', this.creditcardDetails.accountCurrency);
        if (this.creditcardDetails.issueDate) {
          let issueDate: any = moment(this.creditcardDetails.issueDate).format('YYYY-MM-DD');
          this.setValue('issueDate', issueDate);
        }
        this.setValue("branchDesc", this.creditcardDetails.branchDesc);
        // let overDueAmount = this.currency.transform(this.creditcardDetails.overDueAmount, this.creditcardDetails.currency + ' ');
        // this.setValue('overDueAmount', overDueAmount);
        let totalDueAmount = this.currency.transform(this.creditcardDetails.totalDueAmount, this.creditcardDetails.accountCurrency + ' ');
        this.setValue('totalDueAmount', totalDueAmount);
        let outstandingAmount = this.currency.transform(this.creditcardDetails.outstandingAmount, this.creditcardDetails.accountCurrency + ' ');
        this.setValue('outstandingAmount', outstandingAmount);
        if (this.creditcardDetails.dueDate) {
          let dueDate: any = moment(this.creditcardDetails.dueDate).format('YYYY-MM-DD');
          this.setValue('dueDate', dueDate);
        }

        let lastPaymentReceived = this.currency.transform(this.creditcardDetails.lastPaymentReceived, this.creditcardDetails.accountCurrency + ' ');
        this.setValue('lastPaymentReceived', lastPaymentReceived);
        if (this.creditcardDetails.lastPaymentDate) {
          let lastPaymentDate: any = moment(this.creditcardDetails.lastPaymentDate).format('YYYY-MM-DD');
          this.setValue('lastPaymentDate', lastPaymentDate);
        }
        this.formGroup.updateValueAndValidity();
      })
  }


  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    payload = {
      cardReference: this.state.cardData?.cardRefNumber
    };
    return payload;
  }


  public override postDataFetchInterceptor(payload: Creditcard) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      if (this.state.cardData?.pinStatus == '0') {
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass('dep-popup-back-drop');
        modal.setDisableClose(false);
        modal.setData({
          message: "Please set your Card PIN to proceed",
        });
        modal.setAfterClosed(this.MenuClose);
        this.openModal(modal);
      }
      else {
        setTimeout(() => {
          this._router.navigate(["cards-space", "entry-shell", "credit-cards", "cc-verify-pin-validation-form"], {
            queryParams: {
              "cardReference": this.state.cardData?.cardRefNumber,
              "inventoryNumber": response.success.body.flashcreditcardrequest.inventoryNumber
            }
          });
        });
      }
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }

  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
      setTimeout(() => {
        this._router.navigate(["cards-space", "entry-shell", "credit-cards", "retail-cc-change-pin-form"], {
          queryParams: {
            "cardReference": this.state.cardData?.cardRefNumber
          }
        });
      });
    }
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


