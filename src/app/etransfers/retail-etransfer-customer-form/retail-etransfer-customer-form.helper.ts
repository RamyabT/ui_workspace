import { Inject, Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, Validators } from "@angular/forms";
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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EtransfercustomerlogService } from '../etransfercustomerlog-service/etransfercustomerlog.service';
import { Etransfercustomerlog } from '../etransfercustomerlog-service/etransfercustomerlog.model';
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { AppConfigService } from "@dep/services";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
export class RetailEtransferCustomerFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  name: any;
  email: any;
  phoneNum: any;
  ntfType: any;
  preferredLang:any;
  reviewMode: boolean = false;
}


@Injectable()
export class RetailEtransferCustomerFormHelper extends BaseFpxFormHelper<RetailEtransferCustomerFormState> {
  mode: any;
  isDisabled: boolean=true;
  isEdit: boolean=false;
  constructor(private retailEtransferCustomerFormService: EtransfercustomerlogService, private _eTransferCustomerService: EtransfercustomerService, private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailEtransferCustomerFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILETRANSFERREGISTRATION");
    this.removeShellBtn('RESET');
  }

  public handleFormOnLoad() {
    this.mode = this.getRoutingParam('mode');
    if (this.mode) {
      if (this.mode == 'M') {
        this.isEdit=true;
        this._eTransferCustomerService.fetcheTransferCustomer()().subscribe({
          next: (res: any) => {
            if (res) {
              this._appConfig.setData('eTransferCustomerData', res);
              console.log("res is ", res);
              this.state.name = res.firstName;
              this.state.ntfType = res.notificationType;
              this.state.email = res.email;
              this.state.phoneNum = res.phoneNumber;
              this.state.preferredLang = res.preferredLanguage;
              this.setValue('firstName', res.firstName);
              this.setValue('email', res.email);
              this.setValue('phoneNumber', res.phoneNumber);
              this.setValue('notificationType', res.notificationType);
              this.setValue('preferredLanguage', res.preferredLanguage);
            }
          },
          error: (err) => {
            this.hideSpinner();
            console.log("error is", err);
          }
        })
      }
    }
    else if (this.mode != "M") {
      this._appConfig.setData('navBack', ['home']);
      this._activeSpaceInfoService.setOrginSpace("home");
      this.showSpinner();
      let httpRequest = new HttpRequest();
      httpRequest.setMethod("GET");
      httpRequest.setResource("/customer");
      httpRequest.setContextPath('Customers');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCUSTOMERDETAILS');
      this._httpProvider.invokeRestApi(httpRequest).pipe(map((res: IHttpSuccessPayload<any>) => { return res; })).subscribe({
        next: (res) => {
          this.hideSpinner();
          if(!res.body.customer.lastName){
            this.setValue('firstName', res.body.customer.firstName);
          }
          else{
            this.setValue('firstName', res.body.customer.firstName +" "+res.body.customer.lastName);
          }
          this.setValue('email', res.body.customer.emailId);
        }
      })
      this.setValue('notificationType', 'E');
      this.formGroup.get('email')?.addValidators([Validators.required]);
      // this.setLabel('phoneNumber','RetailEtransferCustomerForm.phoneNumber.label1');
      this.formGroup.get('email')?.updateValueAndValidity();
      this.formGroup.get('phoneNumber')?.updateValueAndValidity();
      this.setValue('preferredLanguage', '1');
      this.setHidden("hiddenField", true);
      this.isEdit=false;
    }
  }

