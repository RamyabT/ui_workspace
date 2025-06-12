import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRPContractInfoHelper, RetailRPContractInfoState } from './retail-rp-contract-info-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RpcontractinfoService } from '../rpcontractinfo-service/rpcontractinfo.service';
import { Rpcontractinfo } from '../rpcontractinfo-service/rpcontractinfo.model';
import { AppConfigService } from '@dep/services';



@Component({
  selector: 'app-retail-rp-contract-info-form',
  templateUrl: './retail-rp-contract-info-form.component.html',
  styleUrls: ['./retail-rp-contract-info-form.component.scss'],
  providers: [RetailRPContractInfoHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailRPContractInfoComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailRPContractInfoComponent)
    }]
})

export class RetailRPContractInfoComponent extends BaseFpxFormComponent<RetailRPContractInfoHelper, RetailRPContractInfoState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public RetailRPContractInfoHelper: RetailRPContractInfoHelper,
    public rpcontractinfoService: RpcontractinfoService,
    private validatorService: ValidatorService,
    private _appConfig: AppConfigService,

  ) {
    super(formBuilder, router, controlContainer, RetailRPContractInfoHelper);
    this.setServiceCode("RETAILRPCONTRACTINFO");
  }
  protected override doPreInit(): void {
    this.setDataService(this.rpcontractinfoService);
    this.setTabConfiguration("transparent", true, true, false, false, 'tabGroup', '');

    this.addTab('Holder Info', '', false, false, false, 'holderInfoTab', 'tabGroup');
    this.addTab('Product Info', '', false, false, false, 'productInfoTab', 'tabGroup');
    this.addTab('Beneficiary Info', '', false, false, false, 'beneficiaryInfoTab', 'tabGroup');
    this.addTab('Trust Declaration', '', false, false, false, 'trustDeclarationTab', 'tabGroup');

    this.setAccordionConfig(false, 'contactInfoAccordionConfig', 'holderInfoTab');
    this.setAccordionConfig(false, 'addressInfoAccordionConfig', 'holderInfoTab');

    this.addAccordion('Contact Information', true, false, 'contactInfoAccordion', 'contactInfoAccordionConfig');
    this.addAccordion('Address Information', false, false, 'addressInfoAccordion', 'addressInfoAccordionConfig');

    this.addFormControl('firstName', '', [Validators.required,], [], 'blur', 1, false, 'contactInfoAccordion');
    this.addFormControl('lastName', '', [Validators.required,], [], 'blur', 1, false, 'contactInfoAccordion');
    this.addFormControl('dob', '', [Validators.required,], [], 'blur', 1, false, 'contactInfoAccordion');
    this.addFormControl('emailAddress', '', [Validators.required,], [], 'blur', 1, false, 'contactInfoAccordion');
    this.addFormControl('mobileNumber', '', [Validators.required,], [], 'blur', 1, false, 'contactInfoAccordion');
    
    this.addFormControl('rpaddress', '', [], [], 'blur', 1, false, 'addressInfoAccordion');

    this.addFormControl('rpContactMethod', '', [Validators.required,], [], 'blur', 1, false, 'holderInfoTab');
    this.addFormControl('sin', '', [Validators.required, Validators.pattern(/^\d{6,6}$/)], [], 'blur', 1, false, 'holderInfoTab');
    this.addFormControl('sinUsageConsent', '', [Validators.required,], [], 'change', 1, false, 'holderInfoTab');

    this.addFormControl('rpaccount', '', [], [], 'blur', 1, false, 'productInfoTab');
    this.addFormControl('rpsuccessor', '', [], [], 'blur', 1, false, 'beneficiaryInfoTab');
    this.addFormControl('trustAgreedFlag', '', [Validators.required,], [], 'blur', 1, false, 'trustDeclarationTab');
  }

  protected override doPostInit(): void {

  }

}

