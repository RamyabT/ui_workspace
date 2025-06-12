import { AfterViewInit, Component, Inject, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, BaseFpxFunctionality, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-confirmation-receipt-form',
  templateUrl: './confirmation-receipt-form.component.html',
  styleUrls: ['./confirmation-receipt-form.component.scss']
})

export class ConfirmationReceiptFormComponent extends BaseFpxFunctionality implements OnInit {
  check = 'check';
  // result: any;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  protected message: string = "";
  protected description: string = "";
  protected statusCode: string = "";
  protected serviceCode: string = "";
  protected result: any={};
  

  constructor(private _router: Router, private _appConfig: AppConfigService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
    private _translateService: TranslateService,
    protected device: DeviceDetectorService
  ) {
    super();
  }
  ngAfterViewInit(): void {
    if (this.result.payload.serviceCode == "RETAILSTOPCHEQUE" || this.result.payload.serviceCode == "RETAILSTOPCHEQUEREV") {

    }
    else{
      if (this._appConfig.hasData('moduleRefresh$')) {
        this._appConfig.getData('moduleRefresh$').subject.next({ action: 'ACCOUNTSQUICKACTION', data: { serviceCode: null } });
      }
    }
    
}

  ngOnInit(): void {
    if(this._dialogData?.statusCode){
      this.result.statusCode = this._dialogData?.statusCode;
    }
    if(this._dialogData?.serviceCode){
      this.serviceCode = this._dialogData?.serviceCode;
    }
    if (this._appConfig.getData('processResponse')) {
      this.setPageDependency(this._appConfig.getData('processResponse'));
    }
    console.log('accounts: confirmation receipt');
  }

 

  public setPageDependency(payload: any): void {
    console.log(payload)
    this.result = {};
    this.result.payload = payload;


    this._requestServiceCode = payload?.serviceCode || this.result.payload.requestPayload.serviceCode;
    this._requestStatus = payload?.requestStatus || this.result.payload.taskName;

    console.log(this._requestServiceCode, this._requestStatus)

    let serviceCode = this.getRoutingParam('serviceCode');
    let formStatus = this.getRoutingParam('status');
    if(serviceCode == 'RETAILCHANGEPRODUCT' && formStatus == 'SuccessEnd'){
      this.result.statusCode='success';
      this._requestServiceCode = serviceCode;
      this._requestStatus = formStatus;
    }
    if (payload?.requestStatus == "SuccessEnd" || payload?.taskName=="SuccessEnd") {
      if (this._requestServiceCode == "RETAILESTMTREQ") {
        if (this._appConfig.getData("estatementAction") == "1") {
          this._requestStatus = 'registered' + this._requestStatus;
        }
        else if (this._appConfig.getData("estatementAction") == "2") {
          this._requestStatus = 'deRegistered' + this._requestStatus;
        }
      }

      if (this._requestServiceCode === "RETAILESTATEMENTREQ" || this._requestServiceCode == "RETAILVISACARDSTMTREQ") {
        if (this._appConfig.getData("estatementAction") == "1") {
          this._requestStatus = 'registered' + this._requestStatus;
        } else if (this._appConfig.getData("estatementAction") == "0") {
          this._requestStatus = 'deRegistered' + this._requestStatus;
        }
        console.log(this._appConfig.getData("estatementAction"))
        console.log(this._requestStatus)
        console.log(this._requestServiceCode, this._requestStatus)
      }
    }

    if (payload?.requestStatus == "ErrorEnd" || payload?.taskName=="ErrorEnd") {
      this.result.statusCode = "failure";
      if (this.result.payload.errorCode == "DEPOTPERROR002") {
        this.result.payload.errorCode = "confirmationReceiptForm.retryOtpExceeded";
      }
    }
    console.log(payload)

    if (this._requestServiceCode === "RETAILADDNICKNAME" || this._requestServiceCode === "RETAILACCNICKNAME" || this._requestServiceCode === "RETAILDELNICKNAME" || this._requestServiceCode=='RETAILSTOPCHEQUE' || this._requestServiceCode=='RETAILSTOPCHEQUEREV') {
      this.message = (this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + '.' + "message"));
      this.description = (this._translateService.instant(this._requestServiceCode + '.' + this._requestStatus + '.' + "description"));

      console.log(this.message, this.description)
      
      if(this._requestServiceCode === "RETAILADDNICKNAME" || this._requestServiceCode === "RETAILACCNICKNAME" || this._requestServiceCode === "RETAILDELNICKNAME"){
        if(payload?.requestStatus == "ErrorEnd" || payload?.taskName=="ErrorEnd"){

        }
        else{
          if (this._appConfig.hasData('accountRefresh$')) {
            this._appConfig.getData('accountRefresh$').subject.next({ action: 'NICKNAMEUPDATE', data: { nickName: this.result.payload.requestPayload.nickName } });
          }
        }
      }

      this.result.additionalInfo = [
        {
          label: "nickName",
          value: payload.nickName
        }
      ]
    } 
    // else {
    //   this.result.additionalInfo = [
    //     {
    //       label: "requestRefrence",
    //       value: payload.requestReference
    //     },
    //     {
    //       label: "transactionDate",
    //       value: payload.initiatedOn,
    //       format: 'date'
    //     }
    //   ]
    // }


  }

  gotoModule() {
    if (this._appConfig.hasData('moduleRefresh$')) {
      this._appConfig.getData('moduleRefresh$').subject.next({ action: 'ACCOUNTSQUICKACTION', data: { serviceCode: null } });
    }
    if(this.device.isMobile()){
      this._router.navigate(['accounts-space']);
    }
    else{
      this._router.navigate(['accounts-space/accounts']);
    }

    this._dialogRef.close();
  }

  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome() {
    if (this.result?.payload?.serviceCode == "RETAILVISACARDSTMTREQ") {
      this._router.navigate(['edocument-space/entry-shell/edocuments/retail-card-estmt-request-form'])
    } else if (this.result?.payload?.serviceCode == "RETAILESTATEMENTREQ") {
      this._router.navigate(['edocument-space/entry-shell/edocuments/retail-estmt-request-form'])
    // } else if (this.result.payload.serviceCode == "RETAILSTOPCHEQUE" || this.result.payload.serviceCode == "RETAILSTOPCHEQUEREV") {
    //   this._router.navigate(['accounts-space/display-shell/accounts/retail-stopcheque-display-grid'])
    }
    else {
      this._router.navigate(['home']);
    }

    this._dialogRef.close();
  }
  gotoService(){
    this._dialogRef.close();
    if(this.serviceCode=='RETAILSTOPCHEQUE'){
      this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stop-cheque-request'], {
        queryParams: {
          // accountNumber: data.accountNumber
        }
      });
    }
    else{
      if(this.device.isMobile()){
        this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stopcheque-display-grid'], {
          queryParams: {
            // accountNumber: data.accountNumber
          }
        });
      }
      else{
        this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stop-cheque-request'], {
          queryParams: {
            // accountNumber: data.accountNumber
          }
        });
      }
    }
  }

 ngOnDestroy(): void {
    if (this.device.isDesktop()) {
      if (this._appConfig.hasData('showStopChequeDetails$')) {
        this._appConfig.getData('showStopChequeDetails$').subject.next({
          showStopChequeDetails: false
        });
      }
    }
  }
}
