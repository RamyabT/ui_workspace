import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCreateServiceRequestFormHelper, RetailCreateServiceRequestFormState } from './retail-create-service-request-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ServicerequestadhocService } from '../servicerequestadhoc-service/servicerequestadhoc.service';
import { Servicerequestadhoc } from '../servicerequestadhoc-service/servicerequestadhoc.model';
import { DeviceDetectorService } from '@dep/core';



@Component({
  selector: 'app-retail-create-service-request-form',
  templateUrl: './retail-create-service-request-form.component.html',
  styleUrls: ['./retail-create-service-request-form.component.scss'],
  providers: [RetailCreateServiceRequestFormHelper]
})

export class RetailCreateServiceRequestFormComponent extends BaseFpxFormComponent<RetailCreateServiceRequestFormHelper, RetailCreateServiceRequestFormState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCreateServiceRequestFormHelper: RetailCreateServiceRequestFormHelper,
    public servicerequestadhocService: ServicerequestadhocService,
    private validatorService: ValidatorService,
    protected _device: DeviceDetectorService,

  ) {
    super(formBuilder, router, controlContainer, retailCreateServiceRequestFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('requestTypes', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('Category', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('SubCategory', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('subject', '', [], [], 'change', 1, false, 0);
    this.addFormControl('message', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('remarks', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('servicerequestadhocdtls', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('responseRequired', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('contactMethod', '', [Validators.required,], [], 'change', 1, false);
    this.addFormControl('mobileNumber', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('returnCallTiming', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('email', '', [Validators.required,], [], 'blur', 1, false);
    // this.addFormControl('termsFlag', '', [], [], 'blur', 1, false);
    this.addFormControl('inventoryNumber', '', [], [], 'blur', 1, true, 0);


    this.setDataService(this.servicerequestadhocService);
    this.setServiceCode("RETAILSERVICEADHOCREQ");

  }


  protected override doPostInit(): void {

  }

}
