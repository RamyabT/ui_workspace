import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailManageBeneFormHelper, RetailManageBeneFormState } from './retail-manage-bene-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { BeneficiariesService } from '../beneficiaries-service/beneficiaries.service';
import { Beneficiaries } from '../beneficiaries-service/beneficiaries.model';



@Component({
  selector: 'app-retail-manage-bene-form',
  templateUrl: './retail-manage-bene-form.component.html',
  styleUrls: ['./retail-manage-bene-form.component.scss'],
  providers: [RetailManageBeneFormHelper]
})

export class RetailManageBeneFormComponent extends BaseFpxFormComponent<RetailManageBeneFormHelper, RetailManageBeneFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageBeneFormHelper: RetailManageBeneFormHelper,
    public beneficiariesService: BeneficiariesService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageBeneFormHelper);
    this.setServiceCode("RETAILMANAGEBENE");
  }
  
  protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('beneList');
    this.setDataService(this.beneficiariesService);
  }


  protected override doPostInit(): void {

  }

}
