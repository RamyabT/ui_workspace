import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-failure-result-form',
  templateUrl: './failure-result-form.component.html',
  styleUrls: ['./failure-result-form.component.scss']
})
export class FailureResultFormComponent implements OnInit {

  private reqServiceCode: string = "";
  discription!: string;
  constructor(
    private _appConfig: AppConfigService,
    private _router:Router
  ) { }

  public setPageDependency(requestPayload: any): void {
    console.log("Failure result screen!", requestPayload);
    let queryParamData = requestPayload?.routingInfo?.queryParams;
    this.reqServiceCode = queryParamData?.serviceCode;
    // if(queryParamData?.response?.ErrorDescription){
    //   this.discription = queryParamData?.response?.ErrorDescription;
    // }
  }

  ngOnInit(): void {
  }

  tryAgain(){
    if(this.reqServiceCode){
      let service = this._appConfig.getServiceDetails(this.reqServiceCode);
      this._router.navigate(service.servicePath);
    } else {
      this._router.navigate(['dashboard']);
    }
  }

  gotoHome(){
    this._router.navigate(['dashboard']);
  }

}
