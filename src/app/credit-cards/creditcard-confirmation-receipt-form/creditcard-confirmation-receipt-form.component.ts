import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { Creditcard } from '../creditcard-service/creditcard.model';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-creditcard-confirmation-receipt-form',
  templateUrl: './creditcard-confirmation-receipt-form.component.html',
  styleUrls: ['./creditcard-confirmation-receipt-form.component.scss']
})
export class CreditcardConfirmationReceiptFormComponent implements OnInit {

  result: any;
  serviceReq :boolean=false;
  cardNumber:string="";
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  cardData!: Creditcard;
  transactionReference: string="";
  
  constructor(private _router:Router,
    private _appConfig: AppConfigService) {
    
  }

  ngOnInit(): void {
    console.log('credit card: confirmation receipt');
    this.cardData = this._appConfig.getData('creditCardData');
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if(requestPayload.serviceCode=='RETAILCCRAISEDISPUTE' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.serviceReq=true;
      this.transactionReference = this._appConfig.getData('transactionReference');
    }
    if(requestPayload.serviceCode=='RETAILCCREPLACE' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.serviceReq=true;
      this.cardNumber =  requestPayload?.cardReferenceNumber.substr(requestPayload?.cardReferenceNumber.length - 5);
    }
    if(requestPayload.serviceCode=='RETAILCCBLOCK' && requestPayload?.requestStatus=="SuccessEnd"){
      this.cardNumber = this._appConfig.getData('cardEndNumber');
    }
    if(requestPayload.serviceCode=='RETAILCCLIMITCHANGE' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.serviceReq=true;
    }
    if(requestPayload.serviceCode=='RETAILAPPLYCREDITCARD' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.serviceReq=true;
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
    this._router.navigate(['cards-space','entry-shell','credit-cards','retail-cc-change-pin-form'], {
      queryParams: {
        accountNumber: this.cardData.primaryCardAccNumber,
        cardRefNumber: this.cardData.cardRefNumber
      }
    });
  }

  gotoServiceReq(){
    this._router.navigate(['service-request-space']);
  }
}
