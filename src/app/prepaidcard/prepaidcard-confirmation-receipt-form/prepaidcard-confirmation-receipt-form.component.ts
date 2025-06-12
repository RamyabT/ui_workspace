import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-prepaidcard-confirmation-receipt-form',
  templateUrl: './prepaidcard-confirmation-receipt-form.component.html',
  styleUrls: ['./prepaidcard-confirmation-receipt-form.component.scss']
})
export class PrepaidcardConfirmationReceiptFormComponent implements OnInit {
  setPin:boolean=false;
  fav: boolean=true;
  result: any;
  cardNumber:string="";
  serviceReq :boolean=false;
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  transactionReference: string = "";

  constructor(private _router:Router, private _appConfig: AppConfigService) {
    
  }

  ngOnInit(): void {
    console.log('prepaid card: confirmation receipt');
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if(requestPayload.serviceCode=='RETAILPPACTIVATION' && requestPayload?.requestStatus=="SuccessEnd"){
      this.setPin=true;
      this.fav=false;
    }
    if(requestPayload.serviceCode=='RETAILPREPAIDBLOCK' && requestPayload?.requestStatus=="SuccessEnd"){
      this.cardNumber = this._appConfig.getData('cardEndNumber');
      this.fav=false;
    }
    if(requestPayload.serviceCode=='RETAILPPDISPUTE' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.serviceReq=true;
      this.fav=false;
      this.transactionReference = this._appConfig.getData('transactionReference');

    }
    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
    }

    this.result.additionalInfo = [
      {
        label: "creditcardConfirmationReceiptForm.requestRefrence",
        value: requestPayload.requestReference
      },
      {
        label: "creditcardConfirmationReceiptForm.transactionDate",
        value: requestPayload.initiatedOn,
        format: 'date'
      }
    ]
  }

  gotoModule(module: string){
    this._router.navigate([module]);
  }

  doRepeat(){
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome(){
    this._router.navigate(['home']);
  }

  doSetPin(){
    this._router.navigate(['cards-space','entry-shell','prepaidcard','retail-prepaid-change-pin']);
  }

  gotoServiceReq(){
    this._router.navigate(['service-request-space']);
  }
}
