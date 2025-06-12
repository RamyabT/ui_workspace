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
import { Completedpymnts } from '../completedpymnts-service/completedpymnts.model';
import { CompletedpymntsService } from '../completedpymnts-service/completedpymnts.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfigService } from '@dep/services';
import { TranhistoryService } from '../tranhistory-service/tranhistory.service';
import { Tranhistory } from '../tranhistory-service/tranhistory.model';

@Injectable()
export class completedpymntsHelper extends BaseFpxRoGridHelper {
  count:any=1
  lastDate:any=""
  constructor(
    private _router: Router,
    private _httpProvider: HttpProviderService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _completedpymntsService: TranhistoryService,
    private _appConfig: AppConfigService
  ) {
    super();
    this.addHandleActions('onclick', this.completedpymntsView);
    this.addHandleActions('modify', this.completedpymntsModify);
    this.addHandleActions('add', this.completedpymntsEntry);
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
    _isSortSearch.set('valueDate', "sort&search");
    _isSortSearch.set('initiationDate', "sort&search");
    _isSortSearch.set('paymentType', "sort&search");
    _isSortSearch.set(' beneficiaryAccountNumber', "sort&search");
    _isSortSearch.set('debitAccountNumber', "sort&search");
    _isSortSearch.set('beneficiaryName', "sort&search");
    _isSortSearch.set('transactionReference', "sort&search");
    _isSortSearch.set('paymentAmount', "sort&search");
    _isSortSearch.set('paymentCurrency', "sort&search");
    _isSortSearch.set('uETR', "sort&search");
    _isSortSearch.set('status', "sort&search");
    _isSortSearch.set('flowInstanceId', "sort&search");
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

  private transformScheduleType: GridTransformFn<Tranhistory> = (payload: Tranhistory) => {
    let scheduleTypeDescription: string = '';
    if(payload.serviceCode.includes('ARETAIL')){
      scheduleTypeDescription='2';

    }
    else{
      scheduleTypeDescription='1'; 
    }

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
    
    this.setNgTemplateName('transferHistoryListTmplt');
    this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
  }


  override doPostInit(): void {}

  // override postFindallInterceptor = (payload: any) => {
  //   let rowData: Tranhistory[] = [];
  //   let _date = "";

  //   payload.data.map((element: Tranhistory) => element.serviceCodeDescription = this.transformServiceCode(element));
  //   payload.data.map((element: Tranhistory) => element.scheduleTypeDescription = this.transformScheduleType(element));

  //   payload.data.forEach((element: any) => {
  //     let _d = element.paymentDate.split(' ')[0];
  //     if (_date != _d) {
  //       _date = _d;
  //       let rowGroup: any = {
  //         rowGroupTitle: _date
  //       }
  //       rowData.push(rowGroup);
  //     }
  //     rowData.push(element);
  //   });
  //   payload.data = rowData;

  //   this.gridOutputEvent.next({
  //     name: 'afterDataFetch',
  //     payload: payload.data
  //   });

  //   return payload;
  // }

  override postFindallInterceptor = (payload: any) => {
    let rowData: Tranhistory[] = [];
    let _date = "";

    payload.data.map((element: Tranhistory) => element.serviceCodeDescription = this.transformServiceCode(element));
    payload.data.map((element: Tranhistory) => element.scheduleTypeDescription = this.transformScheduleType(element));
    if(this.count==1){
      payload.data.forEach((element: any) => {
        let _d = element.paymentDate.split(' ')[0];
        if (_date != _d) {
          _date = _d;
          this.lastDate=_date;
          let rowGroup: any = {
            rowGroupTitle: _date
          }
          rowData.push(rowGroup);
        }
        rowData.push(element);
      });
      // increase count
      this.count=this.count+1;
    }
    else if(this.count > 1){
      //from second row
      payload.data.forEach((element: any) => {
        let _d = element.paymentDate.split(' ')[0];
        //check whether the last record date is same as the next set record date
        if(this.lastDate != _d){
          this.lastDate = _d;
          if (_date != _d) {
            _date = _d;
            this.lastDate=_date;
            let rowGroup: any = {
              rowGroupTitle: _date
            }
            rowData.push(rowGroup);
          }
        }
        rowData.push(element);
      });
      // increase count
      this.count=this.count+1;
    }
 
    payload.data = rowData;

    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload.data
    });

    return payload;
  }


}




