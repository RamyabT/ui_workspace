import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BaseFpxComponent, BaseFpxFormComponent, BaseFpxFunctionality } from '@fpx/core';
import { InitATransferFormHelper, InitATransferFormState } from './init-a-transfer-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-init-a-transfer-form',
  templateUrl: './init-a-transfer-form.component.html',
  styleUrls: ['./init-a-transfer-form.component.scss'],
  providers: [InitATransferFormHelper]
})
export class InitATransferFormComponent extends BaseFpxFormComponent<InitATransferFormHelper, InitATransferFormState> {

  protected paymentsList: any = [
    {
      serviceCode: "RETAILTRANOAT"
    },
    {
      serviceCode: "RETAILTRANINTBT"
    },
    {
      serviceCode: "RETAILTRANDOMESTIC"
    },
    {
      serviceCode: "RETAILTRANSWIFT"
    },
    {
      serviceCode: "RETAILTRANINSTA"
    },
    {
      serviceCode: "RETAILTRANCC"
    }
  ]
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _initATransferFormHelper: InitATransferFormHelper,
  ) { 
    super(formBuilder, router,controlContainer, _initATransferFormHelper);
  }

}
