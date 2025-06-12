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
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CcRewardBenefitsService } from '../ccRewardBenefits-service/ccRewardBenefits.service';
import { CcRewardBenefits } from '../ccRewardBenefits-service/ccRewardBenefits.model';
import { AppConfigService } from "@dep/services";
export class ccRewardBenefitsState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
}


@Injectable()
export class ccRewardBenefitsHelper extends BaseFpxFormHelper<ccRewardBenefitsState> {
  ccRewardsInfo!: FormArray;
  ccBenefitsInfo!: FormArray;
  protected override state: any;

  constructor(private ccRewardBenefitsService: CcRewardBenefitsService,
    private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new ccRewardBenefitsState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCCREWARDSBENEFITS");
    this.handleFormOnLoadtEST();
  }

  public override doPostInit(): void {
    this.ccRewardsInfo = this.formGroup.get("ccRewardsInfo") as FormArray;
    this.ccBenefitsInfo = this.formGroup.get("ccBenefitsInfo") as FormArray;
  }

  public override preSubmitInterceptor(payload: CcRewardBenefits): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postDataFetchInterceptor(payload: CcRewardBenefits) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");

    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.ccRewardBenefits.tenantId.prodCode,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }

  public handleFormOnLoadtEST() {
    this.showSpinner();
    let httpRequest = new HttpRequest();

    this.state.cardData = this._appConfig.getData('creditCardData');
    const prodCode = this.state.cardData?.productCode;

    this.setValue("prodCode", prodCode);

    httpRequest.setMethod("GET");
    httpRequest.setResource('/ccRewardBenefits/{prodCode}');
    httpRequest.addPathParameter("prodCode", prodCode)
    httpRequest.setContextPath('Cards');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILCCREWARDSBENEFITS');

    this._httpProvider.invokeRestApi(httpRequest).pipe(map((res: IHttpSuccessPayload<any>) => { return res; })).subscribe({
      next: (res) => {
        // this.setValue("description", res.body.ccRewardBenefits.description);
        // this.setValue("prodLink", res.body.ccRewardBenefits.prodLink);
      },
      error: () => {
        this.hideSpinner();
      },
      complete: () => { },
    });
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


