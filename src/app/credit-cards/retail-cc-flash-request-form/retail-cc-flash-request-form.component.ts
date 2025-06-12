import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCCFlashRequestFormHelper,RetailCCFlashRequestFormState} from './retail-cc-flash-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CcflashrequestService } from '../ccflashrequest-service/ccflashrequest.service';
import { Ccflashrequest } from '../ccflashrequest-service/ccflashrequest.model';

 
 
@Component({
 selector: 'app-retail-cc-flash-request-form',
  templateUrl: './retail-cc-flash-request-form.component.html',
  styleUrls: ['./retail-cc-flash-request-form.component.scss'],
  providers : [ RetailCCFlashRequestFormHelper]
  })

export class RetailCCFlashRequestFormComponent extends  BaseFpxFormComponent<RetailCCFlashRequestFormHelper, RetailCCFlashRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCCFlashRequestFormHelper: RetailCCFlashRequestFormHelper,
    public ccflashrequestService: CcflashrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCCFlashRequestFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'cardRefNumber',
		          this.ccflashrequestService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('creditCardNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cvv', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('validThru', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('validFrom', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cardHolderName', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.addElement('tap');
	this.setDataService(this.ccflashrequestService);
	this.setServiceCode("RETAILCCFLASH");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
