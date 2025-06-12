import { ChangeDetectorRef, Injectable } from "@angular/core";
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
  FpxModal,
  CriteriaQuery,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EtransfersFavouritePaymentsValidator } from "../validators/etransfersFavouritePayments-validator.service";
import { AppConfigService } from "@dep/services";
import { FavpaymentsService } from "../favpayments-service/favpayments.service";
import { DeviceDetectorService } from "@dep/core";
export class RetailManageFavouriteETransferFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  searchDataFound: any
  isDataReceived: boolean = false;
  _gridData: any = [];
}

@Injectable()
export class RetailManageFavouriteETransferFormHelper extends BaseFpxFormHelper<RetailManageFavouriteETransferFormState> {
  FieldId_1!: FormArray;
  segments: { type: string; count: string }[] = [];
  activeSegmentIndex: number = 0;
  totalRowCount: number=-1;

  // private _gridData: any;

  constructor(
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private favbeneValidator: EtransfersFavouritePaymentsValidator,
    private _favpaymentsService: FavpaymentsService,
    private _appConfig: AppConfigService,
    private _changeDetectorRef: ChangeDetectorRef,
    public _device: DeviceDetectorService

  ) {
    super(new RetailManageFavouriteETransferFormState());
  }

  override doPreInit(): void {
    // this._favpaymentsService.subscribe(user => {
    //   this.refreshGrid$;
    //   let criteriaQuery = new CriteriaQuery();
    //     this.setGridCriteria('favEtransferdetailsGrid',criteriaQuery);
    // });
    this.hideShellActions();
    this.segments = [
      {
        type: "All",
        count: "15",
      },
      {
        type: "Favourites",
        count: "6",
      },
    ];
  }

  public override doPostInit(): void {
    this.removeShellBtn('BACK');
    this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);
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
        rowData?.debitAccount,
        rowData?.beneficiaries?.beneNickName,
        rowData?.paymentAmount,
        rowData?.paymentCurrency,
      ]).some((val: any) => {
        let txt = '';
        if (val && typeof (val) === 'string' || typeof (val) === 'number') {
          txt = val.toString().toLocaleLowerCase();
          this._changeDetectorRef.detectChanges();
          return txt.includes(searchTextVal);
        } else {
          this._changeDetectorRef.detectChanges();
          return false;
        }
      }));
      this.state.searchDataFound = _data.length;
      this.setGridData('favEtransferdetailsGrid', _data);
    }
    else if (value.length === 0) {
      this.setGridData('favEtransferdetailsGrid', this.state._gridData);
    }
  }

  onClickSegment(i: any) {
    this.activeSegmentIndex = i;
    if (this.activeSegmentIndex == 1) {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia('isFavourite', 'String', 'equals', { searchText: '1' });
      this.setGridCriteria('FieldId_1', criteriaQuery);
    }
    else {
      const criteriaQuery = new CriteriaQuery();
      this.setGridCriteria('FieldId_1', criteriaQuery);
    }
    console.log(this.formGroup.get("FieldId_1") as FormArray)
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.beneficiaries.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }

  favourtiePaymentsRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.state.isDataReceived = true;
      this.totalRowCount = $event.payload?.totalRowCount || 0;
        this.state._gridData.push(...$event?.payload?.data);
    }
  }
  backToeTransfers() {
    this._router.navigate(
      ['etransfers-space', 'etransfers', 'etransfers-home'], {
    });
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
