import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import moment from 'moment';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';

@Component({
  selector: 'app-staging-confirmation-receipt-form',
  templateUrl: './staging-confirmation-receipt-form.component.html',
  styleUrls: ['./staging-confirmation-receipt-form.component.scss']
})
export class StagingConfirmationReceiptFormComponent implements OnInit {
  errorMessage: any;
  errorCode: any;

  result: any;
  isResumeBack:boolean = false;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";

  constructor(
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _loginService: TestLoginService,
    private _appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
  }

  public setAdditionalInfo(requestReference: any,initiatedOn: any): void {
    this.result.additionalInfo = [
      {
        label: "requestRefrence",
        value: requestReference
      },
      {
        label: "transactionDate",
        value: initiatedOn,
        format: 'date'
      }
    ];
  }

  public setPageDependency(requestPayload: any): void {

    const response = requestPayload.routingInfo.queryParams.response.requestStatus;
    const serviceCode = requestPayload.routingInfo.queryParams.response.serviceCode;
    const ErrorCode = requestPayload.routingInfo.queryParams.response.ErrorCode;

    if (ErrorCode == "DEPOTPERROR004") {
      this.errorMessage = requestPayload.routingInfo.queryParams.response.ErrorMessage
      this.errorCode = requestPayload.routingInfo.queryParams.response.ErrorCode
      this._router.navigate(['prelogin-space', 'entry-shell', 'onboarding', 'close-form'], {
        queryParams: {
          errorMessage: this.errorMessage,
          errorCode: this.errorCode,
        }
      });
    } else if (response == "ErrorEnd" && serviceCode == "CASAONBOARDING") {
      this.errorMessage = requestPayload.routingInfo.queryParams.response.errorMessage
      this.errorCode = requestPayload.routingInfo.queryParams.response.errorCode
      this._router.navigate(['prelogin-space', 'entry-shell', 'onboarding', 'close-form'], {
        queryParams: {
          errorMessage: this.errorMessage,
          errorCode: this.errorCode,
        }
      });
    } else {
      this.result = {};

      const res = requestPayload.routingInfo.queryParams.response.requestPayload;
      const otpRes = requestPayload.routingInfo.queryParams.response;
      requestPayload = res;

    this.result.requestPayload = requestPayload;
    const requestReference = requestPayload.requestReference;
    const initiatedOn = requestPayload.initiatedOn;
    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    this.isResumeBack = requestPayload?.taskName == "RESUMEBACK" ? true : false;

    if (requestPayload?.requestStatus == "ErrorEnd" || requestPayload?.taskName == "RESUMEBACK") {
      this.result.statusCode = "failure";
    } else {
      this.result.statusCode = "success";
    }

    if (requestReference && initiatedOn){
      this.setAdditionalInfo(requestReference,initiatedOn);
    } else if (requestReference){
      this.setAdditionalInfo(requestReference,moment());
    }
  }

  }

  done(data: any) {
    if (data.currentTarget.innerText = "Resume Application") {
      this._router.navigate(['prelogin-space', 'entry-shell', 'resume-back']);
    }
    if (data.currentTarget.innerText = "Home") {
      this._loginService.logout();
    }
  }

}
