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
  FpxModalAfterClosed,
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DebitcardService } from "../debitcard-service/debitcard.service";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { AppConfigService } from "@dep/services";
import { CurrencyPipe } from "@angular/common";
import moment from "moment";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";
import { FileOpenerService } from "src/app/dep/native/file-opener.service";
export class retaildebitcardformState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  validThru: any = {
    minDate: "",
    maxDate: "",
  };
  issueDate: any = {
    minDate: "",
    maxDate: "",
  };
}

@Injectable()
export class retaildebitcardformHelper extends BaseFpxFormHelper<retaildebitcardformState> {
  debitcardDetails: any;
  result: any;
  cardData!: Debitcard;

  constructor(
    private retaildebitcardformService: DebitcardService,
    private _httpProvider: HttpProviderService,
    private device: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _router: Router,
    private _appConfig: AppConfigService,
    public currency: CurrencyPipe,
    public currencyFormat: FpxCurrenyFormatterPipe
  ) {
    super(new retaildebitcardformState());
  }

  override doPreInit(): void {
    //this.hideShellActions();
    // this.removeShellBtn('BACK');
    //this.removeShellBtn('Download');
    this.setServiceCode("RETAILFLASHDEBITCARD");

    this.cardData = this._appConfig.getData("debitCardData");
    this.setValue("cardRefNumber", this.cardData?.cardRefNumber);
    this.removeShellBtn('BACK');
    if(this.device.isMobile()) {
      // this.addShellButton('retaildebitcardform.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
      // this.setShellBtnMethod('DOWNLOAD', this.downloadAdvice.bind(this));
    }
    else {
      this.hideShellActions();
    }
    }

  downloadAdvice(payload: any) {
    
    this.commonService.downloadDCDetails(this.getValue('cardRefNumber')).subscribe({
      next: (response: any) => {
        if (this.device.isHybrid()) {
          this._fileOpener.openPDF(
            response,
            "application/pdf",
            "DebitCardDetails.pdf"
          );
        } else {
          let documentURL = URL.createObjectURL(
            new Blob([response.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "DebitCardDetails.pdf";
          downloadLink.download = fileName;
          // downloadLink.click();
        }
      }
    });
  // }
  }

  public override doPostInit(): void {
    let key: any = {
      cardRefNumber: this.cardData?.cardRefNumber,
    };
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.retaildebitcardformService
      .findByKey(key)()
      .subscribe((res) => {
        console.log("Debitcard service", res);
        this.debitcardDetails = res;
        // this.setValue('cardNumber',this.debitcardDetails.accountNumber);
        // this.setValue('status',this.debitcardDetails.status);
        // this.setValue('cardType',this.debitcardDetails.cardType);
        //this.setValue('validThru',this.debitcardDetails.validThru);
        this.setValue("validFrom", this.debitcardDetails.validFrom);
        this.setValue("cardRefNumber", this.debitcardDetails.cardRefNumber);
        if(this.debitcardDetails.issueDate){
          let issueDate:any=moment(this.debitcardDetails.issueDate).format('YYYY-MM-DD');
        this.setValue('issueDate',issueDate);
        }
        //this.setValue("issueDate", this.debitcardDetails.issueDate);
        this.setValue("branchDesc", this.debitcardDetails.branchDesc);
        this.setValue("accountNumber", this.debitcardDetails.linkedBankAccount);
        this.setValue("cardHolderName", this.debitcardDetails.cardHolderName);
          this.setValue('accountType',this.debitcardDetails.accountTypeDesc);
         // this.setValue('avlBalance',this.debitcardDetails.availableBalance);
         let avlBalance=this.currencyFormat.transform(this.debitcardDetails.availableBalance,this.debitcardDetails.currency)+" "+this.debitcardDetails.currency;
          //let avlBalance= this.currency.transform(this.debitcardDetails.availableBalance,this.debitcardDetails.currency+' ');
          this.setValue('avlBalance',avlBalance);
          let bal=this.currencyFormat.transform(this.debitcardDetails.actualBalance,this.debitcardDetails.currency)+" "+this.debitcardDetails.currency;
          //let bal=this.currency.transform(this.debitcardDetails.actualBalance,this.debitcardDetails.currency+' ');
          this.setValue('actualBalance',bal);
          this.formGroup.updateValueAndValidity();
    })
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    payload = {
      cardReference: payload.cardRefNumber,
    };
    return payload;
  }

  public override postDataFetchInterceptor(payload: Debitcard) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }
  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
      setTimeout(() => {
        this._router.navigate(["cards-space", "entry-shell", "debit-card", "retail-dc-change-pin-request"], {
          queryParams: {
            "cardReference": this.cardData?.cardRefNumber
          }
        });
      });
    }
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      // routingInfo.setQueryParams({
      //   response: response.success?.body?.flashdebitcardrequest,
      //   transRef: response.success?.body?.flashdebitcardrequest.cardRefNumber,
      //   status: "success",
      // });
      if (this.cardData?.pinStatus == '0') {

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
          this._router.navigate(["cards-space", "entry-shell", "debit-card", "dc-verify-pin-validation-form"], {
            queryParams: {
              "cardReference": this.cardData?.cardRefNumber
            }
          });
        });
      }

    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
