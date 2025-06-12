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
    // this._activeSpaceInfoService.setOrginSpace('');
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    let processResponse = requestPayload?.requestPayload;

    this._requestServiceCode = processResponse?.serviceCode;
    this._requestStatus = requestPayload?.taskName;

    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
    } 
    else {
      this.result.statusCode = "success";
    }

    if(processResponse?.operationMode == 'M' || processResponse?.operationMode == 'D') this._requestStatus = this._requestStatus + "_" + processResponse?.operationMode;

    this.result.additionalInfo = [
      {
        label: "requestRefrence",
        value: processResponse.requestReference
      },
      {
        label: "transactionDate",
        value: processResponse.initiatedOn,
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
    this._router.navigate(['pfm-space']);
  }

}
