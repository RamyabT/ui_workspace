import { ChangeDetectorRef, Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prelogin-result-form',
  templateUrl: './prelogin-result-form.component.html',
  styleUrls: ['./prelogin-result-form.component.scss']
})

export class PreloginResultFormComponent implements OnInit {
    result: any = {};
    isCobLoadMoney:boolean=false;
  private _appConfig: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";

  constructor(private _router: Router,
    private cd: ChangeDetectorRef) {
    
  }



  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  public setPageDependency(requestPayload: any): void {
    if(requestPayload?.requestStatus=="BOApproval"){
      this.result.statusCode = "failure";
      this.result.requestStatus="BOApproval"
    }
    else {
      this.result.statusCode = "success";
      this.result.requestStatus="successEnd"
    }
    if(requestPayload?.serviceCode=='COBLOADMONEY'){
      this.isCobLoadMoney=true;
    }
  }

 gotoModule(module: string){
    this._router.navigate([module]);
  }
  gotoService(serviceCode:string){
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.servicePath);

  }

  onClickPrimaryButton(){
    if(this.result.requestStatus=="BOApproval"){
    this._router.navigate(['welcome']);
    }else if(this.result.requestStatus=='successEnd'){
      this._router.navigate(['login-space','entry-shell','login']);
    }
  }
 

}
