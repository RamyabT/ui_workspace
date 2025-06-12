import { inject, Injectable } from "@angular/core";
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
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ChildlogService } from '../childlog-service/childlog.service';
import { Childlog } from '../childlog-service/childlog.model';
import { AppConfigService } from "@dep/services";
export class childDetailsState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  private _appConfig: AppConfigService = inject(AppConfigService);
  profileImage: any = {
    minSize: "0",
    maxSize: "5000000",
    extensions: ".jpeg,.png"
  }
  childreqdocdtl: any = {
    minSize: "0",
    maxSize: "5000000",
    extensions: ".jpeg,.png"
  }
}


@Injectable()
export class childDetailsHelper extends BaseFpxFormHelper<childDetailsState> {
  maxDate: any;
  minDate: any;

  constructor(private childDetailsService: ChildlogService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new childDetailsState());
  }

  override doPreInit(): void {
    //  this.setServiceCode("childlog");
    // this.addResetHandler('reset', this._reset);
    this.validateDOB();
    this.setValue("childreqdocdtl[${0}]serialNo", "0");
  }

  validateDOB() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    this.minDate = eighteenYearsAgo.toISOString().split('T')[0];
  }

  // private _reset: FpxResetHandler = (payload: any) => {
  //   console.log("payload", payload);
  //   this.reset('fullName');
  //   this.reset('nickName');
  //   this.reset('dob');
  //   this.reset('gender');
  // }


  public override doPostInit(): void {

  }


  public override preSubmitInterceptor(payload: Childlog): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Childlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.childlog.tenantId.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


