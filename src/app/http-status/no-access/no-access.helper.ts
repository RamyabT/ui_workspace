import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { NativeStorageManager } from '@dep/native';
declare let window: any;

import {
 
  BaseFpxComponentState,
  BaseFpxFormHelper,
} from '@fpx/core';


export class NoAccessState extends BaseFpxComponentState {

}

@Injectable()
export class NoAccessHelper extends BaseFpxFormHelper<NoAccessState> {
  constructor(
    private _router : Router,
    private _deviceService: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager
  ) {
    super(new NoAccessState());
  }

  override doPreInit() {
    this.removeShellBtn('BACK');
    this.addShellButton('PageNotFoundForm.login','LOGIN','primary','DISPLAY','button');
    // this.setShellBtnMethod('LOGIN', this.login.bind(this));
  }
  // login(){
  //   if(this._deviceService.isHybrid()){
  //     this._nativeStorageMgr.loadData("deeviceAuthInfo")
  //     .then(
  //       (value:any) => {
  //         this._router.navigate(['login-space', 'entry-shell', 'login', 'mpin-login-form']);
  //       }
  //     )
  //     .catch((err:any)=> {
  //       this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
  //     });
  //   }
  //   else{
  //     this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
  //   }
  // }
  goToHome(){
    if (window.cordova && window.cordova.InAppBrowser) {
      window.cordova.InAppBrowser.open('https://vancity.com', '_system');
    } else {
      window.open('https://vancity.com', '_blank');
    }
  }
}
