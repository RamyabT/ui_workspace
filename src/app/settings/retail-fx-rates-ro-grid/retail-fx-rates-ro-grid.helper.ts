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
import { Fxrates } from '../fxrates-service/fxrates.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailFXRatesRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _appConfig: AppConfigService,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailFXRatesRoGridView);
    this.addHandleActions('modify', this.retailFXRatesRoGridModify);
    this.addHandleActions('add', this.retailFXRatesRoGridEntry);
  }
   
  public getGridColumnWidth(): number[] {
    return  [3,];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private retailFXRatesRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Fxrates
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailFXRatesRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Fxrates
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailFXRatesRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Fxrates
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {
  this.setNgTemplateClass('fx-rates-tmpl');
  this.setNgTemplateName('fxRatesTmpl');
  let criteria = new CriteriaQuery();
  criteria.addQueryparam('fromCurrency',this._appConfig.getBaseCurrency())
  this.setInitialCriteria(criteria);
  }
  
  
 override doPostInit(): void {
  }  

  override postFindallInterceptor = (payload: any) => {
    // const newFirstElement = {currencyDesc:"Currency",buyRate:"Buy Rate","sellRate":'Sell Rate'}
    const newFirstElement = {currencyDesc:"RETAILVIEWFXRATESFORM.currencyDesc",buyRate:"RETAILVIEWFXRATESFORM.buyRate","sellRate":"RETAILVIEWFXRATESFORM.sellRate"}
    const newArray = [newFirstElement].concat(payload.data)
    return newArray;

  }
 
 
}


 
 
