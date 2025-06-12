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
} from "@fpx/core";
import { Observable, Subject, map, of } from "rxjs";
import { Router } from "@angular/router";
// import { ProcessShellService } from "src/app/process-shell/services/process-shell.service";
import { ObapplicantsignatureService } from "../obapplicantsignature-service/obapplicantsignature.service";
import { Obapplicantsignature } from "../obapplicantsignature-service/obapplicantsignature.model";
import { DomSanitizer } from "@angular/platform-browser";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import { WebcamImage, WebcamUtil } from 'ngx-webcam';

export class CobApplicantSignatureFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  signatureImage: any = {
    minSize: "1024",
    maxSize: "10000024",
    extensions: ".pdf,.jpg,.jpeg,.png",
  };
  triggered: boolean = false;
  captureBy!: string;
  isHybrid: boolean = false;
  imageSrc!: any;


  doStartCamera: Subject<boolean> = new Subject();
  doStopCamera: Subject<boolean> = new Subject();
  doTakePhoto: Subject<boolean> = new Subject();

}

@Injectable()
export class CobApplicantSignatureFormHelper extends BaseFpxFormHelper<CobApplicantSignatureFormState> {
  width: any = {
    "SIGNATURE": 768,
    "AADHAR_CARD": 320
  }
  cameraMode: boolean = false;
  webcamImage: WebcamImage | undefined;
  showWebCam = true;
  imageAsBase64: any;
  isCameraExist = true;
  private nexrWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  private trigger: Subject<void> = new Subject<void>();
  constructor(
    private cobApplicantSignatureFormService: ObapplicantsignatureService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    public dom: DomSanitizer,
    public _deviceDetectorService: DeviceDetectorService,
    public _appConfig: AppConfigService
  ) {
    super(new CobApplicantSignatureFormState());
  
  }

  dosignatureImageChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value){
      this.setImageData(value);
    }
    else {
      this.state.triggered = false;
      this.state.captureBy == 'browse';
    }
  }
  dotakeImageChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value){
      this.setImageData(value);
    }
    else {
      this.state.triggered = false;
      this.state.captureBy == 'browse';
    }
  }
  override doPreInit(): void {
    this.setServiceCode("RETAILUPLOADSIGNATURE");
    this.hideShellActions();

    //  this._processhell.setServiceCode(this.serviceCode.value);
    this.state.isHybrid = this._deviceDetectorService.isHybrid();
    this.cameraMode = false;
    this.addValueChangeHandler('signatureImage', this.dosignatureImageChange);
    this.addValueChangeHandler('takePhoto', this.dotakeImageChange);
  }

  public override doPostInit(): void {}

  initiateCamera() {
    this.state.triggered = true;
    this.state.captureBy = 'camera';
    this.cameraMode = true;
  }
  startCamera() {
    // this.state.imageSrc = null;
    this.state.doStartCamera.next(true);
  }

  stopCamera() {
    this.state.doStopCamera.next(true);
  }

  takePicture() {
    this.cameraMode = false;
    this.state.doTakePhoto.next(true);
    this.showWebCam = false;
    this.trigger.next();
  }

  onCameraReady($event: any) {
    if (this.state.captureBy == "camera") {
      this.startCamera();
    }
  }

  dodocCaptureChange(value: any) {
    if(value){
      this.setImageData(value);
    }
    else {
      this.state.triggered = false;
      this.state.captureBy == 'browse';
    }
  }

  onFileSelect($event: any){
    this.state.captureBy = 'browse';
    this.state.triggered = true;
    this.setImageData($event);
  }
  handleImage(webcamImage: WebcamImage) {
    
    this.webcamImage = webcamImage
    this.imageAsBase64 = webcamImage.imageAsDataUrl
    this.showWebCam = false;
    this.state.captureBy = 'browse';
    this.state.triggered = true;
    this.setImageData(this.imageAsBase64);
  }

  setImageData(imageData: any) {
    if (typeof (imageData) === 'object') {
      this.cobApplicantSignatureFormService.fileToBase64(imageData).then(
        (value: any) => {
          this.state.imageSrc = value;
          this.formGroup.get('signatureImage')?.patchValue(value);
          this.formGroup.updateValueAndValidity();
        }
      );
    } else {
      let blob = this.cobApplicantSignatureFormService.base64ToBlob(imageData);
      if(blob.size > 1000000){
        this.cobApplicantSignatureFormService.scaleDownImage(imageData, this.width['SIGNATURE']).then(
          (imgBase64: any) => {  
            this.state.imageSrc = imgBase64;
            this.formGroup.get('signatureImage')?.patchValue(imgBase64);
            // this.formGroup.get('takePhoto')?.patchValue(imgBase64);
            this.formGroup.updateValueAndValidity();
          }
        );
      } else {
          this.state.imageSrc = imageData;
          this.formGroup.get('signatureImage')?.patchValue(imageData);
          // this.formGroup.get('takePhoto')?.patchValue(imageData);
          this.formGroup.updateValueAndValidity();
      }
    }
  }

  resetForm() {
    this.state.triggered = false;
    this.state.captureBy == 'browse';
    this.showWebCam = true;
    this.formGroup.reset();
  }

  public override preSubmitInterceptor(payload: Obapplicantsignature): any {
    // WRITE CODE HERE TO HANDLE
    // payload.applicantId = '20241134641738909';
    // const prePayload: { docCapture?: string } = {
    //   ...payload,
    // }

    // delete prePayload['docCapture'];

    // return prePayload;
    return payload;
   
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.obapplicantsignature,
        transRef: response.success?.body?.obapplicantsignature.applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ 
        response: response.error.error,
        status: "failed" });
      }
    return routingInfo;
  }
  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nexrWebcam.asObservable();
  }
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
