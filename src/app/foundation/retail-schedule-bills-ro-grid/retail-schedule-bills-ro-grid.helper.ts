import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
  FpxModal,
} from "@fpx/core";
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { MomentService } from 'src/app/foundation/validator-service/moment-service';
import { Schedulebillpayment } from 'src/app/transfers/schedulebillpayment-service/schedulebillpayment.model';
import { SchedulebillpaymentService } from 'src/app/transfers/schedulebillpayment-service/schedulebillpayment.service';


@Injectable()
export class RetailScheduleBillsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _tempScheduleRepService: SchedulebillpaymentService,
    private momentService: MomentService,
    private _appConfig:AppConfigService
  ) {

    super();
    // this.addHandleActions('onclick', this.retailSchedulePaymentsRoGridView);
    // this.addHandleActions('modify', this.retailSchedulePaymentsRoGridModify);
    // this.addHandleActions('add', this.retailSchedulePaymentsRoGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    _isSortSearch.set('serviceCode', "sort&search");
    _isSortSearch.set('scheduleType', "sort&search");
    _isSortSearch.set('paymentAmount', "sort&search");
    _isSortSearch.set('sourceAccount', "sort&search");
    _isSortSearch.set('creditAccountNumber', "sort&search");
    _isSortSearch.set('beneficiaryName', "sort&search");
    _isSortSearch.set('nextPaymentDate', "sort&search");
    _isSortSearch.set('paymentFrequency', "sort&search");
    _isSortSearch.set('numberOfPayments', "sort&search");
    _isSortSearch.set('paymentStatus', "sort&search");
    _isSortSearch.set('paymentDate', "sort&search");
    _isSortSearch.set('paymentId', "sort&search");
    return _isSortSearch;
  }

  private retailSchedulePaymentsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Schedulebillpayment
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailSchedulePaymentsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Schedulebillpayment
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailSchedulePaymentsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Schedulebillpayment
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    transformMap.set('serviceCode', this.transformServiceCode);
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setNgTemplateName('scheduleBillsDtlsListTmplt');
    this.setNgTemplateClass('schedule-transfer-dtls-list-tmpl');
    const initialCriteria = new CriteriaQuery();
    initialCriteria.addSortCriteria('paymentDate', 'asc', 'Date');
    this.setInitialCriteria(initialCriteria);
  }


  private transformServiceCode: GridTransformFn<Schedulebillpayment> = (payload: Schedulebillpayment) => {
    let serviceCodeDescription: string = '';
    if (payload.serviceCode === 'RETAILSCHINTBT') {
      serviceCodeDescription = "WithinBank";
    }
    else if (payload.serviceCode === 'RETAILSCHOAT') {
      serviceCodeDescription = "Own Account";
    }
    else if ((payload.serviceCode === 'RETAILSCHDOM') || (payload.serviceCode === "RETAILSCHFTS")) {
      serviceCodeDescription = "Domestic";
    }
    else if (payload.serviceCode === 'RETAILSCHCC') {
      serviceCodeDescription = "Credit Card";
    }
    else if (payload.serviceCode === 'RETAILSCHSWIFT') {

      serviceCodeDescription = "International";
    }
    else if (payload.serviceCode === 'RETAILSCHCBAED') {
      serviceCodeDescription = "Cross Border";
    }

    return serviceCodeDescription;

  };

  private transformServiceType: GridTransformFn<Schedulebillpayment> = (payload: Schedulebillpayment) => {
    let serviceTypeDescription: string = '';
    // if (payload.scheduleType == "2") {
    //   serviceTypeDescription = "Pay later";
    // }
    // else if (payload.scheduleType == "3") {
    //   serviceTypeDescription = "Recurring";
    // }

    return serviceTypeDescription;
  }


  override doPostInit(): void {
    
  }

  override postFindallInterceptor = (payload: any) => {
    let modifiedPayload: any[] = [];

    if (payload.data === null || payload.data?.ErrorCode) {
      this.gridOutputEvent.next({
        name: 'handleException',
        payload: "Service Unavailable. We're currently unable to access the details. Please try again later"
      });
      return '';
    }

    payload.data.map((element: Schedulebillpayment) => element.serviceCodeDescription = this.transformServiceCode(element));
    payload.data.map((element: Schedulebillpayment) => element.serviceTypeDescription = this.transformServiceType(element));

    console.log("BILL PAYMENTS ", payload)

    if (payload.data.length > 2) {
      modifiedPayload = payload.data.slice(0, 2);
      this.gridOutputEvent.next({
        name: 'afterDataFetch',
        payload: modifiedPayload
      });
      return {
        data: modifiedPayload,
        totalRowCount: 2
      }
    }
    else {
      this.gridOutputEvent.next({
        name: 'afterDataFetch',
        payload: payload.data
      });
      console.log(payload)
      return payload;
    }

  }

}




