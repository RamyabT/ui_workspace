import { Inject, Injectable } from '@angular/core';
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
import { Pdcchequereq } from '../pdcchequereq-service/pdcchequereq.model';
import { AppConfigService } from '@dep/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable()
export class RetailPdcChequeDisplayGridHelper extends BaseFpxRoGridHelper {
  constructor(
    private _appConfig: AppConfigService, private _router: Router,
    private _httpProvider: HttpProviderService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,) {
    super();
    // this.addHandleActions('onClick', this.retailPdcChequeDisplayGridView);
    // this.addHandleActions('modify', this.retailPdcChequeDisplayGridModify);
    // this.addHandleActions('add', this.retailPdcChequeDisplayGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 10, 10, 10, 10, 10, 10, 10];
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

  private retailPdcChequeDisplayGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Pdcchequereq
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailPdcChequeDisplayGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Pdcchequereq
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailPdcChequeDisplayGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Pdcchequereq
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
    this.setNgTemplateName('pdcChequeListTmplt');
    this.setNgTemplateClass('cheque-list-tmpl');

    let criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery = this._dialogData.criteriaQuery;
    this.setInitialCriteria(criteriaQuery);
  }
  
  override doPostInit(): void {
  }
  override postFindallInterceptor = (payload: any) => {
    console.log(payload);
    if(payload?.data?.length == 0 || payload.data?.ErrorCode || payload.data?.ErrorDescription){
      return {
        "data": [{NoData:"NoData"}],
        "totalRowCount": null
      }
    }
    return payload;


  }



  

}




