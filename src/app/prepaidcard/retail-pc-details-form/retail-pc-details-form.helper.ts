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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { PpCardService } from '../ppCard-service/ppCard.service';
import { PpCard } from '../ppCard-service/ppCard.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import moment from "moment";
import { CurrencyPipe } from "@angular/common";
import { PcCardBalanceInfoComponent } from "../pc-card-balance-info/pc-card-balance-info.component";
import { DeviceDetectorService } from "@dep/core";
export class RetailPCDetailsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	validThru:any={
	   minDate:"",
       maxDate:"",
     }
	FieldId_9:any={
	 text:" <span>Linked Account&nbsp; Details</span>"
	}
  cardData!: Prepaidcard;
}


@Injectable()
export class RetailPCDetailsFormHelper extends BaseFpxFormHelper<RetailPCDetailsFormState>{
  prepaidcardDetails:any
   constructor( private retailPCDetailsFormService: PpCardService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService,
    public currency: CurrencyPipe,
    private device: DeviceDetectorService) 
    {
        super(new RetailPCDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILFLASHPREPAIDCARD");
this.removeShellBtn('BACK');
 }
 public handleFormOnLoad(){
  this.state.cardData = this._appConfig.getData('prepaidCardData');
  this.setValue('cardReference',this.state.cardData?.cardRefNumber);
}  


openCardBalanceDetails() {
  const fpxModal = new FpxModal();
    fpxModal.setComponent(PcCardBalanceInfoComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass('info-popup');
    fpxModal.setBackDropClass(['casa-transaction-info-back-drop']);
    fpxModal.setData({
      title: 'DEBITCARD.cardbal',
      balanceDetails: this.prepaidcardDetails?.balanceDetails,
      prepaidcard: this.prepaidcardDetails

    });
    this.openModal(fpxModal);
}

  public override doPostInit(): void {
    this.handleFormOnLoad();
    let key: any = {
      cardReference: this.state.cardData?.cardRefNumber,
    };
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.retailPCDetailsFormService
      .findByKey(key)()
      .subscribe((res) => {
        this.prepaidcardDetails = res;
        this.setValue('branchDesc',this.prepaidcardDetails.branchDesc);
        this.setValue('issueDate',this.prepaidcardDetails.issueDate);
        this.setValue('validFrom',this.prepaidcardDetails.validFrom);
        // this.setValue('accountNumber',this.prepaidcardDetails.primaryCardAccNo);
        // this.setValue('cardHolderName',this.prepaidcardDetails.cardHolderName);
        //this.setValue('productDesc',this.prepaidcardDetails.lastRechargeAmount);
        this.setValue('actualBalance',this.prepaidcardDetails.lastTopupdate);
        this.setValue('accountType',this.prepaidcardDetails.multiCurrencySupported);
        let topupAmount= this.currency.transform(this.prepaidcardDetails.lastRechargeAmount,this.prepaidcardDetails.currency+' ');
        this.setValue('productDesc',topupAmount);
        let avlBalance= this.currency.transform(this.prepaidcardDetails.avlbalance,this._appConfig.baseCurrency+' ');
        this.setValue('avlBalance',avlBalance);
      // this.setValue('avlBalance',this.prepaidcardDetails.avlbalance);
          this.formGroup.updateValueAndValidity();
    })
  }
  
 
  public override preSubmitInterceptor(payload: any):any {
     // WRITE CODE HERE TO HANDLE 
     payload = {
      cardReference: payload.cardReference,
    };
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: PpCard){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      if (this.state.cardData?.pinStatus == '0') {
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass('dep-popup-back-drop');
        modal.setDisableClose(false);
        modal.setData({
          message: "Please set your Card PIN to proceed",
        });
        modal.setAfterClosed(this.MenuClose);
        this.openModal(modal);
      }
      else {
        setTimeout(() => {
          this._router.navigate(["cards-space", "entry-shell", "prepaidcard", "pc-verify-pin-validation-form"], {
            queryParams: {
              "cardReference": this.state.cardData?.cardRefNumber,
              "inventoryNumber": response.success.body.flashprepaidcardrequest.inventoryNumber
            }
          });
        });
      }
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }

  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
      setTimeout(() => {
        this._router.navigate(["cards-space", "entry-shell", "prepaidcard", "retail-prepaid-change-pin"], {
          queryParams: {
            "cardReference": this.state.cardData?.cardRefNumber
          }
        });
      });
    }
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
