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
import { BenedomreqService } from '../benedomreq-service/benedomreq.service';
import { Benedomreq } from '../benedomreq-service/benedomreq.model';
import { Benedomestic } from "../benedomestic-service/benedomestic.model";
import { BenedomesticService } from "../benedomestic-service/benedomestic.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { APPCONSTANTS } from "@dep/constants";
export class RetailBeneDomReqState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  }
  beneficiaryDetails: any = {
    routingCode: "",
    bankCode: "",
    branchCode: "",
    bankAddress: ""
  }
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  nickNameVar: any;
}


@Injectable()
export class RetailBeneDomReqHelper extends BaseFpxFormHelper<RetailBeneDomReqState>{
  shellType: any;

  constructor(private retailBeneDomReqService: BenedomreqService,
    private beneDomService: BenedomesticService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService
  ) {
    super(new RetailBeneDomReqState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILBENEDOMESTIC");
    this.addResetHandler('reset', this._onReset);
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    let beneId = this.getRoutingParam('inventoryNumber');
    let mode = this.getRoutingParam('mode');
    if (beneId && mode == 'V') {
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setServiceCode("RETAILBENEDOMESTIC");
      this.setDataService(this.beneDomService);
      // this.setValue('country',this.getValue('country'));
    }
    if (beneId && mode == 'D') {
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
    }
    //  this.shellType = this._appConfig.getShellType();
  }
  private _onReset = () => {
    this.reset('accountNumber');
    this.reset('confirmAccountNumber');
    this.reset('nickName');
    this.reset('accountCurrency');
    this.reset('addressLine1');
    this.reset('addressLine2');
    this.reset('city');
    this.reset('country');
    this.reset('remarks');
    this.reset('termsFlag');
    // this.setHidden('bankDetails', true);
    // this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    this.setHidden('beneFullNameElement', true);

    // this.setHidden('nickName',true);
    // this.setHidden('accountCurrency',true);
    // this.setHidden('addressLine1',true);
    // this.setHidden('addressLine2',true);
    // this.setHidden('city',true);
    // this.setHidden('country',true);
    // this.setHidden('remarks',true);
    // this.setHidden('termsFlag',true);
    this.doPreInit();
    // this.handleFormOnLoad();
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setVariable('serviceCodeVaribale', "RETAILBENEDOMESTIC");
    this.setHidden('beneFullNameElement',true);
    let mode = this.getRoutingParam('mode');
    this.setValue('termsFlag',null);

    if(mode == 'V'){
      this.removeShellBtn('BACK');
      this.setValue('country',this.getValue('country'));
      this.setHidden('termsDetails',true);
    }

    let beneId = this.getRoutingParam('inventoryNumber');
    let action = this.getRoutingParam('action');
    let routingParam: any = this.getRoutingParam();
    let bankCodeVar: any = this.getValue('bankCode');
    let branchCodeVar: any = this.getValue('branchCode');
    let bankAddressVar: any = this.getValue('bankAddress');
    let routingCodeVar: any = this.getValue('routingCode');


    if (beneId && mode) {
      this.state.beneficiaryDetails.routingCode = routingCodeVar;
      this.state.beneficiaryDetails.bankCode = bankCodeVar;
      this.state.beneficiaryDetails.branchCode = branchCodeVar;
      this.state.beneficiaryDetails.bankAddress = bankAddressVar;
      this.setDisabled("inventoryNumber", false);
      if (mode == 'D') {
        this.removeShellBtn('RESET');
        this.setValue('termsFlag','N');
        this.beneDomService.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          this.state.beneficiaryDetails.routingCode = routingCodeVar;
          this.state.beneficiaryDetails.bankCode = bankCodeVar;
          this.state.beneficiaryDetails.branchCode = branchCodeVar;
          this.state.beneficiaryDetails.bankAddress = bankAddressVar;
          if (res) {
            // this.patchValue(res);
            this.setValue("accountNumber", res?.accountNumber);
            this.setValue("confirmAccountNumber", res?.accountNumber);
            this.setHidden('bankDetails', false);
            this.setHidden('beneDetails', false);
            this.setHidden('termsDetails', false);
            this.setValue("routingCode", res?.routingCode);
            this.setValue("bankCode", res?.bankCode);
            this.setValue("branchCode", res?.branchCode);
            this.setValue("bankAddress", res?.bankAddress);
            this.setValue("nickName", res?.nickName);
            this.setValue('isFavourite', res?.isFavourite);
            this.setValue("beneficiaryName", res?.beneficiaryName);
            this.setValue("addressLine1", res?.addressLine1);
            this.setValue("addressLine2", res?.addressLine2);
            this.setValue("city", res?.city);
            this.setValue("remarks", res?.remarks);
            // this.setValue("termsFlag", res?.termsFlag);
            this.setHidden("isFavourite",true);
            this.setHidden("remarks",true);
            this.setReadonly("routingCode", true);
            this.setReadonly("confirmAccountNumber", true);
            this.setReadonly("bankCode", true);
            this.setReadonly("branchCode", true);
            this.setReadonly("isFavourite", true);
            this.setReadonly("bankAddress", true);
            this.setReadonly("nickName", true);
            this.setReadonly("addressLine1", true);
            this.setReadonly("addressLine2", true);
            this.setReadonly("city", true);
            this.setReadonly("remarks", true);
            this.setReadonly("termsFlag", true);
            this.setReadonly("country", true);
            // this.removeValidator('accountNumber',"");
            // this.removeValidator('nickName',"");
            this.setDisabled('accountNumber', true);
            this.setDisabled('confirmAccountNumber', true);
            this.setDisabled('nickName', true);
            this.setValue('beneFullName',res?.beneFullName);
            // this.reset("termsFlag");
            this.setValue('termsFlag','N');

            this.state.nickNameVar=res?.nickName;
            this.setReadonly("beneFullName", true);
            this.setValue('country',res.country);
          }
        })
      };
    }
    if (action == 'DECISION') {

      this.state.beneficiaryDetails.routingCode = routingCodeVar;
      this.state.beneficiaryDetails.bankCode = bankCodeVar;
      this.state.beneficiaryDetails.branchCode = branchCodeVar;
      this.state.beneficiaryDetails.bankAddress = bankAddressVar;
    }

