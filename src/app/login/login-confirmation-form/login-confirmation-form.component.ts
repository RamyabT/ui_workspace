import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-confirmation-form',
  templateUrl: './login-confirmation-form.component.html',
  styleUrls: ['./login-confirmation-form.component.scss']
})

export class LoginConfirmationFormComponent implements OnInit {

  result: any;
  apiErrorMsg: any;
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
    if(requestPayload.status==='FAILUR'){
      this.result.statusCode = '500'
      this._requestStatus = 'errorend'
      this.apiErrorMsg = requestPayload?.routingInfo?.queryParams?.response.description
      this._requestServiceCode = requestPayload?.routingInfo?.queryParams?.response?.serviceCode?.value
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
  }

  gotoModule(module: string){
    this._router.navigate([module]);
  }

  doRepeat(){
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoLogin(){
    // this._router.navigate(['login-space/entry-shell/login']);
    this._router.navigate(['login-space/entry-shell/login/login-form'])
  }

}
