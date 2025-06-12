import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCcstatementFormHelper,RetailCcstatementFormState} from './retail-ccstatement-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcstatementService } from '../ccstatement-service/ccstatement.service';
import { Ccstatement } from '../ccstatement-service/ccstatement.model';

 
 
@Component({
 selector: 'app-retail-ccstatement-form',
  templateUrl: './retail-ccstatement-form.component.html',
  styleUrls: ['./retail-ccstatement-form.component.scss'],
  providers : [ RetailCcstatementFormHelper]
  })

export class RetailCcstatementFormComponent extends  BaseFpxFormComponent<RetailCcstatementFormHelper, RetailCcstatementFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCcstatementFormHelper: RetailCcstatementFormHelper,
    public ccstatementService: CcstatementService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCcstatementFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'cardRefNumber',
		          this.ccstatementService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionsRange', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
	this.addElement('ccstatementdetail'); 
	this.addElement('reset');
	this.addElement('submit');
	this.setDataService(this.ccstatementService);
	this.setServiceCode("RETAILCCSTATEMENT");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
