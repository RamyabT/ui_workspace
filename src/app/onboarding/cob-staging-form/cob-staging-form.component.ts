import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { COBStagingFormHelper,COBStagingFormState} from './cob-staging-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ResumesuccessService } from '../resumesuccess-service/resumesuccess.service';
import { Resumesuccess } from '../resumesuccess-service/resumesuccess.model';

 
 
@Component({
 selector: 'app-cob-staging-form',
  templateUrl: './cob-staging-form.component.html',
  styleUrls: ['./cob-staging-form.component.scss'],
  providers : [ COBStagingFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => COBStagingFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => COBStagingFormComponent)
  }]
  })

export class COBStagingFormComponent extends  BaseFpxFormComponent<COBStagingFormHelper, COBStagingFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBStagingFormHelper: COBStagingFormHelper,
    public resumesuccessService: ResumesuccessService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cOBStagingFormHelper);
    this.setServiceCode("COBSTAGING");  
}
   protected override doPreInit(): void {
  this.setDataService(this.resumesuccessService);
	this.setServiceCode("COBSTAGING");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

