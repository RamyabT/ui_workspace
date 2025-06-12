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
import { Deposits } from '../deposits-service/deposits.model';
import { AppConfigService } from '@dep/services';
import { ActiveSpaceInfoService } from '@dep/core';

@Injectable()
export class RetailDepositsSummaryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _appConfig:AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super();
    this.addHandleActions('onclick', this.retailDepositsSummaryRoGridView);
    this.addHandleActions('modify', this.retailDepositsSummaryRoGridModify);
    this.addHandleActions('add', this.retailDepositsSummaryRoGridEntry);
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

  private retailDepositsSummaryRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Deposits
  ) => {
    //WRITE YOUR CODE HERE 
    if(data.accountType == "fd") {
      this._activeSpaceInfoService.setAccountNumber(data.accountNumber);
      this._router.navigate(['accounts-space', 'display-shell', 'deposits', 'retail-deposit-details-form'],{
        queryParams: {
          accountNumber: data.accountNumber
        }
      });
    }

    if(data && Object.keys(data).length){
      this._appConfig.setData('activeInvestmentCard',data);
    }
  };
  private retailDepositsSummaryRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Deposits
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailDepositsSummaryRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Deposits
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
    this.setNgTemplateName('DepositAccountDetailsTmplt');
    this.setNgTemplateClass('deposits-account-list-tmpl');
    
  }

  override doPostInit(): void {}

}
