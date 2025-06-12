import { Component, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxComponentState, BaseFpxFormComponent, BaseFpxFormHelper, BaseFpxFunctionality, FpxAppConfig, FpxFormControlErrorMessage, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { FavouriteBeneficiariesValidator } from '../favouriteBeneficiaries-validator.service';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { DeviceDetectorService } from '@dep/core';

@Component({
  selector: 'app-bene-confirmation-receipt-form',
  templateUrl: './bene-confirmation-receipt-form.component.html',
  styleUrls: ['./bene-confirmation-receipt-form.component.scss']
})

export class BeneConfirmationReceiptFormComponent extends BaseFpxFunctionality{

  result: any;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _serviceDetail: any;
  protected _requestServiceCode: string = "";
  protected _requestStatus: string = "";
  _result: any;


  constructor(private _router: Router, 
    private _beneService: FavouriteBeneficiariesValidator,
    public deviceService: DeviceDetectorService,
    private _appConfig: AppConfigService) {
    super();

  }

  ngOnInit(): void {
    console.log('accounts: confirmation receipt');
  }

  ngAfterViewInit() {
  }

  public setPageDependency(requestPayload: any): void {
    this.result = {};
    this.result.resultPayload = requestPayload
    if(requestPayload?.serviceCode){
      this._requestServiceCode = requestPayload?.serviceCode;
    }
    else{
      this._requestServiceCode = requestPayload?.requestPayload?.serviceCode;

    }
    if(requestPayload?.requestStatus){
      this._requestStatus = requestPayload?.requestStatus;
    }
    else{
      this._requestStatus = requestPayload?.taskName;
    }

    if (this._requestStatus == "ErrorEnd") {
      this.result.statusCode = "failure";
      if(requestPayload?.requestReference && requestPayload.initiatedOn){
        this.result.additionalInfo = [
          {
            label: "Ref Number",
            value: requestPayload.requestReference
          },
          {
            label: "Payment date and time",
            value: requestPayload.initiatedOn,
            format: 'date'
          }
        ];
      }

    } else {
      if (requestPayload?.requestPayload?.operationMode == 'D') {
        this._requestStatus = this._requestStatus + "_D";
      }

      this.result.additionalInfo = [
        {
          label: "confirmationReceiptForm.beneNick",
          value: requestPayload?.requestPayload?.nickName
        },
        {
          label: "confirmationReceiptForm.beneType",
          value: requestPayload?.requestPayload?.serviceName
        },
        {
          label: "confirmationReceiptForm.refNum",
          value: requestPayload?.requestPayload?.requestReference
        },
        {
          label: "confirmationReceiptForm.creationTime",
          value: requestPayload?.requestPayload?.initiatedOn,
          format: 'date'
        },
        {
          value: "spacer",
        }
      ];
    }
  }


  gotoModule(module: string) {
    let serviceCode: any = this.getServiceCode(this._requestServiceCode)
    let service = this._appConfig.getServiceDetails(serviceCode);

    setTimeout(() => {
      this._router.navigate(service.servicePath, {
        queryParams: {
          inventoryNumber: this.result.resultPayload.beneId
        }
      });
    });

  }

  doRepeat() {
    this._router.navigate(this._serviceDetail.servicePath);
  }

  gotoHome() {
    this._router.navigate(['home']);
  }

  gotoTransferSpace() {
    if (this.deviceService.isMobile()) {
      this._router.navigate(['transfers-space']);
    }
    else if(this._requestServiceCode=='RETAILBENEINTERNAL'){
      this._router.navigate(['transfers-space','display-shell', 'transfers','manage-bene']);
    }
    else {
      this._router.navigate(['transfers-space', 'transfers']);
    }
  }

  markFavourite() {
    let inventoryNumber = this.result.resultPayload.beneId
    this._beneService
      .markAsfavouriteBeneficiaries(inventoryNumber)
      .subscribe((res) => {
      
          console.log("Response", res);
         
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "beneConfirmationForm.favSuccessAlert.title",
            message: "beneConfirmationForm.favSuccessAlert.message"
          });
          fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
          this.openModal(fpxModal);

        }
      )};
  
 

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  




  getServiceCode(_requestServiceCode: any) {
    let serviceCode;
    switch (_requestServiceCode) {
      case 'RETAILBENEINTERNAL': serviceCode = 'RETAILTRANINTBT'; break;
      case 'RETAILBENEDOMESTIC': serviceCode = 'RETAILTRANDOMESTIC'; break;
      case 'RETAILBENECC': serviceCode = 'RETAILTRANCC'; break;
      case 'RETAILBENEINTL': serviceCode = 'RETAILTRANSWIFT'; break;
    }
    return serviceCode;
  }

}
