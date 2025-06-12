import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { NativeStorageManager } from '@dep/native';


import {
 
  BaseFpxComponentState,
  BaseFpxFormHelper,
} from '@fpx/core';


export class UnderConstructionState extends BaseFpxComponentState {

}

@Injectable()
export class UnderConstructionHelper extends BaseFpxFormHelper<UnderConstructionState> {
  constructor(
    private _router : Router,
    public _deviceService: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager
  ) {
    super(new UnderConstructionState());
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
    this._router.navigate(['/home'])
  }
}
