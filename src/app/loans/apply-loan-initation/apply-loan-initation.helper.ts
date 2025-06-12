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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Applyloaninitiation } from "../apply-loan-initiation-service/apply-loan-initiation.model";
import { ApplyloaninitiationService } from "../apply-loan-initiation-service/apply-loan-initiation.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class applyloaninitiationState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  loanSegmentList$: any;
  loanAmount: any = {
    step: 100,
    MinLimit: 1,
    MaxLimit: 100000,
    currencyCode: this._appConfig.baseCurrency
  }
  downPayment: any = {
    step: 1,
    MinLimit: 1,
    MaxLimit: 100,
  }
  loanDuration: any = {
    step: 1,
    MinLimit: 1,
    MaxLimit: 25,
  }
  vehicleloanAmount: any = {
    step: 100,
    MinLimit: 1,
    MaxLimit: 100000,
    currencyCode: this._appConfig.baseCurrency
  }
  vehicledownPayment: any = {
    step: 1,
    MinLimit: 1,
    MaxLimit: 100,
  }
  vehicleloanDuration: any = {
    step: 1,
    MinLimit: 1,
    MaxLimit: 25,
  }
  personalloanAmount: any = {
    step: 100,
    MinLimit: 1,
    MaxLimit: 100000,
    currencyCode: this._appConfig.baseCurrency
  }
  personalloanDuration: any = {
    step: 1,
    MinLimit: 1,
    MaxLimit: 25,
  }
}


@Injectable()
export class applyloaninitiationHelper extends BaseFpxFormHelper<applyloaninitiationState> {
  homeLoan: boolean = true;
  vehicleLoan: boolean = true;
  personalLoan: boolean = true;
  refinance: boolean = true;
  maxLoanDuration: any;

