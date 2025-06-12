import { Component, Input, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { TransfersNavigationFormHelper, TransfersNavigationFormState } from './transfers-navigation-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'transfers-navigation-form',
  templateUrl: './transfers-navigation-form.component.html',
  styleUrls: ['./transfers-navigation-form.component.scss'],
  providers: [TransfersNavigationFormHelper]
})
export class TransfersNavigationFormComponent extends BaseFpxFormComponent<TransfersNavigationFormHelper, TransfersNavigationFormState> {
  @Input() hasAtleastOneTransferToAccount: boolean = true;
  @Input() hasAtleastOneTransferFromAccount: boolean = true;

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    transfersNavigationFormHelper: TransfersNavigationFormHelper,
  ) {
    super(_formBuilder, _route, _controlContainer, transfersNavigationFormHelper);
  }

  protected override doPreInit(){
    this.addFormControl('accountNumber', '', [], [], 'change', 0, false);
  }

}
