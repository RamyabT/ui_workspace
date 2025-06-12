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
  FpxModal,
  CriteriaQuery,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BeneficiariesService } from "../beneficiaries-service/beneficiaries.service";
import { Beneficiaries } from "../beneficiaries-service/beneficiaries.model";
import { FavouriteBeneficiariesValidator } from "../favouriteBeneficiaries-validator.service";
import { FavpaymentsService } from "../favpayments-service/favpayments.service";
export class RetailManageFavouriteTransferFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}

@Injectable()
export class RetailManageFavouriteTransferFormHelper extends BaseFpxFormHelper<RetailManageFavouriteTransferFormState> {
  FieldId_1!: FormArray;
  segments: { type: string; count: string }[] = [];
  activeSegmentIndex: number = 0;
  NoDataInSearch:boolean=false;

  private _gridData: any;

  constructor(
    private retailManageBeneFormService: BeneficiariesService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private favbeneValidator: FavouriteBeneficiariesValidator,
    private _favpaymentsService: FavpaymentsService,
  ) {
    super(new RetailManageFavouriteTransferFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILMANAGEBENE");
    this._favpaymentsService.refreshViewAllFavTransaferSub$.subscribe(user => {
      let criteriaQuery = new CriteriaQuery();
        this.setGridCriteria('favtransferdetailsGrid',criteriaQuery);
        if(user){
          this.NoDataInSearch=false;
        }
        else{
          this.NoDataInSearch=true;
        }
    });
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
    let searchTextVal = value.toLocaleLowerCase();
    let _data = this._gridData.filter((rowData:any) => Object.values([
      rowData?.debitAccount, 
      rowData?.beneficiaries?.beneNickName, 
      rowData?.paymentAmount, 
      rowData?.paymentCurrency, 
      rowData?.paymentDate,
      rowData?.serviceCodeDesc
    ]).some((val:any) => {
      let txt = '';
      if (val && typeof(val) === 'string' || typeof(val) === 'number') {
        txt = val.toString().toLocaleLowerCase();
        return txt.includes(searchTextVal);
      } else {
        return false;
      }
      
    }));
    if(_data.length ==0){
      this.NoDataInSearch=true;
    }
    else{
      this.NoDataInSearch=false;
    }
    this.setGridData('favtransferdetailsGrid', _data);
  }

  onClickSegment(i: any) {
    this.activeSegmentIndex = i;
    if (this.activeSegmentIndex == 1) {
      const criteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia('isFavourite', 'String', 'equals', { searchText: '1' });
      this.setGridCriteria('FieldId_1', criteriaQuery);
      // this.favbeneValidator.favouriteBeneficiaries().subscribe((res) => {
      //   console.log("Response", res);
      // });
    }
    else {
      const criteriaQuery = new CriteriaQuery();
      this.setGridCriteria('FieldId_1', criteriaQuery);
    }
    console.log(this.formGroup.get("FieldId_1") as FormArray)
  }

  public override preSubmitInterceptor(payload: Beneficiaries): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Beneficiaries) {
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

  favourtiePaymentsRoGridEvent($event:any){
    console.log("favourtiePaymentsRoGridEvent", $event);
    if($event.eventName == 'afterDataFetch'){
      this._gridData = $event.payload.data;
    }
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
