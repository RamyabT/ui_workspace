import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { RetailEtransferDeclineFulfillRequestMoneyFormHelper, RetailEtransferDeclineFulfillRequestMoneyFormState } from './retail-etransfer-decline-fulfill-request-money-form.helper';
//import { RetailEtransferDeclineMoneyFormHelper, RetailEtransferDeclineMoneyFormState } from './retail-etransfer-decline-money-form.helper';



@Component({
  selector: 'app-retail-etransfer-decline-fulfill-request-money-form',
  templateUrl: './retail-etransfer-decline-fulfill-request-money-form.component.html',
  styleUrls: ['./retail-etransfer-decline-fulfill-request-money-form.component.scss'],
  providers: [RetailEtransferDeclineFulfillRequestMoneyFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailEtransferDeclineFulfillRequestMoneyFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailEtransferDeclineFulfillRequestMoneyFormComponent)
    }]
})

export class RetailEtransferDeclineFulfillRequestMoneyFormComponent extends BaseFpxFormComponent<RetailEtransferDeclineFulfillRequestMoneyFormHelper, RetailEtransferDeclineFulfillRequestMoneyFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferDeclineMoneyFormHelper: RetailEtransferDeclineFulfillRequestMoneyFormHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailEtransferDeclineMoneyFormHelper);
    this.setServiceCode("ETRFDCLFULFILLREQUESTMONEY");
  }
  protected override doPreInit(): void {
    this.setDataService(this.etransferService);
    this.addFormControl('remarks1', '', [Validators.required], [], 'blur', 1, false);
    this.addFormControl('remarks2', '', [], [], 'blur', 1, false);
    this.setServiceCode("ETRFDCLFULFILLREQUESTMONEY");

  }


  protected override doPostInit(): void {

  }

}

