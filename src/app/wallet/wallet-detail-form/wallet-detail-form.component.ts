 


import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { AccountsService } from 'src/app/foundation/validator-service/accounts.service';
 import { ControlContainer, FormBuilder } from '@angular/forms';
import { WalletDetailFormHelper, WalletDetailFormState } from './wallet-detail-form.helper';

@Component({
  selector: 'app-wallet-detail-form',
  templateUrl: './wallet-detail-form.component.html',
  styleUrls: ['./wallet-detail-form.component.scss'],
  providers: [WalletDetailFormHelper, CasaaccountService]
})

export class WalletDetailFormComponent extends BaseFpxFormComponent<WalletDetailFormHelper, WalletDetailFormState> {

  constructor(
    
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public WalletDetailFormHelper: WalletDetailFormHelper
  ) {
    super(formBuilder, router,controlContainer, WalletDetailFormHelper);
  }

}