  constructor(private applyloaninitiationService: ApplyloaninitiationService, private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new applyloaninitiationState());
  }

  override doPreInit(): void {
    // this.hideShellActions();
    this.setServiceCode("RETAILAPPLYLOANINITIATION");
  }


  public override doPostInit(): void {
    this.setValue("interestRate", "10");
    this.addValueChangeHandler("loanSegments", this.handleloanSegmentsOnvalueChange);
    this.addValueChangeHandler("homeloanType", this.handlehomeloanTypeOnvalueChange);
    this.addValueChangeHandler("loanAmount", this.handleloanAmountOnvalueChange);
    this.addValueChangeHandler("downPayment", this.handleloanAmountOnvalueChange);
    this.addValueChangeHandler("loanDuration", this.handleloanAmountOnvalueChange);
    this.addValueChangeHandler("vehicleloanAmount", this.handleVehicleOnvalueChange);
    this.addValueChangeHandler("vehicledownPayment", this.handleVehicleOnvalueChange);
    this.addValueChangeHandler("vehicleloanDuration", this.handleVehicleOnvalueChange);
    this.addValueChangeHandler("personalloanAmount", this.handlePersonalOnvalueChange);
    this.addValueChangeHandler("personalloanDuration", this.handlePersonalOnvalueChange);
    let homeLoan = "Home Loan";
    let vehicleLoan = "Vehicle Loan";
    let personalLoan = "personal Loan";
    this.state.loanSegmentList$ = of([
      {
        id: "H",
        text: homeLoan
      },
      {
        id: "V",
        text: vehicleLoan
      },
      {
        id: "P",
        text: personalLoan
      }
    ]);
    this.setValue("loanSegments", "H");
    this.setValue("loanType", "N");
  }

  public handlehomeloanTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value == "R"){
      this.refinance = true;
      this.reset("downPayAmount");
      this.reset("emi");
      this.reset("totalInterest");
      this.reset("totalRepayAmount");
      this.reset("loanAmount");
      this.reset("downPayment");
      this.reset("loanDuration");
    }
    else{
      this.refinance = false;
    }
  }

  public handleloanAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let downpayment: any
    let loanAmount: any = this.getValue("loanAmount");
    let percentage: any = this.getValue("downPayment");
    let interestRate: any = this.getValue("interestRate");
    let loanDuration: any = this.getValue("loanDuration");

    downpayment = (loanAmount * percentage) / 100;
    this.setValue("downPayAmount", downpayment.toFixed(2));

    let InterestAmount = (loanAmount * interestRate) / 100;
    let months = loanDuration * 12
    let loanWithInterestAmount = loanAmount + InterestAmount - downpayment
    let emi = (loanWithInterestAmount / months);
    if ((emi) && (emi != Infinity)) {
      this.setValue("emi", emi.toFixed(2));
    }
    this.setValue("totalInterest", InterestAmount.toFixed(2));
    this.setValue("totalRepayAmount", loanWithInterestAmount.toFixed(2));


  }

  public handleVehicleOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let vehicledownPayment: any
    let vehicleloanAmount: any = this.getValue("vehicleloanAmount");
    let percentage: any = this.getValue("vehicledownPayment");
    let interestRate: any = this.getValue("interestRate");
    let vehicleloanDuration: any = this.getValue("vehicleloanDuration");

    vehicledownPayment = (vehicleloanAmount * percentage) / 100;
    let InterestAmount = (vehicleloanAmount * interestRate) / 100;
    let months = vehicleloanDuration * 12
    let loanWithInterestAmount = vehicleloanAmount + InterestAmount - vehicledownPayment
    let emi = (loanWithInterestAmount / months);
    if ((emi) && (emi != Infinity)) {
      this.setValue("emi", emi.toFixed(2));
    }
    this.setValue("totalInterest", InterestAmount.toFixed(2));
    this.setValue("totalRepayAmount", loanWithInterestAmount.toFixed(2));
    this.setValue("downPayAmount", vehicledownPayment.toFixed(2));
  }

  public handlePersonalOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let personalloanAmount: any = this.getValue("personalloanAmount");
    let interestRate: any = this.getValue("interestRate");
    let personalloanDuration: any = this.getValue("personalloanDuration");

    let InterestAmount = (personalloanAmount * interestRate) / 100;
    let months = personalloanDuration * 12
    let loanWithInterestAmount = personalloanAmount + InterestAmount
    let emi = (loanWithInterestAmount / months);
    if ((emi) && (emi != Infinity)) {
      this.setValue("emi", emi.toFixed(2));
    }
    this.setValue("totalInterest", InterestAmount.toFixed(2));
    this.setValue("totalRepayAmount", loanWithInterestAmount.toFixed(2));
  }

  public handleloanSegmentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this._appConfig.setData("loanSegments", value);
    if (value == "V") {
      this.maxLoanDuration = "7"
      this.homeLoan = true
      this.vehicleLoan = false
      this.personalLoan = true
      this.reset("downPayAmount");
      this.reset("emi");
      this.reset("totalInterest");
      this.reset("totalRepayAmount");
      this.reset("loanAmount");
      this.reset("downPayment");
      this.reset("loanDuration");
      this.reset("homeloanType");
      this.setValue("vehicledownPayment","15");
    }
    else if (value == "P") {
      this.maxLoanDuration = "5"
      this.homeLoan = true
      this.vehicleLoan = true
      this.personalLoan = false
      this.reset("downPayAmount");
      this.reset("emi");
      this.reset("totalInterest");
      this.reset("totalRepayAmount");
      this.reset("loanAmount");
      this.reset("downPayment");
      this.reset("loanDuration");
      this.reset("homeloanType");
    }
    else {
      this.homeLoan = false
      this.vehicleLoan = true
      this.personalLoan = true
      this.maxLoanDuration = "25"
      
      this.reset("downPayAmount");
      this.reset("emi");
      this.reset("totalInterest");
      this.reset("totalRepayAmount");
      this.setValue("downPayment","20");
    }
  }


  public override preSubmitInterceptor(payload: Applyloaninitiation): any {
    // WRITE CODE HERE TO HANDLE 
    let loanInitationData = {
      "homeloanType": this.getValue("homeloanType"),
      "loanAmount": this.getValue("loanAmount"),
      "downPayment": this.getValue("downPayment"),
      "loanDuration": this.getValue("loanDuration"),
      "vehicalType": this.getValue("vehicalType"),
      "vehicalStatus": this.getValue("vehicalStatus"),
      "vehicleloanAmount": this.getValue("vehicleloanAmount"),
      "vehicledownPayment": this.getValue("vehicledownPayment"),
      "vehicleloanDuration": this.getValue("vehicleloanDuration"),
      "personalloanAmount": this.getValue("personalloanAmount"),
      "personalloanDuration": this.getValue("personalloanDuration"),
      "downPayAmount": this.getValue("downPayAmount"),
      "emi": this.getValue("emi"),
      "interestRate": this.getValue("interestRate"),
      "totalInterest": this.getValue("totalInterest"),
      "totalRepayAmount": this.getValue("totalRepayAmount"),
    }
    console.log("loanInitationData",loanInitationData);
    this._appConfig.setData("loanInitationData",loanInitationData)
    let loanSegments = this.getValue("loanSegments");
    if (loanSegments == "H") {
      let service = this._appConfig.getServiceDetails('RETAILAPPLYHOMELOAN');
      this._router.navigate(service.servicePath);
    }
    else if (loanSegments == "V") {
      let service = this._appConfig.getServiceDetails('RETAILAPPLYVEHICLELOAN');
      this._router.navigate(service.servicePath);
    }
    else {
      let service = this._appConfig.getServiceDetails('RETAILAPPLYPERSONALLOAN');
      this._router.navigate(service.servicePath);
    }

    return payload;
  }


  public override postDataFetchInterceptor(payload: Applyloaninitiation) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.applyloaninitiation,
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


