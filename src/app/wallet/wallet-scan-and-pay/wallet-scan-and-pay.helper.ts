import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BarcodeScanner, BarcodeScannerOptions } from "@awesome-cordova-plugins/barcode-scanner/ngx";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import {
    BaseFpxComponentState,
    BaseFpxFormHelper,
  
} from "@fpx/core";


export class WalletScanAndPayState extends BaseFpxComponentState {
  qrResult: any;
  payeeWalletDetails:any={
    businessId:'',
    paymentAmount:''
};

}

@Injectable()
export class WalletScanAndPayHelper extends BaseFpxFormHelper<WalletScanAndPayState>{
    constructor(private _appConfig: AppConfigService,private barcodeScanner: BarcodeScanner,
        private deviceDetectorService: DeviceDetectorService,
        private _router: Router){
        
        super(new WalletScanAndPayState());
    }

    override doPreInit(): void {
        this.removeShellBtn('BACK');
    }

    public handleFormOnLoad() {
        if (this.deviceDetectorService.isHybrid()) {
            const options: BarcodeScannerOptions = {
              showFlipCameraButton: true, // iOS and Android
              showTorchButton: true, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              prompt: "Place a QR code inside the scan area",
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations: true, // iOS
              disableSuccessBeep: false, // iOS and Android
            };
            this.barcodeScanner
              .scan(options)
              .then((result:any) => {
                this.state.qrResult = result.text;
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
                let service = this._appConfig.getServiceDetails('RETAILWALLETTRANSFER');
                this._router.navigate(service.servicePath);
               
              })
              .catch((err:any) => {
                console.log("Error while scanning", err);
              });
          }
    }
    decodeQRdata(element : string){
      if(element.includes('businessId')){
        this.state.payeeWalletDetails.businessId= element.split('=')[1];
      }
      else if(element.includes('amount')){
        this.state.payeeWalletDetails.paymentAmount = element.split('=')[1];
     }
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();
    }
    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}