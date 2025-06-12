import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailInvalidNpssHelper,RetailInvalidNpssState} from './retail-invalidate-npss.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { InvalidatenpssService } from '../invalidatenpss-service/invalidatenpss.service';

 
 
@Component({
 selector: 'app-retail-invalidate-npss',
  templateUrl: './retail-invalidate-npss.component.html',
  styleUrls: ['./retail-invalidate-npss.component.scss'],
  providers : [ RetailInvalidNpssHelper]
  })

export class RetailInvalidNpssComponent extends  BaseFpxFormComponent<RetailInvalidNpssHelper, RetailInvalidNpssState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailInvalidNpssHelper: RetailInvalidNpssHelper,
    public invalidatenpssService: InvalidatenpssService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailInvalidNpssHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.invalidatenpssService);
	this.setServiceCode("RETAILINVALIDATENPSS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
