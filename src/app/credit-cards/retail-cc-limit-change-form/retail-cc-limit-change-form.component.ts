import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCcLimitChangeFormHelper,RetailCcLimitChangeFormState} from './retail-cc-limit-change-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CclimitchangeService } from '../cclimitchange-service/cclimitchange.service';
import { Cclimitchange } from '../cclimitchange-service/cclimitchange.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-cc-limit-change-form',
  templateUrl: './retail-cc-limit-change-form.component.html',
  styleUrls: ['./retail-cc-limit-change-form.component.scss'],
  providers : [ RetailCcLimitChangeFormHelper]
  })

export class RetailCcLimitChangeFormComponent extends  BaseFpxFormComponent<RetailCcLimitChangeFormHelper, RetailCcLimitChangeFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCcLimitChangeFormHelper: RetailCcLimitChangeFormHelper,
    public cclimitchangeService: CclimitchangeService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailCcLimitChangeFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('cardLimit', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('limitChange', '',  [Validators.required ]    ,[],'blur',1,false,0);		
     this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false,0);	   		 
    //  this.addFormControl('remarks', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('tcFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);	
    //  this.addFormControl('limitChangeFlag', '',  []    ,[],'change',1,false,0);		
     this.addFormControl('increasedLimit', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('decreasedLimit', '',  []    ,[],'blur',1,false,0);		   		 
     this.addFormControl('cardHolderName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardType', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('creditCardNumber', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('maxLimit', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('minLimit', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('chargesAmount', '',  [ ]    ,[],'blur',1,false,0);	
     this.addFormControl('inventoryNumber', '',  []   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.cclimitchangeService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
	this.setDataService(this.cclimitchangeService);
	this.setServiceCode("RETAILCCLIMITCHANGE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
