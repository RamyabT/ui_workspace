import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, MaxValidator, Validators } from "@angular/forms";
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
import { Observable, map, max, of } from "rxjs";
import { Router } from "@angular/router";
import { BeneInternationalReqService } from '../beneInternationalReq-service/beneInternationalReq.service';
import { BeneInternationalReq } from '../beneInternationalReq-service/beneInternationalReq.model';
import { BeneInternationalService } from "../beneInternational-service/beneInternational.service";
import { BicSearchFormComponent } from "../bic-search-form/bic-search-form.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
export class RetailBeneInternationalReqFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  accountNumber: any = {
    visibilityChange: false,
    autoComplete: false
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  }
  beneficiaryDetails: any = {
    bankName: "",
    bankAddress: "",
    bankBranch: ""
  }
  bankCode: any
  bankName: any
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  nickNameVar: any;
  isValidationRequiredVar = 0;
  beneficiaryName:any;
}


@Injectable()
export class RetailBeneInternationalReqFormHelper extends BaseFpxFormHelper<RetailBeneInternationalReqFormState>{

  constructor(private retailBeneInternationalReqFormService: BeneInternationalReqService,
    private _beneInternational: BeneInternationalService,
    private _httpProvider: HttpProviderService,
    private _router: Router) {
    super(new RetailBeneInternationalReqFormState())
      ;
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILBENEINTL");
    this.addResetHandler('reset', this._onReset);
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    this.setHidden("iban", true);
    this.setHidden("confirmIban", true);
    this.setHidden("accountNumber", true);
    this.setHidden("beneficiaryName", true);
    this.setHidden("conAccNumber", true);
    let beneId = this.getRoutingParam('inventoryNumber');
    let mode = this.getRoutingParam('mode');
    if (beneId && mode == 'V') {
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', true);
      this.setServiceCode("RETAILTRANSWIFT");
      this.setDataService(this._beneInternational);
    }
    if (beneId && mode == 'D') {

      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);

    }
    // this.shellType = this._appConfig.getShellType();

  }
  private _onReset = () => {
    // if (this.state.modeVar == 'M' || "R")
    this.reset("accountNumber", "");
    this.reset("conAccNumber", "");
    this.reset("beneficiaryName", "");
    this.reset('beneAccType');
    this.reset('currency');
    this.reset("bic");
    this.reset("beneCountry");
    this.reset("iban");
    this.reset('bankCountry');
    this.reset("confirmIban");
    this.reset("bankDescription", "");
    this.reset("branchCode", "");
    this.reset("addressLine1", "");
    this.reset("addressLine2", "");
    this.reset("bankAddress", "");
    this.reset('intermediaryBank');
    this.reset('remarks');
    this.reset('nickName')
    this.reset('intermediaryBic');
    this.reset('additionalBic');
    // this.reset("bankCountry", "");
    this.reset("city", "");
    this.reset("termsFlag", "");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    this.setHidden("iban", true);
    this.setHidden("confirmIban", true);
    this.setHidden("accountNumber", true);
    this.setHidden("beneficiaryName", true);
    this.setHidden("conAccNumber", true);
    this.setHidden('intermediaryBank',true);
    this.setHidden('additionalBic',true);
    this.setHidden('beneBicSearchBtn',true);
    this.setHidden('bic',true);
    this.setHidden('intermediaryBic', true);
    this.setHidden('intermediaryBank', true);
    this.setHidden('searchIntermediaryBankBIC',true)
    this.setHidden('intermediaryBicSearchBtn',true);
  }
  public handleFormOnLoad() {
    let mode = this.getRoutingParam('mode');

    if (mode == 'V') {
      this.removeShellBtn('BACK');
      this.setReadonly("ifscCode", true);
      this.setHidden('termsDetails',true);
    }

    this.setVariable('serviceCodeVaribale', "RETAILBENEINTL");

    let beneId = this.getRoutingParam('inventoryNumber');
    this.setReadonly("beneficiaryName", true);
    let action = this.getRoutingParam('action');
    let routingParam: any = this.getRoutingParam();
    let bankDescriptionVar: any = this.getValue('bankDescription');
    let branchNameVar: any = this.getValue('branchCode');
    let bankAddressVar: any = this.getValue('bankAddress');

    if (beneId && mode) {
      this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
      this.state.beneficiaryDetails.branchCode = branchNameVar;
      this.state.beneficiaryDetails.bankAddress = bankAddressVar;
      this.setReadonly("additionalBic", true);
      this.setReadonly("ifscCode", true);
      this.setReadonly("bic", true);
      this.setReadonly("intermediaryBic", true);
      this.setReadonly("bankDescription", true);

      this.setDisabled("inventoryNumber", false);
      this.setValue('ifscCode',this.getValue('additionalBic'));
      // if(this.getValue('currency')!=this.getValue('bankCountry')){
      //   this.setHidden('intermediaryBank',false);
      // }
      // else{
      //   this.setHidden('intermediaryBank',true);
      this.setReadonly("iban", true);
      this.setReadonly("confirmIban", true);
      this.setReadonly("accountNumber", true);
      this.setReadonly("conAccNumber", true);
      if (this.formGroup.controls["beneAccType"].value == "2") {
        this.setHidden("iban", true);
        this.setHidden("confirmIban", true);
        this.setHidden("accountNumber", false);
        this.setHidden("conAccNumber", false);

      } else {
        this.setHidden("accountNumber", true);
        this.setHidden("conAccNumber", true);
        this.setHidden("iban", false);
        this.setHidden("confirmIban", false);


      }

      if (mode == 'D') {
        this.removeShellBtn('RESET');
        this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
        this.state.beneficiaryDetails.branchCode = branchNameVar;
        this.state.beneficiaryDetails.bankAddress = bankAddressVar;
        this.state.beneficiaryDetails.bankAddress = bankAddressVar;
        this._beneInternational.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          if (res) {
            // this.patchValue(res);
            if (res?.beneAccType == "2") {
              this.setHidden("iban", true);
              this.setHidden("confirmIban", true);
              this.setHidden("accountNumber", false);
              this.setHidden("conAccNumber", false);
              this.setValue('accountNumber', res.accountNumber);
            this.setValue('conAccNumber', res.accountNumber);
    
            } else {
              this.setHidden("accountNumber", true);
              this.setHidden("conAccNumber", true);
              this.setHidden("iban", false);
              this.setHidden("confirmIban", false);
              this.setValue('iban', res.iban);
              this.setValue('confirmIban', res.iban);
    
            }

        this.setValue('termsFlag','N');
            
            this.setValue('beneCountry', res.beneCountry);
            this.setValue('bankCountry', res.bankCountry);
            this.setValue('beneAccType', res.beneAccType);
            this.setValue('iban', res.iban);
            this.setValue('confirmIban', res.iban);
            this.setValue('accountNumber', res.accountNumber);
            this.setValue('conAccNumber', res.accountNumber);
            this.state.beneficiaryName=res.beneficiaryName;
            this.setValue('beneficiaryName', res.beneficiaryName);
            
            this.setValue('bankDescription', res.bankDescription);
            this.setValue('branchCode', res.branchCode);
            this.setValue('bankCode', res.bankCode);
            this.setValue('isFavourite', res.isFavourite);
            this.setValue('ifscCode', res.additionalBic);
            this.setValue('nickName', res.nickName);
            this.setValue('addressLine1', res.addressLine1);
            this.setValue('addressLine2', res.addressLine2);
            this.setValue('city', res.city);
            this.setValue('remarks', res.remarks);
            // this.setValue('termsFlag', res.termsFlag);

            this.setHidden("isFavourite", true);
            this.setHidden("remarks", true);
            this.setReadonly("beneCountry", true);
            this.setReadonly("ifscCode", true);
            this.setReadonly("beneAccType", true);
            this.setReadonly("iban", true);
            this.setReadonly("confirmIban", true);
            this.setReadonly("accountNumber", true);
            this.setReadonly("conAccNumber", true);
            this.setReadonly("beneficiaryName", true);
            this.setReadonly("bic", true);
            this.setReadonly("isFavourite", true);
            this.setReadonly("currency", true);
            this.setReadonly("bankDescription", true);
            this.setReadonly("branchCode", true);
            this.setReadonly("bankAddress", true);
            this.setReadonly("nickName", true);
            this.setReadonly("addressLine1", true);
            this.setReadonly("addressLine2", true);
            this.setReadonly("city", true);
            this.setReadonly("beneCountry", true);
            // this.setReadonly("termsFlag", true);
            this.setDisabled("iban", true);
            this.setDisabled("confirmIban", true);
            this.setDisabled("nickName", true);
            this.setDisabled("accountNumber", true);
            this.setDisabled("conAccNumber", true);
            
            this.setValue('intermediaryBic', res.intermediaryBic);
            
            this.setValue('bankAddress', res.bankAddress);
            // this.setValue('bankName', res.bankAddress);
            this.setValue('currency', res.currency);

            this.setReadonly("intermediaryBic", true);
            this.setDisabled("intermediaryBic", true);
            this.setReadonly("additionalBic", true);
            this.setDisabled("additionalBic", true);

            this.setReadonly("ifscCode", true);

            this.setReadonly("bankAddress", true);
            this.setDisabled("bankAddress", true);
            // this.setReadonly("bankName", true);
            // this.setDisabled("bankName", true);
            
            this.setReadonly("bankCountry", true);
            // this.setDisabled("bankCountry", true);
            // this.setReadonly("intermediaryBic", true);
            if (res.additionalBic) {
              this.setValue('additionalBic', res.additionalBic);
              this.setReadonly("additionalBic", true);
              this.setDisabled("additionalBic", true);
              this.setValue('ifscCode', res.additionalBic);
            }
            if(res.intermediaryBic){
              this.setHidden('intermediaryBic', false);
              this.setHidden('intermediaryBicSearchBtn', false);
            }else{
              this.setHidden('intermediaryBic', true);
              this.setHidden('intermediaryBicSearchBtn', true);
            }

            if (res.bic) {
              this.setHidden('bic', false);
              this.setHidden('beneBicSearchBtn', false);
              this.setValue('bic', res.bic);
              this.setReadonly("bic", true);
              this.setDisabled("ifscCode", true);
            }
            if (res.ifscCode) {
              this.setValue('ifscCode', res.ifscCode);
              this.setReadonly("ifscCode", true);
              this.setDisabled("ifscCode", true);
            }

            this.state.nickNameVar = res.nickName;
            this.setReadonly("bankDescription", true);
            this.setDisabled("inventoryNumber", true);
          }
        })
      };
      if(mode =='V'){
        this.setHidden('termsDetails',true);
        this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
        this.state.beneficiaryDetails.branchCode = branchNameVar;
        this.state.beneficiaryDetails.bankAddress = bankAddressVar;
        this.state.beneficiaryDetails.bankAddress = bankAddressVar;
        this._beneInternational.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          if (res) {
            // this.patchValue(res);
            this.setValue('iban', res.iban);
            this.setValue('confirmIban', res.iban);
            this.setValue('accountNumber', res.accountNumber);
            this.setValue('conAccNumber', res.accountNumber);
            this.setReadonly("iban", true);
            this.setReadonly("confirmIban", true);
            this.setReadonly("accountNumber", true);
            this.setReadonly("conAccNumber", true);
            this.setValue('beneCountry', res.beneCountry);
            this.setValue('bankCountry', res.bankCountry);
            this.setValue('beneAccType', res.beneAccType);
            this.setValue('beneficiaryName', res.beneficiaryName);
            this.setValue('bankDescription', res.bankDescription);
            this.setValue('branchCode', res.branchCode);
            this.setValue('bankCode', res.bankCode);
            this.setValue('isFavourite', res.isFavourite);
            this.setValue('ifscCode', res.additionalBic);
            this.setValue('nickName', res.nickName);
            this.setValue('addressLine1', res.addressLine1);
            this.setValue('addressLine2', res.addressLine2);
            this.setValue('city', res.city);
            this.setValue('remarks', res.remarks);
            this.setValue('termsFlag', res.termsFlag);

            this.setHidden("isFavourite", true);
            this.setHidden("remarks", true);
            this.setReadonly("beneCountry", true);
            this.setReadonly("ifscCode", true);
            this.setReadonly("beneAccType", true);
            this.setReadonly("iban", true);
            this.setReadonly("confirmIban", true);
            this.setReadonly("accountNumber", true);
            this.setReadonly("conAccNumber", true);
            this.setReadonly("beneficiaryName", true);
            this.setReadonly("bic", true);
            this.setReadonly("isFavourite", true);
            this.setReadonly("currency", true);
            this.setReadonly("bankDescription", true);
            this.setReadonly("branchCode", true);
            this.setReadonly("bankAddress", true);
            this.setReadonly("nickName", true);
            this.setReadonly("addressLine1", true);
            this.setReadonly("addressLine2", true);
            this.setReadonly("city", true);
            this.setReadonly("beneCountry", true);
            this.setReadonly("termsFlag", true);
            this.setDisabled("iban", true);
            this.setDisabled("confirmIban", true);
            this.setDisabled("nickName", true);
            this.setDisabled("accountNumber", true);
            this.setDisabled("conAccNumber", true);
            
            this.setValue('intermediaryBic', res.intermediaryBic);
            
            this.setValue('bankAddress', res.bankAddress);
            // this.setValue('bankName', res.bankAddress);
            this.setValue('currency', res.currency);

            this.setReadonly("intermediaryBic", true);
            this.setDisabled("intermediaryBic", true);
            this.setReadonly("additionalBic", true);
            this.setDisabled("additionalBic", true);

            this.setReadonly("ifscCode", true);

            this.setReadonly("bankAddress", true);
            this.setDisabled("bankAddress", true);
            // this.setReadonly("bankName", true);
            // this.setDisabled("bankName", true);
            
            this.setReadonly("bankCountry", true);
            // this.setDisabled("bankCountry", true);
            // this.setReadonly("intermediaryBic", true);
            if (res.additionalBic) {
              this.setValue('additionalBic', res.additionalBic);
              this.setReadonly("additionalBic", true);
              this.setDisabled("additionalBic", true);
              this.setValue('ifscCode', res.additionalBic);
            }
            if (res.bic) {
              this.setValue('bic', res.bic);
              this.setReadonly("bic", true);
              this.setDisabled("ifscCode", true);
            }
            if (res.ifscCode) {
              this.setValue('ifscCode', res.ifscCode);
              this.setReadonly("ifscCode", true);
              this.setDisabled("ifscCode", true);
            }
           
            this.state.nickNameVar = res.nickName;
            this.setReadonly("bankDescription", true);
            this.setDisabled("inventoryNumber", true);
          }
        })
      }
    }

   else if (action == 'DECISION') {
      this.setDisabled("inventoryNumber", true);
      this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
      this.state.beneficiaryDetails.branchCode = branchNameVar;
      this.state.beneficiaryDetails.bankAddress = bankAddressVar;
      if (this.formGroup.controls["beneAccType"].value == "2") {
        this.setHidden("iban", true);
        this.setHidden("confirmIban", true);
      } else {
        this.setDisabled("inventoryNumber", true);
        this.setHidden("accountNumber", true);
        this.setHidden("conAccNumber", true);

      }
    }
    else {

      this.setDisabled("inventoryNumber", true);
      // this.setValue("beneAccType", "2");
      this.setHidden("iban", true);
      this.setHidden("confirmIban", true);
      this.setHidden("accountNumber", true);
      this.setHidden("beneficiaryName", true);
      this.setHidden("conAccNumber", true);
      this.setHidden('interBankDesc', true);
      this.setHidden('interBankAddress', true);
      this.setHidden('interBranchCode', true);
      this.setHidden('interBranchCode', true);
      this.setHidden('interBankCode', true);
      this.setHidden('intermediaryBic', true);
      this.setHidden('additionalBic', true);
      this.setHidden('bic', true);
      this.setHidden('ifscCode', true);

      this.setHidden('beneBicSearchBtn', true);
      this.setHidden('intermediaryBicSearchBtn', true);
    }

  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value =="N" ){
      this.setValue('termsFlag',null)
    }
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE

    if(payload?.bic) payload.bic = payload.bic.toUpperCase();
    if(payload?.intermediaryBic) payload.intermediaryBic = payload.intermediaryBic.toUpperCase();

    let mode = this.getRoutingParam('mode');
    let beneId = this.getRoutingParam('inventoryNumber');

    if (beneId && mode == 'D') {
      payload.operationMode = 'D';
      payload.inventoryNumber = beneId;
      payload.nickName = this.state.nickNameVar;
      if(!payload.beneficiaryName){
        payload.beneficiaryName=this.state.beneficiaryName;
      }

    }

    else {
      payload.operationMode = 'A';
      payload.isFavourite = '0';
      // payload.bankCode=this.state.beneficiaryDetails.bankCode
      // payload.bankDescription=this.state.bankName
      // payload.bankAddress=this.state.`beneficiaryDetails`.bankAddress
      payload.bankName = this.state.bankName


    }
    return payload;

  }
  public handleBeneAccTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && this.getRoutingParam('mode') !='D' && this.getRoutingParam('mode')!='V') {
      if (value == "1") {
        this.setHidden("iban", false);
        this.setHidden("confirmIban", false);

        this.setHidden("accountNumber", true);
        this.setHidden("conAccNumber", true);
        this.reset("accountNumber", "");
        this.reset("conAccNumber", "");
        this.reset("beneficiaryName", "");

        this.reset("bic");
        this.reset("bankDescription", "");
        this.reset("branchCode", "");
        this.reset("addressLine1", "");
        this.reset("addressLine2", "");
        this.reset("bankAddress", "");
        // this.reset("bankCountry", "");
        this.reset("city", "");
        this.reset("termsFlag", "");
        this.setHidden("beneficiaryName", false);
        this.setReadonly("beneficiaryName", false);
        this.setReadonly("bic", false);
      } else {
        this.reset("iban", "");
        this.reset("confirmIban", "");
        this.reset("beneficiaryName", "");
        // this.reset("nickName", "");
        this.reset("bic");
        this.reset("bankDescription", "");
        this.reset("branchCode", "");
        this.reset("addressLine1", "");
        this.reset("addressLine2", "");
        this.reset("bankAddress", "");
        // this.reset("bankCountry", "");
        this.reset("city", "");
        this.reset("termsFlag", "");
        this.setHidden("iban", true);
        this.setHidden("confirmIban", true);
        this.setHidden("accountNumber", false);
        this.setHidden("conAccNumber", false);
        this.setReadonly("beneficiaryName", false);
        this.setHidden("beneficiaryName", false);
        this.setReadonly("bic", false);
        this.setReadonly("branchCode", false);
        this.setReadonly("bankDescription", false);
        this.setReadonly("bankAddress", false);


      }
    }
  };

  public handleConAccNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (formGroup.get("accountNumber")?.value == value) {
        //this.formGroup.get("accountNumber")?.setErrors(null);
      } else {
        this.setErrors("conAccNumber", "accMisMatch");
      }
    }
  };


  public handleConfirmIbanOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let mode = this.getRoutingParam('mode');
    if (mode == null || mode == "") {

      if (value) {
        this.setHidden('bankDetails', true);


        if (this.formGroup.controls["iban"].value != this.formGroup.controls["confirmIban"].value) {
          this.setHidden('bankDetails', false);
          this.setHidden('beneDetails', false);
          this.setHidden('termsDetails', false);
          this.setErrors("confirmIban", 'nameError');
          this.reset('beneficiaryName', "");
          this.reset('accountCurrency', "");
        }

      }
    }
  }





  public onIbanReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res) {

      this.state.beneficiaryDetails.bankDescription = res.bankCode + ' ' + res.bankName;
      this.state.beneficiaryDetails.branchCode = res.branchCode + ' ' + res.branchName;
      this.state.beneficiaryDetails.bankAddress = res.bankAddress;
      this.setValue("accountNumber", res.iBanNumber);
      this.setValue("beneficiaryName", res.beneName);
      this.setValue("bic", res.bic);
      this.setValue("bankCode", res.bankCode);
      this.setValue("branchCode", res.branchCode);
      this.setValue("bankDescription", res.bankName);
      this.setValue("branchDescription", res.branchName);
      this.setValue("bankAddress", res.bankAddress);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      if(this.formMode != 'VIEW'){
      this.setHidden('termsDetails', false);
      }
    }
  }

  public onBicReceived: BaseFpxControlEventHandler = (res: any) => {
    // if (this.getValue("beneAccType") != "1") {
    if (res.bankName != "" &&
      res.branchName != "" && res.bic !="") {
      this.state.beneficiaryDetails.bankDescription = res.bankCode + ' ' + res.bankName;
      this.state.beneficiaryDetails.branchCode = res.branchCode + ' ' + res.branchName;
      this.state.beneficiaryDetails.bankAddress = res.branchAddress;
      this.setValue("bankCode", res.bankCode);
      this.setValue("branchCode", res.branchCode);
      this.setValue("bankDescription", res.bankName);
      this.setValue("branchDescription", res.branchName);
      this.setValue("bankAddress", res.branchAddress);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      if(this.formMode != 'VIEW'){
        this.setHidden('termsDetails', false);
        }
      this.setReadonly('bankDescription', true);
      this.setReadonly('branchCode', true);
      this.setReadonly('bankAddress', true);
    }
    else {
      if (this.state.isValidationRequiredVar == 1) {
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
        fpxModal.setAfterClosed(this.contextmenuModelAfterClose.bind(this));
        this.openModal(fpxModal);
      }
      else {
        // this.reset('bic');
      }

    }
    // }
  }
  public onBankCountryReceived: BaseFpxControlEventHandler = (res: any) => {

    // if(!this.getRoutingParam('mode')){
    if (res ) {
      if ((res.currency == "INR") && this.getValue('currency') == "INR") {
        this.setHidden('ifscCode', false);
        this.setHidden('bic', true);
        this.setHidden('beneBicSearchBtn', true);
        this.setHidden('additionalBic', false);
        this.setHidden('additionalBic',true);
        if(!this.getRoutingParam('mode')){
        this.reset('bankDescription', false);
        this.reset('bankAddress', false);}
      }
      else if ((res.currency == "USD") && this.getValue('currency') == "USD") {
        this.setHidden('ifscCode', true);
        this.setHidden('additionalBic', false);
        this.state.isValidationRequiredVar = 0
        this.setVariable('isValidationRequiredVar', 0);
        this.setHidden('bic', false);
	this.setHidden('beneBicSearchBtn', false);
        this.formGroup.controls['bic'].removeValidators([Validators.required]);
        if(!this.getRoutingParam('mode')){
          this.reset('bankDescription', false);
          this.reset('bankAddress', false);
          this.reset('bic');
        }
      }
      else if ((res.currency == "GBP") && this.getValue('currency') == "GBP") {
        this.setHidden('bic', false);
        this.setHidden('beneBicSearchBtn', false);
        this.setHidden('ifscCode', true);
        this.setHidden('additionalBic', false);
        this.state.isValidationRequiredVar = 0
        this.setVariable('isValidationRequiredVar', 0);
        this.formGroup.controls['bic'].removeValidators([Validators.required]);
        // this.reset('bic');

        if(!this.getRoutingParam('mode')){
          this.reset('bankDescription', false);
          this.reset('bankAddress', false);
          this.reset('bic');
        }
      }
      else if ((res.currency == "AED")) {
        this.setValidator('iban',[Validators.maxLength(23),Validators.minLength(23)]);
        this.setValidator('confirmIban',Validators.maxLength(23));
        this.setValidator('confirmIban',Validators.minLength(23));
      }

      else {
        this.setHidden('bic', false);
        this.setHidden('beneBicSearchBtn', false);
        this.setValidator('bic', Validators.required);
        this.setHidden('additionalBic', true);
        this.setHidden('ifscCode', true);
        this.reset('bankDescription');
        this.reset('bankAddress');
        this.state.isValidationRequiredVar = 1
        this.setVariable('isValidationRequiredVar', 1);
        if(this.getRoutingParam('mode') != 'D' && this.getRoutingParam('mode') != 'V' ){
        this.reset('iban','');
        this.reset('confirmIban','');
        }
        // this.formGroup.controls['iban'].removeValidators([Validators.maxLength(23), Validators.minLength(23)]);
        // this.formGroup.controls['confirmIban'].removeValidators([Validators.maxLength(23), Validators.minLength(23)]);
        this.setValidator('iban',[Validators.maxLength(34), Validators.minLength(16)]);
        this.setValidator('confirmIban',[Validators.maxLength(34), Validators.minLength(16)]);
        
        this.formGroup.updateValueAndValidity();
      }
      if (res.currency != this.getValue('currency')) {
      if(this.getRoutingParam('mode')!='D' && this.getRoutingParam('mode')!='V'){
        this.reset('intermediaryBic');
        
      }
      this.setHidden('intermediaryBic', false);
      this.setHidden('intermediaryBicSearchBtn', false);
      }
      else {
        this.setHidden('intermediaryBic', true);
        this.setHidden('intermediaryBicSearchBtn', true);
      }
      if(this.getRoutingParam('mode')=='D' && this.getRoutingParam('mode')=='V'){
        if(res.currency != this.getValue('currency')){
        this.setValue('intermediaryBic', this.getValue('intermediaryBic'));
        }
      }
    }
  // }
  }
  public onIntermediaryBankBicReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res.bankName != "" &&
    res.branchName != "" && res.bic !="") {
      this.setHidden('interBankDesc', false);
      this.setHidden('interBankAddress', false);
      this.setHidden('interBranchCode', false);
      this.setHidden('interBranchCode', false);
      this.setHidden('interBankCode', false);
      this.setValue('interBankDesc', res?.bankName);
      this.setValue('interBankAddress', res?.branchAddress);
      this.setValue('interBranchCode', res?.branchCode);
      this.setValue('interBranchDescription', res?.branchName);
      this.setValue('interBankCode', res?.bankCode);

    }
    else{
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
      fpxModal.setAfterClosed(this.onIntermediaryBicAfterClose.bind(this));
      this.openModal(fpxModal);
    }
  }

  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (

    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,

  ) => {
    this.reset('conAccNumber', "");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }
  public handleCurrencyOnvalueChange: BaseFpxChangeHandler = (

    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,

  ) => {
    if(!this.getRoutingParam('mode')){
      this.reset('bankCountry', true);
      this.reset('bic');}
    
    this.setHidden('intermediaryBic', true);
    this.setHidden('intermediaryBicSearchBtn', true);
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public handleIbanOnvalueChange: BaseFpxChangeHandler = (

    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup,

  ) => {
    this.reset('confirmIban', "");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
  }

  public handleIntermediaryBankOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let mode = this.getRoutingParam('mode');
    if (mode == null || mode == "") {

      if (this.getValue('intermediaryBic') == this.getValue('bic')) {
        this.setErrors("intermediaryBic", 'sameBicError')
      }
    }
  }

  public handleadditionalBicOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let mode = this.getRoutingParam('mode');
    if (mode!='V') {

      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setReadonly('bankDescription', false);
      this.setReadonly('bankDetails', false);
      this.setReadonly('bankAddress', false);
      this.setDisabled('bankCode', true);
      this.setDisabled('branchCode', true);
    }
  }
  public handleIfscOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let mode = this.getRoutingParam('mode');
    if (mode!='V') {

      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setReadonly('bankDescription', false);
      this.setReadonly('bankDetails', false);
      this.setReadonly('bankAddress', false);
      this.setDisabled('bankCode', true);
      this.setDisabled('branchCode', true);
      // this.setDisabled('additionalBic',false);
      // this.setValue('additionalBic',value);
    }
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("beneAccType", this.handleBeneAccTypeOnvalueChange);
    this.addValueChangeHandler("conAccNumber", this.handleConAccNumberOnvalueChange);
    this.addValueChangeHandler("confirmIban", this.handleConfirmIbanOnvalueChange);
    this.addControlEventHandler("ibanDataReceived", this.onIbanReceived);
    this.addControlEventHandler("bicReceived", this.onBicReceived);
    this.addControlEventHandler("bankCountryDataReceived", this.onBankCountryReceived);
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("currency", this.handleCurrencyOnvalueChange);
    this.addValueChangeHandler("iban", this.handleIbanOnvalueChange);
    this.addValueChangeHandler("intermediaryBic", this.handleIntermediaryBankOnvalueChange);
    this.addControlEventHandler("bicDataReceived", this.onIntermediaryBankBicReceived);
    this.addValueChangeHandler("additionalBic", this.handleadditionalBicOnvalueChange);
    this.addValueChangeHandler("ifscCode", this.handleIfscOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
  }

  public override preSubmitInterceptor(payload: BeneInternationalReq): any {
    if(payload.ifscCode){
      payload.additionalBic=payload.ifscCode
    }
    this.handleFormOnPresubmit(payload);
    let mode = this.getRoutingParam('mode');
    if (mode == null) {
      payload.operationMode = "A";
      payload.isFavourite = '0';
      
    }
    payload.serviceCode = "RETAILBENEINTL";
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.beneInternationalReq;
      routingInfo.setQueryParams({
        response: res
      });
    }
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });

    }
    return response;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response)
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.beneInternationalReq
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
      routingInfo.setQueryParams({
        result: {
          statusCode: 'FAILUR', //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode
        }
      })
    }
    return routingInfo;
  }

  searchBankBic(isIntermediary:boolean = false){
    let modal = new FpxModal();
    modal.setComponent(BicSearchFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    if(isIntermediary){
    modal.setData({
      title: "RetailBeneInternationalReqForm.searchIntermediaryBicPopupTitle",
      requestCode: isIntermediary ? '1' : '0'
    });
  } 
  else{
    modal.setData({
      title: "RetailBeneInternationalReqForm.searchBicPopupTitle",
      requestCode: isIntermediary ? '1' : '0'
    });
  }
    modal.setAfterClosed(this.onSelectBic.bind(this));
    this.openModal(modal);
  }

  onSelectBic(result: any){
    if(result?.bic){
      if(result.requestCode == '1'){
        this.setValue('intermediaryBic', result.bic);
      } else {
        this.setValue('bic', result.bic);
      }
    }
  }

  contextmenuModelAfterClose(){
    this.reset('bic',true);
  }

  onIntermediaryBicAfterClose(){
    this.reset('intermediaryBic',true);
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


