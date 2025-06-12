import { Injectable, ViewChild } from "@angular/core";
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
  FpxModalAfterClosed
} from "@fpx/core";
import { Router } from "@angular/router";
import { ChequedepositService } from '../chequedeposit-service/chequedeposit.service';
import { Chequedeposit } from '../chequedeposit-service/chequedeposit.model';
import { TakePictureControlComponent } from "@app/utility";
import { AppConfigService } from "@dep/services";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { CurrencyAmountControlComponent } from "src/app/foundation/amount-currency-control/amount-currency-control.component";
import { ChequeDepositHelpComponent } from "../cheque-deposit-help/cheque-deposit-help.component";
import { ChequeDepositHelpClosedResult, ChequeDepositHelpData, ChequeDepositHelpMode } from "../cheque-deposit-help/interfaces";
import { MockCameraData } from "src/app/utility/mock-camera/mock-camera-data";
import { DeviceDetectorService } from "src/app/dep/core/class/device-detector.service";
export class RetailChqdDepositFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	chequeAmount:any={
	  isCurrEditable: false,
	  CurrencyList: [{ id: 'CAD', text:'CAD'}],
	  amountInWords : false,
	  initCurrency : 'CAD',
	  defaultFetch : false,
    domainControlValue: {amount: 0.00, currencyCode: 'CAD'}
	}
	chequeImageFrontSide:any={
	   minSize:"1024",
	   maxSize:"10000024",
	   extensions:".pdf,.jpg,.jpeg,.png"
	}
	chequeImageBackSide:any={
	   minSize:"1024",
	   maxSize:"10000024",
	   extensions:".pdf,.jpg,.jpeg,.png"
	}
	cbxrTerms:any={
	   textPosition:"after",
	   ckValues:{checked:"Y",unchecked:"N"}
	}
  selectedAccount: any;
  isPreferredAccount: boolean = false; 
  eligibleAccountList: any[] = [];
}


@Injectable()
export class RetailChqdDepositFormHelper extends BaseFpxFormHelper<RetailChqdDepositFormState>{

   constructor( private retailChqdDepositFormService: ChequedepositService, private _httpProvider : HttpProviderService,private _router: Router, 
    private appConfig: AppConfigService,
    private deviceDetector: DeviceDetectorService,
    private mockCameraData: MockCameraData
   ) 
    {
        super(new RetailChqdDepositFormState());
    }
   
  override doPreInit(): void {
    this.setServiceCode("CHEQUEDEPOSIT");
  
    if(this.appConfig.hasData("selectedAccountFromSummary")) {
      this.state.selectedAccount = this.getDepositAccount(this.appConfig.getData("selectedAccountFromSummary"))
      console.log(this.appConfig);
    } else {
      this.state.selectedAccount = this.getPreferredAccount();
      console.log(this.appConfig);
    }
    if(this.appConfig.hasData("CASAACCOUNTSLIST")) {
      this.state.eligibleAccountList = this.getEligibleAccountList();
    }
    if(this.state.selectedAccount?.accountNumber) {
      this.formGroup.get('depositAccount')?.setValue(this.state.selectedAccount?.accountNumber);
    }

  }
   

