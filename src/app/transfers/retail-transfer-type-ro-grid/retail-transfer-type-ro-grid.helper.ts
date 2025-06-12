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
import { Paymentsystem } from '../paymentsystem-service/paymentsystem.model';

@Injectable()
export class RetailTransferGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailTransferGridView);
    this.addHandleActions('modify', this.retailTransferGridModify);
    this.addHandleActions('add', this.retailTransferGridEntry);
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

  private retailTransferGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Paymentsystem
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailTransferGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Paymentsystem
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailTransferGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Paymentsystem
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
    this.setNgTemplateName('beneTypeListTmplt');
    this.setNgTemplateClass('bene-type-list-tmplt');
  }


  override doPostInit(): void {

  }


}




