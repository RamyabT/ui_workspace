import { Component, OnInit, Optional } from '@angular/core';
import { BaseFpxFormComponent } from '@fpx/core';
import { TFADeliveryModeFormHelper, TFADeliveryModeFormState } from './tfa-delivery-mode-form.helper';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TfadeliverymodeService } from '../tfadeliverymode-service/tfadeliverymode.service';

@Component({
  selector: 'app-tfa-delivery-mode-form',
  templateUrl: './tfa-delivery-mode-form.component.html',
  styleUrls: ['./tfa-delivery-mode-form.component.scss'],
  providers: [
    TFADeliveryModeFormHelper,
    TfadeliverymodeService
  ]
})
export class TFADeliveryModeFormComponent extends BaseFpxFormComponent<TFADeliveryModeFormHelper, TFADeliveryModeFormState> {

  constructor(
    _formBuilder: FormBuilder,
    _route: Router,
    @Optional() _controlContainer: ControlContainer,
    _tfaDeliveryModeFormHelper: TFADeliveryModeFormHelper,
    private _tfaDeliveryModeService: TfadeliverymodeService
  ) {
    super(_formBuilder, _route, _controlContainer, _tfaDeliveryModeFormHelper);
    this.setServiceCode("TFADELIVERYMODESELECTION");
  }

  override doPreInit() {
    this.addFormControl('reqRef', '');
    this.addFormControl('deliveryMode', '', [Validators.required], [], 'change');
    this.setDataService(this._tfaDeliveryModeService);
  }

}
