import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailccCancelformHelper,retailccCancelformState} from './retail-cc-cancel-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcCancelService } from '../ccCancel-service/ccCancel.service';
import { CcCancel } from '../ccCancel-service/ccCancel.model';

 
 
@Component({
 selector: 'app-retail-cc-cancel-form',
  templateUrl: './retail-cc-cancel-form.component.html',
  styleUrls: ['./retail-cc-cancel-form.component.scss'],
  providers : [ retailccCancelformHelper]
  })

export class retailccCancelformComponent extends  BaseFpxFormComponent<retailccCancelformHelper, retailccCancelformState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailccCancelformHelper: retailccCancelformHelper,
    public ccCancelService: CcCancelService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailccCancelformHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('terms', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.ccCancelService);
	 this.setServiceCode("RETAILCCCANCEL");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