  public override doPostInit(): void {
  }
  
 
  public override preSubmitInterceptor(payload: Chequedeposit):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Chequedeposit){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.chequedeposit.tenantId.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }

  public takeFrontImage(pictureControl: TakePictureControlComponent) {
    this.showChequeHelpModal(ChequeDepositHelpMode.FRONT, pictureControl);
  }

  public takeBackImage(pictureControl: TakePictureControlComponent) {
    this.showChequeHelpModal(ChequeDepositHelpMode.BACK, pictureControl);
  }

  public showChequeHelpModal(mode: ChequeDepositHelpMode, pictureControl: TakePictureControlComponent) {

    if (!this.deviceDetector.isHybrid()) {
      this.mockCameraData.setImageSrc(`/assets/images/cheque-deposit/sample-cheque-${mode}.png`);
    }

    const showModal = !this.getHideHelpState(mode);

    if (showModal) {
      let modal = new FpxModal();
      modal.setComponent(ChequeDepositHelpComponent);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass(["dep-popup-back-drop", "bottom-transparent-overlay"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.afterChequeHelpClosed(mode, pictureControl));
      modal.setData({
        mode,
      } as ChequeDepositHelpData);
      this.openModal(modal);
    } else {
      this.showCamera(mode, pictureControl);
    }
  }

  public afterChequeHelpClosed(mode: ChequeDepositHelpMode, pictureControl: TakePictureControlComponent) {
    return (result: ChequeDepositHelpClosedResult) => {
      if (result.action === 'next') {
        this.showCamera(mode, pictureControl);
        this.setHideHelpState(mode, result.hideMessageNextTime || false);
      }
      console.log('after closed', result)
    }
  }

  public showCamera(mode: ChequeDepositHelpMode, pictureControl: TakePictureControlComponent) {
    pictureControl.startTakePic();
  }

  public setHideHelpState(mode: ChequeDepositHelpMode, state: boolean) {
      localStorage.setItem(`hide-cheque-help`, state ? 'true' : 'false')
  }

  public getHideHelpState(mode: ChequeDepositHelpMode) {
    return localStorage.getItem(`hide-cheque-help`) === 'true'
  }

  public setPicture(imgData: any, type: any) {
    if (type === 'front') {
      this.setValue('chequeImageFrontSide', imgData); 
    }
    if (type === 'back') {
      this.setValue('chequeImageBackSide', imgData);
    }
  }

  public resetPicture(imgData: any, type: any) {
    if (type === 'front') {
      this.reset('chequeImageFrontSide')
    }
    if (type === 'back') {
      this.reset('chequeImageBackSide');
    }
  }

  override ngOnDestroy(): void {
    this.appConfig.removeData("selectedAccountFromSummary");
  }

 //$START_CUSTOMSCRIPT\n

 getDepositAccount(accountNumber: any):any {
  let selectedAccount: any;
  let eligibleAccountList = this.getEligibleAccountList();

  const match = eligibleAccountList.find(
  (acc) => acc.accountNumber === accountNumber
  );

  if(match) {
    selectedAccount = match;
  } else if (eligibleAccountList?.length === 1) {
    selectedAccount = eligibleAccountList[0]
  } else if (eligibleAccountList?.length > 1) {
    selectedAccount = this.getPreferredAccount();
  } else {
    console.warn('no matching account and no eligible account found');
  }

  return selectedAccount;
 }

 getEligibleAccountList(): any[] {
    let eligibleAccountList: any[] = [];
    eligibleAccountList = this.getCasaAccountList().filter((acc: any) => acc.accountCurrency === 'CAD') || [];
    return eligibleAccountList;
 }

 getCasaAccountList(): any[] {
  let casaAccountList: any[] = [];
  if(this.appConfig.hasData("CASAACCOUNTSLIST")) {
    casaAccountList = this.appConfig.getData("CASAACCOUNTSLIST");
  }
  return casaAccountList;
 }

  getPreferredAccount(): any {
    let eligibleAccountList = this.getEligibleAccountList();
    let preferredAccount = eligibleAccountList[0];

    for (const account of eligibleAccountList) {
      if(account.preferredAccount) {
        preferredAccount = account;
        this.state.isPreferredAccount = true;
        break;
      }
    }

    return preferredAccount;
  }
  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  openAccountSelectionModal(): void {
        let modal = new FpxModal();
        modal.setComponent(CASAAccountsListComponent);
        modal.setPanelClass('full-view-popup');

        modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop']);
        modal.setDisableClose(true);
        modal.setData({
          title: 'Deposit into',
          accountsList: this.state.eligibleAccountList,
          selectedAccount: this.state.selectedAccount,
          fromPaymentsModule: true
        });
        modal.setAfterClosed(this.accountSelectedAfterClose);
        this.openModal(modal)
  }

    accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
      switch (payload.action) {
        case 1: 
        this.state.selectedAccount = payload.data;
        this.state.isPreferredAccount = payload.data.preferredAccount;
        this.formGroup.get('depositAccount')?.setValue(payload.data.accountNumber);
        break;

        default: 
        break;
      }
    }

 //$END_CUSTOMSCRIPT\n
}
 

