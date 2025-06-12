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
import { AppConfigService } from '@dep/services';

@Injectable()
export class RetailViewAllFavouriteEtransferPaymentsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _appConfig: AppConfigService) {
    super();
    // this.addHandleActions('onclick', this.retailFavouriteEtransferPaymentsRoGridView);
    this.addHandleActions('modify', this.retailFavouriteEtransferPaymentsRoGridModify);
    this.addHandleActions('add', this.retailFavouriteEtransferPaymentsRoGridEntry);
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

  private retailFavouriteEtransferPaymentsRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Favpayments
  ) => {
    //WRITE YOUR CODE HERE 
    let service = this._appConfig.getServiceDetails(data.serviceCode);
    let servicePath = service.servicePath
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        paymentId: data.paymentId,
        serviceCode: data.serviceCode,
        mode: "R"
      }
    });
  };
  private retailFavouriteEtransferPaymentsRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Favpayments
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailFavouriteEtransferPaymentsRoGridEntry: BaseFpxRoGridHandleAction = (
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
    this.setNgTemplateName('viewFavETransferListTmplt');
    this.setNgTemplateClass('manage-bene-list-tmpl panning-template');
    if (this._appConfig.hasData('etransfersUpdate$')) {
      this._appConfig.getData('etransfersUpdate$').observable.subscribe(
        (res: any) => {
          if(res?.event == "view-all-fav-etransfer-change"){
            let criteriaQuery: CriteriaQuery = new CriteriaQuery();
            this.refreshGrid(criteriaQuery);
          }
        }
      );
    }
  }


  override doPostInit(): void {
  }

  private transformServiceCode: GridTransformFn<Favpayments> = (payload: Favpayments) => {
    let serviceCodeDescription: string = '';
    if (payload.serviceCode === 'ETRANSFERSENDMONEY') {
      serviceCodeDescription = "Sent";
    }
    else if (payload.serviceCode === 'ETRANSFERREQUESTMONEY') {
      serviceCodeDescription = "Request";
    }

    return serviceCodeDescription;

  };

  private transformBeneDetails: GridTransformFn<Favpayments> = (payload: Favpayments) => {
    let initial: string = '';
    let beneName: string = '';
    if(payload?.beneficiaries){
      beneName = payload?.beneficiaries?.beneNickName;
      initial = beneName.charAt(0);
      if (beneName.split(' ').length > 1 && beneName.split(' ').length <= 2) {
        initial = initial + beneName.split(' ')[1].charAt(0);
      }
      else if (beneName.split(' ').length > 2) {
        initial = initial + beneName.split(' ')[2].charAt(0);
      }
    }
    return {
      initial: initial.toUpperCase(),
      name: beneName
    }
  }

  override postFindallInterceptor = (payload: any) => {

    payload.data.map((rowData: Favpayments) => {
      rowData.serviceCodeDesc = this.transformServiceCode(rowData);
      let beneDetails = this.transformBeneDetails(rowData);
      rowData.initial = beneDetails.initial;
      rowData.beneName = beneDetails.name;
      return rowData;
    });
    this.gridOutputEvent.next({
      name: 'afterDataFetch',
      payload: payload
    });
    return payload;
  }
}




