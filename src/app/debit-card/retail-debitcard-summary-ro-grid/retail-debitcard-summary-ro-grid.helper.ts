import { Injectable, inject } from '@angular/core';
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
  FpxAppConfig,
  ContextMenuModel,
} from "@fpx/core";
import { Debitcard } from '../debitcard-service/debitcard.model';

@Injectable()
export class debitcardHelper extends BaseFpxRoGridHelper {
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  constructor(private _router: Router,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onclick', this.retaildebitcardView);
    this.addHandleActions('modify', this.retaildebitcardModify);
    this.addHandleActions('add', this.retaildebitcardEntry);
  }
   	                              	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
   // return  [3,40,10,10,10,40,10];
    return  [3,13,13,15,12,18,10,18,10];
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
        // _isSortSearch.set('cardNumber',"sort&search");   		 
        // _isSortSearch.set('cardType',"sort&search");   		 
        // _isSortSearch.set('status',"sort&search");   		 
        // _isSortSearch.set('productDesc',"sort&search");   		 
        // _isSortSearch.set('branchDesc',"sort&search");   		 
        // _isSortSearch.set('validThru',"sort&search");   		 
    return _isSortSearch;
  }
  // override getToolGroup(): ToolGroup[] | [] {
  //   let toolGroup: ToolGroup[] = []
  //   let toolBar = new Tools('tool1', 'button');

  //   toolBar.addTool({
  //     hoverText: "Download",
  //     path: "./assets/images/icons/download.svg",
  //     text: "",
  //     toolId: "download",
  //   });
  //   toolBar.addTool({
  //     hoverText: "Settings",
  //     path: "./assets/images/icons/settings.svg",
  //     text: "",
  //     toolId: "settings",
  //   });
  //   toolBar.addTool({
  //     hoverText: "Filter",
  //     path: "./assets/images/icons/filter.svg",
  //     text: "",
  //     toolId: "filter",
  //   });

  //   toolGroup.push(toolBar.toolGroup());

  //   return toolGroup;
  // }

  private retaildebitcardView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Debitcard
  ) => {
    //WRITE YOUR CODE HERE 
    this._router.navigate(['cards-space', 'display-shell', 'debit-card', 'retail-debitcard-details-form'],{
      queryParams: {
        cardRefNumber: data.cardRefNumber
      }
    });
  };
  private retaildebitcardModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Debitcard
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retaildebitcardEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Debitcard
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
  this.setRefreshOption(false);
  }
  
  
 override doPostInit(): void {
  this.enableContextMenu(true);
  }  

  // override getContextMenuItems(rowData: any): ContextMenuModel[] | undefined {
  //   let menuItems = this._serviceCodeDetails.getContextMenu("CORPDCSUMMARY");
  //   return menuItems;
  // }
 
  // override handleContextMenuClick(event: string, rowData: any): void {
  //   console.log("Context Menu: ", event, " ~~ ", rowData);
  //   let serviceCode = "";
  //   let queryParams: any = {
  //     "cardRefNumber": rowData["cardRefNumber"]
  //   }
  //   if (event.indexOf('~')) {
  //     let menuEvent = event.split("~");
  //     serviceCode = menuEvent[0];
  //     let formAction = menuEvent[1];
  //     queryParams.action = formAction;
  //   } else {
  //     serviceCode = event;
  //   }
  //   let service = this._serviceCodeDetails.getServiceDetails(serviceCode);

  //   this._router.navigate(service.servicePath, {
  //     queryParams: {
  //       ...service.queryParams,
  //       ...queryParams
  //     }
  //   });
  // }
}


 
 
