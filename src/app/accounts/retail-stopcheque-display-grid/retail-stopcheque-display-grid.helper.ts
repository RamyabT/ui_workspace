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
import { Stopcheque } from '../stopcheque-service/stopcheque.model';
import { CurrencyPipe, formatDate } from '@angular/common';
import { AppConfigService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import moment from 'moment';

@Injectable()
export class RetailStopchequeDisplayGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _appconfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    public _device: DeviceDetectorService,
    public currency: CurrencyPipe,

  ) {
    super();
    this.addHandleActions('onclick', this.retailStopchequeDisplayGridView);
    this.addHandleActions('modify', this.retailStopchequeDisplayGridModify);
    this.addHandleActions('add', this.retailStopchequeDisplayGridEntry);
    this.addHandleActions('REVOKE', this.StopCheque);
    this.addCellActions('REVOKE', "", "icon", "system-ico-button btn-revoke", "Revoke", () => false);

  }

  public getGridColumnWidth(): number[] {
    return [20, 16, 18, 17, 18, 10];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    // toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    // toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    // toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }
  override getToolGroup(): ToolGroup[] {
    let toolGroup: ToolGroup[] = []
    let toolBar = new Tools('tool1', 'button');
    let toolLink = new Tools('tool2', 'link');
    toolGroup.push(toolLink.toolGroup())
    toolGroup.push(toolBar.toolGroup())

    return toolGroup
  }
  private StopCheque: BaseFpxRoGridHandleAction = (
    name: string,
    data: Stopcheque
  ) => {
    //WRITE YOUR CODE HERE
    this._appconfig.setData('setStopChequeData', data)
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-revoke-stop-cheque'], {
      queryParams: {
        relatedReference: data.relatedReference
      }
    });
  };

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    // _isSortSearch.set('accountNumber',"sort&search");   		 
    // _isSortSearch.set('reason',"sort&search");   		 
    // _isSortSearch.set('payeeName',"sort&search");   		 
    // _isSortSearch.set('chequeNumber',"sort&search");   		 
    // _isSortSearch.set('chequeAmount',"sort&search");   		 
    // _isSortSearch.set('stopDate',"sort&search"); 
    //_isSortSearch.set('revoke',"sort&search");    		 
    return _isSortSearch;
  }
  private retailStopchequeDisplayGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Stopcheque
  ) => {
    //WRITE YOUR CODE HERE
    this._appconfig.setData('setStopChequeData', data);
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-revoke-stop-cheque'], {
      queryParams: {
        relatedReference: data.relatedReference
      }
    });
  };

  private retailStopchequeDisplayGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Stopcheque
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailStopchequeDisplayGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Stopcheque
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    transformMap.set('reason', this.reason);
    transformMap.set('chequeNumber', this.chequeNumber);
    transformMap.set('stopDate', this.stopDate);
    transformMap.set('chequeAmount', this.chequeAmount);
    transformMap.set('payeeName', this.payeeName);
    return transformMap;

  }

  payeeName: GridTransformFn<Stopcheque> = (payload: Stopcheque) => {
    if (payload?.payeeName) {
      return payload.payeeName
    }
    else {
      return '-';
    }
  }
  chequeAmount: GridTransformFn<Stopcheque> = (payload: Stopcheque) => {
    if (payload?.chequeAmount) {
      return payload.currency + ' ' + this.currency.transform(payload?.chequeAmount, ' ', false);
    }
    else {
      return '-';
    }
  }
  reason: GridTransformFn<Stopcheque> = (payload: Stopcheque) => {
    if (payload?.reason == '1') {
      return 'Lost/Stolen';
    }
    else if (payload?.reason == '2') {
      return 'Mailed to incorrect address';
    }
    else if (payload?.reason == '3') {
      return 'Alternate payment arrangements made';
    }
    else if (payload?.reason == '4') {
      return 'Cheque contains incorrect information'
    }
    else if (payload?.reason == '5') {
      return 'Do not want to pay';
    }
    else if (payload?.reason == '6') {
      return 'Other';
    }
    else {
      return '-';
    }
  }
  chequeNumber: GridTransformFn<Stopcheque> = (payload: Stopcheque) => {
    if (!(payload?.chequeNumber)) {
      let formatTocheque;
      let formatFromcheque;
      if (payload.fromChequeNumber <= 9) {
        formatFromcheque = "00" + payload.fromChequeNumber
      }
      else if (payload.fromChequeNumber > 9 && payload.fromChequeNumber <= 99) {
        formatFromcheque = "0" + payload.fromChequeNumber
      }
      else {
        formatFromcheque = payload.fromChequeNumber
      }
      if (payload.toChequeNumber <= 9) {
        formatTocheque = "00" + payload.toChequeNumber
      }
      else if (payload.toChequeNumber > 9 && payload.toChequeNumber <= 99) {
        formatTocheque = "0" + payload.toChequeNumber
      }
      else {
        formatTocheque = payload.toChequeNumber
      }
      return formatFromcheque + '-' + formatTocheque;
    }
    else {
      if (payload.chequeNumber <= 9) {
        return "00" + payload.chequeNumber
      }
      else if (payload.chequeNumber > 9 && payload.chequeNumber <= 99) {
        return "0" + payload.chequeNumber
      }
      else {
        return payload.chequeNumber;
      }

    }

  }
  stopDate: GridTransformFn<Stopcheque> = (payload: Stopcheque) => {
    if (!payload.stopDate) {
      return '-';
    }
    else {
      return formatDate(payload?.stopDate, 'dd MMM YYYY', 'en-us');
    }
  }

  public override getGridWidth(): number {
    return 100;
  }
  override doPreInit(): void {
    // if (this._device.isDesktop()) {
    //   this._appconfig.getData('showStopChequeDetails$').subject.next({
    //     showStopChequeDetails: false
    //   });
    // }
    this.setNgTemplateName('retailstopchequeTmplt');
    this.setNgTemplateClass('transfer-history-list-tmpl panning-template');
    this.setRefreshOption(false);
    this._showPagination = false;
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: this._activeSpaceInfoService.getAccountNumber()
    });
    criteriaQuery.addSortCriteria('stopDate', 'desc', 'Date');
    this.setInitialCriteria(criteriaQuery);
  }

  override postFindallInterceptor = (payload: any) => {
  let rowData: any[] = [];
    let _date = "";
    let _dateGroupName = "";
    // if (payload.data) {
      payload.data.forEach((element: any) => {
        if (_date != element.stopDate) {
          let stopDate = _date = element.stopDate;
          let currentDate = moment().format('YYYY-MM-DD');
          if (moment(stopDate).diff(moment(currentDate), 'days') == 0) _dateGroupName = 'Today';
          else if (moment(stopDate).diff(moment(currentDate), 'days') == -1) _dateGroupName = 'Yesterday';
          else _dateGroupName = moment(stopDate).format('DD MMM YYYY');

          let rowGroup: any = {
            rowGroupTitle: _dateGroupName
          }
          rowData.push(rowGroup);
        }
        rowData.push(element);
      });
      payload.data = rowData;
      this.gridOutputEvent.next({
        name: 'afterDataFetch',
        payload: payload?.data
      });
      return payload;
  }


  override doPostInit(): void {
  }


}




