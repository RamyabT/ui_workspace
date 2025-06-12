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
  FpxActionMap,
  CriteriaQuery,
  FpxHttpOptions,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { retailcasatrandtlsfilterformComponent } from "src/app/accounts/retailcasatrandtlsfilterform/retail-casa-tran-dtls-filter-form.component";
import { Casatransactiondtls } from "src/app/accounts/casatransactiondtls-service/casatransactiondtls.model";
import { TempScheduleRepService } from "../tempScheduleRep-service/tempScheduleRep.service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";

export class FbScheduleFormComponentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  isDataReceived: boolean = false;
  gridData: any;
}


@Injectable()
export class FbScheduleFormComponentHelper extends BaseFpxFormHelper<FbScheduleFormComponentState>{
  addressInfo!: FormGroup;
  accountNumber: any;
  fromDate: any;
  toDate: any;
  showScheduleHistory: any;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private _fileOpener: FileOpenerService,
    private commonService: CommonService,
    private _tempScheduleRepService: TempScheduleRepService
  ) {
    super(new FbScheduleFormComponentState());
  }

  override doPreInit(): void {
    //   let  upcomingCriteriaQuery = new CriteriaQuery();
    //            upcomingCriteriaQuery.addFilterCritertia('scheduleType', 'String', 'inRange', {
    //                fromValue : "2",
    //                toValue : "3"
    //              });
    //             upcomingCriteriaQuery.addFilterCritertia('scheduledCategory', 'Numeric', 'equals', { searchText: '4' });
    //             this.setGridCriteria("scheduletransactiondetailsGrid", upcomingCriteriaQuery);

               //this.setInitialCriteria(upcomingCriteriaQuery);
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }
  
  initiateNewTransaction(){
    this._angularRouter.navigate(['transfers-space', 'display-shell', 'transfers', 'initiate-a-transfers'], {
      queryParams: {
        routeFrom: 'otherModule',
        title: "Select Transfer Type"
      }
    });
  }

  handleSchedulePaymentsGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state.isDataReceived = true;
      this.state.gridData = $event.payload;
    }
  }

  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}