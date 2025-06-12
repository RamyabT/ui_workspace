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
  FpxGridInputAction,
} from "@fpx/core";
import { workflowq } from '../workflowq-service/workflowq.model';
import { ShellService } from '@dep/services';
import { AppConfigService } from "@dep/services";


@Injectable()
export class RetailWorkflowqueueRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _shellService: ShellService,
    private _appConfig: AppConfigService) {
    super();
    this.addHandleActions('onclick', this.retailWorkflowqueueRoGridView);
    // this.addHandleActions('modify', this.retailWorkflowqueueRoGridModify);
    // this.addHandleActions('add', this.retailWorkflowqueueRoGridEntry);
    this.setGridInput('setCriteriaQuery', this._setCriteriaType);
  }

  public getGridColumnWidth(): number[] {
    return [3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
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
    _isSortSearch.set('taskInstanceId', "sort&search");
    _isSortSearch.set('action', "sort&search");
    _isSortSearch.set('owner', "sort&search");
    _isSortSearch.set('potOwner', "sort&search");
    _isSortSearch.set('pendingSince', "sort&search");
    _isSortSearch.set('serviceCode', "sort&search");
    _isSortSearch.set('serviceName', "sort&search");
    _isSortSearch.set('flowInstanceId', "sort&search");
    _isSortSearch.set('initBy', "sort&search");
    _isSortSearch.set('customerCode', "sort&search");
    _isSortSearch.set('workflowType', "sort&search");
    _isSortSearch.set('actionOn', "sort&search");
    return _isSortSearch;
  }

  private retailWorkflowqueueRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: workflowq
  ) => {
    //WRITE YOUR CODE HERE 
    const taskId = data.taskInstanceId;
    const status = data.action;
    const userId = data.potOwner;
    this._shellService.workflowRowData = data;
    console.log(data);

    let shell = "";
    let action = "DECISION";
    shell = "decision-shell";
    
    const route = [
      "smb-transaction-management-space",
      shell,
      "workflow",
      [...(routes as any)[data["serviceCode"]]],
    ].flat();
    this._appConfig.setData('currentWorkFlow', data);
    if (data.serviceCode == "RETAILTRANDOMESTIC" || data.serviceCode == "RETAILTRANINTBT" || data.serviceCode == "RETAILTRANCC" || data.serviceCode == "RETAILTRANOAT" || data.serviceCode == "RETAILTRANCBAED" || data.serviceCode == "RETAILTRANSWIFT") {
      this._router.navigate(route, {
        queryParams: {
          paymentId: data.requestReference,
          action: action,
          inventoryNumber: data.requestReference,
          shellType: 'DECISION',
        },
      })
    }
    else {
      this._router.navigate(route, {
        queryParams: {
          paymentId: data.requestReference,
          action: action,
          serviceCode: data.serviceCode,
          inventoryNumber: data.requestReference
        },
      });
    }
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setNgTemplateName('transactionsMgmtListTmplt');
    this.setNgTemplateClass('transactions-Mgmt-List-Tmplt');
    this.initialLoad = false;
    // let criteriaQuery = new CriteriaQuery();
    // criteriaQuery.addSortCriteria('initOn', 'desc', 'String');
    // this.setInitialCriteria(criteriaQuery);
  }

  override doPostInit(): void {
    this.gridOutputEvent.next({
      name: 'gridReady',
      payload: {}
    });
  }

  private _setCriteriaType:FpxGridInputAction = (currentValue:any, previousValue:any)=>{
    this.refreshGrid(currentValue);
  }

  private _pendingSummary: FpxGridInputAction = (currentValue: any, previousValue: any) => {
    let criteriaQuery = new CriteriaQuery();
    criteriaQuery.addQueryparam('status', 'P');
    this.refreshGrid(criteriaQuery);
  }

  override postFindallInterceptor = (payload: any) => {
    payload.data = payload.data.filter((item:any) => item.workflowAccNum && item.workflowAmt);

    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data
    });

    return payload;
  }
}

const routes = {
  RETAILTRANOAT: ['transfers', 'retail-own-account-transfer-form'],
  RETAILSCHOAT: ['transfers', 'retail-own-account-transfer'],
  RETAILTRANDOMESTIC: ['transfers', 'retail-domestic-transfer'],
  RETAILSCHDOM: ['transfers', 'retail-domestic-transfer'],
  RETAILTRANINTBT: ['transfers', 'retail-within-bank-transfer-form'],
  RETAILSCHINTBT: ['transfers', 'retail-within-bank-transfer-form'],
  RETAILTRANSWIFT: ['transfers', 'retail-international-transfer-form'],
  RETAILSCHSWIFT: ['transfers', 'retail-international-transfer-form'],
  RETAILTRANCC: ['transfers', 'retail-cctransfer-form'],
  RETAILSCHCC: ['transfers', 'retail-cctransfer-form'],
  RETAILTRANCBAED: ['transfers', 'retail-aedtransfer-form'],
  RETAILSCHCBAED: ['transfers', 'retail-aedtransfer-form'],
  RETAILSCHFTS: ['transfers', 'corp-domestic-transfer']
}
