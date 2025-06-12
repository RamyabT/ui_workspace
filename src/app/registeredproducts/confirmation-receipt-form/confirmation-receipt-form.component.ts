import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-confirmation-receipt-form',
  templateUrl: './confirmation-receipt-form.component.html',
  styleUrls: ['./confirmation-receipt-form.component.scss']
})

export class ConfirmationReceiptFormComponent implements OnInit {

  result: any;
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  protected message: string = "";
  protected description: string = "";

  constructor(private _router:Router,private _appConfig: AppConfigService) {
    
  }

  ngOnInit(): void {
    console.log('accounts: confirmation receipt');
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if(requestPayload?.requestStatus=="SuccessEnd"){
      // if(this._requestServiceCode=="RETAILESTMTREQ"){
      //   if(this._appConfig.getData("estatementAction")=="1"){
      //     this._requestStatus='registered'+this._requestStatus;
      //   }
      //   else if(this._appConfig.getData("estatementAction")=="2"){
      //     this._requestStatus='deRegistered'+this._requestStatus;
      //   }
      // }
    }

    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
      if(this.result.requestPayload.errorCode == "DEPOTPERROR002"){
        this.result.requestPayload.errorCode = "RPConfirmationReceiptForm.retryOtpExceeded";
        this._router.navigate(['accounts-space', 'entry-shell', 'foundation', 'otp-cancel-form'], {
          queryParams: {
              errorCode: 'DEPOTPERROR002',
          }
      });
      }
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
    // if(this._appConfig.hasData('moduleRefresh$')) {
    //   this._appConfig.getData('moduleRefresh$').subject.next({action: 'ACCOUNTSQUICKACTION',data:{serviceCode:null}});
    // }
    this._router.navigate([module]);
  }

  doRepeat(){
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome(){
    this._router.navigate(['home']);
  }

}
