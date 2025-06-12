import { Component, OnInit } from '@angular/core';
import { NativeStorageManager } from '@dep/native';
import { BaseFpxFunctionality } from '@fpx/core';

@Component({
  selector: 'app-app-pay-intro',
  templateUrl: './app-pay-intro.component.html',
  styleUrls: ['./app-pay-intro.component.scss']
})
export class AppPayIntroComponent extends BaseFpxFunctionality implements OnInit {

  constructor(
    private _nativeStorageMgr: NativeStorageManager
  ) {
    super();
   }

  ngOnInit(): void {
  }

  onSkip(){
    this._nativeStorageMgr.storeData("appPayIntroFlag", "1").then(
      (res) => {
        this._angularRouter.navigate(['home']);
      }
    );
  }
  onContinue(){
    this._nativeStorageMgr.storeData("appPayIntroFlag", "1").then(
      (res) => {
        this._angularRouter.navigate(['cards-space']);
      }
    );
  }

}
