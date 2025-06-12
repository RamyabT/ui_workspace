import { Injectable } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  RoutingInfo,
} from "@fpx/core";

import { Router } from "@angular/router";

export class COBScanYourIdState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  formSubmitted: boolean = false;
}

@Injectable()
export class COBScanYourIdHelper extends BaseFpxFormHelper<COBScanYourIdState> {
  constructor(
    private _router: Router,
  ) {
    super(new COBScanYourIdState());
  }


  override doPreInit(): void {
    this.hideShellActions()
  }

  public override doDestroy(): void {

  }

  onClickProceed() {
    this._router.navigate(["prelogin-space","entry-shell","onboarding","photo-id-match"]);
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE
    this._router.navigate(["prelogin-space","entry-shell","onboarding","photo-id-match"]);
    return;
    this.state.formSubmitted = true;
    payload = {
      ...payload,
      // "processId": this._processShellService.processId,
      "bpCode": "COB"
    };
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {

    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success.status == 200){
      let path = ["process-shell", "rcob", "check-list"];
      this._router.navigate(path);
      // this._processShellService.triggerFormSubmittedCompleteStatus(true);
    } else {
      this.state.formSubmitted = false;
    }

    // WRITE CODE HERE TO HANDLE
    return routingInfo;
  }


}
