import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxComponentState, BaseFpxFormHelper, BaseFpxPostSubmitInterceptor, RoutingInfo } from "@fpx/core";
import { FaceTechSDKController } from 'src/app/facetech/facetech-sdk-controller';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';

declare let FaceTechSDK: any;

export class CobLivenessCheckFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  documentImages: any = [];
  documentData: any;
  livenessCompleted: boolean = false;
  externalDatabaseRefID: string = "";
  result: string = "";
  selfie: string = "";
  doShowScanButton: boolean = false;
}


@Injectable()
export class CobLivenessCheckFormHelper extends BaseFpxFormHelper<CobLivenessCheckFormState> {
  private _facetecConfig: any;
  constructor(
    private _router: Router,
    private ngZone: NgZone,
    public _deviceDetectorService: DeviceDetectorService,
    private _facetechReqServcie: FacetechReqServcie,
    public _appConfig: AppConfigService) {
    super(new CobLivenessCheckFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.setServiceCode('RETAILLIVENESSCHECK');

    if(this._appConfig.hasData('facetecConfig')){
      this._facetecConfig = this._appConfig.getData('facetecConfig');
    } else {
      this.showSpinner();
      this._facetechReqServcie.fetchFacetecConfig().subscribe({
        next: (res: any) => {
          this.hideSpinner();
          this._appConfig.setData('facetecConfig', res[0]);
          this._facetecConfig = res[0];
        },
        error: (error: any) => {
          this.hideSpinner();
        }
      });
    }
  }

  override doPostInit(): void { }

  triggerLivenessCheck() {
    if (this._deviceDetectorService.isHybrid()) {
      this.photoMatchInHybrid();
    } else {
      this.photoMatchNormal();
    }
  }

  photoMatchNormal() {
    FaceTechSDKController.doProcess("enrollCheck", (response: any) => {
      console.log("FaceTec Result", response);
      this.handlePhotoMatchResult(response);
    }, (reason: any) => {
      console.log("FaceTec Error", reason);
    }, this._facetecConfig);
  }

  photoMatchInHybrid() {
    FaceTechSDK.enrollmentFace((response: string) => {
      this.ngZone.run(() => {
        let result;
        if (typeof (response) == 'string') result = JSON.parse(response);
        else result = response;
        this.handlePhotoMatchResult(result);
      });
    }, (reson: any) => {
      console.error("Photo ID Match Error!");
      this.state.livenessCompleted = false;
      this.state.doShowScanButton = true;
    }, this._facetecConfig);
  }

  handlePhotoMatchResult(result: any) {
    this.state.doShowScanButton = false;

    this.state.result = result?.result;
    if (this.state.result == "SUCCESS") {
      this.state.documentImages = [];
      if (result?.externalDatabaseRefID) {
        this.state.externalDatabaseRefID = result?.externalDatabaseRefID;
      }
      if (result?.photoScanFront) {
        this.state.documentImages.push(result.photoScanFront);
      }
      if (result?.photoScanBack) {
        this.state.documentImages.push(result.photoScanBack);
      }
      if (result?.selfie) {
        this.state.selfie = result.selfie;
      }
      if (result?.documentData) this.state.documentData = JSON.parse(result?.documentData);
      this.state.livenessCompleted = true;
    } else {
      console.log("LivenessCheck error!", result);
      this.state.livenessCompleted = false;
      this.state.doShowScanButton = true;
      this._router.navigate(['process-shell', 'rcob', 'facetechreq']);
    }
  }

  insertSpace(str: string) {
    return str// insert a space before all caps and number
      .replace(/([A-Z0-9])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str: string) { return str.toUpperCase(); })
  }
  public override preSubmitInterceptor(payload: any): any {
    payload = {
      ...payload,
      // "documentType": "EMIRATES_ID",
      // "isPrimary": "1",
      // "frontPage": this.state.documentImages[0],
      // "backPage": this.state.documentImages[1],
      // "extractedInfo": JSON.stringify(this.state.documentData),
      enrollmentId: this.state.externalDatabaseRefID,
      // photoScanBack: this.state.documentImages[0],
      // photoScanFront: this.state.documentImages[1],
      // result: this.state.result,
      livenessImage: this.state.selfie,
      "livenessstatus": "1",
    }
    return payload;
  }

  public override postSubmitInterceptor(response: BaseFpxPostSubmitInterceptor): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.obapplicantliveness,
        transRef: response.success?.body?.obapplicantliveness.applicantId,
        status: "success",
      });
      this._appConfig.setData('applicantId', response.success?.body?.obapplicantliveness.applicantId)
      this._appConfig.setData('processId', response.success?.body?.obapplicantliveness.processId)
    } else if (response.error) {
      routingInfo.setQueryParams({
        response: response.error?.error,
        errMsg: response.error?.error?.errorMessage,
        status: "failed",
        errorCode: response.error?.error?.ErrorCode || response.error?.error?.errorCode
      });
      // routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }

}