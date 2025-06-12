import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'app-confirmation-receipt-form',
  templateUrl: './confirmation-receipt-form.component.html',
  styleUrls: ['./confirmation-receipt-form.component.scss']
})

export class ConfirmationReceiptFormComponent implements  OnInit {

  result: any;
  requestPayload:any
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";

  constructor(
    private _router:Router,
    private _activeSpaceInfoService:ActiveSpaceInfoService
    ) {
    
  }

  ngOnInit(): void {
    console.log('npss: confirmation receipt');
    this._activeSpaceInfoService.setOrginSpace('tools-space');
  }

  public setPageDependency(requestPayload: any): void {
    if(this._serviceCodeDetails.getData('depositcalculatorError')){
    this.requestPayload=this._serviceCodeDetails.getData('depositcalculatorError').error;
    this.result = {};
    // this.result.requestPayload = requestPayload;
    if(this.requestPayload.errorCode){
      this.result.statusCode = "failure";
    }
    else{
      this.result.statusCode = "success";
    }}

    // if(requestPayload?.requestStatus=="ErrorEnd"){
    //   this.result.statusCode = "failure";
    // } else {
    //   this.result.statusCode = "success";
    // }

    // this.result.additionalInfo = [
    //   {
    //     label: "requestRefrence",
    //     value: requestPayload.requestReference
    //   },
    //   {
    //     label: "transactionDate",
    //     value: requestPayload.initiatedOn,
    //     format: 'date'
    //   }
    // ]
  }

  gotoModule(module: string){
    this._router.navigate([module]);
  }

  doRepeat(){
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome(){
    this._router.navigate(['tools-space']);
  }

}
