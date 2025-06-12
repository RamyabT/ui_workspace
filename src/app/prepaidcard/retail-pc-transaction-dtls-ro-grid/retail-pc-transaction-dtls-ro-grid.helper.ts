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
  FpxCurrenyFormatterPipe,
  ContextMenuModel,
} from "@fpx/core";
import { Pctransactiondtls } from '../pctransactiondtls-service/pctransactiondtls.model';
import moment from 'moment';
import { AppConfigService } from '@dep/services';
import { Prepaidcard } from '../prepaidcard-service/prepaidcard.model';

@Injectable()
export class RetailPcTransactionDtlsRoGridHelper extends BaseFpxRoGridHelper {
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);  
  cardData!: Prepaidcard;


  constructor(private _router: Router,private _appConfig: AppConfigService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
  private _httpProvider: HttpProviderService,) {
    super();
    this.addHandleActions('onClick', this.retailPcTransactionDtlsRoGridView);
    this.addHandleActions('modify', this.retailPcTransactionDtlsRoGridModify);
    this.addHandleActions('add', this.retailPcTransactionDtlsRoGridEntry);
  }
   	                              	                               	                               	                               	                               	                               	                          	    	  
  public getGridColumnWidth(): number[] {
    return  [3,10,10,10,10,10,10,10];
  }
  
  override getToolBar():ToolBar[] {
    let toolBar:ToolBar[]=[];
    toolBar.push({ type:'icon', key:'add', name:'add', hoverText:'Add ' });
    toolBar.push({ type:'icon', key:'edit', name:'modify', hoverText:'Modify ' });    
    toolBar.push({ type:'icon', key:'refresh', name:'refresh', hoverText:'Refresh' });
    return toolBar;
  }

  override getToolGroup(): ToolGroup[] | [] {
    let toolGroup: ToolGroup[] = [];
    let toolBar = new Tools("tool1", "button");

    toolBar.addTool({
      hoverText: "Download",
      path: "./assets/images/icons/download.svg",
      text: "",
      toolId: "download",
    });
    toolBar.addTool({
      hoverText: "Settings",
      path: "./assets/images/icons/settings.svg",
      text: "",
      toolId: "settings",
    });
    toolBar.addTool({
      hoverText: "Filter",
      path: "./assets/images/icons/filter.svg",
      text: "",
      toolId: "filter",
    });

    toolGroup.push(toolBar.toolGroup());

    return toolGroup;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string,'sort' | 'search' | 'sort&search' | undefined> = new Map();
        _isSortSearch.set('valueDate',"sort&search");   		 
        _isSortSearch.set('transactionDate',"sort&search");   		 
        _isSortSearch.set('transactionDescription',"sort&search");   		 
        _isSortSearch.set('transactionReference',"sort&search");   		 
        _isSortSearch.set('transType',"sort&search");   		 
        _isSortSearch.set('transactionAmount',"sort&search");   		 
        _isSortSearch.set('balance',"sort&search");   		 
    return _isSortSearch;
  }

  private debitBalance: GridTransformFn<any> = (payload) => {
    return (
      payload.transactionCurrency +
      " " +
      this._currencyFormatter.transform(
        payload.balance,
        payload.transactionCurrency
      )
    );
  };

  private transactionAmount: GridTransformFn<any> = (payload) => {
    return (
      payload.transactionCurrency +
      " " +
      this._currencyFormatter.transform(
        payload.transactionAmount,
        payload.transactionCurrency
      )
    );
  };




  private retailPcTransactionDtlsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data:Pctransactiondtls
  ) => {
    this._router.navigate(
      [
        "cards-space",
        "display-shell",
        "credit-cards",
        "retail-pc-transaction-details-form",
      ],
      {
        queryParams: {
          transactionReference: data.transactionReference,
        },
      }
    );
    //WRITE YOUR CODE HERE 
  };
  private retailPcTransactionDtlsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Pctransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  private retailPcTransactionDtlsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data:Pctransactiondtls
  ) => {
   //WRITE YOUR CODE HERE 
  };
  
 public override getTransformMap():Map<string,GridTransformFn<any>> {
   let transformMap:Map<string,GridTransformFn<any>> = new Map();
   transformMap.set("balance", this.debitBalance);
    transformMap.set("transactionAmount", this.transactionAmount);
    return transformMap;

  }
  
  public override getGridWidth(): number {
      return 100;
    }
  
 override doPreInit(): void {
  this.setRefreshOption(false);
  this.setNgTemplateName('pcTransactionsDtlsListTmplt');
  this.setNgTemplateClass('dc-transactions-dtls-list-tmpl panning-template');

  this.cardData = this._appConfig.getData('prepaidCardData');

  const criteriaQuery = new CriteriaQuery();
    // let cardRefNumber = this.getRoutingParam("cardRefNumber");
    criteriaQuery.addFilterCritertia("cardRefNumber", "String", "equals", {
      searchText: this.cardData?.cardRefNumber,
    });
    // criteriaQuery.addFilterCritertia("isBuild", "String", "equals", {
    //   searchText: "0",
    // });
    this.setInitialCriteria(criteriaQuery);
  }
  
  
 override doPostInit(): void {
  this.enableContextMenu(true);
  }  
  override getContextMenuItems(rowData: any): ContextMenuModel[] | undefined {
    let menuItems = this._serviceCodeDetails.getContextMenu(
      "RETAILCCTRANSACTIONROGRID"
    );
    return menuItems;
  }
  override handleContextMenuClick(event: string, rowData: any): void {
    console.log("Context Menu: ", event, " ~~ ", rowData);
    let serviceCode = "";
    let queryParams: any = {
      cardRefNumber: rowData["cardRefNumber"],
      transactionReference: rowData["transactionReference"],
    };
    if (event.indexOf("~")) {
      let menuEvent = event.split("~");
      serviceCode = menuEvent[0];
      let formAction = menuEvent[1];
      queryParams.action = formAction;
    } else {
      serviceCode = event;
    }
    let service = this._serviceCodeDetails.getServiceDetails(serviceCode);

    this._router.navigate(service.servicePath, {
      queryParams: {
        ...service.queryParams,
        ...queryParams,
      },
    });
  }

  override externalFilterCriteriaTransform = (
    payload: any,
    criteriaQuery: CriteriaQuery
  ): CriteriaQuery | undefined => {
    criteriaQuery.addFilterCritertia("transactionDate", "Date", "inRange", {
      dateFrom: payload.transactionDate,
      dateTo: payload.valueDate,
    });

    return criteriaQuery;
  };

  override postFindallInterceptor = (payload: any) => {
    let rowData: any[] = [];
    let _date = "";
    let _dateGroupName = "";
    if(payload && payload?.data?.length>0){
      payload.data.forEach((element: any) => {
      if (_date != element.transactionDate) {
        let transactionDate = _date = element.transactionDate;
        let currentDate = moment().format('YYYY-MM-DD');
        if(moment(transactionDate).diff(moment(currentDate),'days') == 0) _dateGroupName = 'Today';
        else if(moment(transactionDate).diff(moment(currentDate),'days') == -1) _dateGroupName = 'Yesterday';
        else _dateGroupName = moment(transactionDate).format('DD MMM YYYY');
        // else _dateGroupName=moment(transactionDate).format('MMM YYYY');
  
        let rowGroup: any = {
          rowGroupTitle: _dateGroupName
        }
        rowData.push(rowGroup);
      }
      rowData.push(element);
    });
    payload.data = rowData;
  }
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data
    });
    return payload;
  }
}


 
 
