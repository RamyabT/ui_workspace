import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRpExistingContractFormHelper, RetailRpExistingContractFormState } from './retail-rp-existing-contract-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RpcontractinfoService } from '../rpcontractinfo-service/rpcontractinfo.service';
import { Rpcontractinfo } from '../rpcontractinfo-service/rpcontractinfo.model';
import { AppConfigService } from '@dep/services';



@Component({
  selector: 'app-retail-rp-existing-contract-form',
  templateUrl: './retail-rp-existing-contract-form.component.html',
  styleUrls: ['./retail-rp-existing-contract-form.component.scss'],
  providers: [RetailRpExistingContractFormHelper]
})

export class RetailRpExistingContractFormComponent extends BaseFpxFormComponent<RetailRpExistingContractFormHelper, RetailRpExistingContractFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRpExistingContractFormHelper: RetailRpExistingContractFormHelper,
    public rpcontractinfoService: RpcontractinfoService,

  ) {
    super(formBuilder, router, controlContainer, retailRpExistingContractFormHelper);
  }
  protected override doPreInit(): void {
    this.setDataService(this.rpcontractinfoService);
    this.addFormControl('planContract', '', [Validators.required,], [], 'blur', 1, false);
    // this.addFormControl('rpaccount', '', [Validators.required,], [], 'blur', 1, false);
    this.addElement('contractDetailsGroup', '');
    
    this.addFormControl('intendedUse', '', [Validators.required,], [], 'blur', 1, false,);
    this.addFormControl('depositAmount', '', [Validators.required,], [], 'blur', 1, false,);
    this.addFormControl('fromAccount', '', [Validators.required,], [], 'blur', 1, false,);
    this.addFormControl('accountUsedBy', '', [Validators.required,], [], 'blur', 1, false,);

    this.addFormControl('usResident', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('addCountryOfTax', '', [], [], 'change', 1, false,);

    this.addFormControl('serviceCodeValue', '', [Validators.required, ], [], 'change', 1, false,);
    this.addFormControl('segmentId', '', [Validators.required, ], [], 'change', 1, false,);

    this.setServiceCode("RETAILRPEXISTINGCONTRACTINFO");
  }

}

