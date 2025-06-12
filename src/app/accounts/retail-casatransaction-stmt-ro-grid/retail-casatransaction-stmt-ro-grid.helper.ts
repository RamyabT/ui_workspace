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
import { Casatransactiondtls } from '../casatransactiondtls-service/casatransactiondtls.model';
import { retailcasatrandtlsfilterformComponent } from '../retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailCasaTransactionStmtROGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
  private _appConfig:AppConfigService) {
    super();
    this.addHandleActions('onClick', this.retailCasaTransactionStmtROGridView);
    this.addHandleActions('modify', this.retailCasaTransactionStmtROGridModify);
    this.addHandleActions('add', this.retailCasaTransactionStmtROGridEntry);
    this.addHandleActions('filter', this.casatransactionhandler);
    
  }
   	                              	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,24,24,24,24];
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
        _isSortSearch.set('transactionDate',"sort&search");   		 
        _isSortSearch.set('transactionDescription',"sort&search");   		 
        _isSortSearch.set('transactionAmount',"sort&search");   		 
        _isSortSearch.set('transactionCategory',"sort&search");   		 
    return _isSortSearch;
  }

  private retailCasaTransactionStmtROGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Casatransactiondtls
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailCasaTransactionStmtROGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Casatransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailCasaTransactionStmtROGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Casatransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
  override getToolGroup(): ToolGroup[] | [] {
    let toolGroup: ToolGroup[] = []
    let toolBar = new Tools('tool1', 'button');

    toolBar.addTool({
      hoverText: "Filter",
      path: "./assets/images/icons/filter.svg",
      text: "",
      toolId: "filter",
    });

    toolGroup.push(toolBar.toolGroup());

    return toolGroup;
  }
  private casatransactionhandler: BaseFpxRoGridHandleAction = (
    name: string,
    data: Casatransactiondtls
  ) => {
    //WRITE YOUR CODE HERE
    this._router.navigate(['accounts-space','entry-shell','accounts','retailcasatrandtlsfilterform'], {
     queryParams: {
       action: 'ADD'
     }
   });
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {
  this.setRefreshOption(true);
  let casaTranFilterCriteria =this._appConfig.getData('casaTranFilterCriteria');
  this.setInitialCriteria(casaTranFilterCriteria);
  // this.setFilterFormComponent(retailcasatrandtlsfilterformComponent)
  }
  
  
 override doPostInit(): void {
  // this._appConfig.removeData('casaTranFilterCriteria');
  }  
 
 
}


 
 
