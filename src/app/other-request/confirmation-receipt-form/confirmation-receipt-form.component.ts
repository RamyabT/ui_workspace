import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
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

  constructor(
    private _router:Router,
    private _activeSpaceInfoService:ActiveSpaceInfoService,
    public device: DeviceDetectorService,
    private _appConfig: AppConfigService
    ) {
    
  }

  ngOnInit(): void {
    // console.log('npss: confirmation receipt');
    // this._activeSpaceInfoService.setOrginSpace('npss-space');
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;

    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
    } else if(requestPayload?.requestStatus=="ServiceRequestQueue"){
      this.result.statusCode = "success";
    }
    else {
      this.result.statusCode = "success";
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
    if(this._appConfig.hasData('moduleRefresh$')){
        let sub = this._appConfig.getData('moduleRefresh$').subject;
        sub.next({event: 'onFormClose'});
    }
    this._router.navigate(['home']);
  }

}
