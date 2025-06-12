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
import { DcactivatecardService } from '../dcactivatecard-service/dcactivatecard.service';
import { Dcactivatecard } from '../dcactivatecard-service/dcactivatecard.model';
import { ActivateDCValidationService } from "src/app/foundation/validator-service/activatedc-validation.service";
import { formatDate } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
import moment from "moment";
export class RetailDcActivateCardFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  newDate: any = new Date();
  cvv: any = {
    visiblityChange: false,
    autoComplete: false
  }
  visiblityChange: boolean = false;
  autoComplete: boolean = false;
  activationDate: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  FieldId_2: any = {
    text: " <div style='color: rgb(204, 204, 204); background-color: rgb(31, 31, 31); font-family: Consolas, &quot;Courier New&quot;, monospace; font-size: 14px; line-height: 19px; white-space: pre;'><span style='color: #ce9178;'>Disclaimer: Lorem Ipsum content needs to be shared by the team</span></div>"
  }
  cardData!: Debitcard;
}


@Injectable()
export class RetailDcActivateCardFormHelper extends BaseFpxFormHelper<RetailDcActivateCardFormState>{

  constructor(private retailDcActivateCardFormService: DcactivatecardService, private _activateDCValidationService: ActivateDCValidationService, private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService) {
    super(new RetailDcActivateCardFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILDCACTIVATECARD");
    if (this.getFormMode() != 'DECISION') {
      this.formGroup.removeControl('inventoryNumber')
    }
    this.addResetHandler("reset",this.resetForm.bind(this));
    this.setHidden('cardName',true);
  }
  resetForm() {
    console.log(this.formGroup)
    this.reset('termsFlag',"");
    this.reset('remarks',"");
    this.reset('cvv',"");
    this.reset('expiryYear',"");
    this.reset('expiryMonth',"");
    this.reset('cardName',"")
   
    }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.state.cardData = this._appConfig.getData('debitCardData');
    this.setValue('cardReference', this.state.cardData?.cardRefNumber);
    
    
  }

  public handleCvvOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
      this._activateDCValidationService.activateDCValidation(this.formGroup.controls['cvv'])?.subscribe((error) => {
        console.log("Error is:", error);
        if (error) {
          this.setErrors('cvv', error);
        }
      });

    }
  }
  public handleexpiryMonthOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
      this.reset('cvv','')

    }
    
   
  }
  public handleexpiryYearOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    if(value){
    this.reset('cvv','');
    // let year = moment(new Date).get('year');

    // if(value==year){
    // let month = moment(new Date).get('month')+1;
    // let data:any =[];
    // for(month;month<=12;month++){
    //   data.push({ id: month, text: month })
    // }
    // this.setStaticDropdown('expiryMonth',of(data));
    // }
    

  }
  
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("cvv", this.handleCvvOnvalueChange);
    this.addValueChangeHandler("expiryMonth", this.handleexpiryMonthOnvalueChange);
    this.addValueChangeHandler("expiryYear", this.handleexpiryYearOnvalueChange);

    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Dcactivatecard): any {
    // WRITE CODE HERE TO HANDLE 
    let newDate: any = new Date();
    let activationDate = formatDate(newDate, 'yyyy-MM-dd', 'en-US')
    payload.activationDate = activationDate;
    payload.cardNumber=this.state.cardData?.cardNumber;
    return payload;
  }


  public override postDataFetchInterceptor(payload: Dcactivatecard) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.dcactivatecard;
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

  override onReview(): void {
    if (!this.getValue('remarks')) {
      this.setHidden('remarks', true);
    }
  }

  override backToEntryMode(): void {
    this.setHidden('remarks', false);
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


