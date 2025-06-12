import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorageManager } from '@dep/native';
import moment from 'moment';

@Component({
  selector: 'app-settings-confirmation-receipt-form',
  templateUrl: './settings-confirmation-receipt-form.component.html',
  styleUrls: ['./settings-confirmation-receipt-form.component.scss']
})

export class SettingsConfirmationReceiptFormComponent implements OnInit {
  doStartTimer: Subject<void> = new Subject();
  result: any;
  private _appConfig: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  protected forceLogout: boolean = false;

  resultPayload: any
  discription: any;
  constructor(
    private _translateService: TranslateService,
    private _router: Router, 
    private _loginService: TestLoginService,
    private _nativeStorage: NativeStorageManager
  ) {
  }

  ngOnInit(): void {
    console.log('Settings: confirmation receipt');
  }

  ngAfterViewInit() {}

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;

    if(requestPayload?.requestStatus=="ErrorEnd"){
      this.result.statusCode = "failure";
      if(this.result.requestPayload.errorCode == "DEPOTPERROR002"){
        this.result.requestPayload.errorCode = "confirmationReceiptForm.retryOtpExceeded";
      }
    }

      if ((this._requestServiceCode === 'RETAILSTNGCHANGEPASSWORD') && this._requestStatus === 'SuccessEnd') {
        this.forceLogout = true;
        setTimeout(() => {
          this._loginService.logout();
        }, 5000);
      } else if(this._requestServiceCode === 'RETAILCHANGEMPIN' && this._requestStatus === 'SuccessEnd' && this._appConfig.hasData('deviceAuthInfo')){
        this._nativeStorage.storeData('deviceAuthInfo', this._appConfig.getData('deviceAuthInfo')).then(
          (result:any) => {
            this.forceLogout = true;
            setTimeout(() => {
              this._loginService.logout();
            }, 5000);      
          }
        );
      } else {
        this.forceLogout = false;
      }
      if(requestPayload?.requestReference && requestPayload?.initiatedOn){
        this.result.additionalInfo = [
          {
            label: "requestRefrence",
            value: requestPayload?.requestReference
          },
          {
            label: "dateAndTime",
            value: moment(requestPayload?.initiatedOn).format('DD MMM yyyy, HH:mm'),
            format: 'date'
          }
        ]
    }
    // }

  }

  gotoModule(module: string) {
    this._router.navigate([module]);
  }

  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoLogin() {
    this._router.navigate(['login-space/entry-shell/login']);
  }

  gotoSettings() {
    this._router.navigate(['settings-space']);
  }

  public logout() {

  }

}
