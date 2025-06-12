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
import { BehaviorSubject, Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsfilterformComponent } from "src/app/accounts/retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { Casatransactiondtls } from "src/app/accounts/casatransactiondtls-service/casatransactiondtls.model";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { TempScheduleRepService } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.service";
import { SiownService } from "src/app/transfers/siown-service/siown.service";
import { SiownreqService } from "src/app/transfers/siownreq-service/siownreq.service";
import moment from "moment";
import { SiintbtService } from "src/app/transfers/siintbt-service/siintbt.service";
import { SiintbtreqService } from "src/app/transfers/siintbtreq-service/siintbtreq.service";
import { AccessScopePipe } from "src/app/common/pipe/access-scope/access-scope.pipe";

export class RetailScheduleTransferFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isDataReceived: boolean = false;
  gridData: any;
  exceptionMessage: string = '';
  rowData: any
}


@Injectable()
export class RetailScheduleTransferFormComponentHelper extends BaseFpxFormHelper<RetailScheduleTransferFormComponentState> {
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showScheduleHistory: any;
  showExceptionMsg: boolean = false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _tempScheduleRepService: TempScheduleRepService,
    private siownService: SiownService,
    private siintService: SiintbtService,
    public siintbtreqService: SiintbtreqService,
    public SiownreqService: SiownreqService,
    private _accessScope:AccessScopePipe
  ) {
    super(new RetailScheduleTransferFormComponentState());
  }

  override doPreInit(): void {

  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  }

  public override doPostInit(): void {
    let scheduledTransferDel$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('scheduledTransferDel$', {
      "observable": scheduledTransferDel$.asObservable(),
      "subject": scheduledTransferDel$
    });
    this._appConfig.getData('scheduledTransferDel$').observable.subscribe(
      (res: any) => {
 if (res) {
        if(res.action == 'REFRESH'){
          let criteriaQuery: CriteriaQuery = new CriteriaQuery();
          //TODO: setup criteriaQuery
          criteriaQuery.addSortCriteria('nextPaymentDate', 'asc', 'Date');
          criteriaQuery.addFilterCritertia('scheduledCategory', 'String', 'equals', {
            searchText: '1'
          });
          this.setGridCriteria('scheduletransferdetailsGrid', criteriaQuery);
        } 
        else 
        if(res.action == 'DELETE'){
          let routingParam: any = {
            paymentId: res.payload?.paymentId,
            serviceCode: res.payload?.serviceCode,
            Mode: 'D'
  
          };
          if(res?.payload.serviceCode=='RETAILSCHOAT'){
            this.siownService.findByKey(routingParam)().subscribe((response) => {
              if (response) {
                this.state.rowData = response;
                this.setServiceCode("RETAILSCHOAT");
                this.setDataService(this.SiownreqService);
                this.triggerSubmit();
              }
            })
          }
          else{
            this.siintService.findByKey(routingParam)().subscribe((response) => {
              if (response) {
                this.state.rowData = response;
                this.setServiceCode("RETAILSCHINTBT");
                this.setDataService(this.siintbtreqService);
                this.triggerSubmit();
              }
            })
          }
        }
	}
          
  
        
      }
    );
    this.handleFormOnLoad();
  }

  initiateNewTransaction() {
    this._angularRouter.navigate(['transfers-space']);
  }
  viewAllScheduledTransfers() {
    this._angularRouter.navigate(['transfers-space', 'display-shell','transfers','view-scheduled-transfers'], {
      queryParams: {
        routeFrom: 'otherModule',
        serviceCode: "RETAILVIEWSCHTRANSFERS"
      }
    });
    if (this._appConfig.hasData('moduleRefresh$')) {
      this._appConfig.getData('moduleRefresh$').subject.next({ action: 'TRANSFERSQUICKACTION', data: { serviceCode: "RETAILVIEWSCHTRANSFERS" } });
    }
  }
  handleSchedulePaymentsGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    } else if ($event.eventName === 'handleException') {
      this.showExceptionMsg = true;
      this.state.exceptionMessage = $event.payload;
    }
  }
  public override preSubmitInterceptor(payload: SiownreqService): any {
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
      "serviceCode": 'RETAILSCHOAT',
      "baseRateApplied": this.state.rowData?.baseRateApplied,
      "creditAccount": this.state.rowData?.creditAccount,
      "creditAmount": this.state.rowData?.creditAmount,
      "creditCurrency": this.state.rowData?.creditCurrency,
      "debitAmount": this.state.rowData?.debitAmount,
      "debitCurrency": this.state.rowData?.debitCurrency,
      "paidInstallments": this.state.rowData?.paidInstallments,
      "rateApplied": this.state.rowData?.rateApplied,
      "remarks": this.state.rowData?.remarks

    }
    payload = data;
    return payload;
  }

  hasScope(serviceCode: string) {
    return this._accessScope.transform(serviceCode);
  }

  public override postDataFetchInterceptor(payload: SiownreqService) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.siownreq || response.success?.body?.siintbtreq;
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