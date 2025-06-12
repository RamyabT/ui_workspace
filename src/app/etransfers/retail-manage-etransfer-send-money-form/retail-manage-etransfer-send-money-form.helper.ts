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
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EtransfercontactlogService } from "../etransfercontactlog-service/etransfercontactlog.service";
import { Etransfercontactlog } from "../etransfercontactlog-service/etransfercontactlog.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
export class RetailManageEtransferSendMoneyFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  onFirstLoad: boolean = true;
  searchDataFound: any
  isDataReceived: boolean=false;
  interacDeleteContact: any;
  contact: any
}

@Injectable()
export class RetailManageEtransferSendMoneyFormHelper extends BaseFpxFormHelper<RetailManageEtransferSendMoneyFormState> {
  FieldId_1!: FormArray;
  segments: { type: string; count: number }[] = [];
  activeSegmentIndex: number = 0;
  totalRowCount: number=-1;
  routingService: any

  private _gridData:any;

  constructor(
    private etransfercontactlogService: EtransfercontactlogService,
    private _httpProvider: HttpProviderService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _appConfig:AppConfigService,
    public _device: DeviceDetectorService
  ) {
    super(new RetailManageEtransferSendMoneyFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
  }

  public override doPostInit(): void {
    this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);
    this.FieldId_1 = this.formGroup.get("FieldId_1") as FormArray;
  }

  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let searchTextVal = value.toLocaleLowerCase();
    let _data = this._gridData?.filter((rowData:any) => Object.values([
      rowData?.beneficiaryName, 
      rowData?.phoneNumber, 
      rowData?.emailId, 
      rowData?.firstName
    ]).some((val:any) => {
      let txt = '';
      if (val && typeof(val) === 'string' || typeof(val) === 'number') {
        txt = val.toString().toLocaleLowerCase();
        this._changeDetectorRef.detectChanges();
        return txt.includes(searchTextVal);
      } else {
        this._changeDetectorRef.detectChanges();
        return false;
      }
    }));
    this.state.searchDataFound=_data?.length;
    this.setGridData('contactList', _data);
  }

  contactListRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this._gridData = $event.payload?.data;
      this.totalRowCount = $event.payload?.totalRowCount || 0;
      if(this.routingService=='RETAILMANAGEETRANSFERCONTACT'){
        if(this.totalRowCount>=1){
          let title = ['RetailEtransfercontactlogForm.manageContact'];
          this.setFormTitle(title[0]);
        }
      }
      // if(this.routingService=='RETAILMANAGEETRANSFERSENDMONEY'){
      //   if(this.totalRowCount>=1){
      //     let title = ['RetailManageEtransferSendMoneyForm.title'];
      //     this.setFormTitle(title[0]);
      //   }
      // }
    }
  }
  addContact(){
    this._router.navigate(
      ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfercontactlog-form'], {
    });
  }
  OneOffSendMoney(){
    this._router.navigate(
      ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-form'],
       {
        queryParams:{
          serviceCode:'ETRANSFERSENDMONEY',
          tranCat:'O'
        }
    });
  }

  backToeTransfers() {
    this._router.navigate(
      ['etransfers-space', 'etransfers', 'etransfers-home'], {
    });
  }

  public override preSubmitInterceptor(payload: Etransfercontactlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public override postDataFetchInterceptor(payload: Etransfercontactlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfercontactlog;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error
      });
    }
    return response;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
