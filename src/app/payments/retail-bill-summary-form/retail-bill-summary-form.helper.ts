import { ElementRef, inject, Injectable, ViewChild } from "@angular/core";
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
  FpxModalAfterClosed,
  CriteriaQuery
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BillsummaryService } from '../billsummary-service/billsummary.service';
import { Billsummary } from '../billsummary-service/billsummary.model';
import { DeviceDetectorService } from "@dep/core";
import { RetailupcomingBillSummaryExFilterComponent } from 'src/app/payments/retail-upcoming-bill-summary-filter/retail-upcoming-bill-summary-filter.component';
import { BillPaymentsService } from "src/app/foundation/validator-service/billpayments.service";
import { AppConfigService } from "@dep/services";
export class RetailBillSummaryFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   upcomingloader:boolean = true;
  upcomingData:any[] = [];
  billhistoryloader:boolean = true;
  billHistoryData:any[] = [];

  savedBillerloader:boolean = true;
  savedBillerData:any[] = [];
   activeTabIndex: number = 0;
   moduleHeaderTop: number = 0;

   fromDate: any;
  toDate: any;
  billerId: any;

}


@Injectable()
export class RetailBillSummaryFormHelper extends BaseFpxFormHelper<RetailBillSummaryFormState>{
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
 
   constructor( private retailBillSummaryFormService: BillsummaryService, private _httpProvider : HttpProviderService,private _router: Router,
    private _deviceDetectorService:DeviceDetectorService,private _billPaymentsService:BillPaymentsService,
    private _appConfig:AppConfigService
   ) 
    {
        super(new RetailBillSummaryFormState());
    }
   
  override doPreInit(): void {
      this.setHidden('filter',true);
 this.setServiceCode("RETAILBILLSUMMARY");
 }
   

  public override doPostInit(): void {
  
  }
  selectMultipleBill() {
    let service = this._appConfig.getServiceDetails('RETAILSELECTMULTIBILLPAYMENT');
    this._router.navigate(service.servicePath);
  }
 
  public override preSubmitInterceptor(payload: Billsummary):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Billsummary){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
ngOnInit(): void {
  // this.getUpcomingBillSummary();
  this.state.upcomingloader = true;
  this.state.billhistoryloader = true;
  this.state.savedBillerloader = true;
  if(!this._deviceDetectorService.isMobile()){
    this._billPaymentsService.billpaymentsDesktopActionPublisher = new Subject();
  }
}

ngAfterViewInit(){
  if(this._device.isMobile()){
    setTimeout(()=>{
      this.state.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
    });
  }
}

// ngOnDestroy(): void {
//   if(!this._deviceDetectorService.isMobile()){
//     this._billPaymentsService?.billpaymentsDesktopActionPublisher?.unsubscribe();
//   }
// }
  
onTabChanged($event:any){
  this.state.activeTabIndex=$event.index;
  if(this.state.activeTabIndex==0){
    this.setHidden('filter',true);
  }
  else if(this.state.activeTabIndex==1){
    this.setHidden('filter',false);
  }
}
handleUpcomingBillGridEvent(payload:any){
  this.state.upcomingloader = false;
  this.state.upcomingData = payload?.payload?.data || [];

}

handleBillHistoryGridEvent(payload:any){
  this.state.billhistoryloader = false;
  this.state.billHistoryData = payload?.payload?.data || [];

}

navToAddBiller(){
  let sertvice = this._appConfig.getServiceDetails('RETAILCATEGORYGROUPBILLER');
  this._angularRouter.navigate(sertvice.servicePath, {
    queryParams: {
      serviceCode: 'RETAILCATEGORYGROUPBILLER' 
    }
  });
}
filter() {
  let modal = new FpxModal();
  modal.setComponent(RetailupcomingBillSummaryExFilterComponent);
  modal.setPanelClass('dep-info-popup');
  modal.setDisableClose(false);
  modal.setData({
    title: "RetailupcomingBillSummaryExFilter.title",
    // toDate:this.state.formValues?.toDate,
    // fromDate:this.state.formValues?.fromDate,
    // billerId:this.state.formValues?.transactionReference
  });
  modal.setAfterClosed(this.contextmenuModelAfterClose);
  this.openModal(modal);
}
contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
  console.log("model cbjvbvlosed...", payload);
  this.state.fromDate = payload.fromDate;
  this.state.toDate = payload.toDate;
  this.state.billerId = payload.billerId;
  
  // this.accountNumber = payload.debitAccountNumber;
  const criteriaQuery = new CriteriaQuery();
  // let cardRefNumber= this.getRoutingParam('cardRefNumber');
  //  criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', { searchText: payload.accountNumber });
   criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', { dateFrom: this.state.fromDate,dateTo: this.state.toDate });
  // criteriaQuery.addFilterCritertia('paymentDate', 'Date', 'inRange', {  dateTo: this.state.toDate });
  criteriaQuery.addFilterCritertia('billerId', 'String', 'equals', { searchText: payload.billerId });
  
  if(payload.maximumAmount && payload.minAmount == '') {
    payload.minAmount = 0;
  }
  if((payload.minAmount != "" || payload.minAmount == 0) && payload.maximumAmount != "") {
    criteriaQuery.addFilterCritertia('transactionAmount','Numeric','inRange',{
      fromValue : payload.minAmount,
      toValue : payload.maximumAmount
    })
  }
  
// this.state.formValues ={
//   ...this.formGroup.value,
//   fromDate: payload.fromDate,
//   toDate: payload.toDate,
//   billerId:payload.billerId,
  
// }
//  criteriaQuery.addSortCriteria('transactionDate', 'desc', 'Date');
  if(this.state.activeTabIndex==0){this.setGridCriteria('UpcomingBillPaymentRoGrid', criteriaQuery);}
   else{
   this.setGridCriteria('BillPaymentHistoryRoGird', criteriaQuery);}
}
  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.billsummary.flowInstanceId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

