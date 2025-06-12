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
import { ActivatedRoute, Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RetailEtransferHistoryFilterComponent } from "../retailEtransferHistoryFilter/retail-etransfer-history-filter.component";

export class EtransferHistoryFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
  viewAll: boolean = false;
}

@Injectable()
export class EtransferHistoryFormComponentHelper extends BaseFpxFormHelper<EtransferHistoryFormComponentState> {
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
    private activeRoute: ActivatedRoute
  ) {
    super(new EtransferHistoryFormComponentState());
    activeRoute.queryParams.subscribe((params: any) => {
      if (params && params.viewAll) {
        this.state.viewAll = this.getRoutingParam('viewAll');
      }
      else {
        this.state.viewAll = false;
      }
    });
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.state.viewAll = this.getRoutingParam('viewAll');

    let value = this._appConfig.getData('etransferHistoryRes');
    const criteriaQuery = new CriteriaQuery();
    if (value === 1) {
      this.transcationService = 'ETRANSFERRECEIVEMONEY'
    }
    else if (value === 2) {
      this.transcationService = 'ETRANSFERREQUESTMONEY'
    } else {
      this.transcationService = 'ETRANSFERSENDMONEY'
    }

    criteriaQuery.addFilterCritertia("serviceCode", "String", "equals", {
      searchText: this.transcationService,
    });
    criteriaQuery.addSortCriteria('paymentDate', 'desc', 'Date');
    this.setGridCriteria('etransferHistoryGrid', criteriaQuery);
  }

  public override doPostInit(): void {
  }

  filter() {
    let modal = new FpxModal();
    modal.setComponent(RetailEtransferHistoryFilterComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(true);
    modal.setData({
      title: "etransferHistoryGrid.title",
      fromDate: this.state.formValues?.fromDate,
      toDate: this.state.formValues?.toDate
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    const criteriaQuery = new CriteriaQuery();
    if (payload.fromDate && payload.toDate) {
      criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', { dateFrom: payload.fromDate, dateTo: payload.toDate });
    }
    criteriaQuery.addFilterCritertia("serviceCode", "String", "equals", {
      searchText: this.transcationService,
    });
    criteriaQuery.addSortCriteria('paymentDate', 'desc', 'Date');
    this.setGridCriteria('etransferHistoryGrid', criteriaQuery);

    this.state.formValues = {
      ...this.formGroup.value,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
    }

  }

  onDownloadClick() {
    let modal = new FpxModal();
    // modal.setComponent(retailDownloadTransactionFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(true);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "retailDownloadTransactionFormComponent.title",

    });
    this.openModal(modal);
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

  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // let searchTextVal = value.toLocaleLowerCase();
    // let _data = this.state.gridData?.filter((rowData:any) => Object.values([
    //   rowData?.beneficiaryName, 
    //   rowData?.phoneNumber, 
    //   rowData?.emailId, 
    //   rowData?.firstName
    // ]).some((val:any) => {
    //   let txt = '';
    //   if (val && typeof(val) === 'string' || typeof(val) === 'number') {
    //     txt = val.toString().toLocaleLowerCase();
    //     this._changeDetectorRef.detectChanges();
    //     return txt.includes(searchTextVal);
    //   } else {
    //     this._changeDetectorRef.detectChanges();
    //     return false;
    //   }
    // }));
    // this.state.searchDataFound=_data?.length;
    // this.setGridData('contactList', _data);
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}