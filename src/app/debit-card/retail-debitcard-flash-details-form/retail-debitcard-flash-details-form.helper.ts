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
import { DebitcardService } from '../debitcard-service/debitcard.service';
import { Debitcard } from '../debitcard-service/debitcard.model';
import { AppConfigService } from "@dep/services";
import { DebitcardDetailsService } from "../debitcard-details-service/debitcard-details.service";
import { CurrencyPipe } from "@angular/common";
import moment from "moment";
export class retaildebitcardformState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	validThru:any={
	   minDate:"",
       maxDate:"",
     };
     issueDate:any={
      minDate:"",
        maxDate:"",
      }
  cardData: Debitcard | undefined;
}


@Injectable()
export class RetailDebitcardFlashDEtailsFormHelper extends BaseFpxFormHelper<retaildebitcardformState>{
  debitcardDetails: any;
  result: any;
   constructor( private retaildebitcardformService: DebitcardService, private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService,
    private _debitcardDetailsService: DebitcardDetailsService,
    public currency: CurrencyPipe
    
    
   ) 
    {
        super(new retaildebitcardformState());
    }
   
  override doPreInit(): void {
//  this.setServiceCode("RETAILDCSUMMARY");
this.removeShellBtn("BACK");
 this.state.cardData = this._appConfig.getData('debitCardData');
 this.setValue('cardRefNumber',this.state.cardData?.cardRefNumber)
 this._debitcardDetailsService.fetchDebitcardDetails(this.state.cardData!.cardRefNumber).subscribe({
  next:(value)=> {
    console.log(value);
    this.state.cardData = {
      ...this.state.cardData,
      ...value
    };
  },
  error:(value)=> {
    
  },
 })
 this.setValue('cardRefNumber',this.state.cardData?.cardRefNumber)

 }
   

  public override doPostInit(): void {
    let key: any ={
      cardRefNumber: this.state.cardData?.cardRefNumber
    }
    this.retaildebitcardformService.findByKey(key)().subscribe(res =>{
      console.log("Debitcard service", res)
      this.debitcardDetails = res;
      this.setValue('cardNumber', this.debitcardDetails.accountNumber);
      this.setValue('status', this.debitcardDetails.status);
      this.setValue('cardType', this.debitcardDetails.cardType);
      this.setValue('validFrom', this.debitcardDetails.validFrom);
      this.setValue('cardRefNumber', this.debitcardDetails.cardRefNumber);
      if (this.debitcardDetails.issueDate) {
        let issueDate: any = moment(this.debitcardDetails.issueDate).format('YYYY-MM-DD');
        this.setValue('issueDate', issueDate);
      }
      this.setValue('branchDesc', this.debitcardDetails.branchDesc);
      this.setValue('accountNumber', this.debitcardDetails.linkedBankAccount);
      this.setValue('cardHolderName', this.debitcardDetails.cardHolderName);
      this.setValue('accountType', this.debitcardDetails.cardType);
      // this.setValue('avlBalance',this.debitcardDetails.availableBalance);
      // this.setValue('actualBalance',this.debitcardDetails.availableBalance)
      let avlBalance = this.currency.transform(this.debitcardDetails.availableBalance, this.debitcardDetails.currency + ' ');
      this.setValue('avlBalance', avlBalance);
      let bal = this.currency.transform(this.debitcardDetails.actualBalance, this.debitcardDetails.currency + ' ');
      this.setValue('actualBalance', bal);
      this.formGroup.updateValueAndValidity();
    })
  }
  
 
  public override preSubmitInterceptor(payload: any):any {
     // WRITE CODE HERE TO HANDLE 
    payload = {
      cardReference: payload.cardRefNumber
    }
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Debitcard){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.flashdebitcardrequest.cardRefNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
