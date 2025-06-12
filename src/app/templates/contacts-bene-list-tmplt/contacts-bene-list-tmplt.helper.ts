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
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";

import { CommonService } from "src/app/foundation/validator-service/common-service";
import moment from "moment";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
export class ContactsBeneListTmpltState extends BaseFpxComponentState {
  splitAmount:any;
  selectedData:any;
  index: any;
  transactionAmount: any;
  balanceAmount: any;
 
}


@Injectable()
export class ContactsBeneListTmpltHelper extends BaseFpxFormHelper<ContactsBeneListTmpltState>{

  constructor(
    private _appConfig: AppConfigService
   ) {
    super(new ContactsBeneListTmpltState());
  }

  override doPreInit(): void {
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.state.balanceAmount=this._appConfig.getData('transactionAmount');
   
  }
  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

 
  }
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
   
  }
  public handleAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
   this.state.selectedData.amount = value;
    if(this._appConfig.hasData('billAmountPublisher$')) {
      let amountValue = this._appConfig.getData('billAmountPublisher$').subject.next(
        {
          index: this.state.index,
          amount: value,
        });
        console.log('value-amount',amountValue);
       
    }
    
     
   
  }

  public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
   
  }
  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
  
  }

 

  public override doPostInit(): void {
   this.addValueChangeHandler('splitAmount', this.handleAmountOnvalueChange); 
   this.setValue('splitAmount',this.state.selectedData.amount);
   if(this.state.selectedData.readOnly){
    this.setReadonly('splitAmount',true);
   }
   else{
    this.setReadonly('splitAmount',false);
    // this.reset('splitAmount',true);
   }
   
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
   
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
   
  
  }
  public override preSubmitInterceptor(): any {
    // WRITE CODE HERE TO HANDLE 
   
  }

 
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


