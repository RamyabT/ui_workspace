import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { FatcaConfirmationHelper,FatcaConfirmationState} from './fatca-confirmation-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { FatcaConfirmationService } from '../fatcaConfirmation-service/fatcaConfirmation.service';
import { FatcaConfirmation } from '../fatcaConfirmation-service/fatcaConfirmation.model';

 
 
@Component({
 selector: 'app-fatca-confirmation-form',
  templateUrl: './fatca-confirmation-form.component.html',
  styleUrls: ['./fatca-confirmation-form.component.scss'],
  providers : [ FatcaConfirmationHelper]
  })

export class FatcaConfirmationComponent extends  BaseFpxFormComponent<FatcaConfirmationHelper, FatcaConfirmationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public fatcaConfirmationHelper: FatcaConfirmationHelper,
    public fatcaConfirmationService: FatcaConfirmationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, fatcaConfirmationHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('selfdeclarationflag', '0',  [Validators.required ]    ,[],'change',1,false,0);			   		 
	this.setDataService(this.fatcaConfirmationService);
	this.setServiceCode("RETAILCOBFATCACONFIRMATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
