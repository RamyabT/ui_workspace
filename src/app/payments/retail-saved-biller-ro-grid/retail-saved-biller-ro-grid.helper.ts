import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  FpxAppConfig,
} from "@fpx/core";
import { Billeraccount } from '../billeraccount-service/billeraccount.model';
import { AppConfigService } from '@dep/services';
import { PaymentsService } from '../payments.service';
import { BillPaymentsService } from 'src/app/foundation/validator-service/billpayments.service';
import { DeviceDetectorService } from '@dep/core';

@Injectable()
export class RetailSavedBillerRoGridHelper extends BaseFpxRoGridHelper {
  serviceCode: any;
  constructor(private _router: Router,
    private _billPaymentsService:BillPaymentsService,
    private paymentsServices:PaymentsService,
    private _deviceDetectorService:DeviceDetectorService,
    private _appConfig:AppConfigService,
    private _fpxAppConfig:FpxAppConfig,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retailSavedBillerRoGridView);
    this.addHandleActions('modify', this.retailSavedBillerRoGridModify);
    this.addHandleActions('add', this.retailSavedBillerRoGridEntry);
  }
   
  public getGridColumnWidth(): number[] {
    return  [3,];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private retailSavedBillerRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:any
  ) => {
    //WRITE YOUR CODE HERE
    if (Object.keys(data).length !== 0) {
      let routeServiceCode = 'RETAILSINGLEPAYMENT';
      let service = this._appConfig.getServiceDetails(routeServiceCode);
      this._router.navigate(service?.servicePath, {
        queryParams: {
          serviceCode: routeServiceCode,
          billerBeneficiaryId: data?.billerBeneficiaryId,
          routeFrom: "SAVEDBILLERGRID",
        }
      });
    }


  };
  private retailSavedBillerRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Billeraccount
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailSavedBillerRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Billeraccount
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {
  this.serviceCode = this.getRoutingParam("serviceCode");

  if(this.serviceCode == 'RETAILSAVEDBILLER'){
    this.setNgTemplateName('savedBillerTmplt');
    this.setNgTemplateClass('saved-biller-list-tmpl');
  }
  else{
    // billerCriteriaQuery.setPaginationCriteria('1',4)
    this.setNgTemplateName('savedBillerTmplt');
    this.setNgTemplateClass('saved-biller-list-tmpl');
  }

  }

  override doPostInit(): void {
    let billerCriteriaQuery = new CriteriaQuery();
    billerCriteriaQuery.addFilterCritertia('status', 'String', 'equals', {
      'searchText': 'A'
    });
    billerCriteriaQuery.addSortCriteria('createdOn', 'desc', 'Timestamp')
    this.setInitialCriteria(billerCriteriaQuery);
    this._billPaymentsService.billpaymentsDesktopActionPublisher?.subscribe(res => {
      console.log("DESKTOP REFRESH")
      if (res?.action === 'REFRESHSAVEDBILLER') {
        let billerCriteriaQuery = new CriteriaQuery();
      billerCriteriaQuery.addFilterCritertia('status', 'String', 'equals', {
        'searchText': 'A'
      });
      billerCriteriaQuery.addSortCriteria('createdOn','desc','Timestamp')
        this.refreshGrid(billerCriteriaQuery)
      }
    })

  }

  // setUpInitCriteria():CriteriaQuery{
  //   let billerCriteriaQuery = new CriteriaQuery();
  //   billerCriteriaQuery.addFilterCritertia('status', 'String', 'equals', {
  //     'searchText': 'A'
  //   });
  //   billerCriteriaQuery.addSortCriteria('createdOn','desc','Timestamp')
  //   return billerCriteriaQuery;
  // }

  override postFindallInterceptor = (payload: any) => {
    console.log(payload,"payload11")
    if (payload.data === null) {
      console.log(payload.data,"data")
      this.gridOutputEvent.next({
        name: 'handleException',
        payload: "Service Unavailable. We're currently unable to access the details. Please try again later"
      });
      return '';
    }
    this.triggerGridOutputEvent('afterDataFetch', payload);
    // if (this.paymentsServices.upcomingBillData && this.paymentsServices.upcomingBillData?.data?.length > 0 && payload?.data?.length > 0) {
    //   let tempPayload: any[] = [];
    //   payload.data.forEach((element: any) => {
    //     let upcomingBillData = this.paymentsServices.upcomingBillData?.data.find((item: any) => { return item?.billerId?.billerId === element?.billerId?.billerId });
    //     if (upcomingBillData != null) {
    //       tempPayload.push({ ...element, date: upcomingBillData.date, amount: upcomingBillData.amount })
    //     } else {
    //       tempPayload.push({ ...element })
    //     }
    //   });
    //   payload.data = tempPayload;

    // }

    let serviceCode = this.getRoutingParam("serviceCode");
    // if (payload?.data?.length > 0 && serviceCode !== 'RETAILSAVEDBILLER') {
    //   payload.data = payload.data.slice(0, 4)
    // }

    return payload;
  }
 
 
}


 
 
