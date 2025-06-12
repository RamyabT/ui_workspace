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
import { CreditcardStatement } from '../creditcardStatement-service/creditcardStatement.model';

@Injectable()
export class RetailVisaEStatementHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailVisaEStatementView);
    this.addHandleActions('modify', this.retailVisaEStatementModify);
    this.addHandleActions('add', this.retailVisaEStatementEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 10];
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
    _isSortSearch.set('dateOfGeneration', "sort&search");
    return _isSortSearch;
  }

  private retailVisaEStatementView: BaseFpxRoGridHandleAction = (
    name: string,
    data: CreditcardStatement
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailVisaEStatementModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: CreditcardStatement
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailVisaEStatementEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: CreditcardStatement
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
    this.setNgTemplateName('visaeStatementDetailsTmplt');
    this.setNgTemplateClass('visa-estmt-dtls-tmpl');
    
  }


  override doPostInit(): void {
  }


}




