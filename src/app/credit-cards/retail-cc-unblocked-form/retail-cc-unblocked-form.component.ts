import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailccunblockedHelper,retailccunblockedState} from './retail-cc-unblocked-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcunblockedService } from '../ccunblocked-service/ccunblocked.service';
import { Ccunblocked } from '../ccunblocked-service/ccunblocked.model';

 
 
@Component({
 selector: 'app-retail-cc-unblocked-form',
  templateUrl: './retail-cc-unblocked-form.component.html',
  styleUrls: ['./retail-cc-unblocked-form.component.scss'],
  providers : [ retailccunblockedHelper]
  })

export class retailccunblockedComponent extends  BaseFpxFormComponent<retailccunblockedHelper, retailccunblockedState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailccunblockedHelper: retailccunblockedHelper,
    public ccunblockedService: CcunblockedService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailccunblockedHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('blockReason', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('otherReason', '',  []    ,[],'blur',1,false,0);	   		 
     this.addFormControl('unblockReason', '',  [Validators.required,Validators.maxLength(100) ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('unBlockOtherReason', '',  [Validators.required,Validators.maxLength(100) ]    ,[],'blur',1,false,0);
     this.addFormControl('remarks', '',  [Validators.maxLength(150)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.ccunblockedService);
	this.setServiceCode("RETAILCCUNBLOCK");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
