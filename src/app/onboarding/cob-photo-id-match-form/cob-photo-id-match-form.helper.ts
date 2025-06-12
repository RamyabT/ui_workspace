import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxComponentState, BaseFpxFormHelper, BaseFpxPostSubmitInterceptor, RoutingInfo } from "@fpx/core";
import { FaceTechSDKController } from 'src/app/facetech/facetech-sdk-controller';
import { PhotoIdMatchService } from '../photoidmatch-service/photoidmatch.service';
import moment from 'moment';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';

declare let FaceTechSDK: any;

export class CobPhotoIdMatchFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  documentImages: any = [];
  documentData: any;
  photoIdScanCompleted: boolean = false;
  externalDatabaseRefID: string = "";
  result: string = "";
  selfie: string = "";
  doShowScanButton: boolean = false;
  idNumber: string = "";
  expiryDate: string = "";
  issuedDate: string = "";
  extractedInfo: any = {
    idNumber: "",
    expiryDate: "",
    issuedDate: "",
    firstName: "",
    lastName: "",
    dob: ""
  }
  skipPassportPayload: boolean = false;
  PassportPayload: any;

}


@Injectable()
export class CobPhotoIdMatchFormHelper extends BaseFpxFormHelper<CobPhotoIdMatchFormState> {
  private _facetecConfig: any;
  documentType!: string;
  isPrimary!: string;
  title: string = '';
  note: string = '';
  completedTitle: string = '';
  dob: any;

