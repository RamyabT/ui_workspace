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
} from "@fpx/core";
import { Beneficiaries } from '../beneficiaries-service/beneficiaries.model';
import { BeneficiariesService } from '../beneficiaries-service/beneficiaries.service';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailManageBeneRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _beneficiariesService: BeneficiariesService,
    private _appConfig: AppConfigService) {
    super();
    // this.addHandleActions('onclick', this.retailManageBeneRoGridView);
    this.addHandleActions('modify', this.retailManageBeneRoGridModify);
    this.addHandleActions('add', this.retailManageBeneRoGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 10, 10, 10, 10, 10, 10, 10, 10, 10];
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
    _isSortSearch.set('customerCode', "sort&search");
    _isSortSearch.set('beneAccount', "sort&search");
    _isSortSearch.set('status', "sort&search");
    _isSortSearch.set('isFavourite', "sort&search");
    _isSortSearch.set('externalRef', "sort&search");
    _isSortSearch.set('remarks', "sort&search");
    _isSortSearch.set('entityCode', "sort&search");
    _isSortSearch.set('addressLine1', "sort&search");
    _isSortSearch.set('benePhoto', "sort&search");
    return _isSortSearch;
  }

  private retailManageBeneRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Beneficiaries
  ) => {
    //WRITE YOUR CODE HERE 
    let service = this._appConfig.getServiceDetails(data.serviceCode);
    
    let servicePath = service.servicePath.map((path:string) => { return path.replace('entry-shell', 'display-shell') });
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        inventoryNumber: data.inventoryNumber,
        serviceCode: data.serviceCode,
        mode: 'V',
        action: "VIEW"
      }
    });
  };
  private retailManageBeneRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Beneficiaries
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailManageBeneRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Beneficiaries
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
    this.setNgTemplateName('manageBeneListTmplt');
    this.setNgTemplateClass('manage-bene-list-tmpl panning-template');
    const initialCriteria = new CriteriaQuery();
    // initialCriteria.addFilterCritertia('paymentDate', 'Date', 'inRange', { dateFrom: currentDate, dateTo: toDate });
    // initialCriteria.addSortCriteria('nextPaymentDate','desc','Timestamp');
    // initialCriteria.addFilterCritertia('nextPaymentDate', 'Date', 'inRange', { dateFrom: currentDate, dateTo: toDate });
    initialCriteria.addSortCriteria('createdOn','desc','Timestamp');
    this.setInitialCriteria(initialCriteria);
  }


  override doPostInit(): void {

  }

  override postFindallInterceptor = (payload: any) => {
    if (payload.data.length > 0) {
      this._beneficiariesService.setManageBeneCount(payload);
    }

    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload
    });

    return payload;
  }

}




