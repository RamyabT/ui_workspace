import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-debitcard-confirmation-receipt-form',
  templateUrl: './debitcard-confirmation-receipt-form.component.html',
  styleUrls: ['./debitcard-confirmation-receipt-form.component.scss']
})

export class DebitcardConfirmationReceiptFormComponent implements OnInit {

  result: any;
  setPin:boolean=false;
  fav: boolean=true;
  serviceReq :boolean=false;
  cardNumber:string="";
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  transactionReference: string = "";

  constructor(private _router:Router,
    private _commonService: CommonService,private _appConfig: AppConfigService) {
    
  }

  ngOnInit(): void {
    console.log('debitcard: confirmation receipt');
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if(requestPayload.serviceCode=='RETAILDCACTIVATECARD' && requestPayload?.requestStatus=="SuccessEnd"){
      this.setPin=true;
      this.fav=false;
    }
    if(requestPayload.serviceCode=='RETAILDCBLOCK' && requestPayload?.requestStatus=="SuccessEnd"){
      this.cardNumber = this._appConfig.getData('cardEndNumber');
      this.fav=false;
    }
    if(requestPayload.serviceCode=='RETAILDCUNBLOCK' && requestPayload?.requestStatus=="SuccessEnd"){
      this.fav=false;
    }
    if(requestPayload.serviceCode=='RETAILDCSETPIN' && requestPayload?.requestStatus=="SuccessEnd"){
      this.fav=false;
    }
    if(requestPayload.serviceCode=='RETAILDCRAISEDISPUTE' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.serviceReq=true;
      this.fav=false;
      this.transactionReference = this._appConfig.getData('transactionReference');
    }
    if(requestPayload.serviceCode=='RETAILDCREPLACE' && requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.cardNumber =  requestPayload?.cardReferenceNumber.substr(requestPayload?.cardReferenceNumber.length - 5);
      this.serviceReq=true;
      this.fav=false;
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
    this._router.navigate(['cards-space','entry-shell','debit-card','retail-dc-change-pin-request']);
  }
  gotoServiceReq(){
    this._router.navigate(['service-request-space']);
  }
}
