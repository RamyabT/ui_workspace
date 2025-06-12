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
import { Favpayments } from '../favpayments-service/favpayments.model';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailFavouritePaymentsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _favpaymentsService: FavpaymentsService,
    private _appConfig: AppConfigService) {
    super();
    this.addHandleActions('onclick', this.retailFavouritePaymentsRoGridView);
    this.addHandleActions('modify', this.retailFavouritePaymentsRoGridModify);
    this.addHandleActions('add', this.retailFavouritePaymentsRoGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 100, 100, 100, 100, 100, 100, 100, 40];
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
    _isSortSearch.set('inventoryNumber', "sort&search");
    _isSortSearch.set('customerCode', "sort&search");
    _isSortSearch.set('serviceCode', "sort&search");
    _isSortSearch.set('paymentId', "sort&search");
    _isSortSearch.set('debitAccount', "sort&search");
    _isSortSearch.set('creditAccount', "sort&search");
    _isSortSearch.set('paymentCurrency', "sort&search");
    _isSortSearch.set('beneficiaries', "sort&search");
    return _isSortSearch;
  }

  private retailFavouritePaymentsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Favpayments
  ) => {
    //WRITE YOUR CODE HERE 
    if(data.serviceCode == 'initiate') {
      this._angularRouter.navigate(['transfers-space', 'display-shell', 'transfers', 'initiate-a-transfers'],{
        queryParams: {
          routeFrom: 'otherModule',
        }
      });
    }
    else {
      let sertvice = this._appConfig.getServiceDetails(data?.serviceCode);
      this._angularRouter.navigate(sertvice.servicePath, {
        queryParams: {
          paymentId: data.paymentId,
          serviceCode: data.serviceCode,
          mode: 'R',
          routeFrom: 'otherModule',
        }
      });
    }
  };
  private retailFavouritePaymentsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Favpayments
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailFavouritePaymentsRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Favpayments
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setNgTemplateName('favouriteTransactionsDtlsListTmplt');
    this.setNgTemplateClass('favourite-transactions-dtls-list-tmpl');
    if (this._appConfig.hasData('transfersUpdate$')) {
      this._appConfig.getData('transfersUpdate$').observable.subscribe(
        (res: any) => {
          console.log("refresh transfers... 2");
            let criteriaQuery: CriteriaQuery = new CriteriaQuery();
            this.refreshGrid(criteriaQuery);
        }
      );
    }
  }

  override doPostInit(): void {
    
  }

  private transformBeneDetails: GridTransformFn<Favpayments> = (payload: Favpayments) => {
    let initial: string = '';
    let beneName: string = '';
    if(typeof(payload?.beneficiaries) === 'string'){
      initial = 'OA';
      beneName = "Own Account";
    } else {
      beneName = payload?.beneficiaries?.beneNickName;
      let lastName = beneName.split(" ");
      initial = beneName.charAt(0);
      if(lastName.length > 1){
        initial = initial + lastName[1].charAt(0);
      }
    }
    return {
      initial: initial.toUpperCase(),
      name: beneName
    }
  }

  override postFindallInterceptor = (payload: any) => {
    
    payload.data.map((rowData: Favpayments) => {
      let beneDetails = this.transformBeneDetails(rowData);
      rowData.initial = beneDetails.initial;
      rowData.beneName = beneDetails.name;
      return rowData;
    });
    
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload?.data.length
    });
    if(payload.data?.length > 0) {
      payload.data.splice(0,0,{
        serviceCode: 'initiate'
      })
    }
    return payload.data.slice(0, 7);
  }


}




