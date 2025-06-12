import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Biller } from '../biller-service/biller.model';
import { AppConfigService } from '@dep/services';
import { PaymentsService } from '../payments.service';

@Injectable()
export class RetailBillerListRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _appConfig: AppConfigService,
    private _fpxAppConfig: FpxAppConfig,
    private paymentsServices: PaymentsService,
    private route: ActivatedRoute,
    private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retailBillerListRoGridView);
    this.addHandleActions('modify', this.retailBillerListRoGridModify);
    this.addHandleActions('add', this.retailBillerListRoGridEntry);

    this.route.queryParams.subscribe(params => {
      let categoryCode: any = params['categoryCode'];
      this.refreshGrid(this.getInitialCriteria(categoryCode));
    });
  }

  public getGridColumnWidth(): number[] {
    return [3,];
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
    return _isSortSearch;
  }

  private retailBillerListRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Biller
  ) => {
    //WRITE YOUR CODE HERE 
    let routeServiceCode = 'RETAILBILLERACCOUNT';
    let service = this._fpxAppConfig.getServiceDetails(routeServiceCode);
    this._router.navigate(service?.servicePath, {
      queryParams: {
        operationMode: "A",
        serviceCode: routeServiceCode,
        billerId: data?.billerId,
        categoryCode: this.getRoutingParam('categoryCode')
      }
    });
  };
  private retailBillerListRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Biller
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailBillerListRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Biller
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setInitialCriteria(this.getInitialCriteria());
  }


  getInitialCriteria(categoryCode?: string) {
    this.setNgTemplateName('billerListTmplt');
    this.setNgTemplateClass('biller-list-tmpl');

    let billerCriteriaQuery = new CriteriaQuery();
    billerCriteriaQuery.addFilterCritertia('category:categoryCode', 'String', 'equals', {
      'searchText': categoryCode ? categoryCode : this.getRoutingParam('categoryCode')
    });
    
    return billerCriteriaQuery;
  }


  override doPostInit(): void {
    // this.paymentsServices.upcomingBillData
  }

  override postFindallInterceptor = (payload: any) => {
    this.triggerGridOutputEvent('BILLERLISTDATAEMIT', payload)
    // let serviceCode = this.getRoutingParam("serviceCode");
    // if(serviceCode == 'RETAILCATEGORYGROUPBILLER'){
    //     if(payload?.data){
    //       const groups = payload?.data?.reduce((groups:any, item:any) => {
    //         const group = (groups[item.category.description] || []);
    //         group.push(item);
    //         groups[item.category.description] = {...group,};
    //         return groups;
    //       }, {});
    //       payload.data = groups;
    //     }
    // }

    return payload;
  }


}




