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
  FpxCurrenyFormatterPipe,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { MaturityinstructionService } from '../maturityinstruction-service/maturityinstruction.service';
import { Maturityinstruction } from '../maturityinstruction-service/maturityinstruction.model';
import { RetailDepositDetailsFormComponent } from "../retail-deposit-details-form/retail-deposit-details-form.component";
import { formatDate } from "@angular/common";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailChangeMaturityInstructionsFormState extends BaseFpxComponentState {
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }

  initialOption: any;
  initialAccount: any;
  depositDetail:any={
    depositAmount:"",
    depositTerm:"",
    maturityAmount:"",
    maturityDate:""
  }
  mode: any;
}



@Injectable()
export class RetailChangeMaturityInstructionsFormHelper extends BaseFpxFormHelper<RetailChangeMaturityInstructionsFormState>{


  constructor(private retailChangeMaturityInstructionsFormService: MaturityinstructionService,
    private _currencyFormatter:FpxCurrenyFormatterPipe, private _httpProvider: HttpProviderService, private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailChangeMaturityInstructionsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCHNGMATURITYINSTR");
    this.addValueChangeHandler("maturityInstruction", this.handleMaturityInstructionOnvalueChange);
    this.addValueChangeHandler("creditAccountNumber", this.handleCreditAccountNumberOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.state.mode = this.getRoutingParam('mode')
  }
  
  private _onReset = () => {
    this.setHidden('depositDetails',true);
    this.reset('termsFlag',true);
    this.reset('creditAccountNumber',true);
    this.reset('maturityInstruction',true);
    this.reset('accountNumber',true);
    this.handleFormOnLoad();
  }

  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    // WRITE CODE HERE TO HANDLE
    if (payload) {
      this.setHidden('depositDetails',false)
      this.state.depositDetail.depositAmount=payload.accountCurrency+' '+this._currencyFormatter.transform(payload.depositAmount,payload.accountCurrency) 
      this.state.depositDetail.maturityAmount=payload.accountCurrency+' '+this._currencyFormatter.transform(payload.maturityAmount,payload.accountCurrency) 
      this.state.depositDetail.maturityDate = formatDate(payload.maturityDate,'dd MMM yyyy','en-us')
      this.state.depositDetail.depositTerm = payload.depositTerm;
      if(this.formMode!='VIEW'){
        this.reset("termsFlag", "");
      this.setValue("maturityInstruction", payload.maturityInstruction);
      this.state.initialOption = payload.maturityInstruction;
      if ((payload.maturityInstruction == "1" || payload.maturityInstruction == "2") && this.state.mode !== "V") {
        this.state.initialAccount = payload.creditAccountNumber;
        this.setValue("creditAccountNumber", payload.creditAccountNumber);
      }
    }
    }
  };
  public handleMaturityInstructionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
      if (value && this.formMode!='VIEW') {
        this.reset("termsFlag", "");
      }
      if (value == "3" || value == "2") {
        this.setHidden("creditAccountNumber", true);
      } else {
        this.setHidden("creditAccountNumber", false);
      }
  
  };
  public handleCreditAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value && this.formMode!='VIEW'){
      this.reset("termsFlag", "");
    }

  };

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      if (value == 'Y') {
        if (this.getValue('maturityInstruction') === this.state.initialOption) {
          this.setErrors('maturityInstruction', 'maturityInstructionError');
        }
        if(this.state.initialOption!=3){
        if (this.state.initialOption == this.getValue('maturityInstruction') && (this.state.initialAccount == this.getValue('creditAccountNumber'))) {
          this.setErrors('maturityInstruction', 'maturityInstructionError');
  
        }
        else {
          this.formGroup.controls["maturityInstruction"].setErrors(null, {
            emitEvent: true,
          });
        }
  
      }
    }
    }
  }

  public handleFormOnPresubmit(payload:any){
    // WRITE CODE HERE TO HANDLE
   
       if (payload.inventoryNumber == "") {
         delete payload.inventoryNumber
       }
   }

  depositDetailOnClick() {
    let accountNumber = this.getValue('accountNumber')
    let path = ['accounts-space', 'display-shell', 'deposits', 'retail-deposit-details-form']

    this._router.navigate(path,
      {
        queryParams: {
          serviceCode: this.serviceCode
        },
      });

  }



  public handleFormOnLoad() {
    this.setValue('accountNumber', this._activeSpaceInfoService.getAccountNumber());
    this.setHidden('depositDetails',true)
  }



  public override doPostInit(): void {
    this.addResetHandler('reset',this._onReset);
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    // this.addValueChangeHandler("maturityInstruction", this.handleMaturityInstructionOnvalueChange);
    // this.addValueChangeHandler("creditAccountNumber", this.handleCreditAccountNumberOnvalueChange);
    // this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    // this.handleFormOnLoad();
    if(this.formMode == 'ADD') {
      this.handleFormOnLoad();
    }

  }



  public override preSubmitInterceptor(payload: Maturityinstruction): any {
    // WRITE CODE HERE TO HANDLE 
	  this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Maturityinstruction) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.maturityinstruction;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
}


