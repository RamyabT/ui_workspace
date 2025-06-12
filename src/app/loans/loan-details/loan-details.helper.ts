import { inject, Injectable } from "@angular/core";
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
import { ExpensesDetailsService } from '../expensesDetails-service/expensesDetails.service';
import { ExpensesDetails } from '../expensesDetails-service/expensesDetails.model';
import { EditLoanInfoFormFormComponent } from "../edit-loan-info-form/edit-loan-info-form.component";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { ApplyloanService } from "../applyloan-service/applyloan.service";
export class LoanDetailsState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  vehiclePrice:any={
	  isCurrEditable: true,
	  CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
	   initCurrency : this._appConfig.baseCurrency,
	}
}


@Injectable()
export class LoanDetailsHelper extends BaseFpxFormHelper<LoanDetailsState> {
  private _appConfig: AppConfigService = inject(AppConfigService);
  loanInitationData: any;
  vehicleLoan: boolean = false;
  homeLoan: boolean = false;
  personalLoan: boolean = false;
  constructor(private expensesDetailsService: ExpensesDetailsService,private applyloanService:ApplyloanService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new LoanDetailsState());
    this.applyloanService.existingLoanDetails.subscribe( (x) => {
      console.log("existingLoanDetails",x);    
      this.existingLoanDetail(x);
    });
  }

  override doPreInit(): void {
    //  this.setServiceCode("expensesDetails");
    let loanInitationData = this._appConfig.getData("loanInitationData");
    this.setValue("vehicleStatus",loanInitationData.vehicalStatus);
    this.setReadonly("vehicleStatus",true);
    if(loanInitationData.vehicalStatus == "0"){
      this.setHidden("vehicleRegistrationNumber",true);
      this.setHidden("odometerReading",true);
      this.setHidden("previousOwner",true);
      this.setHidden("hpi",true);
    }
  }

  edit() {
    let modal = new FpxModal();
    modal.setComponent(EditLoanInfoFormFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "Edit Loan Information"
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("test", payload, addtionalData);
    this.setValue("propCost", payload.propCost);
    this.setValue("downPayment", payload.downPayment);
    this.setValue("tenor", payload.tenor);
  }

  public override doPostInit(): void {
    this.setHidden("homeLoan",true);
    this.setHidden("vehicleLoan",true);
    let loanSegments = this._appConfig.getData("loanSegments");
    if(loanSegments == "H"){
      this.homeLoan = true;
      // this.setHidden("homeLoan",false);
    }
    else if(loanSegments == "V"){
      this.vehicleLoan = true;
      // this.setHidden("vehicleLoan",false);
    }
    else{
      this.personalLoan = true;
    }

    this.loanInitationData = this._appConfig.getData("loanInitationData");
    console.log("Home loan details postinit", this.loanInitationData);
    if(loanSegments == "H"){
      this.setValue("propCost", this.loanInitationData.loanAmount);
      this.setValue("downPayment", this.loanInitationData.downPayAmount);
      this.setValue("tenor", this.loanInitationData.loanDuration);
      this.setValue("interestRate", this.loanInitationData.interestRate);
      this.setValue("emi", this.loanInitationData.emi);
      this.setValue("interestAmount", this.loanInitationData.totalInterest);
      this.setValue("repaymentAmount", this.loanInitationData.totalRepayAmount);
    }
    else if(loanSegments == "V"){
      this.setValue("vehicleCost", this.loanInitationData.vehicleloanAmount);
      // this.setValue("propCost", "20000");
      this.setValue("downPayment", this.loanInitationData.downPayAmount);
      this.setValue("tenor", this.loanInitationData.vehicleloanDuration);
      this.setValue("interestRate", this.loanInitationData.interestRate);
      this.setValue("emi", this.loanInitationData.emi);
      this.setValue("interestAmount", this.loanInitationData.totalInterest);
      this.setValue("repaymentAmount", this.loanInitationData.totalRepayAmount);
    }
    else{
      this.setValue("loanAmount", this.loanInitationData.personalloanAmount);
      this.setValue("tenor", this.loanInitationData.personalloanDuration);
      this.setValue("interestRate", this.loanInitationData.interestRate);
      this.setValue("emi", this.loanInitationData.emi);
      this.setValue("interestAmount", this.loanInitationData.totalInterest);
      this.setValue("repaymentAmount", this.loanInitationData.totalRepayAmount);
    }
    
  }

  existingLoanDetail(loanInitationData:any){
      this.setValue("propCost", loanInitationData.loanAmount);
      this.setValue("downPayment", loanInitationData.downPayAmount);
      this.setValue("tenor", loanInitationData.loanDuration);
      this.setValue("interestRate", loanInitationData.interestRate);
      this.setValue("emi", loanInitationData.emi);
      this.setValue("interestAmount", loanInitationData.totalInterest);
      this.setValue("repaymentAmount", loanInitationData.totalRepayAmount);
  }


  public override preSubmitInterceptor(payload: ExpensesDetails): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: ExpensesDetails) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.expensesDetails.tenantId.applicantId,
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


