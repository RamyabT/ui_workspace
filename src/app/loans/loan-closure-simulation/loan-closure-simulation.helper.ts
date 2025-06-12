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
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Loanclosuresimulation } from "../loanclosuresimulation-service/loanclosuresimulation.model";
import { LoanclosuresimulationService } from "../loanclosuresimulation-service/loanclosuresimulation.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { LoansService } from "../loans-service/loans.service";
import { formatDate } from "@angular/common";
import { AppConfigService } from "@dep/services";
export class LoanClosureSimulationState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
  baseCurrency:string="";
  SetHiddenPaymentDetails:boolean=true;
  details:any
     closureDate: any = {
      minDate: new Date("01-07-2023"),
      maxDate: new Date("31-07-2023"),
    }

    fields: string[] = [
      'principalBalance',
      'interestBalance',
      'earlySettlementPenaltyCharges',
      'totalRepaymentAmount'
    ] 
    fieldsFormat: string[] =[
      'amount',
      'amount',
      'text',
      'amount'
    ]
    showClosureDetails: boolean=false;
    initalShowPaymentDetails:boolean=true;
}


@Injectable()
export class LoanClosureSimulationHelper extends BaseFpxFormHelper<LoanClosureSimulationState>{

   constructor( private loanClosureSimulationService: LoanclosuresimulationService,
    private _loanService:LoansService,
    private _appConfig:AppConfigService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    public _device: DeviceDetectorService, private _httpProvider : HttpProviderService,private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) 
    {
        super(new LoanClosureSimulationState());
    }
   
  override doPreInit(): void {
  this.hideShellActions();
 this.setServiceCode("RETAILLOANCLOSURESIMULATION");
 }
   

  public override doPostInit(): void {
    this.addValueChangeHandler('loanAccountNumber', this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler('closureDate', this.handleClosureDateOnvalueChange);
    this.handleFormOnLoad();
  }

  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (value) {
      this.state.initalShowPaymentDetails=false;
      this.state.showClosureDetails=false;

    }
  }


  public handleClosureDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (value) {

      this.state.initalShowPaymentDetails=false;
      this.state.showClosureDetails=false;

    }
  }

  
  handleFormOnLoad(){
    this.state.closureDate.minDate=new Date();
    this.state.baseCurrency=this._appConfig.baseCurrency;
    this.setValue('loanAccountNumber',this._activeSpaceInfoService.getAccountNumber());
    this.setValue('closureDate',formatDate(this.state.closureDate.minDate,'yyyy-MM-dd','en-us'));
    this.onSubmit();

  }



  onSubmit(){
    console.log('Submit---------------------------->> >>>>>>');
    this.state.initalShowPaymentDetails=true;

    this._loanService
    .fetchLoanClosureDetails(this.getValue('loanAccountNumber'),this.getValue('closureDate'))
    .subscribe((res) => {
      this.state.showClosureDetails=true;
      this.state.details=res;
      this.state.details.earlySettlementPenaltyCharges=this.state.baseCurrency+" "+this._currencyFormatter.transform(this.state.details.earlySettlementPenaltyCharges,this._appConfig.baseCurrency)
    });
  }
  
 
  public override preSubmitInterceptor(payload: Loanclosuresimulation):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Loanclosuresimulation){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.loanclosuresimulation,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

