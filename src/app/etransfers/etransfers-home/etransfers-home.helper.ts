import { ChangeDetectorRef, inject, Inject, Injectable, Input } from "@angular/core";
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
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RetailEtransferHistoryFilterComponent } from "../retailEtransferHistoryFilter/retail-etransfer-history-filter.component";
import { DeviceDetectorService } from "@dep/core";

export class EtransfersHomeComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  viewAll: boolean = false;
}

@Injectable()
export class EtransfersHomeComponentHelper extends BaseFpxFormHelper<EtransfersHomeComponentState> {
  public activeTabIndex: any = 0;
  selectedIndex: any = 0;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private changed: ChangeDetectorRef,
    public _device: DeviceDetectorService,
    private activeRoute: ActivatedRoute
  ) {
    super(new EtransfersHomeComponentState());
    activeRoute.queryParams.subscribe((params: any) => {
      if (params && params.viewAll) {
        this.state.viewAll = this.getRoutingParam('viewAll');
        let index = this._appConfig.getData('etransferHistoryRes');
        if(index && index > -1){
          this.activeTabIndex = index;
          this.selectedIndex = index;
        }
        else {
          this.activeTabIndex = 0;
          this.selectedIndex = 0;
        }
      }
      else {
        this.state.viewAll = false;
      }
    });
  }

  override doPreInit(): void {
    let index = this._appConfig.getData('etransferHistoryRes');
    if(index && index > -1){
      this.activeTabIndex = index;
      this.selectedIndex = index;
    }
    else {
      this.activeTabIndex = 0;
      this.selectedIndex = 0;
    }
  }

  public override doPostInit(): void {
    // this._appConfig.setData('etransferHistoryRes', 0);
    // this.activeTabIndex = 0;
  }

  onTabChanged($event: any) {
    this._appConfig.setData('etransferHistoryRes', $event.index);
    this.selectedIndex = $event.index;
    if(this._appConfig.hasData('closeContactForm$')){
      this._appConfig.getData('closeContactForm$').subject.next({
        showContactForm: false,
        showSendMoneyDetails: false,
        showRequestMoneyDetails: false
      });
    }
  }

  public backToeTransfers(): void {
    if (this._appConfig.hasData('closeContactForm$')) {
      this._appConfig.getData('closeContactForm$').subject.next({
        showContactForm: false,
        showSendMoneyDetails: false,
        showRequestMoneyDetails: false
      });
    }
    this._router.navigate(['etransfers-space','etransfers','etransfers-home']);
  }

  override doDestroy(): void {

  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}