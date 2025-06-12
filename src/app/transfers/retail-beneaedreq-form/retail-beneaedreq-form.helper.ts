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
import { BeneaedreqService } from '../beneaedreq-service/beneaedreq.service';
import { Beneaedreq } from '../beneaedreq-service/beneaedreq.model';
import { BeneaedService } from "../beneaed-service/beneaed.service";
export class RetailBeneaedreqFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" }
  }
  disclaimer: any = {
    text: " <div><span>Disclaimer: Lorem Ipsum content needs to be shared by the team</span></div>"
  }
  beneficiaryDetails: any = {
    bankDescription: "",
    branchCode: "",
    bankAddress: ""
  }
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
}


@Injectable()
export class RetailBeneaedreqFormHelper extends BaseFpxFormHelper<RetailBeneaedreqFormState>{

  accordionOpen: boolean = true;
  shellType: any;

  constructor(private retailBeneaedreqFormService: BeneaedreqService,
    private BeneAEDService: BeneaedService,
    private _httpProvider: HttpProviderService,
    private _router: Router) {
    super(new RetailBeneaedreqFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILBENECBAED");
    this.setHidden('bankDetails', true);
    this.setHidden('beneDetails', true);
    this.setHidden('termsDetails', true);
    let beneId = this.getRoutingParam('inventoryNumber');
    let mode = this.getRoutingParam('mode');
    if (beneId && mode == 'V') {
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
      this.setServiceCode("RETAILBENECBAED");
      this.setDataService(this.BeneAEDService);
    }
    if (beneId && mode == 'D') {

      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);

    }
    // this.shellType = this._appConfig.getShellType();
  }