  public handleNotificationTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.mode == 'M') {
      // if (this.state.ntfType != value) {
      //   this.setDisabled("hiddenField", true);
      // }
      // else 
      this.checkHiddenField();
    }
    if (value) {
      // if (value == 'P') {
      //   this.formGroup.get('phoneNumber')?.addValidators(Validators.required);
      //   this.formGroup.get('email')?.removeValidators(Validators.required);
      //   if(this.formGroup.controls['email'].status=='INVALID'){
      //     this.reset('email');
      //     this.setValue('email', this.state.email);
      //   }
      //   if(this.formGroup.controls['phoneNumber'].status=='INVALID'){
      //     this.reset('phoneNumber');
      //     if(this.state.phoneNum){
      //       this.setValue('phoneNumber', this.state.phoneNum);
      //     }
      //   }
      //   this.formGroup.get('email')?.updateValueAndValidity();
      //   this.formGroup.get('phoneNumber')?.updateValueAndValidity();
      //   // this.setLabel('email','RetailEtransferCustomerForm.email.label1');
      //   // this.setLabel('phoneNumber','RetailEtransferCustomerForm.phoneNumber.label');
      //   if(this.formGroup.controls['phoneNumber'].value =='' ){
      //     this.setValue('phoneNumber',this.state.phoneNum);
      //   }
      // }
      // else 
      if (value == 'E') {
        this.formGroup.get('email')?.addValidators(Validators.required);
        this.formGroup.get('phoneNumber')?.removeValidators(Validators.required);
        if(this.formGroup.controls['email'].status=='INVALID'){
          this.reset('email');
          this.setValue('email', this.state.email);
        }
        if(this.formGroup.controls['phoneNumber'].status=='INVALID'){
          this.reset('phoneNumber');
          // if(this.state.phoneNum){
            this.setValue('phoneNumber', this.state.phoneNum);
          // }
        }
        this.formGroup.get('email')?.updateValueAndValidity();
        this.formGroup.get('phoneNumber')?.updateValueAndValidity();
        // this.setLabel('email','RetailEtransferCustomerForm.email.label');
        // this.setLabel('phoneNumber','RetailEtransferCustomerForm.phoneNumber.label1');
        if(this.formGroup.controls['email'].value =='' ){
          this.setValue('email',this.state.email);
        }
      }
      else {
        this.formGroup.get('email')?.addValidators(Validators.required);
        this.formGroup.get('phoneNumber')?.addValidators(Validators.required);
        this.formGroup.get('email')?.updateValueAndValidity();
        this.formGroup.get('phoneNumber')?.updateValueAndValidity();
        // this.setLabel('email','RetailEtransferCustomerForm.email.label');
        // this.setLabel('phoneNumber','RetailEtransferCustomerForm.phoneNumber.label');
        if(this.formGroup.controls['email'].value =='' ){
          this.setValue('email',this.state.email);
        }
        if(this.formGroup.controls['phoneNumber'].value =='' ){
          this.setValue('phoneNumber',this.state.phoneNum);
        }
      }
    }
  }

  checkHiddenField(){
    if (this.state.name != this.formGroup.controls['firstName'].value || 
      this.state.phoneNum != this.formGroup.controls['phoneNumber'].value || 
      this.state.email != this.formGroup.controls['email'].value || 
      this.state.preferredLang != this.formGroup.controls['preferredLanguage'].value) {
      this.setDisabled("hiddenField", true);
    }
    else {
      this.setDisabled("hiddenField", false);
    }
  }
  public handleEmailOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.mode == 'M') {
      this.checkHiddenField();
    }
  }

  public handlePhoneNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.mode == 'M') {
      // if(!value) this.setValue('phoneNumber', this.state.phoneNum);
      this.checkHiddenField();
    }
  }

  public handleFirstNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.mode == 'M') {
      this.checkHiddenField();
    }
  }

  public handlePreferredLanguageOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.mode == 'M') {
      this.checkHiddenField();
    }
  }

  public override doPostInit(): void {
    this.setVariable('serviceCode', "RETAILETRANSFERREGISTRATION");
    this.handleFormOnLoad();
    this.addValueChangeHandler("notificationType", this.handleNotificationTypeOnvalueChange);
    this.addValueChangeHandler("email", this.handleEmailOnvalueChange);
    this.addValueChangeHandler("firstName", this.handleFirstNameOnvalueChange);
    this.addValueChangeHandler("phoneNumber", this.handlePhoneNumberOnvalueChange);
    this.addValueChangeHandler("preferredLanguage", this.handlePreferredLanguageOnvalueChange);
  }


  public override preSubmitInterceptor(payload: Etransfercustomerlog): any {
    // WRITE CODE HERE TO HANDLE 
    let mode = this.getRoutingParam('mode');
    payload.contactType = 'Retail';
    if (mode == 'M') {
      payload.operationMode = 'M';
    }
    else {
      payload.operationMode = 'A';
    }

    return payload;
  }

  onPopup() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailEtransferCustomerForm.nameTooltip.title",
        message: "RetailEtransferCustomerForm.nameTooltip.message",

      });
      this.openModal(modal);
    }
    else{
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailEtransferCustomerForm.nameTooltip.title",
        message: "RetailEtransferCustomerForm.nameTooltip.messageBr",
        okBtnLbl: "Close"
      });
      this.openModal(modal);
    }
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close(0);
  }


  public override postDataFetchInterceptor(payload: Etransfercustomerlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfercustomerlog
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
    this.state.reviewMode = true;
    this.isDisabled =false;
    if(!this.getValue('email')){
      this.setHidden('email',true);
    }
    if(!this.getValue('phoneNumber')){
      this.setHidden('phoneNumber',true);
    }
  }

  override backToEntryMode(): void {
    this.state.reviewMode = false;
    this.isDisabled =true;
    this.setHidden('email',false);
    this.setHidden('phoneNumber',false);
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


