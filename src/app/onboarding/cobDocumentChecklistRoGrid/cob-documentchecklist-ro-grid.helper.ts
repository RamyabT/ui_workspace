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
import { Documentchecklist } from '../documentchecklist-service/documentchecklist.model';

@Injectable()
export class CobDocumentChecklistRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.cobDocumentChecklistRoGridView);
    this.addHandleActions('modify', this.cobDocumentChecklistRoGridModify);
    this.addHandleActions('add', this.cobDocumentChecklistRoGridEntry);
  }
   	                         	    	  
  public getGridColumnWidth(): number[] {
    return  [3,120];
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
        _isSortSearch.set('documents',"sort&search");   		 
    return _isSortSearch;
  }

  private cobDocumentChecklistRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Documentchecklist
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private cobDocumentChecklistRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Documentchecklist
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private cobDocumentChecklistRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Documentchecklist
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
  // this.initialLoad = false;
  this.setRefreshOption(false);
  this.setNgTemplateName('documentListTmpt');
  // this.setNgTemplateClass('contribtion-dtl-list-tmpl cob-dtl-list-tmpl');
  }
  
  
 override doPostInit(): void {
  }  
 
 
}


 
 
