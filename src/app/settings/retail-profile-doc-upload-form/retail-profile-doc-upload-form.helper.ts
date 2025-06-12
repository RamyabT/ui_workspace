import { EventEmitter, Inject, Injectable, Input, Output } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxChangeHandler,
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService, CustomFileUploadService } from "@dep/services";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CameraService } from "@smart-device";
import { ObapplicantsignatureService } from "src/app/onboarding/obapplicantsignature-service/obapplicantsignature.service";
import { Camera } from "@awesome-cordova-plugins/camera/ngx";
import { DeviceDetectorService } from "@dep/core";
import { APPCONSTANTS } from "@dep/constants";

export class RetailProfileDocUploadFormState extends BaseFpxComponentState {
  subTitle: any;
  dialogData: any;
  fileUpload: any = {
    minSize: "1024",
    maxSize: "20000024",
    extensions: ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpg,image/jpeg,image/png"
  }
}


@Injectable()
export class RetailProfileDocUploadFormHelper extends BaseFpxFormHelper<RetailProfileDocUploadFormState> {

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private _cameraService: CameraService,
    public deviceDetectorService: DeviceDetectorService,
    private _cobApplicantSignatureFormService: ObapplicantsignatureService,
    private _camera: Camera,
    private _fileUploadService:CustomFileUploadService,
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
  ) {
    super(new RetailProfileDocUploadFormState());
  }

  override doPreInit(): void {
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("fileUpload", this.handleFileUploadOnvalueChange);
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
   this.state.subTitle = this._dialogData.subTitle;
   this.state.dialogData = this._dialogData
   }

   public handleFileUploadOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value?.length>0 && status == 'VALID'){
      let docData:any = value[0]
      docData.uploadType = '1';
      this._dialogRef.close({ docData: docData,additionalData:this.state.dialogData});
    }
  }

  startTakePhoto() {
    let options: any = {
      sourceType: this._camera.PictureSourceType.CAMERA,
      destinationType: this._camera.DestinationType.DATA_URL,
      cameraDirection: this._camera.Direction.FRONT,
      quality: 50
    };
    this._cameraService.getPicture(options).then((docData: any) => {
      let documentData:any;
      documentData={uploadType:'2'};
      
      let imageData:string;
      imageData='data:image/png;base64,'+docData;
      let blob = this._cobApplicantSignatureFormService.base64ToBlob(imageData);
      let fileName:string=this.state.dialogData.fileName;
      let file :any=new File([blob],fileName,{type: blob.type});
      const formData = new FormData();
      file=file.name[0];
      formData.append('document', file, fileName);
      fileName=fileName+".jpg";

      if(!APPCONSTANTS.enableSSLPinning){
        this.showSpinner();
      }

      this._fileUploadService.upload(formData).subscribe({
        next:(res:any)=>{
          if(!APPCONSTANTS.enableSSLPinning){
            this.hideSpinner();
          }
          documentData={
            docInvNumber:res.body?.docInvNumber,
            fileName:fileName
          };
          this._dialogRef.close({ docData:documentData , additionalData:this.state.dialogData});
        }
      });
    },
    (err: any) => {
      this._cameraService.stopCamera();
      if(!APPCONSTANTS.enableSSLPinning){
        this.hideSpinner();
      }
      console.log(err);
    });
  }
  browsePhoto() {
    this._matDialog.closeAll();
  }

  // onFileSelect($event: any) {
  //   this.setDocData($event);
  // }

  // setDocData(docData: any) {
  //   if (typeof (docData) === 'object') {
  //     this.fileToBase64(docData).then(
  //       (value: any) => {
  //         let documentData = docData;
  //         this._dialogRef.close({ docData: value,fileName:documentData?.name,type:documentData?.type,additionalData:this.state.dialogData});
  //       }
  //     );
  //   }
  //   else {
  //     let blob = this.cobApplicantSignatureFormService.base64ToBlob(docData);
  //     if (blob.size > 1000000) {
  //       this.cobApplicantSignatureFormService.scaleDownImage(docData, window.screen.width).then(
  //         (imgBase64: any) => {
  //           this._dialogRef.close({ docData: imgBase64,additionalData:this.state.dialogData });
  //         }
  //       );
  //     } else {
  //       this._dialogRef.close({ docData: docData,additionalData:this.state.dialogData });
  //     }
  //   }
  // }

  // fileToBase64(file: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // }

}
