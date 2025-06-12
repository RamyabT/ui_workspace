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
import { Router } from "@angular/router";
import { DebitcardsetpinService } from '../debitcardsetpin-service/debitcardsetpin.service';
import { Debitcardsetpin } from '../debitcardsetpin-service/debitcardsetpin.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Debitcard } from "../debitcard-service/debitcard.model";
export class RetailDebitCardSetPinFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

  // visiblityChange: boolean = false;
  // autoComplete: boolean = false;
  reenteredPin:any={
    visibilityChange: false,
   autoComplete: false
   } 
   newPin:any={
    visibilityChange: false,
   autoComplete: false
   } 
  cardData: Debitcard | undefined;
}


@Injectable()
export class RetailDebitCardSetPinFormHelper extends BaseFpxFormHelper<RetailDebitCardSetPinFormState>{

  constructor(private retailDebitCardSetPinFormService: DebitcardsetpinService,
    private _appConfig: AppConfigService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailDebitCardSetPinFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILDCSETPIN");
    if (this.getFormMode() != 'DECISION') {
      this.formGroup.removeControl('inventoryNumber')
    }
    this.state.cardData = this._appConfig.getData('debitCardData');
    this.setValue('cardReference', this.state.cardData?.cardRefNumber);
    this.addResetHandler("reset",this.resetForm.bind(this))
  }
  resetForm() {
    console.log(this.formGroup)
    this.reset('reenteredPin',"");
    this.reset('newPin',"");
   
   
    }
  public handlereenteredPinOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if (value) {
      let enterPin= this.getValue('newPin');
      if(value!=enterPin){
        this.setErrors('reenteredPin','reenteredPinerr')
      }

    }
  }


  
  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('termsFlag',null)
    }
  }


  public override doPostInit(): void {
    this.addValueChangeHandler("reenteredPin", this.handlereenteredPinOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    if(this.formMode=='ADD'){
      this.setValue('termsFlag',null)
    }

  }


  public override preSubmitInterceptor(payload: Debitcardsetpin): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Debitcardsetpin) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.debitcardsetpin;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        }
      });
    }
    return response;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
  }
}


