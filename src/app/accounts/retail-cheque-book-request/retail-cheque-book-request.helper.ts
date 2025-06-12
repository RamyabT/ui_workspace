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
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ChequebookrequestService } from '../chequebookrequest-service/chequebookrequest.service';
import { Chequebookrequest } from '../chequebookrequest-service/chequebookrequest.model';
import { APPCONSTANTS } from "@dep/constants";
import { ActiveSpaceInfoService } from "@dep/core";
import { FpxLayoutService } from "@fpx/layout";
export class RetailChequeBookRequestState extends BaseFpxComponentState {
  showSuggestion: boolean = false;


  chargesAmount: number = 0;

  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }

  addressDetails: any = {}
  currency: string = APPCONSTANTS.baseCurrency;
  charges: number = 0;
  firstName: any;
  lastName: any;
  phoneNumber: any;


}


@Injectable()
export class RetailChequeBookRequestHelper extends BaseFpxFormHelper<RetailChequeBookRequestState> {
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private _layoutService: FpxLayoutService = inject(FpxLayoutService);

  show = false;

  constructor(private retailChequeBookRequestService: ChequebookrequestService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailChequeBookRequestState());
  }

  override doPreInit(): void {

    console.log("formMode", this.formMode)
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("noOfLeaves", this.handleNoOfLeavesOnvalueChange);
    this.addValueChangeHandler("isCardUpdateRequired", this.handleIsCardUpdateRequiredOnvalueChange);
    this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    this.addResetHandler('reset', this._reset);

    this.handleFormOnLoad();
    this.setServiceCode("RETAILCHQBKREQ");
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this._layoutService.FORMTITLE = "RetailChequeBookRequest.title";
    // this.setFormTitle("RetailChequeBookRequest.title");
    this.setHidden('noOfChequeBooks', true);
    this.setHidden('remarks', true);
    this.setHidden('isCardUpdateRequired', true);
    this.setHidden('cardFourDigits', true);
    this.setHidden('deliveryBranch', true);
    this.setHidden('street', true);
    this.setHidden('city', true);
    this.setHidden('zipCode', true);
    this.setHidden('state', true);
    this.setHidden('accountNumber', true);
    this.setReadonly('firstName',true);
    this.setReadonly('lastName',true);
    this.setReadonly('phoneNumber',true);

    if (this.formMode == "ADD") {
      //this.setValue('accountNumber', this._activeSpaceInfoService.getAccountNumber());
      this.setValue('deliveryOption', '1');
      this.setValue('noOfLeaves', '050');
      this.setValue('isPhoneNumberRequired', '0');
      this.setVariable('currency', APPCONSTANTS.baseCurrency);

      this.showSpinner();
      let httpRequest = new HttpRequest();
      httpRequest.setMethod("GET");
      httpRequest.setResource("/customer");
      httpRequest.setContextPath('Customers');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCUSTOMERDETAILS');
      this._httpProvider.invokeRestApi(httpRequest).pipe(map((res: IHttpSuccessPayload<any>) => { return res; })).subscribe({
        next: (res) => {
          this.hideSpinner();
          this.setValue('firstName', res.body.customer.firstName);
          this.setValue('lastName', res.body.customer.lastName);
          this.setValue('phoneNumber', res.body.customer.mobileNumber);
          this.state.firstName=res.body.customer.firstName;
          this.state.lastName=res.body.customer.lastName;
          this.state.phoneNumber=res.body.customer.mobileNumber;
          let addressDetails = res.body.customer.addresses[0];
          if(addressDetails){
            this.state.addressDetails = addressDetails;
          }
        },
        error: () => {
          this.hideSpinner();
        },
        complete: () => { },
      });
    }

  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.chequebookrequest;
      routingInfo.setQueryParams({
        response: res
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.chargesAmount = Number(this.state.chargesAmount);
    let phoneNumber: any = this.getValue('phoneNumber');
    payload.phoneNumber = Number(phoneNumber);
    payload.currency = this.state.currency;
    payload.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    
    payload.addressDetails = {
      country: this.state.addressDetails.country,
      city: this.state.addressDetails.city,
      buildingId: this.state.addressDetails.buildingId,
      buildingName: this.state.addressDetails.buildingName,
      street: this.state.addressDetails.street,
      state: this.state.addressDetails.state,
      addressType: this.state.addressDetails.addressType,
      zipCode: this.state.addressDetails.pincode
    }
    
  }

  private _reset: FpxResetHandler = (payload: any) => {
    this.handleFormOnLoad();
    this.reset('chequeStartNumber');
    this.reset('termsFlag');
  }
  
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.handleFormOnLoad();
      this.reset('chequeStartNumber');
      this.reset('termsFlag');
    }
  }
  public handleNoOfLeavesOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let _charges = 44.63;
    if (value == '100') {
      _charges = 50.55;
    }
    this.state.chargesAmount = _charges;
    // this.setValue('chargesAmount', _charges);
  }
  public handleIsCardUpdateRequiredOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }
  public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == '1') {
      this.setHidden('deliveryBranch', true);
      this.reset('deliveryBranch');
    } else {
      this.setHidden('deliveryBranch', false);
    }
  }

  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload: Chequebookrequest): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: any) {

    if (this.formMode == "VIEW") {
      this.state.firstName = payload.firstName;
      this.state.lastName = payload.lastName;
      this.state.phoneNumber = payload.phoneNumber;
      this.state.addressDetails.street = payload.addressDetails.street;
      this.state.addressDetails.city = payload.addressDetails.city;
      this.state.addressDetails.state = payload.addressDetails.state;
      this.state.addressDetails.pincode = payload.addressDetails.zipCode;
      this.setHidden('termsFlag', true)

      console.log(payload)
    }


    console.log("KLKLKLKLLKLKLKLKLKL")
    // WRITE CODE HERE TO HANDLE 
    return payload;
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


