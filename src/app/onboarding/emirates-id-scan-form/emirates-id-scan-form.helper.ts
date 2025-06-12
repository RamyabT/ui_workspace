import { ChangeDetectorRef, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxComponentState, BaseFpxFormHelper, BaseFpxPostSubmitInterceptor, HttpProviderService, HttpRequest, IHttpSuccessPayload, RoutingInfo } from "@fpx/core";
import { FaceTechSDKController } from 'src/app/facetech/facetech-sdk-controller';
import { DocumentChecklistService } from '../document-checklist-service/document-checklist-service';
//import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';
import { PhotoIdMatchService } from '../photoidmatch-service/photoidmatch.service';
import { map } from 'rxjs';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';


declare let FaceTechSDK: any;

export class EmiratesIdScanFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  documentImages: any = [];
  documentData: any;
  photoIdScanCompleted: boolean = false;
  externalDatabaseRefID: string = "";
  result: string = "";
  selfie: string = "";
  doShowScanButton: boolean = false;
  firstName: any;
  dateOfBirth: any;
}


@Injectable()
export class EmiratesIdScanFormHelper extends BaseFpxFormHelper<EmiratesIdScanFormState>{
 
  private _facetecConfig: any;
  idNumber2Value: any;
  fullName:any;
  idNumber:any;
  dateOfBirth:any;
  nationality:any;
  dateOfExpiration:any;
  idNumber2:any;

  constructor(
    private _router: Router,
    private ngZone: NgZone,private _httpProvider: HttpProviderService,
    public _deviceDetectorService: DeviceDetectorService,
    private photoIdMatchService: PhotoIdMatchService,
    private _facetechReqServcie:FacetechReqServcie,
    public _appConfig: AppConfigService) {
    super(new EmiratesIdScanFormState());
  }

  private _onLoadpreviewdata() {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/obapplicantdocuments/20240222052601003935/{documentType}');
    // httpRequest.setResource('/obapplicantdocuments/{applicantId}/{documentType}');
    //  httpRequest.addPathParameter('appRef', this.setRoutingParam('appRef'));
    // httpRequest.addPathParameter('applicantId', this._appConfig.getData('applicantId'));
    //  httpRequest.addPathParameter('appRef',sessionStorage.getItem('applicantId'));

    httpRequest.addPathParameter('documentType', 'EMIRATES_ID');
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Customers');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null)).subscribe({
        next: (res: any) => {
          console.log(res)
          let info = res?.obapplicantdocuments?.extractedInfo
          let paresedInfo = JSON.parse(info || '{}')
          let userInfo = paresedInfo.mrzValues.groups.find((item: any) => item.groupKey === 'userInfo');
          let idInfo = paresedInfo.mrzValues.groups.find((item: any) => item.groupKey === 'idInfo');
          let fullName = userInfo.fields.find((item: any) => item.fieldKey === "fullName")
          let idNumber = idInfo.fields.find((item: any) => item.fieldKey === "idNumber")
          let idNumber2 = idInfo.fields.find((item: any) => item.fieldKey === "idNumber2")
          let dateOfExpiration = idInfo.fields.find((item: any) => item.fieldKey === "dateOfExpiration")
          let dateOfBirth = userInfo.fields.find((item: any) => item.fieldKey === "dateOfBirth")
          let nationality = userInfo.fields.find((item: any) => item.fieldKey === "nationality")
        
          let full = fullName.value;
          let id = idNumber.value;
          let dob = dateOfBirth.value;
          let nat = nationality.value;
          let id2 = idNumber2.value;
          let doe = dateOfExpiration.value;
          this.fullName=full;
          this.idNumber=id;
          this.dateOfBirth=dob;
          this.nationality=nat;
          this.idNumber2=id2;
          this.dateOfExpiration=doe;
          // this.setValue('countryOfBirth', natValue);
          // this.formGroup.get("cityOfBirth")?.setValue(natValue);


        },
        error: () => {

        },
        complete: () => {

        }
      })

   };
  override doPreInit(): void {
    this.hideShellActions();
      this.setServiceCode('RETAILEMIRATESIDSCAN');

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
      // this.state.photoIdScanCompleted=true;
      // this._onLoadpreviewdata();
    } else {
      this.photoMatchNormal();
      // this.state.photoIdScanCompleted=true;
      // this._onLoadpreviewdata();
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
    } 
    else {
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
        "documentType": 'EMIRATES_ID',
        "isPrimary": '1',
        "frontPage": this.state.documentImages[0],
        "backPage": this.state.documentImages[1],
        "extractedInfo": JSON.stringify(this.state.documentData)
      }
this.photoIdMatchService.extractedData=JSON.stringify(this.state.documentData)

  const userConfirmedValues = this.state.documentData.userConfirmedValues;

  // Iterate through groups to find the desired field
  for (const group of userConfirmedValues.groups) {
    // Check if the group has fields
    if (group.fields) {
      for (const field of group.fields) {
        // Check field keys and assign values accordingly
        if (field.fieldKey === 'idNumber2') {
          this.photoIdMatchService.cardNo = field.value;
        } else if (field.fieldKey === 'firstName') {
          this.photoIdMatchService.name = field.value;
        } else if (field.fieldKey === 'dateOfBirth') {
          this.photoIdMatchService.dobEid = field.value;
        }else if (field.fieldKey === 'dateOfExpiration') {
          this.photoIdMatchService.dateOfExpiration = field.value;
        }
      }
    }
  }
  console.log("CARD NUMBER "+this.photoIdMatchService.cardNo);

      console.log("NAME: "+this.photoIdMatchService.name);
      console.log("DOB: " + this.photoIdMatchService.dobEid);
      console.log("EXPIRY DATE: "+this.photoIdMatchService.dateOfExpiration);
     
      
    }
    else {
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