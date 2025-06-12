import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BarcodeScanner, BarcodeScannerOptions } from "@awesome-cordova-plugins/barcode-scanner/ngx";
import { DeviceDetectorService } from "@dep/core";
import { AppConfigService } from "@dep/services";
import {
    BaseFpxComponentState,
    BaseFpxFormHelper,
  
} from "@fpx/core";


export class RetailScanAndPayState extends BaseFpxComponentState {

}

@Injectable()
export class RetailScanAndPayHelper extends BaseFpxFormHelper<RetailScanAndPayState>{
    constructor(private _appConfig: AppConfigService,private barcodeScanner: BarcodeScanner,
        private deviceDetectorService: DeviceDetectorService,
        private _router: Router){
        
        super(new RetailScanAndPayState());
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
              prompt: "Place a barcode inside the scan area",
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations: true, // iOS
              disableSuccessBeep: false, // iOS and Android
            };
            this.barcodeScanner
              .scan(options)
              .then((result:any) => {
                console.log({ result });
              //  let response=result.text;
              let response = JSON.parse(result.text);
              //  if(response.includes('ReqtoPay')){
                // let reqToPay = response.replace('ReqtoPay','');
                let reqToPay = response.reqToPay;
                let senderMobileNumber = response.senderMobileNumber;
                let iban = response.iban;
                let remarks = response.remarks;
                let scanDetails = {
                  reqToPay: reqToPay,
                  iban:iban,
                  remarks:remarks
                }
                this._appConfig.setData('scanDetails',scanDetails);
                this._router.navigate(
                    [
                        "npss-space",
                        "entry-shell",
                        "npss",
                        "retail-approve-request"
                    ],
                    // {
                    //   queryParams: {
                    //     reqToPay: reqToPay,
                    //     iban:iban
                    //   },
                    // }
                  );
              //  }
               
              })
              .catch((err:any) => {
                console.log("Error while scanning", err);
              });
          }
    }

    public override doPostInit(): void {
        this.handleFormOnLoad();
    }
    //$START_CUSTOMSCRIPT\n
    //$END_CUSTOMSCRIPT\n
}