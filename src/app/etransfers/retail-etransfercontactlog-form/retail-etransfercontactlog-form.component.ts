import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransfercontactlogFormHelper, RetailEtransfercontactlogFormState } from './retail-etransfercontactlog-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EtransfercontactlogService } from '../etransfercontactlog-service/etransfercontactlog.service';


@Component({
  selector: 'app-retail-etransfercontactlog-form',
  templateUrl: './retail-etransfercontactlog-form.component.html',
  styleUrls: ['./retail-etransfercontactlog-form.component.scss'],
  providers: [RetailEtransfercontactlogFormHelper, EtransfercontactlogService]
})

export class RetailEtransfercontactlogFormComponent extends BaseFpxFormComponent<RetailEtransfercontactlogFormHelper, RetailEtransfercontactlogFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransfercontactlogFormHelper: RetailEtransfercontactlogFormHelper,
    public etransfercontactlogService: EtransfercontactlogService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailEtransfercontactlogFormHelper);
    this.setServiceCode("RETAILETRANSFERMANAGECONTACT");
  }
  protected override doPreInit(): void {
    this.setDataService(this.etransfercontactlogService);
    this.addFormControl('firstName', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('emailId', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('phoneNumber', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('notificationPreference', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('securityQuestion', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('securityAnswer', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('confirmSecurityAnswer', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('beneId', '',  [ ]    ,[],'blur',0,true);
    this.addFormControl('preferredLanguage', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('hiddenField', '', [Validators.required,], [], 'blur', 1, false);
    this.addElement('contactTitle');
    this.addElement('addMobileContact');
    this.setServiceCode("RETAILETRANSFERMANAGECONTACT");

  }


  protected override doPostInit(): void {

  }

}

