import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { RetailEtransferDeclineMoneyFormHelper, RetailEtransferDeclineMoneyFormState } from './retail-etransfer-decline-money-form.helper';



@Component({
  selector: 'app-retail-etransfer-decline-money-form',
  templateUrl: './retail-etransfer-decline-money-form.component.html',
  styleUrls: ['./retail-etransfer-decline-money-form.component.scss'],
  providers: [RetailEtransferDeclineMoneyFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailEtransferDeclineMoneyFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailEtransferDeclineMoneyFormComponent)
    }]
})

export class RetailEtransferDeclineMoneyFormComponent extends BaseFpxFormComponent<RetailEtransferDeclineMoneyFormHelper, RetailEtransferDeclineMoneyFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferDeclineMoneyFormHelper: RetailEtransferDeclineMoneyFormHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailEtransferDeclineMoneyFormHelper);
    this.setServiceCode("ETRANSFERRECEIVEMONEY");
  }
  protected override doPreInit(): void {
    this.setDataService(this.etransferService);
    this.addFormControl('remarks1', '', [Validators.required], [], 'blur', 1, false);
    this.setServiceCode("ETRANSFERRECEIVEMONEY");

  }


  protected override doPostInit(): void {

  }

}

