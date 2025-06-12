import { Component, EventEmitter, Input, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceRequestAttachmentFormHelper, ServiceRequestAttachmentFormState } from './service-request-attachment.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ServicerequestattachmentService } from '../servicerequestattachment-service/servicerequestattachment.service';
import { Servicerequestattachment } from '../servicerequestattachment-service/servicerequestattachment.model';



@Component({
  selector: 'app-service-request-attachment',
  templateUrl: './service-request-attachment.component.html',
  styleUrls: ['./service-request-attachment.component.scss'],
  providers: [ServiceRequestAttachmentFormHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ServiceRequestAttachmentFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => ServiceRequestAttachmentFormComponent)
    }]
})

export class ServiceRequestAttachmentFormComponent extends BaseFpxFormComponent<ServiceRequestAttachmentFormHelper, ServiceRequestAttachmentFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public serviceRequestAttachmentFormHelper: ServiceRequestAttachmentFormHelper,
    public servicerequestattachmentService: ServicerequestattachmentService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, serviceRequestAttachmentFormHelper);
  }
  protected override doPreInit(): void {
    this.setDataService(this.servicerequestattachmentService);
    this.addFormControl('serviceRequestNumber', '', [Validators.required,],
      [
        // this.validatorService.dataAvailabilityCheck(
        //   this.embadedFormMode,
        //   'serviceRequestNumber',
        //   this.servicerequestattachmentService,
        //   this.dataAvailable$
        // ),
      ], 'blur', 0, false);
    this.addFormControl('messageContent', '', [Validators.required,], [], 'blur', 1, false);
    this.addFormControl('servicereqcommentsattachement', '', [], [], 'blur', 1, false);
    this.setServiceCode("servicerequestattachment");

  }


  protected override doPostInit(): void {

  }

}
