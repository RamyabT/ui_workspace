import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';


import {

  BaseFpxComponentState,
  BaseFpxFormHelper,
} from '@fpx/core';


export class SslCertificateErrorComponentState extends BaseFpxComponentState {

}

@Injectable()
export class SslCertificateErrorComponentHelper extends BaseFpxFormHelper<SslCertificateErrorComponentState> {
  constructor(
    private _router: Router,
    public deviceService: DeviceDetectorService,
    private _fileOpenerService: FileOpenerService

  ) {
    super(new SslCertificateErrorComponentState());
  }

  override doPreInit() {
    let shellBtnName = 'store';
    this.removeShellBtn('BACK');
    if (this.deviceService.os.toLowerCase() == "android") {
      shellBtnName = 'PlayStore';
    }
    else {
      shellBtnName = 'AppStore';
    }
    this.addShellButton(shellBtnName, 'PLAYSTORE', 'primary', 'DISPLAY', 'button');
    this.setShellBtnMethod('PLAYSTORE', this.goToStore.bind(this));
  }
  goToStore() {
    if (this.deviceService.os.toLowerCase() == "android") {
      this._fileOpenerService.openLink('https://play.google.com/store/apps');
    }
    else {
      this._fileOpenerService.openLink('https://itunes.apple.com/th/app/');

    }
  }
  override doPostInit() {

  }

}
