import { Inject, Injectable } from "@angular/core";
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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";

export class InitATransferFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}

@Injectable()
export class InitATransferFormHelper extends BaseFpxFormHelper<InitATransferFormState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
  ) {
    super(new InitATransferFormState());
  }

  override doPreInit(): void {
    this.removeShellBtn('BACK');
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  openLink(payment:any){
    let service = this._appConfig.getServiceDetails(payment.serviceCode);
    this._router.navigate(service.servicePath);
  }
  

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}