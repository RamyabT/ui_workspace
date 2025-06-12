import { Injectable, ViewChild } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { RetailcustomerenrollmentService } from "../retailcustomerenrollment-service/retailcustomerenrollment.service";
import { Retailcustomerenrollment } from "../retailcustomerenrollment-service/retailcustomerenrollment.model";
import { AppConfigService } from "@dep/services";
import { RetailSavingsAccountRoGridComponent } from "../retail-savings-account-ro-grid/retail-savings-account-ro-grid.component";
import { Saaccount } from "../saaccount-service/saaccount.model";
import { NpssMainService } from "../npss-service/npss-main.service";
import { ActiveSpaceInfoService } from "@dep/core";

export class RetailCustomerEnrollmentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  isNpssActive: boolean = false;
  npssNoData: boolean = false;
  gridCommonInput!: { name: string; data: any; }
}

@Injectable()
export class RetailCustomerEnrollmentHelper extends BaseFpxFormHelper<RetailCustomerEnrollmentState>{
  
  accountDetails!: any;
  private _npssDetails: any;
  private accountsList: any[] = [];

  constructor(
    private retailCustomerEnrollmentService: RetailcustomerenrollmentService, 
    private _httpProvider: HttpProviderService, 
    private _router: Router,
    private _appConfig: AppConfigService,
    private _npssMainService: NpssMainService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailCustomerEnrollmentState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILNPSSENROLL");
    this.setShellBtnMethod("RESET", this.resetHandler.bind(this));

    this.accountsList = [];
    if(this._appConfig.hasData('npssDetails')) {
      this._npssDetails = this._appConfig.getData('npssDetails');
      this.state.isNpssActive = (this._npssDetails.status == 'A') ? true : false;
      if(!this.state.isNpssActive){
        this._activeSpaceInfoService.setOrginSpace('npss-space');
      }
    }
  }

  resetHandler(){
    this.formGroup.reset();
    this._checkOperationMode();
    this.state.gridCommonInput = { name: 'refresh', data: {} };
  }

  public override doPostInit(): void {
    this._npssMainService.emitChange("hide");
    this.accountDetails = this.formGroup.get("accountDetails") as FormArray;
    this._checkOperationMode();
  }

  _checkOperationMode(){
    if(this.state.isNpssActive){
      this.setDisabled('operationMode', false);
      this.setValue('operationMode', 'M');
      this.setServiceCode("NPSSMANAGEACCOUNTS");
    } else {
      this.setDisabled('operationMode', true);
    }
  }

  override doDestroy(): void {
      this._npssMainService.emitChange("show");
  }

  public override preSubmitInterceptor(payload: Retailcustomerenrollment): any {
    // WRITE CODE HERE TO HANDLE 
     payload.accountDetails.sort((a: any, b: any) => {
      if (a.isPrimary && !b.isDefault) {
        return -1;
      }
      else if (!a.isPrimary && b.isPrimary) {
        return 1;
      }
      else {
        return 0;
      }
    })
    console.log(payload.accountDetails);

    this.accountDetails = payload.accountDetails.map((res: any) => {
      return {
        "detailSerial": res.R,
        "iban": res.iban,
        "instantPmtEnabled": "Y",
        "currency": res.accountCurrency,
        "defaultAccount": (res.isPrimary) ? 'Y' : 'N'
      }
    });
    
    payload.accountDetails = this.accountDetails;
    return payload;
  }


  public override postDataFetchInterceptor(payload: Retailcustomerenrollment) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  handleFormOnPostsubmit(response:any,routingInfo:any){
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.NPSSCustomerEnrollmentReq,
        status: "success",
      });
    } 
    // else if (response.error) {
    //   routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    // }
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          code:error.ErrorCode,
          serviceCode: this.serviceCode
        }
      });
    }
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response,routingInfo);
    return routingInfo;
  }

  handleSARoGridEvent($event:any){
    console.log("RO Grid Event from From", $event);
    if($event.eventName == 'afterDataFetch'){
      this.formGroup.patchValue({
        "accountDetails": $event.payload
      });

      this.accountsList = $event.payload;

    } else if($event.eventName == 'rowSelect'){
      let _accountDetails = this.getValue("accountDetails");

      if(this.accountDetails && this.state.isNpssActive) {
        let existingAccount = _accountDetails.find((obj:any) => ($event.payload.iban == obj.iban));
        if(existingAccount){
          _accountDetails = _accountDetails.filter((obj:any) => !(existingAccount.iban == obj.iban));
        } else {
          _accountDetails.push($event.payload);
        }

        this.formGroup.patchValue({
          "accountDetails": _accountDetails
        });
      } else {
        this.formGroup.patchValue({
          "accountDetails": $event.payload
        });
      }
    } else if($event.eventName == 'defaultAccoutChange'){
      let _accountDetails = this.getValue("accountDetails");
      let currentRowData = $event.payload;
      _accountDetails.forEach((rowData:any) => {
        if(rowData.iban == currentRowData.iban){
          rowData.isPrimary = true;
        } else {
          rowData.isPrimary = false;
        }
      });
    }else if ($event.eventName == 'noDataFetch'){
      this.state.npssNoData  = true;
      
    } 
    console.log(this.state.npssNoData);
    console.log(this.formGroup.value);
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


