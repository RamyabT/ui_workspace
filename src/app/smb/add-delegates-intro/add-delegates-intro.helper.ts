import { inject, Inject, Injectable, Input } from "@angular/core";
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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, UserAuthService } from "@dep/services";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export class AddDelegatesIntroComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formValues: any;
  isDataReceived: boolean = false;
  gridData: any;
  addedByMeGridData: any;
  addedByOthersGridData: any;
}

@Injectable()
export class AddDelegatesIntroComponentHelper extends BaseFpxFormHelper<AddDelegatesIntroComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showTransferHistory: boolean = false;
  activeTabIndex: number = 0;
  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private _userAuth: UserAuthService
  ) {
    super(new AddDelegatesIntroComponentState());
  }

  override doPreInit(): void {
    this.activeTabIndex = 0;
    this.hideShellActions();
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  onTabChanged($event:any){
    let usId = this._userAuth.getAuthorizationAttr('UserId');
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    if(this.activeTabIndex == 0){
        criteriaQuery.addFilterCritertia('createdBy', 'String', 'equals', { searchText: usId });
        criteriaQuery.addSortCriteria('createdOn','desc','String');
        this.setGridCriteria('etransferHistoryGridByMe', criteriaQuery);
    } else if (this.activeTabIndex == 1) {
      criteriaQuery.addFilterCritertia('createdBy', 'String', 'notEqual', { searchText: usId });
      criteriaQuery.addSortCriteria('createdOn','desc','String');
      this.setGridCriteria('etransferHistoryGridByOthers', criteriaQuery);
    }
  }

  addedByMeRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.addedByMeGridData = $event.payload;
    }
  }

  addedByOthersRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.addedByOthersGridData = $event.payload;
    }
  }


  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}