  constructor(
    private _router: Router,
    private ngZone: NgZone,
    public _deviceDetectorService: DeviceDetectorService,
    public _appConfig: AppConfigService,
    private photoIdMatchService: PhotoIdMatchService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _facetechReqServcie: FacetechReqServcie
  ) {
    super(new CobPhotoIdMatchFormState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    // this.setServiceCode("RETAILIDSCAN");
    // let routename = this._router.url.substring(this._router.url.lastIndexOf('/') + 1);
    if (this._appConfig.hasData('facetecConfig')) {
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
    let serviceName = this._activeSpaceInfoService.serviceCode;
    // if(this._router.url.split('/')[4].split('?')[0] == 'emirates-id-match') {
    if (serviceName == 'RETAILEMIRATESIDSCAN') {
      this.setServiceCode('RETAILEMIRATESIDSCAN');
      // this._appConfig.setData('photIdMatchServiceCode','RETAILEMIRATESIDSCAN');
      this.documentType = 'EMIRATES_ID';
      this.isPrimary = "1";
      this.title = 'Please scan your National identity card.';
      this.note = 'The National ID is a government-issued card for citizens and residents.';
      this.completedTitle = 'National Identity Card Verification';
    }
    else if (serviceName == 'RETAILDRIVERLICENSESCAN') {
      this.setServiceCode('RETAILDRIVERLICENSESCAN');
      this._appConfig.setData('photIdMatchServiceCode', 'RETAILDRIVERLICENSESCAN');
      this.documentType = 'DRIVERLICENSE';
      this.isPrimary = "0";
      this.title = 'Please scan your Driver License.';
      this.note = "The Driver License is a an official document issued by a government, certifying the holder's identity and citizenship";
      this.completedTitle = 'Driver License Verification';
    }
    else if (serviceName == 'RETAILNATIONALIDSCAN') {
      this.setServiceCode('RETAILNATIONALIDSCAN');
      // this._appConfig.setData('photIdMatchServiceCode','RETAILNATIONALIDSCAN');
      this.documentType = 'NATIONALID';
      this.isPrimary = "1";
      this.title = 'Please scan your National ID.';
      this.note = "The National ID is a government-issued card for citizens and residents.";
      this.completedTitle = 'National Identity Card Verification';
    }
    else if (serviceName == 'RETAILPASSPORTSCAN') {
      this.setServiceCode('RETAILPASSPORTSCAN');
      // this._appConfig.setData('photIdMatchServiceCode','RETAILPASSPORTSCAN');
      this.documentType = 'PASSPORT';
      this.isPrimary = "0";
      this.title = 'Please scan your Passport.';
      this.note = "The Passport is a an official document issued by a government, certifying the holder's identity and citizenship";
      this.completedTitle = 'Passport Verification';
      this.removeShellBtn('BACK');
      // this.addShellButton('Skip', 'SKIP', 'primary', 'ENTRY', 'button');
      // this.setShellBtnMethod('SKIP', this.skipQueue.bind(this));
    } else if (serviceName == 'RETAILADDITIONALPASSPORTSCAN') {
      this.setServiceCode('RETAILADDITIONALPASSPORTSCAN');
      // this._appConfig.setData('photIdMatchServiceCode','RETAILADDITIONALPASSPORTSCAN');
      this.documentType = 'ADDITIONALPASSPORT';
      this.isPrimary = "0";
      this.title = 'Please scan your Additional Passport.';
      this.note = "The Passport is a an official document issued by a government, certifying the holder's identity and citizenship";
    }
    else {
      this.setServiceCode('RETAILIDSCAN');
      // this._appConfig.setData('photIdMatchServiceCode','RETAILIDSCAN');
    }
  }

  skipQueue() {
    this.state.skipPassportPayload = true;
}

  onBack(){
    
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
        if (typeof (response) == 'string') {
          result = JSON.parse(response);
        }
        else {
          result = response;
        }
        console.log("photoMatchInHybrid Result", result);
        this.handlePhotoMatchResult(result);
      });

    }, (reson: any) => {
      console.error("Photo ID Match Error!");
      this.state.photoIdScanCompleted = false;
      this.state.doShowScanButton = true;
    }, this._facetecConfig);
  }

  handlePhotoMatchResult(result: any) {
    console.log("Photo match result: " + result)
    this.state.doShowScanButton = false;

    this.state.result = result?.result;
    if (this.state.result == "SUCCESS") {
      this.state.documentImages = [];

      if (result?.externalDatabaseRefID) {
        this.state.externalDatabaseRefID = result?.externalDatabaseRefID;
        console.log("this.state.externalDatabaseRefID " + this.state.externalDatabaseRefID)
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
      .replace(/^./, function (str: string) { return str.toUpperCase(); })
  }
  getExtractedInfo() {
    this.state.documentData.scannedValues.groups.forEach((group: any) => {
      console.log('group value: ', group)
      group.fields.forEach((field: any) => {
        console.log('field value: ', field);
        if (field.fieldKey == 'firstName') {
          this.state.extractedInfo.firstName = field.value
        }
        if (field.fieldKey == 'lastName') {
          this.state.extractedInfo.lastName = field.value
        }
        if (field.fieldKey == 'idNumber') {
          this.state.extractedInfo.idNumber = field.value
        }
        if (field.fieldKey == 'dateOfExpiration') {
          this.state.extractedInfo.expiryDate = moment(field.value, "DD-MM-YYYY").format('YYYY-MM-DD');
        }
        if (field.fieldKey == 'dateOfIssue') {
          this.state.extractedInfo.issuedDate = moment(field.value, "DD-MM-YYYY").format('YYYY-MM-DD');
        }
        if (field.fieldKey == 'dateOfBirth') {
          this.state.extractedInfo.dob = moment(field.value, "DD-MM-YYYY").format('YYYY-MM-DD');

        }
        if (field.fieldKey == 'fullName') {
          this.state.extractedInfo.firstName = field.value
        }

      })

    });

  }
  public override preSubmitInterceptor(payload: any): any {
    if (this.state.photoIdScanCompleted) {
      this.getExtractedInfo();
      payload = {
        ...payload,
        "documentType": this.documentType,
        "isPrimary": this.isPrimary,
        "frontPage": this.state.documentImages[0],
        "backPage": this.state.documentImages[1],
        "extractedInfo": JSON.stringify(this.state.documentData)
      }
    } else if (this.state.skipPassportPayload) {
      this.setValue('flag','1');
      payload = {
        "documentType": this.documentType,
        "isSkipped": "1"
      }
    } else {
      this.setValue('flag','1');
      payload = {
        "applicantId": this._appConfig.getData('applicantId')
      }
    }
    console.log("final result" + payload);
    return payload;
  }

  public override postSubmitInterceptor(response: BaseFpxPostSubmitInterceptor): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let resBody = this.state.photoIdScanCompleted ? 'obapplicantdocuments' : 'obskipdocument';
      routingInfo.setQueryParams({
        response: response.success?.body?.[resBody],
        transRef: response.success?.body?.[resBody].applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
      console.log("error ")
    }
    return routingInfo;
  }

}