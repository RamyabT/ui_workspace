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
import { Useralertcfg } from '../useralertcfg-service/useralertcfg.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailManageAlertsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    protected _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailManageAlertsRoGridView);
    this.addHandleActions('modify', this.retailManageAlertsRoGridModify);
    this.addHandleActions('add', this.retailManageAlertsRoGridEntry);
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

  private retailManageAlertsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Useralertcfg
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailManageAlertsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Useralertcfg
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailManageAlertsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Useralertcfg
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
    if (this.getRoutingParam('serviceCode') == 'RETAILMANAGEUSERALERTS') {
      this.setNgTemplateClass('manage-user-alert-tmpl');
      this.setNgTemplateName('manageUserAlertTmpl');
    } else {
      this.setNgTemplateClass('manage-alert-tmpl');
      this.setNgTemplateName('manageAlertTmpl');
    }
  }

  override doPostInit(): void { }

  override postFindallInterceptor = (payload: any) => {
    if (this.getRoutingParam('serviceCode') == 'RETAILMANAGEUSERALERTS') {
      let useralertservicesData = this._appConfig.getData('useralertservicesData');
      payload = useralertservicesData?.useralertservices
      this._appConfig.removeData('useralertservicesData');
    }
    return payload;
  }
}
