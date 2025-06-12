import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailRevokeStopChequeHelper,RetailRevokeStopChequeState} from './retail-revoke-stop-cheque.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { StopchequerevrequestService } from '../stopchequerevrequest-service/stopchequerevrequest.service';
import { Stopchequerevrequest } from '../stopchequerevrequest-service/stopchequerevrequest.model';

 
 
@Component({
 selector: 'app-retail-revoke-stop-cheque',
  templateUrl: './retail-revoke-stop-cheque.component.html',
  styleUrls: ['./retail-revoke-stop-cheque.component.scss'],
  providers : [ RetailRevokeStopChequeHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailRevokeStopChequeComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailRevokeStopChequeComponent)
  }]
  })

export class RetailRevokeStopChequeComponent extends  BaseFpxFormComponent<RetailRevokeStopChequeHelper, RetailRevokeStopChequeState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailRevokeStopChequeHelper: RetailRevokeStopChequeHelper,
    public stopchequerevrequestService: StopchequerevrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailRevokeStopChequeHelper);
  }
   protected override doPreInit(): void {
  this.setDataService(this.stopchequerevrequestService);
  this.addFormControl('inventoryNumber', '',[ ]  ,
    [
      this.validatorService.dataAvailabilityCheck(
        this.embadedFormMode,
        'inventoryNumber',
        this.stopchequerevrequestService,
        this.dataAvailable$
      ),
    ],'blur',0,true);	
      this.addFormControl('relatedReference', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('accountNumber', '',[ ]   ,[],'blur',1,false);				   		 
      this.addFormControl('reason', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('payeeName', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chequeNumber', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('chequeAmount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('stopDate', '',[ ]   ,[],'blur',1,false);			
      // this.addFormControl('revocationType', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('fromChequeNumber', '',[ ]   ,[],'blur',1,false);
      this.addFormControl('toChequeNumber', '',[ ]   ,[],'blur',1,false);	 
      this.addFormControl('currency', '',[ ]   ,[],'blur',1,false);   			   		 
      this.addFormControl('chargesAmount', '',[ ]   ,[],'blur',1,false);	  
      // this.addFormControl('termsFlag', '',[ ]   ,[],'blur',1,false);   
	this.setServiceCode("RETAILSTOPCHEQUEREV");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
