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
import { BeneccreqService } from '../beneccreq-service/beneccreq.service';
import { Beneccreq } from '../beneccreq-service/beneccreq.model';
import { BeneccService } from "../benecc-service/benecc.service";
import { BicSearchFormComponent } from "../bic-search-form/bic-search-form.component";
import { EncryptionService } from "src/app/foundation/validator-service/encryption-services";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
export class RetailBeneCCReqFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formattedAccountNumber: any;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  }
  displaytext: any = {
    text: " Sample Text"
  }
  beneficiaryDetails: any = {
    bankCode: "",
    branchCode: "",
    branchAddress: ""
  }
  Status: Number = 0
  response: string = ""
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  nickNameVar: any;
}


@Injectable()
export class RetailBeneCCReqFormHelper extends BaseFpxFormHelper<RetailBeneCCReqFormState>{

  constructor(private retailBeneCCReqFormService: BeneccreqService,
    private beneCCService: BeneccService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _encryptionService: EncryptionService) {
    super(new RetailBeneCCReqFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILBENECC");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);


    let beneId = this.getRoutingParam('inventoryNumber');
    let mode = this.getRoutingParam('mode');
    if (beneId && mode == 'V') {

      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setServiceCode("RETAILBENECC");
      this.setDataService(this.beneCCService);
    }
    if (beneId && mode == 'D') {

      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);

    }

  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    let mode = this.getRoutingParam('mode');
this.setValue('termsFlag',null);
    if(mode == 'V'){
      this.removeShellBtn('BACK');
      this.setHidden('termsDetails',true);
    }

    this.setVariable('serviceCodeVaribale', "RETAILBENECC");
    let beneId = this.getRoutingParam('inventoryNumber');
    
    let action = this.getRoutingParam('action');
    let routingParam: any = this.getRoutingParam();
    let bankCodeVar: any = this.getValue('bankCode');
    let branchCodeVar: any = this.getValue('branchCode');
    let branchAddressVar: any = this.getValue('branchAddress');
    this.setVariable('entryMode', "A");

    if (beneId && mode) {
      this.state.beneficiaryDetails.bankCode = bankCodeVar;
      this.state.beneficiaryDetails.branchCode = branchCodeVar;
      this.state.beneficiaryDetails.branchAddress = branchAddressVar;
      this.setDisabled("inventoryNumber", false);
      if (mode == 'D') {
        this.removeShellBtn('RESET');
        this.setVariable('formMode', "D");
        this.beneCCService.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          this.state.beneficiaryDetails.bankCode = bankCodeVar;
          this.state.beneficiaryDetails.branchCode = branchCodeVar;
          this.state.beneficiaryDetails.branchAddress = branchAddressVar;
          if (res) {
            this.setValue("creditCardNumber", res.ccNumber);
            this.setValue("confirmCreditCardNumber", res.ccNumber);
            this.setValue("bic", res.bic);
            this.setValue("bankCode", res.bankCode);
            this.setValue("branchCode", res.branchCode);
            this.setValue("brcnchAddress", res.branchAddress);
            this.setValue("nickName", res.nickName);
            this.setValue('isFavourite', res.isFavourite);
            this.setValue("remarks", res.remarks);
            this.setValue("termsFlag", res.termsFlag);
            this.setValue("beneficiaryName", res.beneficiaryName);
            this.setHidden("isFavourite",true);
            this.setHidden("remarks",true);
            this.setReadonly("bic", true);
            this.setReadonly("bankCode", true);
            this.setReadonly("branchCode", true);
            this.setReadonly("bankAddress", true);
            this.setReadonly("nickName", true);
            this.setReadonly("confirmCreditCardNumber",true);
            this.setReadonly("isFavourite", true);
            this.setReadonly("termsFlag", true);
            this.setReadonly("creditCardNumber", true);
            this.setDisabled('confirmCreditCardNumber', true);
            this.setDisabled('creditCardNumber', true);
            this.setDisabled('nickName', true);
            this.setDisabled('bic', true);
            this.setDisabled('beneficiaryName', true);
            this.state.nickNameVar=res.nickName;



          }
        })
      };
    }

    if (action == 'DECISION') {
      this.setDisabled("inventoryNumber", false);
      this.state.beneficiaryDetails.bankCode = bankCodeVar;
      this.state.beneficiaryDetails.branchCode = branchCodeVar;
      this.state.beneficiaryDetails.branchAddress = branchAddressVar;
    }
    else {
      this.setDisabled("inventoryNumber", true);
      // this.setDisabled("serviceCode",true);
    }

  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    // payload.serviceCode="RETAILBENECC";

    if(payload?.bic) payload.bic = payload.bic.toUpperCase();

    payload.accountCurrency = "USD";
    let mode = this.getRoutingParam('mode');
    let beneId = this.getRoutingParam('inventoryNumber');
    // this.setDisabled("inventoryNumber",true);
    
    if (mode == 'D') {
      payload.operationMode = 'D';
      payload.inventoryNumber = beneId;
      payload.nickName=this.state.nickNameVar;

    }
    else {
      payload.operationMode = 'A';
      payload.isFavourite = '0';
    }
    if(payload.creditCardNumber){
       let ccMask='X'.repeat(12)+payload.creditCardNumber.slice(12);
       payload.ccNumber=ccMask.substring(0, 4)+" "+ccMask.substring(4,8)+" "+ccMask.substring(8,12)+" "+ccMask.substring(12,16);
        payload.creditCardNumber = this._encryptionService.encrypt(payload.creditCardNumber)
    }
    if(payload.confirmCreditCardNumber){
      payload.confirmCreditCardNumber = this._encryptionService.encrypt(payload.confirmCreditCardNumber)
  }

    return payload;
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


  public handleConfirmCreditCardNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,
  ) => {
    if (value) {
      if (this.formGroup.controls["creditCardNumber"].value != this.formGroup.controls["confirmCreditCardNumber"].value) {
        this.setErrors("confirmCreditCardNumber", 'nameError')
      }

    }
  }

  public handleCreditCardNumberOnvalueChange: BaseFpxChangeHandler = (

    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,

  ) => {
    this.reset('confirmCreditCardNumber', "");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);

    // let payload : any = {
    //   "creditCardNumber":this._encryptionService.encrypt(value)
    //  }
    //  return payload.creditCardNumber;
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public handleBicNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,

  ) => {
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public onBicReceived: BaseFpxControlEventHandler = (res: any) => {
    if (
      res.bankName != "" &&
      res.branchName != "" && res.bic !="") {
      this.state.beneficiaryDetails.bankCode = res.bankCode + ' ' + res.bankName;
      this.state.beneficiaryDetails.branchCode = res.branchCode + ' ' + res.branchName;
      this.state.beneficiaryDetails.branchAddress = res.branchAddress;
      this.setValue("bankCode", res.bankCode);
      this.setValue("branchCode", res.branchCode);
      this.setValue("branchAddress", res.branchAddress);
      this.setValue("bankDescription", res.bankName);
      this.setValue("branchDescription", res.branchName);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
    }
    else {
      const fpxModal = new FpxModal();
      fpxModal.setComponent(DepAlertComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('dep-alert-popup');
      fpxModal.setBackDropClass('dep-popup-back-drop');
      fpxModal.setData({
        title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
        message: "RetailBeneInternationalReqForm.bic.invalidErr",
        okBtnLbl: "Okay"
      });
      this.openModal(fpxModal);
      fpxModal.setAfterClosed(this.contextmenuModelAfterClose.bind(this));
    }
  }

  public override doPostInit(): void {
    this.addControlEventHandler("bicDataReceived", this.onBicReceived);
    this.addValueChangeHandler("confirmCreditCardNumber", this.handleConfirmCreditCardNumberOnvalueChange);
    this.addValueChangeHandler("creditCardNumber", this.handleCreditCardNumberOnvalueChange);
    this.addValueChangeHandler("bic", this.handleBicNumberOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();

  }


  public override preSubmitInterceptor(payload: Beneccreq): any {
    // WRITE CODE HERE TO HANDLE 

    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Beneccreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.beneccreq.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.beneccreq;
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
      let res = response.success?.body?.beneccreq;
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

  searchBic(){
    let modal = new FpxModal();
    modal.setComponent(BicSearchFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "RetailBeneCCReqForm.searchBicPopupTitle",
      setDefaultCountry: true
    });
    modal.setAfterClosed(this.onSelectBic.bind(this));
    this.openModal(modal);
  }

  onSelectBic(response: any){
    this.setValue('bic', response.bic);
  }

  contextmenuModelAfterClose(){
    this.reset('bic');
    // this.reset('amount');
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


