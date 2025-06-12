import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
 import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletNavigationFormHelper, WalletNavigationFormState } from './wallet-navigation-form.helper';

@Component({
  selector: 'app-wallet-navigation-form',
  templateUrl: './wallet-navigation-form.component.html',
  styleUrls: ['./wallet-navigation-form.component.scss'],
  providers: [WalletNavigationFormHelper]
})
export class WalletNavigationFormComponent extends BaseFpxFormComponent<WalletNavigationFormHelper, WalletNavigationFormState>{
   constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    WalletNavigationFormHelper: WalletNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, WalletNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('walletAccountNumber', '', [], [], 'change', 0, false);
   }

}    

