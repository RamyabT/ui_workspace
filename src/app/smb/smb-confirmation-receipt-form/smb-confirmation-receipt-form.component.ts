import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxComponentState, BaseFpxFormComponent, BaseFpxFormHelper, BaseFpxFunctionality, FpxAppConfig, FpxFormControlErrorMessage, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-smb-confirmation-receipt-form',
  templateUrl: './smb-confirmation-receipt-form.component.html',
  styleUrls: ['./smb-confirmation-receipt-form.component.scss']
})

export class SmbConfirmationReceiptFormComponent extends BaseFpxFunctionality{

  result: any;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  resultSet: string = "";
  resultMessage: string = "";
  _result: any;
  accRestrictionLabel:any;
  description:any;
  modifydescription:any;
  deletedescription:any;
  message:any;


  constructor(private _router: Router, 
    public deviceService: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super();

  }

  ngOnInit(): void {
    // console.log('accounts: confirmation receipt');
    this._activeSpaceInfoService.setOrginSpace('smb-delegat-space');
  }

  ngAfterViewInit() {
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.resultPayload = requestPayload
    this._requestServiceCode = requestPayload.requestPayload?.serviceCode;
    this._requestStatus = requestPayload.requestPayload?.taskName;
    this.resultMessage ="RETAILDELEUSER.SuccessEnd.message";

    if(requestPayload.requestPayload.operationMode=='A'){
        this.resultSet = "RETAILDELEUSER.SuccessEnd.description.created";
    }
    else if(requestPayload.requestPayload.operationMode=='M'){
      this.resultSet = "RETAILDELEUSER.SuccessEnd.description.updated";

    }
    else if(requestPayload.requestPayload.operationMode=='D'){
      this.resultSet ="RETAILDELEUSER.SuccessEnd.description.deleted";
    }
    if(this._requestServiceCode=='RETAILDELEGATEUSER'){
      this.resultSet = "RETAILDELEGATEUSER.SuccessEnd.description";
    }

    if (this._requestStatus == "ErrorEnd") {
      this.result.statusCode = "failure";
      if(requestPayload?.requestReference && requestPayload.requestPayload.initiatedOn){
        this.result.additionalInfo = [
          {
            label: "Ref Number",
            value: requestPayload.requestPayload.inventoryNumber
          },
          {
            label: "Payment date and time",
            value: requestPayload.requestPayload.initiatedOn,
            format: 'date'
          }
        ];
      }

    } else {
      if (requestPayload.requestPayload.operationMode == 'D') {
        this._requestStatus = this._requestStatus + "_D";
      }
      let accessLevelType = requestPayload.requestPayload.accessLevel;
      if(accessLevelType=='0'){
        this.accRestrictionLabel = "Read Only";
      }
      else{
         this.accRestrictionLabel = "Initiator";
      }
      this.result.additionalInfo = [
        {
          label: "smbConfirmationReceiptForm.deleName",
          value: requestPayload.requestPayload.firstName +' '+ requestPayload.requestPayload.lastName
        },
        // {
        //   label: "smbConfirmationReceiptForm.status",
        //   value: requestPayload.status
        // },
        {
          label: "smbConfirmationReceiptForm.accessLevel",
          value: this.accRestrictionLabel
        },
        {
          label: "smbConfirmationReceiptForm.createdOn",
          value: requestPayload.requestPayload.createdOn,
          format: 'date'
        },
        {
          value: "spacer",
        }
      ];
    }
  }


//   gotoModule(module: string) {
//     // let serviceCode: any = this.getServiceCode(this._requestServiceCode)
//     // let service = this._appConfig.getServiceDetails(serviceCode);

//     setTimeout(() => {
//       this._router.navigate(service.servicePath, {
//         queryParams: {
//           inventoryNumber: this.result.resultPayload.inventoryNumber
//         }
//       });
//     });

//   }

  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome() {
    this._router.navigate(['smb-delegat-space']);
  }

  gotoSetPermissions() {
    if (this.deviceService.isMobile()) {
      this._router.navigate(['smb-delegat-space', 'entry-shell','smb','retail-setpermissions-form'],{queryParams:{
        delegateInvNo: this.result.resultPayload?.requestPayload?.requestReference,
        operationMode: this.result.resultPayload?.requestPayload?.operationMode
      }});
    }
    else {
      this._router.navigate(['smb-delegat-space', 'entry-shell','smb','retail-setpermissions-form'],{queryParams:{
        delegateInvNo: this.result.resultPayload?.requestPayload?.requestReference,
        operationMode: this.result.resultPayload?.requestPayload?.operationMode
      }});
    }
  }

 
 

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  




//   getServiceCode(_requestServiceCode: any) {
//     let serviceCode;
//     switch (_requestServiceCode) {
//       case 'RETAILBENEINTERNAL': serviceCode = 'RETAILTRANINTBT'; break;
//       case 'RETAILBENEDOMESTIC': serviceCode = 'RETAILTRANDOMESTIC'; break;
//       case 'RETAILBENECC': serviceCode = 'RETAILTRANCC'; break;
//       case 'RETAILBENEINTL': serviceCode = 'RETAILTRANSWIFT'; break;
//     }
//     return serviceCode;
//   }

}
