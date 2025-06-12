import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { telephonenumberformHelper,telephonenumberformState} from './telephone-number-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { TelephonenumberService } from '../telephonenumber-service/telephonenumber.service';
import { Telephonenumber } from '../telephonenumber-service/telephonenumber.model';

 
 
@Component({
 selector: 'app-telephone-number-form',
  templateUrl: './telephone-number-form.component.html',
  styleUrls: ['./telephone-number-form.component.scss'],
  providers : [ telephonenumberformHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => telephonenumberformComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => telephonenumberformComponent)
  }]
  })

export class telephonenumberformComponent extends  BaseFpxFormComponent<telephonenumberformHelper, telephonenumberformState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public telephonenumberformHelper: telephonenumberformHelper,
    public telephonenumberService: TelephonenumberService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, telephonenumberformHelper);
    this.setServiceCode("telephonenumberform");  
}
   protected override doPreInit(): void {
  this.setDataService(this.telephonenumberService);
      this.addFormControl('iSOCode', '',[]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'iSOCode',
		          this.telephonenumberService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('landlineNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('extensionNumber', '',[]   ,[],'blur',1,false);			   		 
	this.setServiceCode("telephonenumberform");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

