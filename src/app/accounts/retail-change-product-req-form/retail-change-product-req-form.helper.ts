import { ChangeDetectorRef, inject, Injectable } from "@angular/core";
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
  FpxSubmitHandler,
  FpxResetHandler,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ChangeproductreqService } from '../changeproductreq-service/changeproductreq.service';
import { Changeproductreq } from '../changeproductreq-service/changeproductreq.model';
// import { ActiveSpaceInfoService } from "src/app/dep/core/class/active-space-info.service";
import { CasaproductsService } from "../casaproducts-service/casaproducts.service";
import { httpRequest } from "@okta/okta-auth-js";
import { TermsConditionControlComponent } from "src/app/foundation/terms-condition-control/terms-condition-control.component";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { TranslateModule } from '@ngx-translate/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";


export class RetailChangeProductReqFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: "Y" 

  }
  accountType: string = "";
  productInformation: string = "";
  productDescription: string = "";
  public accountNum:string="";
  public accountNumber: any;
  newProductDescription: string = "";
  accountTypeName: string = "";
  productCode: string = "";
  public labelValue: string = "";
  resetClicked: boolean = false;
  public canSubmit: boolean = false;
  field:string="newProductCode";
  enableNext:boolean=false;
  


}


@Injectable()
export class RetailChangeProductReqFormHelper extends BaseFpxFormHelper<RetailChangeProductReqFormState> {
  http: any;

  constructor(private retailChangeProductReqFormService: ChangeproductreqService, private _httpProvider: HttpProviderService, private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _casaproductsService: CasaproductsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _appConfigservice:AppConfigService
  ) {
    super(new RetailChangeProductReqFormState());
  }

  override doPreInit(): void {
    // this.setHidden('termsBlock', true);
    this.setHidden('termsFlag', true);
    // this.addSubmitHandler('submit', this.customSubmitHandler);
    this.setServiceCode("RETAILCHANGEPRODUCT");
    this.hideShellActions();
    // this.removeShellBtn("RESET");

    // this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    // this.addValueChangeHandler("newProductDescription", this.handlenewProductDescriptionOnvalueChange)
    // this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
  }
 

  onSubmit() {
    console.log("next is called");
    // this._appConfigservice.setData('changeProductRequest',payload);
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass("dep-alert-popup");
    fpxModal.setBackDropClass(["dep-popup-back-drop", "change-backdrop"]);
    fpxModal.setData({
      message: this.state.labelValue,
      okBtnLbl: "ChangeAccountPopup.okBtnLbl",
      cancelBtnLbl: "ChangeAccountPopup.cancelBtnLbl",
      confirmationIcon: "changeProduct"
    });
    fpxModal.setAfterClosed(this.changeAccountModelAfterClose);
    this.openModal(fpxModal);
    return {
      success: () => {
        console.log("on submit");
      },
      error: () => {
        console.log("error");
      }
    }
  }



  handlenewProductDescriptionOnvalueChange(arg0: string, handlenewProductDescriptionOnvalueChange: any) {
    // this.handleFormOnLoad();
    console.log("Desc changed");
    this.reset('termsFlag');
    // this.setHidden('termsBlock', true);
    throw new Error("Method not implemented.");
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.state.resetClicked = true;
    this.state.canSubmit = false;
    this.state.accountNumber = "";
    this.state.newProductDescription = "";
    this.state.productDescription = "";
    this.state.accountTypeName = "";
    console.log(this.state.accountNumber);
    this.onResetClick(payload);
    
  }

  public onNewProductCodeDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    console.log(this.state.resetClicked);
    this.state.resetClicked = false;
    console.log(this.state.resetClicked);
    if (payload && this.formMode == 'ADD' && this.state.accountNumber) {
      this.state.productInformation = payload;
      this.state.newProductDescription = payload.productDescription;
      this.state.termsFlag.ckValues = 'Y';
      this.state.labelValue = "Your Current Product, <span class='value'><b>"+this.state.productDescription +"</b></span> will be changed to <span class='value'><b>"+ this.state.newProductDescription+"</b></span>.";
      console.log(this.state.labelValue);
      // this.state.labelValue = 'Existing ${this.state.accountTypeName} changes from ${this.state.productDescription} ${this.state.accountNumber} to ${this.state.newProductDescription} ${this.state.accountNumber}`
      this.state.termsFlag.label = this.state.labelValue;
      this.state.enableNext = true;
      console.log(this.state.enableNext);

    }
    this.setHidden('RetailChangeProductReqForm.termsFlag.label', false);
    this._changeDetectorRef.detectChanges();
  }

  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if (value) {
      console.log(formGroup.value);
      console.log("Value changed" + value);
      this.reset('newProductCode');
      this.state.accountNumber = value;
      this.state.productDescription = "";
      this.state.newProductDescription = "";
      this.state.accountTypeName = "";
      this.state.termsFlag.label = "";
      this.setHidden('RetailChangeProductReqForm.termsFlag.label', true);
      this.state.canSubmit = false;
      this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
      this._changeDetectorRef.detectChanges();
    }
  }


  public generateLabelValue(): string {
    return this.state.labelValue;
  }

  public handleFormOnLoad() {
    // let accountNum: any = this._activeSpaceInfoService.getAccountNumber();
    let accountNum: any = this.getRoutingParam('accountNumber');

    if (this._activeSpaceInfoService.getAccountNumber()) {
      this.setValue('accountNumber', this._activeSpaceInfoService.getAccountNumber());
    }
    this.reset('productDescription', "Please Select");
    this.setValue('newProductDescription', "Please Select");
    this.setValue('termsFlag', 'Y');
    this.setHidden('accountNumber', true);
    this.setHidden('termsFlag', true);
    this.setHidden('termsBlock', true);

  }

  changeAccountModelAfterClose: FpxModalAfterClosed = (payload) => {
    
    
      

    if(payload == 1){
      this.triggerSubmit();
    }
  }


  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    this.state.resetClicked = false;
    this.state.accountType = payload.accountType;

    if (payload && this.formMode == 'ADD') {
      this.state.accountType = payload.accountType;
      if (payload.accountType == "CAA") {
        this.state.accountTypeName = "Chequing Account";
      }
      else {
        this.state.accountTypeName = "Savings Account";
      }
      this.state.accountNumber = payload.accountNumber;
      this.setVariable('accountType', payload.accountType);
      this.setVariable('productCode', payload.productCode);
      this.state.productDescription = payload.productDesc;
      if (this.state.productDescription) {

      }
      this.addControlEventHandler("newProductCodeDataReceived", this.onNewProductCodeDataReceived);
      this._changeDetectorRef.detectChanges();
    }
  }


  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.changeproductreq;
      
      routingInfo.setQueryParams({
        response:res
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



  public onResetClick: BaseFpxControlEventHandler = (payload: any) => {
    this.reset('newProductCode');
    this.doPostInit();
    this.formGroup.reset();
    this.state.canSubmit = false;
    this.state.resetClicked = true;
    this.doPostInit();
    return {
      success: () => {
        console.log("on reset");
      },
      error: () => {
        console.log("error");
      }
    }
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addValueChangeHandler("newProductDescription", this.handlenewProductDescriptionOnvalueChange)
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Changeproductreq): any {
    // WRITE CODE HERE TO HANDLE 
    payload.accountNumber =this._activeSpaceInfoService.getAccountNumber();
    payload.termsFlag='Y';
    
    return payload;
  }


  public override postDataFetchInterceptor(payload: Changeproductreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


