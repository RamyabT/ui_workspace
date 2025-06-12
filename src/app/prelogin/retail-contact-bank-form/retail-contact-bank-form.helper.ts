import { Injectable } from "@angular/core";
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
  FpxModal,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BankcontactsService } from "../bankcontacts-service/bankcontacts.service";
import { Bankcontacts } from "../bankcontacts-service/bankcontacts.model";
import moment from "moment";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";

declare var cordova:any;

export class RetailContactBankFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  bankContact:any;
  isHybrid:any;
}

@Injectable()
export class RetailContactBankFormHelper extends BaseFpxFormHelper<RetailContactBankFormState> {
  constructor(
    private retailContactBankFormService: BankcontactsService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _deviceDetectorService:DeviceDetectorService,
    private _fileOpenerService:FileOpenerService
  ) {
    super(new RetailContactBankFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCONTACTBANK");
    this.removeShellBtn('BACK');
    let todayDate = new Date();
    let effDate = moment(todayDate).format("YYYY-MM-DD");
    let key: any = {
      applCode: "DEPRETAIL",
      effDate: effDate,
    };
    this.showSpinner();
    this.retailContactBankFormService
      .findByKey(key)()
      .subscribe({
        next: (res: any) => {
          this.hideSpinner();
          this.state.bankContact = res;
        },
        error: (err: any) => {
          this.hideSpinner();
        },
      });
    this.state.isHybrid=this._deviceDetectorService.isHybrid();
  }
  navToWebsite(){
    this._fileOpenerService.openLink(this.state.bankContact.website);
  }
  navToFacebook(){
    this._fileOpenerService.openLink(this.state.bankContact.facebookId);
  }
  navToInsta(){
    this._fileOpenerService.openLink(this.state.bankContact.instagramId);
  }
  navToLinkedIn(){
    this._fileOpenerService.openLink(this.state.bankContact.linkedinId);
  }

  public override doPostInit(): void {}

  public override preSubmitInterceptor(payload: Bankcontacts): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Bankcontacts) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.bankcontacts.applCode.effDate,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
