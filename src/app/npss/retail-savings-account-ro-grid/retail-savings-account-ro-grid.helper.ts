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
  FpxRoRowSelection,
  FpxGridInputAction,
} from "@fpx/core";
import { Saaccount } from '../saaccount-service/saaccount.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfigService } from '@dep/services';
import { NpssCustomerAccounts } from '../npss-service/npss-main.service';

@Injectable()
export class RetailSavingsAccountRoGridHelper extends BaseFpxRoGridHelper {

  private _npssDetails: any;
  private _accountsList: any;

  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _appConfig: AppConfigService) {
    super();
    this.addHandleActions('onclick', this.retailSavingsAccountRoGridView);
    this.setGridInput('refresh', this._refresh);
  }

  private _refresh:FpxGridInputAction=(currentValue:any,previousValue:any)=>{
    this._appConfig.removeData('npssSavingsAccount$');

    let npssSavingsAccount$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('npssSavingsAccount$', {
      "observable": npssSavingsAccount$.asObservable(),
      "subject": npssSavingsAccount$
    });

    if(this._npssDetails && this._npssDetails.status == 'A'){
      this._onAccountSelect();
    }

    this.refreshGrid(this.criteriaQuery);
  }

  public getGridColumnWidth(): number[] {
    return [3, 10, 10];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private retailSavingsAccountRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: any
  ) => {
    //WRITE YOUR CODE HERE 
    this.gridOutputEvent.next({
      name: 'rowSelect',
      payload: data
    });
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;
  }

  public override getGridWidth(): number {
    return 100;
  }

  override setRowSelection(): FpxRoRowSelection {
    let rowSelection = { multiRowSelection : false, showRowSelection : false };
    let npssDetails = this._appConfig.hasData('npssDetails') ? this._appConfig.getData('npssDetails') : null;
    if(npssDetails && npssDetails?.status == 'NR') {
      rowSelection.multiRowSelection = true;
    }
    return rowSelection;
  }

  override doPreInit(): void {
    this.setNgTemplateName("savingsAccountRoTmplt");
    this.setNgTemplateClass("savings-account-ro-tmplt");

    let npssSavingsAccount$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('npssSavingsAccount$', {
      "observable": npssSavingsAccount$.asObservable(),
      "subject": npssSavingsAccount$
    });

    if(this._appConfig.hasData('npssDetails')){
      this._npssDetails = this._appConfig.getData('npssDetails');
    }

  }

  override doPostInit(): void {
    if(this._npssDetails && this._npssDetails.status == 'A'){
      this._onAccountSelect();
    }
  }

  private _onAccountSelect(){
    this._appConfig.getData('npssSavingsAccount$').observable.subscribe(
      (res:any) => {
        if(res) {
          this.gridOutputEvent.next({
            name: 'defaultAccoutChange',
            payload: res
          });
        }
      }
    )
  }

  override postFindallInterceptor = (payload: any) => {
    if(this._npssDetails && this._npssDetails.status == 'A') {
      let _npssDetails = this._npssDetails;
      
      payload.data.map((obj1:any) => _npssDetails.accountDetails.find((obj2:any) => {
        if(obj1.iban == obj2.iban){
          obj1.hasEnrolled = true;
          if(obj2.defaultAccount == "Y") obj1.isPrimary = true;
          return obj1;
        }
      }));

      let _selectedRow = payload.data.filter((item:any) => item.hasEnrolled);
      setTimeout(() => {
        this.gridOutputEvent.next({
          name: 'afterDataFetch',
          payload: _selectedRow
        });
      });

    }
   
  if(payload.data.length ==0){
    setTimeout(() => {
    this.gridOutputEvent.next({
      name: 'noDataFetch',
      payload: []
    });
  });
  }
 
    this._accountsList = payload;

    return payload;
  };

}




