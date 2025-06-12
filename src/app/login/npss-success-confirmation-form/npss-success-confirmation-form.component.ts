import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';

@Component({
  selector: 'app-npss-success-form',
  templateUrl: './npss-success-confirmation-form.component.html',
  styleUrls: ['./npss-success-confirmation-form.scss']
})

export class NPSSSuccessFormComponent implements OnInit  {

  result: any;
  redirectionUrl:any
  NPSSLoginPayload:any
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";

  constructor(
    private _router:Router,
    private _activeSpaceInfoService:ActiveSpaceInfoService,
    private _appConfig:AppConfigService
    ) {
    
  }

  ngOnInit(): void {
    console.log('npss: confirmation receipt');
    this._activeSpaceInfoService.setOrginSpace('npss-space');
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    // this.NPSSLoginPayload=this._appConfig.getData('NPSSLogin');
    this.result.requestPayload = requestPayload;
    this.redirectionUrl=this.result.requestPayload.validCustomer?.redirectUri+'?code='+this.result.requestPayload.validCustomer.code+'&id_token='+this.result.requestPayload?.validCustomer?.identityToken+'&state='+this.result.requestPayload?.validCustomer?.state+'&response_type='+this.result.requestPayload?.validCustomer?.response_type

    this.result.status="SuccessEnd";

    this._requestServiceCode = "RETAILNPSSLOGIN";
    this._requestStatus = "SuccessEnd";

    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
    } else {
      this.result.statusCode = "success";
    }

    this.result.additionalInfo = [
      {
        label: "requestRefrence",
        value: requestPayload?.requestReference
      },
      {
        label: "transactionDate",
        value: requestPayload?.initiatedOn,
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
    // this._router.navigate(['home']);

    // console.log("model closed...", payload);
    window.open( this.redirectionUrl, "_blank");
  }

}
