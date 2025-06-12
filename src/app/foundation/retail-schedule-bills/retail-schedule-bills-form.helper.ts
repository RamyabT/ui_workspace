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
import { BehaviorSubject, Observable, Subject, filter, map, of } from "rxjs";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsfilterformComponent } from "src/app/accounts/retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { Casatransactiondtls } from "src/app/accounts/casatransactiondtls-service/casatransactiondtls.model";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { TempScheduleRepService } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.service";
import { SchedulebillpaymentslogService } from "src/app/payments/schedulebillpaymentslog-service/schedulebillpaymentslog.service";
import { SchedulebillpaymentService } from "src/app/transfers/schedulebillpayment-service/schedulebillpayment.service";
import moment from "moment";
import { AccessScopePipe } from "src/app/common/pipe/access-scope/access-scope.pipe";

export class RetailScheduleBillsFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isDataReceived: boolean = false;
  gridData: any;
  exceptionMessage : string = '';
  rowData:any;
}


@Injectable()
export class RetailScheduleBillsFormComponentHelper extends BaseFpxFormHelper<RetailScheduleBillsFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showScheduleHistory: any;
  showExceptionMsg: boolean = false;
  showButton:boolean = true;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _tempScheduleRepService: TempScheduleRepService,
    private _accessScope:AccessScopePipe
  ) {
    super(new RetailScheduleBillsFormComponentState());
    const currentUrl = this._router.url;
    this.showButton = !currentUrl.includes('retail-saved-biller-list-ro-grid');
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSCHBILLPAYMENTS");
    //   const allowedRoutes = [
    //   '/retail-add-biller-form',
    //   '/view-scheduled-bills-form',
    //   '/home'
    // ];
    this._router.events.pipe(
    filter(event => event instanceof NavigationStart || event instanceof NavigationEnd) 
  ).subscribe(() => {
    const currentUrl = this._router.url;
    this.showButton = !currentUrl.includes('retail-saved-biller-list-ro-grid');
  });
  
    
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  }

  public override doPostInit(): void {
    let scheduledBillAction$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    this._appConfig.setData('scheduledBillAction$', {
      "observable": scheduledBillAction$.asObservable(),
      "subject": scheduledBillAction$
    });

    this._appConfig.getData('scheduledBillAction$').observable.subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          if (res.action == 'REFRESH') {
            let criteriaQuery: CriteriaQuery = new CriteriaQuery();
            //TODO: setup criteriaQuery
            criteriaQuery.addSortCriteria('paymentDate', 'asc', 'Date');
            this.setGridCriteria('scheduletransactiondetailsGrid', criteriaQuery);
          } else if (res.action == 'DELETE') {

          }
          if (res.action == 'DELETE') {
            this.state.rowData = res.payload;
            this.triggerSubmit();
          }
        }
      }
    );
    this.handleFormOnLoad();
  }
  
  initiateNewTransaction(){
    this._angularRouter.navigate(['payments-space','entry-shell', 'payments', 'retail-saved-biller-list-ro-grid'], {
      queryParams: {
      }
    });
  }
  viewAllScheduledBills(){
    this._angularRouter.navigate(['payments-space', 'entry-shell', 'payments', 'view-scheduled-bills-form'], {
      queryParams: {
        routeFrom: 'otherModule'
      }
    });
  }
  addScheduleBills(){
    this._angularRouter.navigate(['payments-space'], {
      queryParams: {
      }
    });
  }

  hasScope(serviceCode: string) {
    return this._accessScope.transform(serviceCode);
  }

  handleSchedulePaymentsGridEvent($event:any){
    console.log("PAYLOAD ", $event.payload)
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    } else if ($event.eventName === 'handleException') {
      this.showExceptionMsg = true;
      this.state.exceptionMessage = $event.payload;
    }
  }
  public override preSubmitInterceptor(payload: SchedulebillpaymentService): any {
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
  public override postDataFetchInterceptor(payload: SchedulebillpaymentService){
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
   public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}