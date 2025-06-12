import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { childDetailsHelper,childDetailsState} from './child-details.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ChildlogService } from '../childlog-service/childlog.service';
import { Childlog } from '../childlog-service/childlog.model';

 
 
@Component({
 selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.scss'],
  providers : [ childDetailsHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => childDetailsComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => childDetailsComponent)
  }]
  })

export class childDetailsComponent extends  BaseFpxFormComponent<childDetailsHelper, childDetailsState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public childDetailsHelper: childDetailsHelper,
    public childlogService: ChildlogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, childDetailsHelper);
    // this.setServiceCode("childlog");  
}
   protected override doPreInit(): void {
  this.setDataService(this.childlogService);
	// this.setServiceCode("childlog");

     this.addFormControl('fullName', '', [Validators.required,], [], 'blur', 1, false);
     this.addFormControl('nickName', '', [], [], 'blur', 1, false);
     this.addFormControl('dob', '', [Validators.required,], [], 'blur', 1, false);
     this.addFormControl('gender', '', [Validators.required,], [], 'blur', 1, false);
     this.addFormControl('relationship', '', [Validators.required,], [], 'blur', 1, false);
     this.addFormControl('profileImage', '', [], [], 'blur', 1, false);
     this.addFormControl('email', '', [Validators.required,], [], 'blur', 1, false);
     this.addFormControl('mobileNumber', '', [Validators.required,], [], 'blur', 1, false);
     this.addFormControl('childreqdocdtl', '', [], [], 'blur', 1, false);

  }
  

  protected override doPostInit(): void {
   
  }
 
}

