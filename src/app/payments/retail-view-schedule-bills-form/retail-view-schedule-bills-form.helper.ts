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
  FpxModal
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { SchedulebillpaymentslogService } from "../schedulebillpaymentslog-service/schedulebillpaymentslog.service";
import moment from "moment";
import { DeviceDetectorService } from "@dep/core";
export class RetailViewScheduleBillsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  _gridData: any = [];
  rowData:any;
}


@Injectable()
export class RetailViewScheduleBillsFormHelper extends BaseFpxFormHelper<RetailViewScheduleBillsFormState> {
  totalRecordCount: number = -1;
  viewscheduledApiReceived: boolean = false;

  constructor(private _appConfig: AppConfigService,
    private SchedulebillpaymentlogService: SchedulebillpaymentslogService, private _httpProvider: HttpProviderService,
    private _router: Router,
    public device: DeviceDetectorService
  ) {
    super(new RetailViewScheduleBillsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSCHBILLPAYMENTS");
    this.hideShellActions();
  }


  public override doPostInit(): void {

    let scheduledBillRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('scheduledBillRefresh$', {
      "observable": scheduledBillRefresh$.asObservable(),
      "subject": scheduledBillRefresh$
    });
    this._appConfig.getData('scheduledBillRefresh$').observable.subscribe(
      (res: any) => {
        console.log(res);
        if(res && res.payload){
          this.state.rowData = res.payload;
          this.triggerSubmit();
        }

      }
    );
  }



  public override preSubmitInterceptor(payload: SchedulebillpaymentslogService): any {
    // WRITE CODE HERE TO HANDLE 
    
    let data: any = {
      "scheduleId": this.state.rowData?.paymentId,
      "beneficiaryName": this.state.rowData?.beneficiaryName,
      "sourceAccount": this.state.rowData?.sourceAccount,
      "operationMode": "D",
      "paymentDate": moment(this.state.rowData?.paymentDate).format('YYYY-MM-DD'),
      "paymentAmount": this.state.rowData?.paymentAmount,
      "paymentCurrency": this.state.rowData?.paymentCurrency,
      "paymentFrequency": this.state.rowData?.paymentFrequency,
      "scheduleType": this.state.rowData?.scheduleType,
      "numberOfPayments": this.state.rowData?.numberOfPayments,
      "serviceCode": 'RETAILSCHBILLPAYMENTS',
    }
    payload = data;
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: SchedulebillpaymentslogService){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.schedulebillpaymentslog;
      routingInfo.setQueryParams({
        response: res
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  handleViewScheduleBillsFormGridEvent($event: any) {

    if (Object.keys($event.payload).length > 0) {
      if ($event.eventName == 'onSelectRowData') {
        console.log($event.payload)

      }
    }
    //for no Data
    if ($event.eventName == 'afterDataFetch') {
      this.viewscheduledApiReceived = true;
      this.totalRecordCount = $event.payload || 0;
    }

  }
  backToBills(){
    if (this._appConfig.hasData('selectedScheduleBill$')) {
      this._appConfig.getData('selectedScheduleBill$').subject.next({ selectedData: null });
    }
    this.scheduleBill();
  }
  scheduleBill() {
    if (this._appConfig.hasData('closeScheduleBill$')) {
      this._appConfig.getData('closeScheduleBill$').subject.next();
    }
    this._router.navigate(['payments-space', 'display-shell', 'payments', 'retail-saved-biller-list-ro-grid']);
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n

}
 
 
