import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { PaymentsNavigationFormHelper, PaymentsNavigationFormState } from './payments-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomMenuService } from 'src/app/dep/services/menu-service/custom-menu.service';

@Component({
  selector: 'payments-navigation-form',
  templateUrl: './payments-navigation-form.component.html',
  styleUrls: ['./payments-navigation-form.component.scss'],
  providers: [PaymentsNavigationFormHelper]
})
export class PaymentsNavigationFormComponent extends BaseFpxFormComponent<PaymentsNavigationFormHelper, PaymentsNavigationFormState>{
  
  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    paymentsNavigationFormHelper: PaymentsNavigationFormHelper,
    private _menuService: CustomMenuService
  ) {
    super(_formBuilder, _route, _controlContainer, paymentsNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }
   contextMenu = this._menuService.getMenuList('BILLSMENU');
}
