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
import { Pfmbudget } from '../pfmbudget-service/pfmbudget.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailPfmTrackBudgetRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
private _appConfig:AppConfigService) {
    super();
    this.addHandleActions('onClick', this.retailPfmTrackBudgetRoGridView);
    this.addHandleActions('modify', this.retailPfmTrackBudgetRoGridModify);
    this.addHandleActions('add', this.retailPfmTrackBudgetRoGridEntry);
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

  private retailPfmTrackBudgetRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Pfmbudget
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailPfmTrackBudgetRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Pfmbudget
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailPfmTrackBudgetRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Pfmbudget
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
  this.setNgTemplateName('pfmBudgetDisplayGridTmplt');
    this.setNgTemplateClass('pfm-budget-tmplt');
  }
  
  
 override doPostInit(): void {
  if (this._appConfig.hasData('pfmActionPublisher$')) {
    this._appConfig.getData('pfmActionPublisher$').observable.subscribe(
      (res: any) => {
        if(res?.action == "TRACKBUDGETREFRESHGRID"){
          let criteriaQuery: CriteriaQuery = new CriteriaQuery();
          this.refreshGrid(criteriaQuery);
        }
      }
    );
  }
  }  
 
  override postFindallInterceptor = (payload: any) => {
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data
    });
    return payload;
  }
 
}