import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-reg-confirmation-receipt-form',
  templateUrl: './self-reg-confirmation-receipt-form.component.html',
  styleUrls: ['./self-reg-confirmation-receipt-form.component.scss']
})

export class SelfRegConfirmationReceiptFormComponent implements OnInit {

  result: any;
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";

  constructor(private _router:Router) {
    
  }

  ngOnInit(): void {
    console.log('accounts: confirmation receipt');
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;
    this._requestServiceCode = requestPayload?.processResponse?.workflowType;
    // this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = 'failure'
      this._requestStatus = 'ErrorEnd'
      // this.apiErrorMsg = requestPayload?.routingInfo?.queryParams?.response.description
      // this._requestServiceCode = requestPayload?.routingInfo?.queryParams?.response?.serviceCode?.value
      if(this.result.requestPayload?.processResponse?.errorCode == "DEPIAM0010"){
            this.result.requestPayload.errorCode = "selfregConfirmationReceiptForm.ARXError10";
        }
    }else{
      this._requestServiceCode = requestPayload?.processResponse?.workflowType;
      this._requestStatus = requestPayload?.requestStatus;
      this._serviceDetail = this._serviceCodeDetails.getServiceDetails(this._requestServiceCode);
      this.result.additionalInfo=[
        {
          label:"referenceNo",
          value:requestPayload.requestReference
        },
        {
        label:"transactionDate",
        value:requestPayload.initiatedOn,
        format:'date'
        }
      ]
      
        if (requestPayload.operationMode == 'D') {
          this._requestStatus = this._requestStatus + "_D";
        }
  
    }
    // if(requestPayload?.requestStatus=="ErrorEnd"){
    //   this.result.statusCode = "failure";
    //   if(this.result.requestPayload?.processResponse?.errorCode == "DEPIAM0010"){
    //     this.result.requestPayload.errorCode = "selfregConfirmationReceiptForm.ARXError10";
    //   }
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

  gotoLogin(){
    this._router.navigate(['login-space/entry-shell/login']);
  }

}
