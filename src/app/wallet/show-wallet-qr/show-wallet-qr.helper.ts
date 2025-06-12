import { Inject, Injectable } from "@angular/core";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  FpxToastService,
  HttpProviderService,
  RoutingInfo,
} from "@fpx/core";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { ShareInfo } from "@dep/native";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
export class RetailShowWalletQrState extends BaseFpxComponentState {
  qrCodeData: string = '';
  qrCodeWidth: number = 255;
  errorCorrectionLevel: string = 'H';
  walletDetails: any;
  qrCodeElement: any;
}


@Injectable()
export class RetailShowWalletQrHelper extends BaseFpxFormHelper<RetailShowWalletQrState> {

  constructor(private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    private _shareInfoService:ShareInfo,
    protected translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _fpxToastService: FpxToastService,
  ) {
    super(new RetailShowWalletQrState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSHOWWALLETQR");

    this.state.qrCodeData = environment.baseURL+'/wallet/send-money?businessId='+ this._dialogData.businessId;
    this.state.walletDetails = {
      name: this._dialogData.name,
      walletAccountNo: this._dialogData.walletAccountNo
    }

  }

  downloadQR() {
    const qrCodeElement:any = this.state.qrCodeElement?.qrcElement?.nativeElement.querySelector('canvas');
    if(qrCodeElement){
      const qrImagedata:any = qrCodeElement.toDataURL('image/png');
      const qrLink:any = document.createElement('a');
      qrLink.href = qrImagedata;
      qrLink.download = 'wallet_qrcode.png';
      qrLink.click();
      this._fpxToastService.showSuccessAlert('RETAILSHOWWALLETQR.downloadQRSuccess.title', 'RETAILSHOWWALLETQR.downloadQRSuccess.message',{ duration: 1000 });
    }
    else{
      console.log('QR code not found');
    }
  }
  shareQR() {
    this._shareInfoService.shareInfo(this.state.qrCodeData, this.translate.instant('RETAILSHOWWALLETQR.shareQRSuccess.message'))
  }
  public override doPostInit(): void {

  }

  public override preSubmitInterceptor(payload: any): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: any) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


