import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, BaseFpxFunctionality, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService } from '@dep/core';

@Component({
  selector: 'app-npss-failure-form',
  templateUrl: './npss-failure-confirmation-form.html',
  styleUrls: ['./npss-failure-confirmation-form.scss']
})

export class NPSSFailureFormComponent extends BaseFpxFunctionality implements OnInit {

  result: any={
  };
  redirectionUrl:any
  NPSSLoginPayload:any
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  errorMessage:any

  constructor(
    private _router:Router,
    private _activeSpaceInfoService:ActiveSpaceInfoService
    ) {
      super();
    
  }

  ngOnInit(): void {
    console.log('npss: confirmation receipt');
    this._activeSpaceInfoService.setOrginSpace('npss-space');
  }

  public setPageDependency(requestPayload: any): void {
    if(this.getRoutingParam('errorMessage')){
      this.result={
        errorCode:"Sorry",
        errorMessage:this.getRoutingParam('errorMessage')

      }
    }

    if(requestPayload?.routingInfo?.queryParams?.result?.serviceCode?.value && requestPayload?.status == 'FAILUR'){
      this.result.requestPayload={
       // requestPayload:requestPayload?.routingInfo?.queryParams?.result,
        errorCode:requestPayload?.routingInfo?.queryParams?.result?.code,
        errorMessage:requestPayload?.routingInfo?.queryParams?.result?.description,
        message:requestPayload?.routingInfo?.queryParams?.result?.description

      }
    }
    this.result.status="failure";

    this._requestServiceCode = "RETAILNPSSLOGIN";
    this._requestStatus = "ErrorEnd";

    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
    } else {
      this.result.statusCode = "success";
    }


  }

  gotoModule(module: string){
    this._router.navigate([module]);
  }

  doRepeat(){
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome(){
    let url=this.getRoutingParam('navigationUrl');
    window.open(url, "_blank");
  }

}
