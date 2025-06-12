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
export class RetailViewAllFavouritePaymentsRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
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
    let service = this._appConfig.getServiceDetails(data.serviceCode);
    // let servicePath = service.servicePath.map((path: string) => path.replace('entry-shell', 'display-shell'));
    let servicePath = service.servicePath
    this._angularRouter.navigate(servicePath, {
      queryParams: {
        paymentId: data.paymentId,
        serviceCode: data.serviceCode,
        mode: "R"
      }
    });
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
    this.setNgTemplateName('viewFavTransferListTmplt');
    this.setNgTemplateClass('view-all-favourite-transfer-list-tmpl panning-template');
  }


  override doPostInit(): void {
  }

  private transformServiceCode: GridTransformFn<Favpayments> = (payload: Favpayments) => {
    let serviceCodeDescription: string = '';
    if (payload.serviceCode === 'RETAILTRANINTBT') {
      serviceCodeDescription = "WithinBank";
    }
    else if (payload.serviceCode === 'RETAILTRANOAT' || payload.serviceCode === 'ARETAILTRANOAT') {
      serviceCodeDescription = "Own Account";
    }
    else if (payload.serviceCode === 'RETAILTRANDOMESTIC') {
      serviceCodeDescription = "Domestic";
    }
    else if (payload.serviceCode === 'RETAILTRANCC') {
      serviceCodeDescription = "Credit Card";
    }
    else if (payload.serviceCode === 'RETAILTRANSWIFT') {
      serviceCodeDescription = "International";
    }
    else if(payload.serviceCode === 'RETAILTRANINSTA'){
      serviceCodeDescription = "Insta Pay"
    }

    return serviceCodeDescription;

  };

  private transformBeneDetails: GridTransformFn<Favpayments> = (payload: Favpayments) => {
    let initial: string = '';
    let beneName: string = '';
    if(payload.serviceCode =='RETAILTRANINSTA'){
      initial = 'IP';
      beneName = "Insta Pay";
    }
    else if(typeof(payload?.beneficiaries) === 'string'){
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




