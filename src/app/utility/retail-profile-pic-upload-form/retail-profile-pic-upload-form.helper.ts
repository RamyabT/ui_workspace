import { EventEmitter, Inject, Injectable } from "@angular/core";
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
  CriteriaQuery,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CameraService } from "@smart-device";
import { UtilityService } from "@app/utility";
import { Camera } from "@awesome-cordova-plugins/camera/ngx";
import { DeviceDetectorService } from "@dep/core";
 
export class RetailProfilePicUploadFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  isFavourite: any = {
    textPosition: "after",
    ckValues: { checked: "1", unchecked: "0" },
  };
  activeTabIndex: number = 0;
  destinationType: 'file' | 'base64' = 'file';
  acceptFiles:string = "image/*,.pdf";
  id:string = '';
  cameraPreviewRect: any;
  imageData:any;
  triggered!: boolean;
  captureBy!: string;
  width:number=window.screen.width;
  height:number=window.screen.height;
}

@Injectable()
export class RetailProfilePicUploadFormHelper extends BaseFpxFormHelper<RetailProfilePicUploadFormState> {

  constructor(
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _customerService:CustomerService,
    private _dialogRef: MatDialogRef<any>,
    private _cameraService:CameraService,
    private _utilityService: UtilityService,
    private _camera: Camera,
    public _device: DeviceDetectorService,
  ) {
    super(new RetailProfilePicUploadFormState());
  }

  override doPreInit(): void {
    // this.removeShellBtn("BACK");
    this.state.id = 'fileBrowse' + new Date().getTime();
  }

  public handleFormOnLoad() {}

  startTakePhoto(){
    // let options:any={
    //   tapPhoto:true,
    //   width: window.screen.width,
    //   height: window.screen.height,
    //   camera: 'front'
    // };
    // this._cameraService.startCameraAbove(options).then((imageData: any) => {
    //   this._cameraService.stopCamera();
    //   this._cameraService.cropImage(imageData, this.state.width, this.state.height, (cropedImgData: any) => {
    //     this.state.imageData = cropedImgData;
    //     this._appConfig.setData('profilePicture',this.state.imageData);
    //       this._dialogRef.close({imageData:this.state.imageData});
    //       this._router.navigate(['settings-space','display-shell','settings','profile-pic-preview']);
    //   });
    // }, (err: any) => {
    //   this._cameraService.stopCamera();
    //   console.log(err);
    // });
    let options:any = {
      sourceType: this._camera.PictureSourceType.CAMERA,
      destinationType: this._camera.DestinationType.DATA_URL,
      cameraDirection: this._camera.Direction.FRONT,
      quality: 50,
      correctOrientation:true
    };
    this._cameraService.getPicture(options).then((imageData: any) => {
        this.state.imageData = 'data:image/jpeg;base64,' + imageData;
          this._dialogRef.close({imageData:this.state.imageData});
    }, 
    (err: any) => {
      this._cameraService.stopCamera();
      console.log(err);
    });
  }
  // browsePhoto(){
  //   this._matDialog.closeAll();
  //   this._router.navigate(['settings-space','display-shell','settings','profile-pic-preview']);
  // }

  onFileSelect($event: any){
    this.state.captureBy = 'browse';
    this.state.triggered = true;
    if(this._dialogData.format_base64){
      this.setImageData($event);
    }
    else{
      this.state.imageData = $event;
      this._dialogRef.close({imageData:this.state.imageData})
    }
  }

  setImageData(imageData: any) {
    if (typeof (imageData) === 'object') {
      this.fileToBase64(imageData).then(
        (value: any) => {
          this.state.imageData = value;
          this._dialogRef.close({imageData:this.state.imageData});
        }
      );
    } 
    else {
      let blob = this._utilityService.base64ToBlob(imageData);
      if(blob.size > 1000000){
        this._utilityService.scaleDownImage(imageData, this.state.width).then(
          (imgBase64: any) => {  
            this.state.imageData = imgBase64;
            this._dialogRef.close({imageData:this.state.imageData});
          }
        );
      } else {
          this.state.imageData = imageData;
          this._dialogRef.close({imageData:this.state.imageData});
      }
    }
  }

  fileToBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  onTabChanged($event:any){}

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
  }
  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE

    return payload;
  }

  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    return response;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.beneaedreq;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode,
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode,
        },
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
