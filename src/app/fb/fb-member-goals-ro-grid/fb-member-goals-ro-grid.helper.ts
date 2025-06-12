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
import { Goallog } from '../goallog-service/goallog.model';
import { GoalData, Goals } from '../goals-service/goals.model';
 
@Injectable()
export class FbMemberGoalsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailPfmGoalsRoGridView);
    this.addHandleActions('modify', this.retailPfmGoalsRoGridModify);
    this.addHandleActions('add', this.retailPfmGoalsRoGridEntry);
  }
                                                                                                                                                                          
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10];
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
        _isSortSearch.set('goalName',"sort&search");   		 
        _isSortSearch.set('targetAmt',"sort&search");   		 
        _isSortSearch.set('frequency',"sort&search");   		 
  		 
    return _isSortSearch;
  }

  private retailPfmGoalsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Goals
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailPfmGoalsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Goals
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailPfmGoalsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Goals
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
    this.setNgTemplateName('fbGoalsDisplayGridTmplt');
    this.setNgTemplateClass('pfm-goals-tmplt');
    this.initialLoad = false;
  }


  override doPostInit(): void {
  }

  override postFindallInterceptor = (payload: any) => {
    
    payload.data = payload.data.filter((item: Goals) => item.status != 'I');

    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data
    });

    return payload;
  }


}


 
 
