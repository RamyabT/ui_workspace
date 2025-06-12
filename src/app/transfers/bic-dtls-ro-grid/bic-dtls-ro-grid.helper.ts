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
  FpxModal,
} from "@fpx/core";

@Injectable()
export class BicDtlsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retailBicDtlsRoGridView);
  }

  public getGridColumnWidth(): number[] {
    return [3];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private retailBicDtlsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: any,
    currentRowData: any
  ) => {
    //WRITE YOUR CODE HERE 
    this.gridOutputEvent.next({
      name: 'onBICSelect',
      payload: data
    });
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;
  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setNgTemplateName('bicDtlsListTmplt');
    this.setNgTemplateClass('bic-dtls-list-tmpl');
  }

  override doPostInit(): void {
  }

  override postFindallInterceptor = (payload: any) => {
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload
    });
    
    return payload;
  }
}
