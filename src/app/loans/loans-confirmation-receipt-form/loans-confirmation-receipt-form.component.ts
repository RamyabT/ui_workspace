import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loans-confirmation-receipt-form',
  templateUrl: './loans-confirmation-receipt-form.component.html',
  styleUrls: ['./loans-confirmation-receipt-form.component.scss']
})

export class LoansConfirmationReceiptFormComponent implements OnInit {

  result: any;
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";

  constructor(private _router:Router) {
    
  }

  ngOnInit(): void {
    console.log('loans: confirmation receipt');
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
    }

    this.result.additionalInfo = [
      {
        label: "requestRefrence",
        value: requestPayload.requestReference
      },
      {
        label: "transactionDate",
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

}
