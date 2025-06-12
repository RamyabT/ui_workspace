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


export class RetailScanWalletQrState extends BaseFpxComponentState {
  subTitle: any;
  dialogData: any;
  fileUpload: any = {
    minSize: "1024",
    maxSize: "20000024",
    extensions: ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpg,image/jpeg,image/png"
  }
  qrResult: any;
  businessId!: string;
  paymentAmount!: string;
  payeeWalletDetails:any={
      businessId:'',
      paymentAmount:''
  };
}


@Injectable()
export class RetailScanWalletQrHelper extends BaseFpxFormHelper<RetailScanWalletQrState> {

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public deviceDetectorService: DeviceDetectorService,
    private _appConfig:AppConfigService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
  ) {
    super(new RetailScanWalletQrState());
  }

  override doPreInit(): void {
  }

  public override doPostInit(): void {
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
   this.state.subTitle = this._dialogData.subTitle;
   this.state.dialogData = this._dialogData;
   }

  scanQR() {
    this._dialogRef.close('RETAILSCANWALLETQR');
    let service = this._appConfig.getServiceDetails('RETAILSCANWALLETQR');
    this._router.navigate(service.servicePath);
  }
  onReadQRSuccess() {
    this.state.qrResult=this.state.qrResult.split('?')[1];
    if(this.state.qrResult.includes('&')){
      this.state.qrResult=this.state.qrResult.split('&');
    }
    if(typeof(this.state.qrResult) == 'string'){
      this.decodeQRdata(this.state.qrResult);
    }
    else{
      this.state.qrResult.forEach((element:any) => {
        this.decodeQRdata(element);
      });
    }
     this._appConfig.setData('payeeWalletDetails',this.state.payeeWalletDetails);
    this._dialogRef.close('RETAILWALLETTRANSFER');
  }
  decodeQRdata(element : string){
    if(element.includes('businessId')){
      this.state.payeeWalletDetails.businessId= element.split('=')[1];
    }
    else if(element.includes('amount')){
      this.state.payeeWalletDetails.paymentAmount = element.split('=')[1];
   }
  }

}
