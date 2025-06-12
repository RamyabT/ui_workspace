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
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BeneintbtreqService } from '../beneintbtreq-service/beneintbtreq.service';
import { Beneintbtreq } from '../beneintbtreq-service/beneintbtreq.model';
import { BeneinternalService } from "../beneinternal-service/beneinternal.service";
import { formatDate } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { BeneficiariesService } from "../beneficiaries-service/beneficiaries.service";
export class RetailBeneInternalFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  }
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  nickNameVar: any;
  preaccountNumber:any;
  operationMode:any;
  beneAccount:any;
  beneNickName:any;
}


@Injectable()
export class RetailBeneInternalFormHelper extends BaseFpxFormHelper<RetailBeneInternalFormState>{

  constructor(private retailBeneInternalFormService: BeneintbtreqService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    // private _beneficiariesService: BeneficiariesService,
    private beneInternalServices:BeneinternalService,
    private _accountSpaceMgr: AccountsSpaceManager,
    private BeneInternalService: BeneinternalService,) {
    super(new RetailBeneInternalFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILBENEINTERNAL");
    this.addResetHandler('reset', this._reset);
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    let beneId = this.getRoutingParam('inventoryNumber');
    let mode = this.getRoutingParam('mode');
    if (beneId && mode == 'V') {
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setServiceCode("RETAILBENEINTERNAL");
      this.setDataService(this.BeneInternalService);
    }
    if (beneId && mode == 'D') {
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);

    }
  }

  private _reset: FpxResetHandler = (payload: any) => {
    this.handleFormOnLoad();
    this.reset('nickName');
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.state.operationMode = this.getRoutingParam('operationMode') || "A";
    this.setValue('operationMode', this.state.operationMode);
    // this.setValue('confirmAccountNumber',1000);
    let mode = this.getRoutingParam('mode');
    if(this.state.operationMode == 'A'){
      this.setValue('confirmAccountNumber',1000);
    }
    if(this.state.operationMode == 'M'){
      let res = this._appConfig.getData('setManageBeneData');
      this.state.beneAccount=res?.beneAccount
      this.state.beneNickName=res?.beneNickName
      this.setValue('confirmAccountNumber', this.state.beneAccount);
      this.setValue('nickName', this.state.beneNickName);
      }
    if(mode == 'V'){
      this.removeShellBtn('BACK');
    }
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    this.setVariable('serviceCodeVaribale', "RETAILBENEINTERNAL");
    this.setReadonly('accountCurrency', true);
    this.setReadonly('beneficiaryName', true);
    this.setDisabled('inventoryNumber', true);
    let routingParam: any = this.getRoutingParam();
    let beneId = this.getRoutingParam('inventoryNumber');
    
    let action = this.getRoutingParam('action');


    if (beneId && mode) {
      this.setDisabled("inventoryNumber", false);
      if (mode == 'D') {
        this.removeShellBtn('RESET');
        this.BeneInternalService.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          if (res) {
            this.setValue('nickName', res.nickName);
            this.setValue('accountNumber', res.accountNumber);
            this.setValue('confirmAccountNumber', res.accountNumber);
            this.setValue('beneficiaryName', res.beneficiaryName);
            this.setValue('accountCurrency', res.accountCurrency);
            this.setValue('remarks', res.remarks);
            this.setValue('isFavourite', res.isFavourite);
            this.setValue('termsFlag', res.termsFlag);
            this.setHidden("isFavourite",true);
            this.setHidden("remarks",true);
            this.setReadonly("nickName", true);
            this.setReadonly("accountNumber", true);
            this.setReadonly("confirmAccountNumber", true);
            this.setReadonly("isFavourite", true);
            this.setReadonly("beneficiaryName", true);
            this.setReadonly("accountCurrency", true);
            this.setReadonly("termsFlag", true);
            this.setDisabled("accountNumber",true);
            this.setDisabled("nickName", true);
            this.setDisabled("confirmAccountNumber", true);
            this.state.nickNameVar=res.nickName;
            

          }
        })
      };
    }

    if (action == 'DECISION') {
      this.setDisabled("inventoryNumber", false);
    }
    else {
      this.setDisabled("inventoryNumber", true);
      // this.setDisabled("serviceCode",true);
    }

  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    //  payload= this.formGroup.getRawValue();
    let mode = this.getRoutingParam('mode');
    let beneId = this.getRoutingParam('inventoryNumber');

    if (mode == 'D') {
      payload.operationMode = 'D';
      payload.inventoryNumber = beneId;
      payload.nickName=this.state.nickNameVar;

    }
    payload.operationMode = 'A';
    payload.isFavourite = '0';
    payload.accountCurrency=this._appConfig.baseCurrency;
    return payload;
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
        this.setHidden('bankDetails', false);
        this.reset('nickName', "");

        let preaccountNumber = value;
        this.state.preaccountNumber=preaccountNumber;
        // if (this.formGroup.controls["accountNumber"].value != this.formGroup.controls["confirmAccountNumber"].value) {
        //   this.setHidden('bankDetails', true);
        //   this.setHidden('beneDetails', true);
        //   this.setHidden('termsDetails', true);
        //   this.setErrors("confirmAccountNumber", 'nameError');
        //   this.reset('beneficiaryName', "");
        //   this.reset('accountCurrency', "");
        // }

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
    if(this.state.operationMode == 'A'){
    this.setValue('confirmAccountNumber',1000);

    }
    if(this.state.operationMode == 'M'){
      this.setValue('confirmAccountNumber', this.state.beneAccount);
    }
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }


  public onAccountNumberReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res) {
      // this.reset("confirmAccountNumber","");
      this.setValue("beneficiaryName", res.accName);
      this.setValue("accountCurrency", res.accCurrency);
      this.setReadonly("beneficiaryName", true);
      this.setReadonly("accountCurrency", true);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      // if (this.formGroup.controls["accountNumber"].value != this.formGroup.controls["confirmAccountNumber"].value) {
      //   this.setHidden('bankDetails', true);
      //     this.setHidden('beneDetails', true);
      //     this.setHidden('termsDetails', true);
      // }
    }
  }


  public override doPostInit(): void {
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberReceived);
    this.addValueChangeHandler("confirmAccountNumber", this.handleConfirmAccountNumberOnvalueChange);
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Beneintbtreq): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    let mode = this.getRoutingParam('mode');
    if (mode == null || mode == "") {

      payload.operationMode =this.state.operationMode ;
      payload.isFavourite = '0';
      payload.accountNumber= this.state.preaccountNumber

    }
    if (payload.remarks=='' ||payload.remarks==undefined) {
      delete payload.remarks
    }
    payload.termsFlag="Y"
    payload.beneficiaryName="Withinbanktransfer"
    payload.accountNumber=String(payload.accountNumber);
    payload.confirmAccountNumber=String(payload.confirmAccountNumber);

    return payload;
  }


  public override postDataFetchInterceptor(payload: Beneintbtreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.beneintbtreq;
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

  getBeneficiaryAccountsDetails() {

    this.beneInternalServices.findAll()().subscribe({
      next: (value: any) => {
        console.log("Bene", value)
        this._appConfig.setData('BENEACCOUNTSLIST', value.data)
        this._accountSpaceMgr.setBeneficiaryList(value.data);
      },
      error: (err: any) => {

      },
    });
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    this.getBeneficiaryAccountsDetails();
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.beneintbtreq;
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


