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
import { Etransferautodeposit } from '../etransferautodeposit-service/etransferautodeposit.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailEtransferAutoDepositRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
  private _appConfig: AppConfigService) {
    super();
    this.addHandleActions('onClick', this.retailEtransferAutoDepositRoGridView);
    this.addHandleActions('modify', this.retailEtransferAutoDepositRoGridModify);
    this.addHandleActions('add', this.retailEtransferAutoDepositRoGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 10, 10, 10];
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
    _isSortSearch.set('emailID', "sort&search");
    _isSortSearch.set('depositAccount', "sort&search");
    _isSortSearch.set('depositAccountName', "sort&search");
    return _isSortSearch;
  }

  private retailEtransferAutoDepositRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransferautodeposit
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailEtransferAutoDepositRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransferautodeposit
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailEtransferAutoDepositRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Etransferautodeposit
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
    this.setNgTemplateName('eTransferAutoDepositTmplt');
    this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
  }


  override doPostInit(): void {
  }
  override postFindallInterceptor = (payload: any) => {
      payload.data = payload.data.filter((item: any) => {
        return item.hasOwnProperty('autoDepositStatus');
      });
      this.gridOutputEvent.next({
        name: 'afterDataFetch',
        payload: payload?.data?.length
      });
      return payload;
  }


}




