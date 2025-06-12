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
import { Loandisclosure } from '../loandisclosure-service/loandisclosure.model';

@Injectable()
export class RetailLoanDisclosureDisplayGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailLoanDisclosureDisplayGridView);
    this.addHandleActions('modify', this.retailLoanDisclosureDisplayGridModify);
    this.addHandleActions('add', this.retailLoanDisclosureDisplayGridEntry);
  }
   	                              	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,40,40];
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
        _isSortSearch.set('docName',"sort&search");   		 
        _isSortSearch.set('dateOfGeneration',"sort&search");   		 
    return _isSortSearch;
  }

  private retailLoanDisclosureDisplayGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loandisclosure
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailLoanDisclosureDisplayGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Loandisclosure
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailLoanDisclosureDisplayGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Loandisclosure
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
  this.setNgTemplateName('viewLoanDisclosureListTmplt');
  this.setNgTemplateClass('casa-transactions-dtls-list-tmpl');
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('recentDocCount', 'String', 'equals', {
      searchText: '20'
    });
    this.setInitialCriteria(criteriaQuery);
  }
  
  override setPageSize(): number {
    return 20;
  }
 override doPostInit(): void {
  }  
  override postFindallInterceptor = (payload: any) => {
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data.length
    });
    return payload;
  }
 
}


 
 
