import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChangeMpinFormHelper, RetailChangeMpinFormState } from './retail-change-mpin-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ChangempinService } from '../changempin-service/changempin.service';
import { Changempin } from '../changempin-service/changempin.model';



@Component({
  selector: 'app-retail-change-mpin-form',
  templateUrl: './retail-change-mpin-form.component.html',
  styleUrls: ['./retail-change-mpin-form.component.scss'],
  providers: [RetailChangeMpinFormHelper]
})

export class RetailChangeMpinFormComponent extends BaseFpxFormComponent<RetailChangeMpinFormHelper, RetailChangeMpinFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChangeMpinFormHelper: RetailChangeMpinFormHelper,
    public changempinService: ChangempinService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailChangeMpinFormHelper);
    this.setServiceCode("RETAILCHANGEMPIN");
  }
  protected override doPreInit(): void {
    this.addFormControl('currentMpin', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('newMpin', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('confirmMpin', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('confirmPINStatus', '', [Validators.required, Validators.min(1), Validators.max(1)], [], 'change');
    this.setDataService(this.changempinService);
  }


  protected override doPostInit(): void {

  }

}
