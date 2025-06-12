import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent, BaseFpxFormHelper, FpxAppConfig, FpxFormControlErrorMessage } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService } from '@dep/core';
import { AppConfigService } from "@dep/services";
import { BehaviorSubject } from 'rxjs';

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
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _appConfig: AppConfigService

    ) {
    
  }

  ngOnInit(): void {
    console.log('npss: confirmation receipt');
    this._activeSpaceInfoService.setOrginSpace('npss-space');
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.requestPayload = requestPayload;

    this._requestServiceCode = requestPayload?.serviceCode;
    this._requestStatus = requestPayload?.requestStatus;
    if (this._requestServiceCode == 'RETAILNPSSENROLL') {
      this._appConfig.getData('npssModuleRefresh$').subject.next({ event: 'ENROLL' });
      this._appConfig.setData('npssDisable',true);
    }
    // else if (this._requestServiceCode == 'NPSSMANAGEACCOUNTS') {
    //   this._appConfig.getData('npssModuleRefresh$').subject.next({ event: 'MANAGE' });
    //   this._appConfig.setData('npssDisable',true);
    // }
    else if (this._requestServiceCode == 'RETAILINVALIDATENPSS') {
      this._appConfig.getData('npssModuleRefresh$').subject.next({ event: 'DEACTIVATE' });
      this._appConfig.setData('npssDisable',true);
    }
    else if (this._requestServiceCode == 'RETAILNPSSPROXY') {
      this._appConfig.getData('npssModuleRefresh$').subject.next({ event: 'PROXY' });
      this._appConfig.setData('npssDisable',true);
    }
    else if (this._requestServiceCode == 'RETAILCUSTOMERUNREGISTER') {
      this._appConfig.getData('npssModuleRefresh$').subject.next({ event: 'UNENOLL' });
      this._appConfig.setData('npssDisable',true);
    }
    if (requestPayload?.requestStatus == "ErrorEnd") {
      this.result.statusCode = "failure";
    } else {
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
    this._appConfig.setData("activeMenuId", "HOME");
    this._router.navigate(['home']);
  }

}
