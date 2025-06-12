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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { RetailTaxFormFilterFormComponent } from "../retail-tax-form-filter-form/retail-tax-form-filter-form.component";
import { Taxforms } from "../taxforms-service/taxforms.model";
import moment from "moment";
export class ViewTaxFormsFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  transactionsListRoGrid: Subject<FpxActionMap> = new Subject();
  formValues: any;
}


@Injectable()
export class ViewTaxFormsFormComponentHelper extends BaseFpxFormHelper<ViewTaxFormsFormComponentState>{
  dateFrom: any;
  dateTo: any;
  formatdateTo: any;
  formatdateFrom: any
  taxFormsApiReceived: boolean = false;
  totalRecordCount: number = -1;
  appliedFilterData: any;
  showClearButton: boolean = false;

  constructor(
    private _appConfig: AppConfigService,
    public deviceDetectorService: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private route: ActivatedRoute
  ) {
    super(new ViewTaxFormsFormComponentState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid) this.onLoadForm();
    });
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.removeShellBtn("BACK");
  }

  onLoadForm(){
    this.taxFormsApiReceived = false;
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();

    this.appliedFilterData = {
      dateFrom: undefined,
      dateTo: undefined,
    }

    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDCRITERIA',
      value: criteriaQuery,
      nestedControl: '',
      rowIndex: undefined
    });
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  filter() {
    let modal = new FpxModal();
    modal.setComponent(RetailTaxFormFilterFormComponent);

    if (this.deviceDetectorService.isMobile()) {
      modal.setPanelClass('dep-info-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }

    modal.setBackDropClass(['casa-summary-filter-backdrop']);
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      title: "RetailTaxFormFilterForm.title",
      dateFrom:this.state.formValues?.dateFrom,
      dateTo:this.state.formValues?.dateTo,
    });
    this.openModal(modal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model cbjvbvlosed...", payload);
    if (payload) {
      this.showClearButton = JSON.stringify(payload) === JSON.stringify(this.appliedFilterData) ? false : true;


    this.appliedFilterData = payload;
    const criteriaQuery = new CriteriaQuery();
    if (payload.dateFrom && payload.dateTo) {
      criteriaQuery.addFilterCritertia('dateOfGeneration', 'Date', 'inRange', { dateFrom: payload.dateFrom, dateTo: payload.dateTo });
    }
    else{
        criteriaQuery.addFilterCritertia('recentDocCount', 'String', 'equals', {
          searchText: '20'
        });
    }
    this.taxFormsApiReceived = false;

    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDCRITERIA',
      value: criteriaQuery,
      nestedControl: '',
      rowIndex: undefined
    });

    this.state.formValues = {
      ...this.formGroup.value,
      dateFrom: payload.dateFrom,
      dateTo: payload.dateTo,
      formatdateTo: moment(payload.dateTo).format('DD MMM YYYY'),
      formatdateFrom:moment(payload.dateFrom).format('DD MMM YYYY'),
     
}
    }
  }

  taxFormsGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.taxFormsApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
    }
  }
  clearFilter() {
    this.state.formValues.formatdateTo=null;
    this.state.formValues.formatdateFrom=null;
    this.state.formValues.dateFrom=null;
    this.state.formValues.dateTo=null;
    this.showClearButton = false;
    this.onLoadRecentForms();
  }
  onLoadRecentForms(){
    this.taxFormsApiReceived = false;
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('recentDocCount', 'String', 'equals', {
      searchText: '20'
    });

    this.appliedFilterData = {
      dateFrom: undefined,
      dateTo: undefined,
    }

    this.state.transactionsListRoGrid.next({
      action: 'SETGRIDCRITERIA',
      value: criteriaQuery,
      nestedControl: '',
      rowIndex: undefined
    });
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}