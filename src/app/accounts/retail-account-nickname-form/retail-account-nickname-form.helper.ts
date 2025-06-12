import { Inject, inject, Injectable } from "@angular/core";
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
  FpxResetHandler,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AccountnicknameService } from '../accountnickname-service/accountnickname.service';
import { Accountnickname } from '../accountnickname-service/accountnickname.model';
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { AppConfigService } from "@dep/services";
import { FpxLayoutService } from "@fpx/layout";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmationReceiptFormComponent } from "../confirmation-receipt-form/confirmation-receipt-form.component";
export class RetailAccountNicknameFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  currentNicknameVariable: any;
  nickname: string = '';
  productName: any;
}


@Injectable()
export class RetailAccountNicknameFormHelper extends BaseFpxFormHelper<RetailAccountNicknameFormState>{

  public _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  selectedAccountNicknameDetails: any;
  allAccountNicknameDetails: any;
  isSelectedAccountHasNickname: boolean = false;
  isNicknameExists: boolean = true;
  disableDeleteBtn: boolean = false;

  constructor(private retailAccountNicknameFormService: AccountnicknameService, private _httpProvider: HttpProviderService, private _router: Router,
    private accountsService: AccountsService,
    public _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _layoutService: FpxLayoutService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
  ) {
    super(new RetailAccountNicknameFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILACCNICKNAME");
    this.addResetHandler('reset', this._reset);

    // this.allAccountNicknameDetails = this._appConfig.getData('allAccountNicknameDetails');
    this.selectedAccountNicknameDetails = this._appConfig.getData('selectedAccountNicknameDetails');

    // if (this.selectedAccountNicknameDetails && this.selectedAccountNicknameDetails?.accountNickname && this.selectedAccountNicknameDetails?.accountNickname != '') {
    //   this.isSelectedAccountHasNickname = true;
    // }
    console.log(this.isSelectedAccountHasNickname)
    console.log(this.selectedAccountNicknameDetails)
    console.log(this.allAccountNicknameDetails)
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.handleFormOnLoad();
    this.reset('nickName');
  }
  public handleFormOnLoad() {
    this._layoutService.FORMTITLE = "RetailAccountNicknameForm.title";
    // WRITE CODE HERE TO HANDLE
    if (this._activeSpaceInfoService.getAccountNumber()) {
      this.setValue('accountNumber', this._activeSpaceInfoService.getAccountNumber());
    }
    this.setMandatory('nickName', true);
    this.setValue('clearNickname', "N");
  }
  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close();
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    console.log(response);
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.accountnickname;
      routingInfo.setQueryParams({
        response: res,
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      // routingInfo.setQueryParams({
      //   response: error,
      //   serviceCode: this.serviceCode.value
      // });
      let modal = new FpxModal();
      modal.setComponent(ConfirmationReceiptFormComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setDisableClose(true);
      if(this._device.isMobile()){
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','accounts-confirmation-backdrop']);
      }
      else{
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfers-contacts-backdrop']);
      }
      modal.setAfterClosed(this.contextmenuModelAfterClose1);
      modal.setData({
        statusCode: 'failure',
        // serviceCode: 'RETAILSTOPCHEQUE'
      });
      this.openModal(modal);
    }
    return response;
  }

  handleEnterOnInput(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputElement = event.target as HTMLInputElement;
      if (inputElement && typeof inputElement.value !== 'undefined') {
        const currentInputValue = inputElement.value;
        if (this.state.nickname == currentInputValue) {
          this.setErrors('nickName', 'nickname_exists_error')
        } else {
          this.formGroup.controls['nickName'].setValue(currentInputValue);
          this.formGroup.controls['nickName'].markAsTouched();
        }
        if(this.formGroup.controls['nickName'].status=='VALID')
          this.triggerSubmit();
      }
    }
  }
  
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (payload.clearNickname == "N") {
      payload.nickName = this.formGroup?.getRawValue()?.nickName
    }
  }
  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload && payload?.accountNickname && payload?.accountNickname != ''  && payload?.accountNickname != payload?.productDesc) {
      this.state.currentNicknameVariable = payload?.accountNickname;
      this.setVariable('currentNicknameVariable', payload?.accountNickname);
      this.setValue('nickName', payload?.accountNickname);
      this.state.nickname = payload?.accountNickname;
      this.setValue('nicknameFlag', '0');
      this.setHidden('clearNickname', false);
      this.setHidden('delete-nickname', false);
      this.state.productName=payload?.productDesc;
      this.isSelectedAccountHasNickname = true;

      if(this.getValue('nickName')){
        this.isNicknameExists=true;
      }

    }
    else {
      this.state.currentNicknameVariable = null;
      this.setVariable('currentNicknameVariable', null);
      this.setHidden('clearNickname', true);
      this.setHidden('delete-nickname', true);
      this.setValue('clearNickname',null);
      this.state.productName=payload?.productDesc;
      this.isSelectedAccountHasNickname = false;
    }
  }
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.reset('nickName', "");
    if (this.formGroup.controls['clearNickname'].value == "Y" || this.formGroup.controls['clearNickname'].value==null) {
      this.setValue('clearNickname', "N");
      this.setMandatory('nickName', true);
    }
  }
  public handleClearNicknameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      if (value == "Y") {
        this.reset('nickName', "");
        this.setMandatory('nickName', false);
        this.setHidden('nickName', true);
        this.setServiceCode('RETAILDELNICKNAME');
      }
      else {
        this.setHidden('nickName', false);
        this.setValue('nickName', this.state.currentNicknameVariable);
        this.state.nickname = this.state.currentNicknameVariable;
      }
    }
  }
  public handleNickNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(!value) this.disableDeleteBtn =  true;
    else this.disableDeleteBtn = false;
    if(this.getValue('nickName')){
      this.isNicknameExists=true;
    }
    else{
      this.isNicknameExists=false;
    }

    if (value && value?.includes('')) {
    const normalizedValue = value.replace(/\s+/g, ' ').trim();
    this.setValue('nickName', normalizedValue);
  }


    if(this.state.nickname == value){
      this.setValue('nicknameFlag', 0);
      this.setErrors('nickName','nickname_exists_error')
    } else {
      this.setValue('nicknameFlag', 1);
    }

    if(this.getValue('clearNickname')=='' || this.getValue('clearNickname')==undefined){
      this.setServiceCode('RETAILADDNICKNAME');
    }
    // WRITE CODE HERE TO HANDLE 
  }
  public onaccountNickNameReceived: BaseFpxControlEventHandler = (payload: any) => {
    
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    this.addValueChangeHandler("nickName", this.handleNickNameOnvalueChange);
    this.addValueChangeHandler("clearNickname", this.handleClearNicknameOnvalueChange);
    // this.addControlEventHandler("accountNickNameReceived", this.onaccountNickNameReceived);
    this.handleFormOnLoad();
    this.removeShellBtn("RESET");
    // if (this.isSelectedAccountHasNickname) {
      this.addShellButton("Delete", "DELETE", "secondary", 'ENTRY', 'button');
      this.setShellBtnMethod('DELETE', this.onDelete.bind(this));
    // }
  }


  public override preSubmitInterceptor(payload: Accountnickname): any {

    if (this.serviceCode.value === "RETAILDELNICKNAME") {
      payload = {
        accountNumber: this._activeSpaceInfoService.getAccountNumber(),
        action: 2,
        nickName: this.state.productName
      }
    } else if (this.serviceCode.value === "RETAILADDNICKNAME") {
      payload = {
        accountNumber: this._activeSpaceInfoService.getAccountNumber(),
        action: 1,
        nickName: payload.nickName,
      }
    } else if (this.serviceCode.value === "RETAILACCNICKNAME") {
      payload = {
        accountNumber: this._activeSpaceInfoService.getAccountNumber(),
        action: 2,
        nickName: payload.nickName
      }
    }

    payload.accountType = this.selectedAccountNicknameDetails?.accountType;

    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Accountnickname) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  nicknameModelAfterClose: FpxModalAfterClosed = (payload: any) => {
    
     if (payload == 1) {
      this.setServiceCode("RETAILDELNICKNAME");
      this.triggerSubmit();
     }
    
  }

  onDelete() {
   
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass("dep-alert-popup");
    // fpxModal.setBackDropClass(["dep-popup-back-drop", "delete-backdrop"]);
    fpxModal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    fpxModal.setData({
      message: "DeleteNicknamePopup.message",
      okBtnLbl: "DeleteNicknamePopup.okBtnLbl",
      cancelBtnLbl: "DeleteNicknamePopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    fpxModal.setAfterClosed(this.nicknameModelAfterClose);
    this.openModal(fpxModal);
  }


  override preSubmitRevalidation() {
    return true;
  }

  clearNickname() {
    this.setValue('nickName', "");
  }



  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


