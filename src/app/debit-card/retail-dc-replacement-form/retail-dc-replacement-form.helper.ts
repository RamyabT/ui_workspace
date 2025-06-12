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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DcaddonrequestService } from '../dcaddonrequest-service/dcaddonrequest.service';
import { Dcaddonrequest } from '../dcaddonrequest-service/dcaddonrequest.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
//import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';
import { AppConfigService } from "@dep/services";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { DeviceDetectorService } from "@dep/core";
export class retaildcreplacementState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  charges: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
    email: "",
    mobile: ""
  }
  baseCurrency: string = this._appConfig.baseCurrency;
  communicationInfo: any
  cardData!: Debitcard;
}


@Injectable()
export class retaildcreplacementHelper extends BaseFpxFormHelper<retaildcreplacementState> {
  addressInfo!: FormGroup;

  constructor(private retaildcreplacementService: DcaddonrequestService, private _httpProvider: HttpProviderService, private _router: Router, private _customerService: CustomerService,
    private _appConfig: AppConfigService) {
    super(new retaildcreplacementState());
  }

  public handleBlockReasonOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      if (value == '4') {
        this.setHidden('otherReason', false)
      }
      else {
        this.setHidden('otherReason', true)
      }
    }
    if( this.formMode == 'VIEW'){
      this.setDisabled('otherReason',true)
    }
  }

  override doPreInit(): void {
    this.addValueChangeHandler("reason", this.handleBlockReasonOnvalueChange);
    this.addControlEventHandler('onCustomerDetailsDataReceived', this.handleCustomerDetailsDataReceived);
    this.addValueChangeHandler("deliveryOption", this.handleDlvryOptionOnvalueChange);
    this.setServiceCode("RETAILDCREPLACE");
    this.addResetHandler("reset", this.resetForm.bind(this));
  }
  resetForm() {
    this.reset('reason','');
    this.reset('termsFlag','');
    this.reset('otherReason',"");
    this.reset('dlvryBranch',"");
    this.reset('remarks',"");
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  
     if(this.formMode=='ADD'){
      this.setValue('termsFlag',null)
     }
      this.setValue('deliveryOption', '1');
      this.setHidden('otherReason',true);
      if (this.getRoutingParam('cardReference')) {
        this.setValue('cardReference', this.getRoutingParam('cardReference'));
      }
      this.state.cardData = this._appConfig.getData('debitCardData');
      this.setValue('cardReference', this.state.cardData?.cardRefNumber);
      this.setValue('charges', { amount: "100", currencyCode: this.state.baseCurrency });
      this.setReadonly('charges', true);
      if( this.formMode == 'VIEW'){
        this.setReadonly('otherReason',true)
      }

  }
 

  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

    if (payload) {
      if(payload.buildingId!=undefined && payload.buildingName!=undefined){
        this.state.addressInfo.buildingDetails = payload.buildingId + "," + payload.buildingName
      }
      if(payload.city!=undefined){
        this.state.addressInfo.cityDetails = payload.city
      }
      if(payload.countryName!=undefined){
       this.state.addressInfo.countryDetails = payload.countryName
      }
     if(payload.stateName!=undefined){
      this.state.addressInfo.stateDetails = payload.stateName
     }
     if(payload.pincode!=undefined){
      this.state.addressInfo.pinCode = payload.pincode
     }
     if(payload.mobileNumber!=undefined){
      this.state.addressInfo.mobile = payload.mobileNumber
     }
      
      this.setValue('addressInformation',this.state.addressInfo?.buildingDetails+","+this.state.addressInfo?.cityDetails+","+this.state.addressInfo?.stateDetails+","+this.state.addressInfo?.countryDetails+","+this.state.addressInfo?.pinCode);
      this.setValue('contactNumber',this.state.addressInfo?.mobile);
      if(this.getValue('addressInformation')=="" || this.getValue('addressInformation')==null){
        this.setValue('deliveryOption','1');
      }
    }
  }

  

  public handleDlvryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      if (value == '2') {

      // if(this.getValue('addressInformation')=="" || this.getValue('addressInformation')==null){
      //   this.setHidden('dlvryBranch', false);
      //   this.setHidden('authPersonName', false);
      //   this.setHidden('authPersonId', false);
      //   this.setHidden('addressInfo', true);
      // } 

        this.setHidden('dlvryBranch', true);
        this.setHidden('addressInfo', false);
      }
      else {
        this.setHidden('dlvryBranch', false);
        this.setHidden('authPersonName', false);
        this.setHidden('authPersonId', false);
        this.setHidden('addressInfo', true);
      }
    }
  }
  public override doPostInit(): void {
    this.addressInfo = this.formGroup.get("addressInfo") as FormGroup;
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    // this.addValueChangeHandler("cardReference", this.handleCardRefNumberOnvalueChange);
    if(this.formMode=='ADD'){
      this.handleFormOnLoad();
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



  public override preSubmitInterceptor(payload: Dcaddonrequest): any {
    // WRITE CODE HERE TO HANDLE 
    payload.charges = Number(this.getValue('charges').amount);
    payload.currency = this.getValue('charges').currencyCode;
    delete payload.inventoryNumber;
    if(payload.remarks==""){
      delete payload.remarks;
    }

    return payload;

  }


  public override postDataFetchInterceptor(payload: Dcaddonrequest) {
    // WRITE CODE HERE TO HANDLE 
   payload.charges={amount:payload.charges,currencyCode:this._appConfig.baseCurrency};
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.dcaddonrequest;
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
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


