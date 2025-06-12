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
import { TempScheduleRepService } from "../tempScheduleRep-service/tempScheduleRep.service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { SiownreqService } from "../siownreq-service/siownreq.service";
import moment from "moment";
import { SiownService } from "../siown-service/siown.service";
import { OwnaccounttransferService } from "../ownaccounttransfer-service/ownaccounttransfer.service";
import { SiintbtService } from "../siintbt-service/siintbt.service";
import { SiintbtreqService } from "../siintbtreq-service/siintbtreq.service";
import { TransferTypeListComponent } from "../transfer-type-list/transfer-type-list.component";
import { ActionsPanelComponent } from "src/app/foundation/actions-panel/actions-panel.component";

export class ScheduleFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isDataReceived: boolean = false;
  gridData: any;
  rowData:any;
}


@Injectable()
export class ScheduleFormComponentHelper extends BaseFpxFormHelper<ScheduleFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showScheduleHistory: any;
  totalRowCount: number = 0;
  isFormScreenLoaded: boolean = false;
  disclaimerText: string = '';
  apiFailed: boolean = false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _tempScheduleRepService: TempScheduleRepService,
    public _device: DeviceDetectorService,
    private siownService:SiownService,
    private siownreqService: SiownreqService,
    private siintService: SiintbtService,
    public siintbtreqService: SiintbtreqService,
    public router: Router
  ) {
    super(new ScheduleFormComponentState());
  }

  override doPreInit(): void {
    this.isFormScreenLoaded = this.router.url.includes('display-shell') || false;
    this.disclaimerText = this.isFormScreenLoaded ? 'RetailTransferScheduleForm.disclaimer.disclaimerText2' : 'RetailTransferScheduleForm.disclaimer.disclaimerText1';
    console.log(this.disclaimerText)
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  }

  public override doPostInit(): void {
    let scheduledTransferDelete$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('scheduledTransferDelete$', {
      "observable": scheduledTransferDelete$.asObservable(),
      "subject": scheduledTransferDelete$
    });

    this._appConfig.getData('scheduledTransferDelete$').observable.subscribe(
      (res: any) => {
        this._appConfig.setData('viewSchTransferData',res.payload);
        if(res.payload.serviceCode=='RETAILSCHOAT'){
          let routingParam: any = {
            paymentId:res.payload.paymentId,
            serviceCode: res.payload.serviceCode,
            Mode: 'D'
  
          };
          this.siownService.findByKey(routingParam)().subscribe((response) => {
            if (response) {
              this.state.rowData = response;
              this.setServiceCode("RETAILSCHOAT");
              this.setDataService(this.siownreqService);
              this.triggerSubmit();
            }
          })
        }
        else{
          let routingParam: any = {
            paymentId:res.payload.paymentId,
            serviceCode: res.payload.serviceCode,
            Mode: 'D'
  
          };
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
    );
    this.handleFormOnLoad();
  }
  
  initiateNewTransaction(){
    this._angularRouter.navigate(['transfers-space', 'entry-shell', 'transfers', 'retail-own-account-transfer-form'], {
    });
  }

  handleSchedulePaymentsGridEvent($event: any) {
    console.log("handleSchedulePaymentsGridEvent", $event);
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
      this.totalRowCount = Number($event.payload) || 0;
    } else if ($event.eventName == 'errorHandling') {
      this.apiFailed = true;
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
      "serviceCode": this.state.rowData?.serviceCode,
      "baseRateApplied":this.state.rowData?.baseRateApplied,
      "creditAccount":this.state.rowData?.creditAccount,
      "creditAmount":this.state.rowData?.creditAmount,
      "creditCurrency":this.state.rowData?.creditCurrency,
      "debitAmount":this.state.rowData?.debitAmount,
      "debitCurrency":this.state.rowData?.debitCurrency,
      "paidInstallments":this.state.rowData?.paidInstallments,
      "rateApplied":this.state.rowData?.rateApplied,
      "remarks":this.state.rowData?.remarks

    }
    payload = data;
    return payload;
  }
 public override postDataFetchInterceptor(payload: SiownreqService){
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

  seeAll() {
    this.router.navigate(['/transfers-space/display-shell/transfers/view-scheduled-transfers']);
  }

  backToTransfers() {
    this._router.navigate(
      ['transfers-space']);
  }

  openTransferTypeModal() {
    let modal = new FpxModal();

    if (this._device.isMobile()) {
      modal.setComponent(ActionsPanelComponent);
      modal.setPanelClass('context-menu-popup');
      modal.setDisableClose(true);
      modal.setData({
        menuCode: "RETAILTRANSFERTYPE"
      });
    } else {
      modal.setComponent(TransferTypeListComponent);
      modal.setPanelClass('dep-alert-popup');
      modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'all-accounts-list', 'transfer-type-list']);
      modal.setDisableClose(true);
      modal.setData({
        title: 'Transfer money',
      });
    }

    modal.setAfterClosed(this.transferTypeSelectedAfterClose);
    this.openModal(modal)
  }

  transferTypeSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    let service = this._appConfig.getServiceDetails(payload);
    this._angularRouter.navigate(service.servicePath);
  }


  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}