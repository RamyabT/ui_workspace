import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BilleraccountService } from '../billeraccount-service/billeraccount.service';
import { Billeraccount } from '../billeraccount-service/billeraccount.model';
import { AppConfigService } from "@dep/services";
export class RetailSavedBillerRoGridFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  _gridData: any = [];
  rowData: any;
  noSearchResult: boolean = false;
  exceptionMessage : string = '';
  isDataReceived: boolean = false;

}


@Injectable()
export class RetailSavedBillerRoGridFormHelper extends BaseFpxFormHelper<RetailSavedBillerRoGridFormState> {
  searchTextValFilter: any
  totalRecordCount: number = -1;
  multipleBillsSelected: boolean = false;
  billsApiFailed: boolean = false;







  constructor(private _appConfig: AppConfigService,
    private retailSavedBillerRoGridFormService: BilleraccountService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailSavedBillerRoGridFormState());
  }

  override doPreInit(): void {
    // this.addControlEventHandler("SAVEDBILLERDDATAEMIT", this.onSavedBillerReceived);
    this.setServiceCode("RETAILSAVEDBILLERROGRIDFORM");
    this.setHidden('noFilteredData', true)
  }


  public override doPostInit(): void {

    let billerRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('billerRefresh$', {
      "observable": billerRefresh$.asObservable(),
      "subject": billerRefresh$
    });
    this.setServiceCode('RETAILBILLERACCOUNT');
    this._appConfig.getData('billerRefresh$').observable.subscribe(
      (res: any) => {
        if (res && res != null) {
          console.log(res);
          this.state.rowData = res?.payload;
          this.triggerSubmit();
        }
      }
    );

    this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);
    this.removeShellBtn('BACK')

    this.hideShellActions();
    this.setHidden('searchTextGroup', false)
    this.setHidden('noSavedBillersGrid', true)
    // this.setHidden('savedBillersGridGroup', false)
  }

  billGridEvent($event: any) {
    console.log($event);
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.billsApiFailed = false;
      this.totalRecordCount = $event.payload?.totalRowCount || 0;
      this.state._gridData.push(...$event?.payload?.data);

      if (this.totalRecordCount > 0) {
        this.setHidden('searchTextGroup', false)
        this.setHidden('noSavedBillersGrid', true)
      }
      else {
        this.setHidden('noSavedBillersGrid', false);
      }
    }
    else if ($event.eventName === 'handleException'){
      this.billsApiFailed = true
      this.state.isDataReceived = false;
      this.state.exceptionMessage = $event.payload;
    }
  }

  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.state._gridData && value.length > 0) {
      let searchTextVal = value.toLocaleLowerCase();
      let _data = this.state._gridData.filter((rowData: any) => Object.values([
        rowData?.billerId?.shortName,
        rowData?.nickName,
        //rowData?.billerCreditAccount
      ]).some((resultData: any) => {
        let txt = '';
        if (resultData && typeof (resultData) === 'string' || typeof (resultData) === 'number') {
          txt = resultData.toString().toLocaleLowerCase();
          console.log(searchTextVal);
          //this.searchTextValFilter=searchTextVal
          return txt.includes(searchTextVal);
        } else {
          return false;
        }
      }));

      this.setGridData('savedBillersGrid', _data);

      if (_data.length == 0) {
        this.setHidden('noFilteredData', false)
      } else {
        // this.setGridData('savedBillersGrid', this.state._gridData);
        this.setHidden('noFilteredData', true)
      }
    } else if (value.length === 0) {
      this.setGridData('savedBillersGrid', this.state._gridData);
      // this.state._gridData = [];
    }
    else {
      // this.setGridData('savedBillersGrid', this.state._gridData);
      
    }
  }

  // public onSavedBillerReceived: BaseFpxControlEventHandler = (res: any) => {
  //   this.state._gridData = res?.data
  //   console.log(res.data)
  //   if (res?.data?.length > 0) {
  //     this.setHidden('noSavedBillersGrid', true)
  //     this.setHidden('savedBillersGridGroup', false)
  //     this.setGridData('savedBillersGrid', res?.data);
  //     // this.setHidden('searchTextGroup',false)
  //   } else {
  //     this.setHidden('noSavedBillersGrid', false);
  //     this.setHidden('savedBillersGridGroup', true);
  //     // this.setHidden('searchTextGroup',true)

  //   }
  // }


  public override preSubmitInterceptor(payload: Billeraccount): any {
    // WRITE CODE HERE TO HANDLE 

    //this.state.rowData
    let data: any = {
      "billerId": this.state.rowData?.billerId?.billerId,
      "operationMode": "D",
      "billeraccountparamreq": [
        {
          "paramName": this.state.rowData?.billeraccountparam[0]?.paramName,
          "orderSl": Number(this.state.rowData?.billeraccountparam[0]?.orderSl),
          "paramValue": this.state.rowData?.billeraccountparam[0]?.paramValue,
        }
      ],
      "currencyCode": this.state.rowData?.currencyCode?.currencyCode,
      "billerBeneficiaryId": this.state.rowData?.billerBeneficiaryId,
    }

    if (this.state.rowData?.nickName) {
      data.nickName = this.state.rowData?.nickName;
    }

    payload = data;
    return payload;
  }


  public override postDataFetchInterceptor(payload: Billeraccount) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }









  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.billeraccountreq;
      routingInfo.setQueryParams({
        response: res
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

  savedBillerRoGridEvent(event: any) {

  }
  initiateNewTransaction() {
    let sertvice = this._appConfig.getServiceDetails('RETAILBILLERACCOUNT');
    this._angularRouter.navigate(sertvice.servicePath, {
      queryParams: {
        serviceCode: 'RETAILBILLERACCOUNT'
      }
    });
  }

  selectMultipleBill() {
    this.multipleBillsSelected = true;
    this._router.navigate(['payments-space', 'display-shell', 'payments', 'retail-multi-bills-list-input-grid']);
    console.log(this.multipleBillsSelected);
  }


}