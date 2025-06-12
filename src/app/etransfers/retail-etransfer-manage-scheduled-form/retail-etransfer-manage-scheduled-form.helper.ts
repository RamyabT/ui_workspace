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
import { BehaviorSubject, Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RetailEtransferHistoryFilterComponent } from "../retailEtransferHistoryFilter/retail-etransfer-history-filter.component";
import { DeviceDetectorService } from "@dep/core";

export class RetailEtransferManageScheduledFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
  viewAll: boolean = false;
  searchDataFound: any
}

@Injectable()
export class RetailEtransferManageScheduledFormComponentHelper extends BaseFpxFormHelper<RetailEtransferManageScheduledFormComponentState> {
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  transcationService: any

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private changed: ChangeDetectorRef,
    public _device: DeviceDetectorService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(new RetailEtransferManageScheduledFormComponentState());
  }

  override doPreInit(): void {
    this.hideShellActions();
  }

  public override doPostInit(): void {
    this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);
  }
  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let searchTextVal = value.toLocaleLowerCase();
    let _data = this.state.gridData?.filter((rowData:any) => Object.values([
      rowData?.beneficiaryName, 
      rowData?.phoneNumber, 
      rowData?.emailId, 
      rowData?.firstName
    ]).some((val:any) => {
      let txt = '';
      if (val && typeof(val) === 'string' || typeof(val) === 'number') {
        txt = val.toString().toLocaleLowerCase();
        this._changeDetectorRef.detectChanges();
        return txt.includes(searchTextVal);
      } else {
        this._changeDetectorRef.detectChanges();
        return false;
      }
    }));
    this.state.searchDataFound=_data?.length;
    this.setGridData('etransferScheduledGrid', _data);
  }




 

  viewAllTransfers() {
    this._angularRouter.navigate(['etransfers-space','etransfers-home'],{queryParams:{'viewAll':true}});
  }


  handleETransfersHistoryGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
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

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}