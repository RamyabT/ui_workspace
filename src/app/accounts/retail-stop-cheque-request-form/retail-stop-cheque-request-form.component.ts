import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailStopChequeRequestFormHelper,RetailStopChequeRequestFormState} from './retail-stop-cheque-request-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { StopchequerequestService } from '../stopchequerequest-service/stopchequerequest.service';
import { Stopchequerequest } from '../stopchequerequest-service/stopchequerequest.model';

 
 
@Component({
 selector: 'app-retail-stop-cheque-request-form',
  templateUrl: './retail-stop-cheque-request-form.component.html',
  styleUrls: ['./retail-stop-cheque-request-form.component.scss'],
  providers : [ RetailStopChequeRequestFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailStopChequeRequestFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailStopChequeRequestFormComponent)
  }]
  })

export class RetailStopChequeRequestFormComponent extends  BaseFpxFormComponent<RetailStopChequeRequestFormHelper, RetailStopChequeRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailStopChequeRequestFormHelper: RetailStopChequeRequestFormHelper,
    public stopchequerequestService: StopchequerequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailStopChequeRequestFormHelper);
  }
  protected readonly otherReason_pattern: any = /^[A-Za-z0-9 ]{3,30}$/;
  protected readonly otherReason_minLength: any = 3;
  protected readonly otherReason_maxLength: any = 30;
  // protected readonly payee_pattern: any = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
  // protected readonly payee_minLength: any = "3";
  // protected readonly payee_maxLength: any = "35";
   protected override doPreInit(): void {
  this.setDataService(this.stopchequerequestService);
      this.addFormControl('inventoryNumber', '',[ ]  ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'inventoryNumber',
		          this.stopchequerequestService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true);			   		 
      this.addFormControl('accountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('stopChequeType', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('chequeNumber', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('fromChequeNumber', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('toChequeNumber', '',[Validators.required, ]   ,[],'change',1,false);		
      this.addFormControl('otherReason', '',[Validators.required,Validators.minLength(this.otherReason_minLength), Validators.maxLength(this.otherReason_maxLength) ]   ,[],'blur',1,false);	   		 
      this.addFormControl('reason', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('payee', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chequeAmount', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('currency', '',[ ]   ,[],'blur',1,false);				   		 
      this.addFormControl('chargesAmount', '',[ ]   ,[],'blur',1,false);	   		 
      this.addFormControl('termsFlag', '',[Validators.required, ]   ,[],'blur',1,false);		
      this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false,0);		   		 
	this.setServiceCode("RETAILSTOPCHEQUE");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
