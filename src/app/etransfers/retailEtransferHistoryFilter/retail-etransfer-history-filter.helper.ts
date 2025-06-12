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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { RetailetransferhistoryfilterService } from "../retailetransferhistoryfilter-service/retailetransferhistoryfilter.service";
import { Retailetransferhistoryfilter } from "../retailetransferhistoryfilter-service/retailetransferhistoryfilter.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import moment from "moment";
export class RetailEtransferHistoryFilterState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  fromDate: any = {
    minDate: "",
    maxDate: "",
  }
  toDate: any = {
    minDate: "",
    maxDate: "",
  }
  formValues: any;
  startDate: any
  endDate: any
}


@Injectable()
export class RetailEtransferHistoryFilterHelper extends BaseFpxFormHelper<RetailEtransferHistoryFilterState> {

  constructor(private retailEtransferHistoryFilterService: RetailetransferhistoryfilterService,
    private _httpProvider: HttpProviderService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>, private _router: Router
  ) {
    super(new RetailEtransferHistoryFilterState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode("ETRANSFERSENDMONEY");
  }
  public handleFormOnLoad() {

    let newDate = new Date();
    this.state.fromDate.minDate = moment(newDate).subtract(12, 'months');
    this.state.fromDate.maxDate = new Date();
    this.state.toDate.maxDate = new Date();
    this.state.toDate.minDate = this.state.fromDate.minDate;
    this.setValue('fromDate', this._dialogData?.fromDate);
    this.setValue('toDate', this._dialogData?.toDate);
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("fromDate", this.handleFromDateOnvalueChange);
    this.addValueChangeHandler("toDate", this.handleToDateOnvalueChange);

  }
  public handleFromDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.state.toDate.minDate = value;
    }
  }


  public handleToDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
    }
  }
  apply() {
    this.state.formValues = {
      ...this.formGroup.value,
      fromDate: this.getValue('fromDate'),
      toDate: this.getValue('toDate')
    }

    console.log(this.state.formValues)

    this._dialogRef.close(this.state.formValues);


  }

  public override preSubmitInterceptor(payload: Retailetransferhistoryfilter): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Retailetransferhistoryfilter) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.retailetransferhistoryfilter,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