    else {
      // this.setValue('country',APPCONSTANTS.baseCountryCode);
      this.setDisabled("inventoryNumber", true);
      // this.setDisabled("serviceCode", true);
      this.setReadonly('beneficiaryName', true);
      this.setReadonly('routingCode', true);
      this.setReadonly('branchCode', true);
      this.setReadonly('bankAddress', true);
      this.setReadonly('bankCode', true);
      this.setReadonly('beneficiaryName', true);
      // this.setReadonly('country', true);
    }
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE

    if(payload?.routingCode) payload.routingCode = payload.routingCode.toUpperCase();

    payload.operationMode = 'A';
    payload.isFavourite = '0';


    this.setDisabled("inventoryNumber", true);
    let mode = this.getRoutingParam('mode');
    let beneId = this.getRoutingParam('inventoryNumber');
    if (mode == 'D') {
      payload.operationMode = 'D';
      payload.inventoryNumber = beneId;
      payload.nickName=this.state.nickNameVar;

    }
    else {
      payload.operationMode = 'A';
      payload.isFavourite = '0';


    }
    return payload;
  }


  public onIbanReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res && this.formGroup.controls["confirmAccountNumber"].status != "INVALID") {
      this.state.beneficiaryDetails.routingCode = res.bic;
      this.state.beneficiaryDetails.bankCode = res.bankCode + ' ' + res.bankName;
      this.state.beneficiaryDetails.branchCode = res.branchCode + ' ' + res.branchName;
      this.state.beneficiaryDetails.bankAddress = res.bankAddress;
      this.setValue("beneficiaryName", res.beneName);
      this.setValue("routingCode", res.bic);
      this.setValue("bankCode", res.bankCode + ' ' + res.bankName);
      this.setValue("branchCode", res.branchCode + ' ' + res.branchName);
      this.setValue("bankAddress", res.bankAddress);
      this.setValue("bankDescription", res.bankName);
      this.setValue("branchDescription", res.branchName);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setHidden('beneFullNameElement', true);
      this.setValue('accountCurrency',res.currency);
    }
    else {
      this.reset('city', "");
      this.reset('country', "");
      this.reset('addressLine1', "");
      this.reset('addressLine2', "");
      this.reset('termsFlag', "");
      this.reset('routingCode', "");
      this.reset('branchCode', "");
      this.reset('bankAddress', "");
      this.setHidden('bankDetails', true);
      this.setHidden('beneDetails', true);
      this.setHidden('termsDetails', true);
      this.setHidden('beneFullNameElement', true);
    }
  }


  public handleConfirmAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let mode = this.getRoutingParam('mode');
    if (mode == null || mode == "") {

      if (value) {
        let accountNumber = value;

        if (this.formGroup.controls["accountNumber"].value != this.formGroup.controls["confirmAccountNumber"].value) {

          this.setErrors("confirmAccountNumber", 'nameError');
          this.setHidden('bankDetails', true);
      this.setHidden('beneDetails', true);
      this.setHidden('termsDetails', true);
      this.setHidden('beneFullNameElement', true);
        }

      }
    }
  }

  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (

    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,

  ) => {
    this.reset('confirmAccountNumber', "");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }


  public override doPostInit(): void {
    this.addControlEventHandler("ibanDataReceived", this.onIbanReceived);
    this.addValueChangeHandler("confirmAccountNumber", this.handleConfirmAccountNumberOnvalueChange);
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if(value =="N"){
      this.setValue('termsFlag',null);
    }
  }
  public override preSubmitInterceptor(payload: Benedomreq): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Benedomreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.benedomreq;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {

      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error
      });
    }
    return response;
  }



  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.benedomreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    } 
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


