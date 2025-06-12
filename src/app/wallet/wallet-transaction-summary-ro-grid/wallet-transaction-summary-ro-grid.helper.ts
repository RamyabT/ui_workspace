import { Inject, Injectable } from '@angular/core';
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
  FpxCurrenyFormatterPipe,
} from "@fpx/core";
  import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfigService } from '@dep/services';
import { TranhistoryService } from 'src/app/transfers/tranhistory-service/tranhistory.service';
import { Completedpymnts } from 'src/app/transfers/completedpymnts-service/completedpymnts.model';
import { Tranhistory } from 'src/app/transfers/tranhistory-service/tranhistory.model';
import { WallethistroyService } from '../trans-history-service/wallethistroy.service';
import { wallettransactiondtls } from '../trans-history-service/transactionhistory.model';
import { WalletsummaryService } from '../wallet-summary-service/walletsummary.service';
 

@Injectable()
export class WalletTransactionSummaryRoGridHelper extends BaseFpxRoGridHelper {
  constructor(
    private _router: Router,
    private _httpProvider: HttpProviderService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _WallethistroyService: WallethistroyService,
    private _appConfig: AppConfigService, private _walletService : WalletsummaryService
  ) {
    super();
    this.addHandleActions('onclick', this.completedpymntsView);
    this.addHandleActions('modify', this.completedpymntsModify);
    this.addHandleActions('add', this.completedpymntsEntry);
    this._walletService.walletSummaryLoad$.subscribe((x)=>{
       let criteriaQuery:CriteriaQuery = new CriteriaQuery();
      let accno = this._appConfig.getData('walletID');
        criteriaQuery.addFilterCritertia("accountNumber", "String", "equals", {
        searchText: accno,
      });
      this.refreshGrid(criteriaQuery);
       //this.setInitialCriteria(criteriaQuery)
    } )
  }

  public getGridColumnWidth(): number[] {
    return [3, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
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
    _isSortSearch.set('transactionCurrency', "sort&search");
    _isSortSearch.set('transactionReference', "sort&search");
    _isSortSearch.set('transactionDateTime', "sort&search");
    _isSortSearch.set(' transactionDescription', "sort&search");
    _isSortSearch.set('valueDate', "sort&search");
    _isSortSearch.set('accountNumber', "sort&search");
    _isSortSearch.set('transactionDate', "sort&search");
    _isSortSearch.set('R', "sort&search");
    _isSortSearch.set('debitCreditFlag', "sort&search");
    _isSortSearch.set('balance', "sort&search");
    _isSortSearch.set('transType', "sort&search");
    _isSortSearch.set('exchangeRate', "sort&search");
    _isSortSearch.set('transactionAmount', "sort&search");
    _isSortSearch.set('transactionCategory', "sort&search");
    _isSortSearch.set('remarks', "sort&search");
    return _isSortSearch;
  }

  private completedpymntsView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Completedpymnts
  ) => {
    //WRITE YOUR CODE HERE 
    let service = this._appConfig.getServiceDetails(data.serviceCode);
    let servicePath = service.servicePath.map((path: string) => { return path.replace('entry-shell', 'display-shell') });
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        action: "VIEW",
        paymentId: data.paymentId,
        serviceCode: data.serviceCode,
        status:data.status,
        mode: "V"
      }
    });
  };
  private completedpymntsModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Completedpymnts
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private completedpymntsEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Completedpymnts
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  private transformServiceCode: GridTransformFn<Tranhistory> = (payload: Tranhistory) => {
    let serviceCodeDescription: string = '';
    if (payload.serviceCode === 'RETAILTRANINTBT'  || payload.serviceCode === 'ARETAILTRANINTBT') {
      serviceCodeDescription = "WithinBank";
    }
    else if (payload.serviceCode === 'RETAILTRANOAT'  || payload.serviceCode ===  'ARETAILTRANOAT') {
      serviceCodeDescription = "Own Account";
    }
    else if (payload.serviceCode === 'RETAILTRANDOMESTIC'  || payload.serviceCode ===  'ARETAILTRANDOMESTIC' || payload.serviceCode ===  'ARETAILTRANFTS' || payload.serviceCode ===  'RETAILTRANFTS' ) {
      serviceCodeDescription = "Domestic";
    }
    else if (payload.serviceCode === 'RETAILTRANCC'  || payload.serviceCode === 'ARETAILTRANCC') {
      serviceCodeDescription = "Credit Card";
    }
    else if (payload.serviceCode === 'RETAILTRANSWIFT'  || payload.serviceCode ===  'ARETAILTRANSWIFT') {

      serviceCodeDescription = "International";
    }
    else if (payload.serviceCode === 'RETAILTRANCBAED') {
      serviceCodeDescription = "Cross Border";
    }
    else if (payload.serviceCode === 'RETAILTRANINSTA') {
      serviceCodeDescription = "Insta Pay";
    }

    return serviceCodeDescription;

  };

  private transformScheduleType: GridTransformFn<wallettransactiondtls> = (payload: wallettransactiondtls) => {
    let scheduleTypeDescription: string = '';
    // if(payload.serviceCode.includes('ARETAIL')){
    //   scheduleTypeDescription='2';

    // }
    // else{
    //   scheduleTypeDescription='1'; 
    // }

    return scheduleTypeDescription;

  };

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {


    if (this._appConfig.hasData('transfersUpdate$')) {
      this._appConfig.getData('transfersUpdate$').observable.subscribe(
        (res: any) => {
          console.log("refresh transfers... 1");
          if(res?.event != "fav-change"){
            let criteriaQuery: CriteriaQuery = new CriteriaQuery();
            this.refreshGrid(criteriaQuery);
          }
        }
      );
    }
    
    this.setNgTemplateName('walletHistoryListTmplt');
    this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
  }


  override doPostInit(): void {


   }

  override postFindallInterceptor = (payload: any) => {
    let rowData: wallettransactiondtls[] = [];
    let _date = "";

    // payload.data.map((element: wallettransactiondtls) => element.serviceCodeDescription = this.transformServiceCode(element));
    // payload.data.map((element: wallettransactiondtls) => element.scheduleTypeDescription = this.transformScheduleType(element));

    payload.data.forEach((element: any) => {
      let _d = element.transactionDate.split(' ')[0];
      if (_date != _d) {
        _date = _d;
        let rowGroup: any = {
          rowGroupTitle: _date
        }
        rowData.push(rowGroup);
      }
      rowData.push(element);
    });
    payload.data = rowData;

    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload.data
    });

    return payload;
  }


}




