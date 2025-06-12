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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { LoansService } from "../../loans/loans-service/loans.service";
import { Loans } from "../../loans/loans-service/loans.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { AppConfigService } from "@dep/services";
import { CurrencyCodePipe } from "src/app/common/pipe/currency-code/currency-code.pipe";
import moment from "moment";
export class RetailLoanDetailsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  details: any
  openDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  nextDueDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  lastPaymentDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  }
  fields: string[] = [
    "loanAccountName",
    "relationshipNumber",
    "accountTypeDesc",
    "transitNumber",
    "institutionNumber",
    "loanAccountNumber",
    "totalOutstanding",
    "loanAmount",
    "loanStartDate",
    "lastDisbursedDate",
    "maturityDate"
  ];
  fieldsFormat: string[] =
    [
      "text",
      "text",
      "text",
      "text",
      "text",
      "text",
      "amount",
      "amount",
      "date",
      "date",
      "date"
    ];
}


@Injectable()
export class RetailLoanDetailsFormHelper extends BaseFpxFormHelper<RetailLoanDetailsFormState> {
  accountNumber: string = "";

  constructor(
    private commonService: CommonService,
    private retailLoanDetailsFormService: LoansService,
    private _httpProvider: HttpProviderService,
    public _device: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private _router: Router,
    private route: ActivatedRoute,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _appConfig: AppConfigService,
    private _currencyCodePipe: CurrencyCodePipe
  ) {
    super(new RetailLoanDetailsFormState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.accountNumber) this.handleFormOnLoad();
    });
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    let accountNumber = this._activeSpaceInfoService.getAccountNumber();
    let keys: any = {
      loanAccountNumber: accountNumber
    }
    this.retailLoanDetailsFormService.findByKey(keys)().subscribe({
      next: (res) => {
        let d = res as Loans;
        if(moment(d.lastDisbursedDate).isSame(d.loanStartDate)) {
          d.lastDisbursedDate = "";
        }
        this.state.details = d;
        // this.state.details.status = d.status == '1'? 'Active': 'Inactive';
        this.state.details.tenure = this.state.details.tenure + ' ' + this.getTenureUnit(this.state.details.tenureUnit);
        this.state.details.loanType = d.loanType == '1' ? 'New Loan' : 'Existing Loan';
        this.state.details.installmentAmount = this._currencyCodePipe.transform(this.state.details.accountCurrency)+' '+this.commonService.formatAmount(this.state.details.installmentAmount)+' paid every ' + this.getFrequency(this.state.details.repaymentFrequency);
        this.state.details.interestRate = this.state.details.interestRate+'%'
        if (this.state.details.rePaidAmount == 0) {
          this.state.details.rePaidAmount = '0';
        }
      },
      error: (err) => {
        console.log("Loans details fetch problem!");
      }
    })
  }

  getTenureUnit(tenure: any) {
    let tenureUnit;
    switch (tenure) {
      case '1': tenureUnit = 'Days'; break;
      case '2': tenureUnit = 'Months'; break;
      case '3': tenureUnit = 'Years'; break;
    }
    return tenureUnit;
  }

  getFrequency(repaymentFrequency: string) {
    let Frequency;
    switch (repaymentFrequency) {
      case '1': Frequency = 'daily'; break;
      case '2': Frequency = 'weekly'; break;
      case '3': Frequency = 'bi-weekly'; break;
      case '4': Frequency = 'monthly'; break;
    }
    return Frequency;
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILLOANDETAILS");
    this.removeShellBtn("BACK");
    // this.addShellButton('RetailDepositDetailsForm.download', 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
    // this.setShellBtnMethod('DOWNLOAD', this.downloadAdvice.bind(this));

    if(this._appConfig.getData('serviceCode') == 'RETAILLOANCURRENTINTERESTINFO') {
      this.state.fields = [
        "interestRate",
        "tenure",
        "renewalDate"
      ];
      this.state.fieldsFormat =
        [
          "text",
          "text",
          "date"
        ];
    }
    else if(this._appConfig.getData('serviceCode') == 'RETAILLOANPAYMENTINFO') {
      this.state.fields = [
        "repaymentType",
        "installmentAmount",
        "nextDueDate",
        "accruedInterest"
      ];
      this.state.fieldsFormat =
        [
          "text",
          "text",
          "date",
          "amount"
        ];
    }
    
  }

  downloadAdvice() {
    console.log('qwerty');
    let loanAccountNumber = this.getRoutingParam("accountNumber");
    this.showSpinner();
    this.commonService.downloadLoanDetailsReport(loanAccountNumber).subscribe({
      next: (response: any) => {
        this.hideSpinner();
        if (this._device.isHybrid()) {
          this._fileOpener.openPDF(
            response,
            "application/pdf",
            "LoanDetailsReport.pdf"
          );
        } else {
          let documentURL = URL.createObjectURL(
            new Blob([response.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "LoanDetailsReport.pdf";
          downloadLink.download = fileName;
          // downloadLink.click();
        }
      }
    });

  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Loans): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Loans) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.loans.loanAccountNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


