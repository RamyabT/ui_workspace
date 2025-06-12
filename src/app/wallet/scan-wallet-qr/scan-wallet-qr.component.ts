import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailScanWalletQrHelper, RetailScanWalletQrState } from './scan-wallet-qr.helper';
import { Html5Qrcode } from 'html5-qrcode';



@Component({
  selector: 'app-scan-wallet-qr',
  templateUrl: './scan-wallet-qr.component.html',
  styleUrls: ['./scan-wallet-qr.component.scss'],
  providers: [RetailScanWalletQrHelper]
})

export class RetailScanWalletQrComponent extends BaseFpxFormComponent<RetailScanWalletQrHelper, RetailScanWalletQrState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailProfileDocUploadFormHelper: RetailScanWalletQrHelper,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailProfileDocUploadFormHelper);
  }
  protected override doPreInit(): void {
    this.setServiceCode("RETAILSCANWALLETQR");

  }


  protected override doPostInit(): void {

  }

  onFileSelect($event: any) {
    const html5QrCode = new Html5Qrcode('reader');
    html5QrCode.scanFile($event, false)
      .then((decodedRes: any) => {
        this.state.qrResult = decodedRes;
        this._helper.onReadQRSuccess();
      })
      .catch((err: any) => {
        console.log("QR SCAN ERROR");
      })
  }

}
