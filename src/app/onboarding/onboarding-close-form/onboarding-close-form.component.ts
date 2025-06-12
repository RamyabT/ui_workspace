import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxAppConfig } from '@fpx/core';

@Component({
  selector: 'app-onboarding-close-form',
  templateUrl: './onboarding-close-form.component.html',
  styleUrls: ['./onboarding-close-form.component.scss']
})
export class OnboardingCloseFormComponent extends BaseFpxFunctionality implements OnInit {
  result: any = {};
  errorMessage: any;
  errorCode: any;
  taskName: any;
  requestStatus: any;
  isCobLoadMoney:boolean=false;
  private _appConfig: FpxAppConfig = inject(FpxAppConfig);

  constructor(private _router: Router) {
    super();
  }

  ngOnInit(): void {
  }
  public setPageDependency(requestPayload: any): void {

    if(requestPayload?.serviceCode=='COBLOADMONEY'){
      this.isCobLoadMoney=true;
    }

     if(this.getRoutingParam('taskName')){
      this.taskName = this.getRoutingParam('taskName');
      // this.requestStatus = this.getRoutingParam('requestStatus');
    } else if(this.getRoutingParam('errorCode') && this.getRoutingParam('errorMessage')){
      this.errorCode = this.getRoutingParam('errorCode');
      this.errorMessage = this.getRoutingParam('errorMessage');
    } else {
      this.taskName = requestPayload.processResponse.taskName;
      this.requestStatus = requestPayload.processResponse.requestStatus;
      this.errorMessage = requestPayload.processResponse.errorMessage;
      this.errorCode = requestPayload.processResponse.errorCode;
    }
  }

  gotoService(serviceCode:string){
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.servicePath);

  }

  onClickPrimaryButton(){
      this._router.navigate(['login-space','entry-shell','login']);
  }

  login(){
    this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
  }

  navigateResumeApplication(){
    this._router.navigate(['login-space', 'entry-shell', 'login']);
  }
}