  public handleFormOnLoad() {
    let mode = this.getRoutingParam('mode');

    if(mode == 'V'){
      this.removeShellBtn('BACK');
    }

    this.setVariable('serviceCodeVaribale', "RETAILBENECBAED");
    let beneId = this.getRoutingParam('inventoryNumber');
    let action = this.getRoutingParam('action');
    let routingParam: any = this.getRoutingParam();
    let bankDescriptionVar: any = this.getValue('bankDescription');
    let branchNameVar: any = this.getValue('branchCode');
    let bankAddressVar: any = this.getValue('bankAddress');

    if (beneId && mode) {
      this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
      this.state.beneficiaryDetails.branchCode = branchNameVar;
      this.state.beneficiaryDetails.bankAddress = bankAddressVar;
      this.setDisabled("inventoryNumber", false);
      if (this.getValue('beneAccType') == "2") {
        this.setHidden("iban", true);

      } else {
        this.setHidden("accountNumber", true);
        this.setHidden("conAccNumber", true);


      }
      if (mode == 'D') {
        this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
        this.state.beneficiaryDetails.branchCode = branchNameVar;
        this.state.beneficiaryDetails.bankAddress = bankAddressVar;
        this.state.beneficiaryDetails.bankAddress = bankAddressVar;
        if (this.formGroup.controls["beneAccType"].value == "2") {
          this.setHidden("iban", true);

        } else {
          this.setHidden("accountNumber", true);
          this.setHidden("conAccNumber", true);


        }
        this.BeneAEDService.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          if (res) {

            this.setValue('beneCountry', res.beneCountry.countryCode);
            this.setValue('beneAccType', res.beneAccType);
            this.setValue('iban', res.iban);
            this.setValue('accountNumber', res.accountNumber);
            this.setValue('conAccNumber', res.accountNumber);
            this.setValue('beneficiaryName', res.beneficiaryName);
            this.setValue('bic', res.bic);
            this.setValue('isFavourite', res.isFavourite);
            this.setValue('bankDescription', res.bankDescription);
            this.setValue('branchCode', res.branchCode);
            this.setValue('bankAddress', res.bankAddress);
            this.setValue('nickName', res.nickName);
            this.setValue('addressLine1', res.addressLine1);
            this.setValue('addressLine2', res.addressLine2);
            this.setValue('city', res.city);
            this.setValue('bankCountry', res.bankcountry.countryCode);
            this.setValue('remarks', res.remarks);
            this.setValue('termsFlag', res.termsFlag);
            this.setValue('intermediaryBank', res.intermediaryBank);
            this.setReadonly("beneCountry", true);
            this.setReadonly("beneAccType", true);
            this.setReadonly("iban", true);
            this.setReadonly("accountNumber", true);
            this.setReadonly("conAccNumber", true);
            this.setReadonly("beneficiaryName", true);
            this.setReadonly("bic", true);
            this.setReadonly("bankDescription", true);
            this.setReadonly("branchCode", true);
            this.setReadonly("bankAddress", true);
            this.setReadonly("nickName", true);
            this.setReadonly("addressLine1", true);
            this.setReadonly("addressLine2", true);
            this.setReadonly("city", true);
            this.setReadonly("bankCountry", true);
            this.setReadonly("beneCountry", true);
            this.setReadonly("termsFlag", true);
            this.setReadonly("intermediaryBank", true);
            this.setDisabled("iban", true);
            this.setDisabled("nickName", true);
            this.setDisabled("accountNumber", true);
            this.setDisabled("bic", true);
            this.setDisabled("conAccNumber", true);
            this.setDisabled("intermediaryBank", true);
          }
        })
      };
    }

    if (action == 'DECISION') {
      this.setDisabled("inventoryNumber", true);
      this.state.beneficiaryDetails.bankDescription = bankDescriptionVar;
      this.state.beneficiaryDetails.branchCode = branchNameVar;
      this.state.beneficiaryDetails.bankAddress = bankAddressVar;
      if (this.formGroup.controls["beneAccType"].value == "2") {
        this.setHidden("iban", true);

      } else {
        this.setHidden("accountNumber", true);
        this.setHidden("conAccNumber", true);

      }
    }
    else {
      this.setDisabled("inventoryNumber", true);
      // this.setDisabled("serviceCode",true);
      // this.setValue("beneAccType", "2");
      // this.setHidden("iban", true);
      // this.setHidden("accountNumber", false);
      // this.setHidden("conAccNumber", false);

      //  else{
      //   this.setHidden('conAccNumber',true)
      //   if(this._shellService.workflowRowData.beneAccount){
      //     this.setHidden('accountNumber',true)
      //   }
      //   else{
      //     this.setHidden('iban',true)

      //   }

      //  }
    }


  }


  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE

    let mode = this.getRoutingParam('mode');
    let beneId = this.getRoutingParam('inventoryNumber');


    if (mode == 'D') {
      payload.operationMode = 'D';
      payload.inventoryNumber = beneId;

    }
    else {
      payload.operationMode = 'A';

    }
    return payload;











  }
  public handleBeneAccTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == "1") {
        this.setHidden("iban", false);
        this.setHidden("accountNumber", true);
        this.setHidden("conAccNumber", true);
        this.reset("accountNumber", "");
        this.reset("conAccNumber", "");
        this.reset("beneficiaryName", "");
        // this.reset("nickName", "");
        this.reset("bic", "");
        this.reset("bankDescription", "");
        this.reset("branchCode", "");
        this.reset("addressLine1", "");
        this.reset("addressLine2", "");
        this.reset("bankAddress", "");
        this.reset("bankCountry", "");
        this.reset("city", "");
        this.reset("termsFlag", "");
      } else {
        this.setHidden("iban", true);
        this.setHidden("accountNumber", false);
        this.setHidden("conAccNumber", false);
        this.setReadonly("beneficiaryName", false);
        this.setReadonly("bic", false);
        this.setReadonly("branchCode", false);
        this.setReadonly("bankDescription", false);
        this.setReadonly("bankAddress", false);
        this.setHidden("accountNumber", false);
        this.setHidden("conAccNumber", false);
        this.reset("iban", "");
        this.reset("beneficiaryName", "");
        // this.reset("nickName", "");
        this.reset("bic", "");
        this.reset("bankDescription", "");
        this.reset("branchCode", "");
        this.reset("addressLine1", "");
        this.reset("addressLine2", "");
        this.reset("bankAddress", "");
        this.reset("bankCountry", "");
        this.reset("city", "");
        this.reset("termsFlag", "");

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
      if (Number(formGroup.get("accountNumber")?.value) == Number(value)) {
        this.formGroup.get("accountNumber")?.setErrors(null);
      } else {
        this.setErrors("conAccNumber", "accMisMatch");
      }
    }
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
      if (this.formGroup.controls["intermediaryBank"].value == this.formGroup.controls["bic"].value) {
        this.setErrors("intermediaryBank", 'sameBicError')
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
      this.setValue("bankDescription", res.bankName);
      this.setValue("branchCode", res.branchCode);
      this.setValue("bankCode", res.bankCode);
      this.setValue("branchDescription", res.branchName);
      this.setValue("bankAddress", res.bankAddress);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);
    }
  }


  public onBicReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res) {
      this.state.beneficiaryDetails.bankDescription = res.bankCode + ' ' + res.bankName;
      this.state.beneficiaryDetails.branchCode = res.branchCode + ' ' + res.branchName;
      this.state.beneficiaryDetails.bankAddress = res.branchAddress;
      this.setValue("bankDescription", res.bankName);
      this.setValue("branchCode", res.branchCode);
      this.setValue("bankCode", res.bankCode);
      this.setValue("branchDescription", res.branchName);
      this.setValue("bankAddress", res.branchAddress);
      this.setHidden('bankDetails', false);
      this.setHidden('beneDetails', false);
      this.setHidden('termsDetails', false);

    }

  }

  public override doPostInit(): void {
    this.addValueChangeHandler("beneAccType", this.handleBeneAccTypeOnvalueChange);
    this.addValueChangeHandler("conAccNumber", this.handleConAccNumberOnvalueChange);
    this.addControlEventHandler("ibanDataReceived", this.onIbanReceived);


    this.addValueChangeHandler("intermediaryBank", this.handleIntermediaryBankOnvalueChange);
    this.addControlEventHandler("bicReceived", this.onBicReceived);

    this.handleFormOnLoad();

  }


  public override preSubmitInterceptor(payload: Beneaedreq): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    let mode = this.getRoutingParam('mode');
    if (mode == null) {
      payload.operationMode = "A";
    }
    // payload.serviceCode="RETAILBENECBAED";
    return payload;
  }


  public override postDataFetchInterceptor(payload: Beneaedreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //       transRef: response.success?.body?.beneaedreq.inventoryNumber,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.beneaedreq;
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
      let res = response.success?.body?.beneaedreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
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
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


