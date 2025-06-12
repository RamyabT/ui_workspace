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
import { Delegateuser } from '../delegateuser-service/delegateuser.model';
import { UserAuthService } from '@dep/services';

@Injectable()
export class RetailDelegateuserGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,
public userAuth: UserAuthService,) {
    super();
    this.addHandleActions('onClick', this.retailDelegateuserGridView);
    this.addHandleActions('modify', this.retailDelegateuserGridModify);
    this.addHandleActions('add', this.retailDelegateuserGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
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
        _isSortSearch.set('userName',"sort&search");   		 
        _isSortSearch.set('customerCode',"sort&search");   		 
        _isSortSearch.set('customerName',"sort&search");   		 
        _isSortSearch.set('enabled',"sort&search");   		 
        _isSortSearch.set('entityCode',"sort&search");   		 
        _isSortSearch.set('firstName',"sort&search");   		 
        _isSortSearch.set('lastName',"sort&search");   		 
        _isSortSearch.set('emailAddress',"sort&search");   		 
        _isSortSearch.set('mobileNumber',"sort&search");   		 
        _isSortSearch.set('address',"sort&search");   		 
        _isSortSearch.set('status',"sort&search");   		 
        _isSortSearch.set('nationality',"sort&search");   		 
        _isSortSearch.set('operationMode',"sort&search");   		 
        _isSortSearch.set('remarks',"sort&search");   		 
        _isSortSearch.set('accessLevel',"sort&search");   		 
        _isSortSearch.set('createdBy',"sort&search");   		 
    return _isSortSearch;
  }

  private retailDelegateuserGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Delegateuser
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailDelegateuserGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Delegateuser
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailDelegateuserGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Delegateuser
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
  this.setNgTemplateName('manageDelegateListTmplt');
    this.setNgTemplateClass('manage-smb-list-tmpl panning-template');
    let usId = this.userAuth.getAuthorizationAttr('UserId');
    let criteriaQuery:CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('createdBy','String','equals',{'searchText':usId})
    criteriaQuery.addSortCriteria('createdOn','desc','String');
    this.setInitialCriteria(criteriaQuery);
  }
  
  
 override doPostInit(): void {
  }  

  override postFindallInterceptor = (payload: any) => {
    let rowData: any[] = [];
    let _date = "";
    // let _dateGroupName = "";
    //   payload.data.forEach((element: any) => {
    //   if (_date != element.transactionDate) {
    //     let transactionDate = _date = element.transactionDate;
    //     let currentDate = moment().format('YYYY-MM-DD');
    //     if(moment(transactionDate).diff(moment(currentDate),'days') == 0) _dateGroupName = 'Today';
    //     else if(moment(transactionDate).diff(moment(currentDate),'days') == -1) _dateGroupName = 'Yesterday';
    //     else _dateGroupName = moment(transactionDate).format('DD MMM YYYY');
    //     // else _dateGroupName=moment(transactionDate).format('MMM YYYY');
  
    //     let rowGroup: any = {
    //       rowGroupTitle: _dateGroupName
    //     }
    //     rowData.push(rowGroup);
    //   }
    //   rowData.push(element);
    // });
    // payload.data = rowData;
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data
    });
    return payload;
  }
 
 
}


 
 
