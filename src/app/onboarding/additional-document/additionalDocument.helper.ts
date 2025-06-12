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
import { AdditionalDocumentService } from '../additionalDocument-service/additionalDocument.service';
import { AdditionalDocument } from '../additionalDocument-service/additionalDocument.model';
import { AppConfigService } from "@dep/services";
import { DomSanitizer } from "@angular/platform-browser";
export class additionalDocumentState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dualNationalityHolderFlag : any;
  
  // triggered: boolean = false;
  // captureBy!: string;
  // imageSrc!: any;
}


@Injectable()
export class additionalDocumentHelper extends BaseFpxFormHelper<additionalDocumentState> {
  // width: any = {
  //   "SIGNATURE": 768,
  //   "AADHAR_CARD": 320
  // }
  constructor(private additionalDocumentService: AdditionalDocumentService, 
    private _appConfig: AppConfigService,
    public dom: DomSanitizer,
    private _httpProvider: HttpProviderService, private _router: Router) {
    super(new additionalDocumentState());
  }

  override doPreInit(): void {
    this.setServiceCode("COBADDITIONALDOCUMENT");
    this.removeShellBtn('RESET');
    this.addShellButton('Skip', 'SKIP', 'primary', 'ENTRY', 'button');
    this.setShellBtnMethod('SKIP', this.skipQueue.bind(this));
  }

  skipQueue() {
    this.state.dualNationalityHolderFlag = 1;
    this.triggerSubmit();
  }

  public override doPostInit(): void {
    
  }


  public override preSubmitInterceptor(payload: AdditionalDocument): any {
    // WRITE CODE HERE TO HANDLE 
    if(this.state.dualNationalityHolderFlag == 1){
      payload.dualNationalityHolderFlag = this.state.dualNationalityHolderFlag; 
    } else {
      this.state.dualNationalityHolderFlag = 0;
      payload.dualNationalityHolderFlag = this.state.dualNationalityHolderFlag;
    }
    return payload;
  }


  public override postDataFetchInterceptor(payload: AdditionalDocument) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  // onFileSelect($event: any){
  //   this.state.captureBy = 'browse';
  //   this.state.triggered = true;
  //   this.setImageData($event);
  // }
  // setImageData(imageData: any) {
  //   if (typeof (imageData) === 'object') {
  //     this.additionalDocumentService.fileToBase64(imageData).then(
  //       (value: any) => {
  //         this.state.imageSrc = value;
  //         this.formGroup.get('signatureImage')?.patchValue(value);
  //         this.formGroup.updateValueAndValidity();
  //       }
  //     );
  //   } else {
  //     let blob = this.additionalDocumentService.base64ToBlob(imageData);
  //     if(blob.size > 1000000){
  //       this.additionalDocumentService.scaleDownImage(imageData, this.width['SIGNATURE']).then(
  //         (imgBase64: any) => {  
  //           this.state.imageSrc = imgBase64;
  //           this.formGroup.get('signatureImage')?.patchValue(imgBase64);
  //           // this.formGroup.get('takePhoto')?.patchValue(imgBase64);
  //           this.formGroup.updateValueAndValidity();
  //         }
  //       );
  //     } else {
  //         this.state.imageSrc = imageData;
  //         this.formGroup.get('signatureImage')?.patchValue(imageData);
  //         // this.formGroup.get('takePhoto')?.patchValue(imageData);
  //         this.formGroup.updateValueAndValidity();
  //     }
  //   }
  // }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.additionalDocument,
        transRef: response.success?.body?.additionalDocument.applicantId,
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


