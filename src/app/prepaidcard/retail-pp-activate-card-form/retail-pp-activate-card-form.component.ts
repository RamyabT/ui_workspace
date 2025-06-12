import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailActivePrepaidCardHelper,retailActivePrepaidCardState} from './retail-pp-activate-card-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PrePaidActivationService } from '../prePaidActivation-service/prePaidActivation.service';
import { PrePaidActivation } from '../prePaidActivation-service/prePaidActivation.model';

 
 
@Component({
 selector: 'app-retail-pp-activate-card-form',
  templateUrl: './retail-pp-activate-card-form.component.html',
  styleUrls: ['./retail-pp-activate-card-form.component.scss'],
  providers : [ retailActivePrepaidCardHelper]
  })

export class retailActivePrepaidCardComponent extends  BaseFpxFormComponent<retailActivePrepaidCardHelper, retailActivePrepaidCardState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailActivePrepaidCardHelper: retailActivePrepaidCardHelper,
    public prePaidActivationService: PrePaidActivationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailActivePrepaidCardHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('expiryYear', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('expiryMonth', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cvv', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.prePaidActivationService);
	this.setServiceCode("RETAILPPACTIVATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
