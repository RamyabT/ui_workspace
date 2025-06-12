import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferautodepositlogFormHelper, RetailEtransferautodepositlogFormState } from './retail-etransferautodepositlog-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EtransferautodepositlogService } from '../etransferautodepositlog-service/etransferautodepositlog.service';
import { Etransferautodepositlog } from '../etransferautodepositlog-service/etransferautodepositlog.model';



@Component({
  selector: 'app-retail-etransferautodepositlog-form',
  templateUrl: './retail-etransferautodepositlog-form.component.html',
  styleUrls: ['./retail-etransferautodepositlog-form.component.scss'],
  providers: [RetailEtransferautodepositlogFormHelper]
})

export class RetailEtransferautodepositlogFormComponent extends BaseFpxFormComponent<RetailEtransferautodepositlogFormHelper, RetailEtransferautodepositlogFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferautodepositlogFormHelper: RetailEtransferautodepositlogFormHelper,
    public etransferautodepositlogService: EtransferautodepositlogService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailEtransferautodepositlogFormHelper);
    this.setServiceCode("RETAILETRANSFERAUTODEPOSIT");
  }
  protected override doPreInit(): void {
    this.setDataService(this.etransferautodepositlogService);	
    this.addFormControl('ntfnType', '', [Validators.required,], [], 'change', 1, false);	   		 
    this.addFormControl('mobileNumber', '',[Validators.required,]   ,[],'blur',1,false);	
    this.addFormControl('depositAccount', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('emailID', '', [Validators.required,], [], 'blur', 0, false);
    this.addFormControl('termsFlag', '', [], [], 'blur', 0, false);
    this.addElement('interac');
    this.setServiceCode("RETAILETRANSFERAUTODEPOSIT");

  }


  protected override doPostInit(): void {

  }

}

