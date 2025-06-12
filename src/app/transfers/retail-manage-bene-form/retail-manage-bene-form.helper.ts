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
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BeneficiariesService } from "../beneficiaries-service/beneficiaries.service";
import { Beneficiaries } from "../beneficiaries-service/beneficiaries.model";
import { AppConfigService } from "@dep/services";
import { BeneintbtreqService } from "../beneintbtreq-service/beneintbtreq.service";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { BeneinternalService } from "../beneinternal-service/beneinternal.service";
export class RetailManageBeneFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  onFirstLoad: boolean = true;
  rowData: any;
  _gridData: any = [];


}

@Injectable()
export class RetailManageBeneFormHelper extends BaseFpxFormHelper<RetailManageBeneFormState> {
  FieldId_1!: FormArray;
  segments: { type: string; count: number }[] = [];
  activeSegmentIndex: number = 0;
  totalRecordCount: number = -1;
  manageContactsApiReceived: boolean = false;




  private _gridData: any;

  constructor(
    private _appConfig: AppConfigService,
    private retailManageBeneFormService: BeneficiariesService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    // private BeneficiariesService: BeneficiariesService,
    private beneInternalServices:BeneinternalService,
    private _accountSpaceMgr: AccountsSpaceManager
  ) {
    super(new RetailManageBeneFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILMANAGEBENE");
    this.retailManageBeneFormService.manageBeneCount.subscribe({
      next: (res: any) => {
        if (this.state.onFirstLoad) {
          this.segments[0].count = res.totalRowCount;
          this.segments[1].count = res.totalFavRowCount;
        }
        else {
          this.segments[this.activeSegmentIndex].count = res.totalRowCount;
        }
        this.state.onFirstLoad = false;
      }
    });
    this.retailManageBeneFormService.refreshManageBeneSub$.subscribe({
      next: (res: Beneficiaries) => {
        if (res.isFavourite == '1') --this.segments[1].count;
        if (res.isFavourite == '0') ++this.segments[1].count;
        let criteriaQuery = new CriteriaQuery();

        // if(this.activeSegmentIndex==1){
        //   criteriaQuery.addFilterCritertia('isFavourite', 'String', 'equals', { searchText: '1' });
        // }

        this.setGridCriteria('beneList', criteriaQuery);
      }
    });
    this.removeShellBtn('BACK');
  }

  onLoadForm() {
    this.manageContactsApiReceived = false;
  }
  public override doPostInit(): void {
    let manageBeneRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('manageBeneRefresh$', {
      "observable": manageBeneRefresh$.asObservable(),
      "subject": manageBeneRefresh$
    });
    this.setServiceCode('RETAILBENEINTERNAL');
    this._appConfig.getData('manageBeneRefresh$').observable.subscribe(
      (res: any) => {
        console.log(res);
        this.state.rowData = res.payload;
        this.triggerSubmit();

      }
    )
    // this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);
    // this.segments = [
    //   {
    //     type: "All",
    //     count: this.retailManageBeneFormService.beneCount,
    //   },
    //   {
    //     type: "Favourites",
    //     count: this.retailManageBeneFormService.favBeneCount,
    //   },
    // ];
    this.FieldId_1 = this.formGroup.get("FieldId_1") as FormArray;
    this.setHidden('noSavedContactsGrid', true)
  }
  initiateAddContact() {
    this._router.navigate(['transfers-space', 'entry-shell', 'transfers', 'retail-bene-internal-form'], {
      queryParams: {
        // accountNumber: this._activeSpaceInfoService.getAccountNumber()
      }
    });
  }

  // public dosearchTextChangeHandler: BaseFpxChangeHandler = (
  //   name: string,
  //   status: FormControlStatus,
  //   value: any,
  //   formGroup: FormGroup
  // ) => {
  //   let searchTextVal = value.toLocaleLowerCase();
  //   let _data = this._gridData.filter((rowData:any) => Object.values([
  //     rowData?.beneNickName, 
  //     rowData?.beneAccount, 
  //     rowData?.bankDescription, 
  //     rowData?.serviceCodeDesc
  //   ]).some((val:any) => {
  //     let txt = '';
  //     if (val && typeof(val) === 'string' || typeof(val) === 'number') {
  //       txt = val.toString().toLocaleLowerCase();
  //       return txt.includes(searchTextVal);
  //     } else {
  //       return false;
  //     }
  //   }));
  //   this.setGridData('beneList', _data);
  // }

  // onClickSegment(i: any) {
  //   this.reset('searchText');
  //   this.activeSegmentIndex = i;
  //   if (this.activeSegmentIndex == 1) {
  //     const criteriaQuery = new CriteriaQuery();
  //     criteriaQuery.addFilterCritertia('isFavourite', 'String', 'equals', { searchText: '1' });
  //     this.setGridCriteria('beneList', criteriaQuery);
  //   }
  //   else {
  //     const criteriaQuery = new CriteriaQuery();
  //     this.setGridCriteria('beneList', criteriaQuery);
  //   }
  // }

  public override preSubmitInterceptor(payload: BeneintbtreqService): any {
    // WRITE CODE HERE TO HANDLE
    let data: any = {
      "beneficiaryName": this.state.rowData?.beneficiaryName,
      "accountCurrency": this._appConfig.baseCurrency,
      "termsFlag": this.state.rowData?.terms,
      "operationMode": "D",
      "inventoryNumber": this.state.rowData?.inventoryNumber,
      "nickName": this.state.rowData?.beneNickName,
    }
    payload = data;
    return payload;
  }

  public override postDataFetchInterceptor(payload: Beneficiaries) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  getBeneficiaryAccountsDetails() {

    this.beneInternalServices.findAll()().subscribe({
      next: (value: any) => {
        console.log("Bene", value)
        this._appConfig.setData('BENEACCOUNTSLIST', value.data)
        this._accountSpaceMgr.setBeneficiaryList(value.data);
      },
      error: (err: any) => {

      },
    });
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);


    this.getBeneficiaryAccountsDetails();
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.beneintbtreq;
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

  beneListRoGridEvent($event: any) {
    if ($event.eventName == 'afterDataFetch') {
      this.manageContactsApiReceived = true;
      this.totalRecordCount = $event.payload?.totalRowCount || 0;
      this.state._gridData.push(...$event?.payload?.data);

      if (this.totalRecordCount > 0) {
        this.setHidden('noSavedContactsGrid', true)
      }
      else {
        this.setHidden('noSavedContactsGrid', false);
      }
    }
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
