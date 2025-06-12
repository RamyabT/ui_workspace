import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { NativeStorageManager } from '@dep/native';


import {
 
  BaseFpxComponentState,
  BaseFpxFormHelper,
} from '@fpx/core';
import { OktaAuthService } from 'src/app/okta-integration/okta/okta-auth.service';


export class BadGatewayComponentState extends BaseFpxComponentState {

}

@Injectable()
export class BadGatewayComponentHelper extends BaseFpxFormHelper<BadGatewayComponentState> {
  constructor(
    private _router : Router,
    private _deviceService: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager,
    private _oktaAuthService: OktaAuthService
  ) {
    super(new BadGatewayComponentState());
  }

  override doPreInit() {
    this.removeShellBtn('BACK');
    this.addShellButton('BadGatewayForm.login','LOGIN','primary','DISPLAY','button');
    this.setShellBtnMethod('LOGIN', this.login.bind(this));
  }
  login(){
    if(this._deviceService.isHybrid()){
      this._nativeStorageMgr.loadData("deeviceAuthInfo")
      .then(
        (value:any) => {
          this._router.navigate(['login-space', 'entry-shell', 'login', 'mpin-login-form']);
        }
      )
      .catch((err:any)=> {
        if(sessionStorage.getItem('isOktaLogin') == 'true') {
          this._oktaAuthService.signOut();
        } else {
          this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
        }
      });
    }
    else{
      if(sessionStorage.getItem('isOktaLogin') == 'true') {
        this._oktaAuthService.signOut();
      } else {
        this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
      }
    }
  }
}
