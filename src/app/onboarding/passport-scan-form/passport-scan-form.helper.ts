import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxComponentState, BaseFpxFormHelper, BaseFpxPostSubmitInterceptor, RoutingInfo } from "@fpx/core";
import { FaceTechSDKController } from 'src/app/facetech/facetech-sdk-controller';
import { DocumentChecklistService } from '../document-checklist-service/document-checklist-service';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';

declare let FaceTechSDK: any;

export class PassportScanFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  documentImages: any = [];
  documentData: any;
  photoIdScanCompleted: boolean = false;
  externalDatabaseRefID: string = "";
  result: string = "";
  selfie: string = "";
  doShowScanButton: boolean = false;
}


@Injectable()
export class PassportScanFormHelper extends BaseFpxFormHelper<PassportScanFormState>{
  private _facetecConfig: any;
  constructor(
    private _router: Router,
    private ngZone: NgZone,
    public _deviceDetectorService: DeviceDetectorService,
    private _documentChecklistService: DocumentChecklistService,
    private _facetechReqServcie:FacetechReqServcie,
    public _appConfig: AppConfigService) {
    super(new PassportScanFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
   
    this.setServiceCode('RETAILPASSPORTSCAN');
    
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

  override doPostInit(): void {
    
  }

  triggerPhotoIdMatch() {
    if (this._deviceDetectorService.isHybrid()) {
      this.photoMatchInHybrid();
    } else {
      this.photoMatchNormal();
    }
  }

  photoMatchNormal() {
    FaceTechSDKController.doProcess("photoIdScan", (response: any) => {
      console.log("FaceTec Result", response);
      this.handlePhotoMatchResult(response);
    }, (reason: any) => {
      console.log("FaceTec Error", reason);
    }, this._facetecConfig);
  }

  photoMatchInHybrid() {
    FaceTechSDK.photoIdScan((response: string) => {
      this.ngZone.run(() => {
        let result;
        if (typeof (response) == 'string') result = JSON.parse(response);
        else result = response;

        this.handlePhotoMatchResult(result);

      });

    }, (reson: any) => {
      console.error("Photo ID Match Error!");
      this.state.photoIdScanCompleted = false;
      this.state.doShowScanButton = true;
      // this._router.navigate(['process-shell', 'rcob', 'facetechreq']);
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
      if(result?.documentData) this.state.documentData = JSON.parse(result?.documentData);
      this.state.photoIdScanCompleted = true;
    } else {
      console.log("photoIdMatch error!", result);
      this.state.photoIdScanCompleted = false;
      this.state.doShowScanButton = true;
      this._router.navigate(['process-shell', 'rcob', 'facetechreq']);
    }
  }

  insertSpace(str: string) {
    return str// insert a space before all caps and number
    .replace(/([A-Z0-9])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str: string){ return str.toUpperCase(); })
  }
  public override preSubmitInterceptor(payload: any): any {
    if(this.state.photoIdScanCompleted) {
      payload = {
        ...payload,
        "documentType": 'PASSPORT',
        "isPrimary": '0',
        "frontPage": this.state.documentImages[0],
        "backPage": this.state.documentImages[1],
        "extractedInfo": JSON.stringify(this.state.documentData)
      }
    }
    else { 
      this.setDataService(this._documentChecklistService);
      this.formGroup.get('flag')?.patchValue('1')
      payload = {
        "applicantId": this._appConfig.getData('applicantId')
      }
    }
    return payload;
  }

  public override postSubmitInterceptor(response: BaseFpxPostSubmitInterceptor): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let resBody = this.state.photoIdScanCompleted?'obapplicantdocuments':'obskipdocument';
      routingInfo.setQueryParams({
        response: response.success?.body?.[resBody],
        transRef: response.success?.body?.[resBody].applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }

}