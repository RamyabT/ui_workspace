import { Injectable } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  CriteriaQuery,
  RoutingInfo,
} from "@fpx/core";

import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { RetailProductSelectionService } from "../retail-product-selection-service/retail-product-selection.service";

export class RetailProductSelectionFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formSubmitted: boolean = false;
  segments: any = [];
  activeSegmentIndex: number = 0;
}

@Injectable()
export class RetailProductSelectionFormHelper extends BaseFpxFormHelper<RetailProductSelectionFormState> {
  constructor(
    private _router: Router,
    private _productSelectionService: RetailProductSelectionService,
    private _appConfig: AppConfigService
  ) {
    super(new RetailProductSelectionFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.state.activeSegmentIndex = 0;
    document.body.classList.add('cob-product-selection')
    let criteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('tenantId', 'String', 'equals', {
      searchText: this._appConfig.getTenantId()
    });
    criteriaQuery.addFilterCritertia('productcategory', 'String', 'equals', {
      searchText: 'RPNC'
    });
    this._productSelectionService.getProductSegment(criteriaQuery).subscribe(
      (res) => {
        this.state.segments = res;
        if (this.state.segments) this.formGroup.get('productSegment')?.patchValue(res?.[0].segmentCode);
      })
  }

  public override doDestroy(): void {
    document.body.classList.remove('cob-product-selection')

  }

  onClickSegment(i: number) {
    this.state.activeSegmentIndex = i;
    if (this.state.segments) this.formGroup.get('productSegment')?.patchValue(this.state.segments?.[i].segmentCode)

  }

  onBackClick() {
    this._router.navigate(['welcome'])
  }

  public override preSubmitInterceptor(payload: any): any {
    this._appConfig.setData('cobproductdls', payload);

    // WRITE CODE HERE TO HANDLE
    this._router.navigate(["prelogin-space", "entry-shell", "onboarding", "kfs"], {
      queryParams: {
        "productId": payload.productId,
        "productSegment": payload.productSegment
      }
    });
    return;
  }

  public override postSubmitInterceptor(response: any): any {

    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success.status == 200) {
      let path = ["process-shell", "rcob", "check-list"];
      this._router.navigate(path);
    } else {
      this.state.formSubmitted = false;
    }

    // WRITE CODE HERE TO HANDLE
    return;
  }

}
