import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailManageAlertsFormHelper, RetailManageAlertsFormState } from './retail-manage-alerts-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { UseralertcfgService } from '../useralertcfg-service/useralertcfg.service';
import { Useralertcfg } from '../useralertcfg-service/useralertcfg.model';



@Component({
  selector: 'app-retail-manage-alerts-form',
  templateUrl: './retail-manage-alerts-form.component.html',
  styleUrls: ['./retail-manage-alerts-form.component.scss'],
  providers: [RetailManageAlertsFormHelper]
})

export class RetailManageAlertsFormComponent extends BaseFpxFormComponent<RetailManageAlertsFormHelper, RetailManageAlertsFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageAlertsFormHelper: RetailManageAlertsFormHelper,
    public useralertcfgService: UseralertcfgService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageAlertsFormHelper);
  }
  protected override doPreInit(): void {
    this.setDataService(this.useralertcfgService);
    this.setServiceCode("RETAILMANAGEALERTS");

  }


  protected override doPostInit(): void {
    this.addElement('manageUserAlert');

  }

}
