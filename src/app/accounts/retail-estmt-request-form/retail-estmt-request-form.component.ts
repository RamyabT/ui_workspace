import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEstmtRequestFormHelper, RetailEstmtRequestFormState } from './retail-estmt-request-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { EstmtrequestService } from '../estmtrequest-service/estmtrequest.service';
import { Estmtrequest } from '../estmtrequest-service/estmtrequest.model';



@Component({
  selector: 'app-retail-estmt-request-form',
  templateUrl: './retail-estmt-request-form.component.html',
  styleUrls: ['./retail-estmt-request-form.component.scss'],
  providers: [RetailEstmtRequestFormHelper]
})

export class RetailEstmtRequestFormComponent extends BaseFpxFormComponent<RetailEstmtRequestFormHelper, RetailEstmtRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEstmtRequestFormHelper: RetailEstmtRequestFormHelper,
    public estmtrequestService: EstmtrequestService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailEstmtRequestFormHelper);
    this.setDataService(this.estmtrequestService);
  }
  protected override doPreInit(): void {
    this.setDataService(this.estmtrequestService);
    this.addFormControl('action', '', [Validators.required,], [], 'change', 1, false, 0);
    this.addFormControl('email', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('termsFlag', '', [Validators.required], [], 'change', 1, false, 0);
    this.setServiceCode("RETAILESTATEMENTREQ");


  }


  protected override doPostInit(): void {

  }

}
