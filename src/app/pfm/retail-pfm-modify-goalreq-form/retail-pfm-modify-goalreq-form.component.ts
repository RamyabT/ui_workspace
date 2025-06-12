import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPfmModifyGoalReqFormHelper,RetailPfmModifyGoalReqFormState} from './retail-pfm-modify-goalreq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmgoalsreqService } from '../pfmgoalsreq-service/pfmgoalsreq.service';
import { Pfmgoalsreq } from '../pfmgoalsreq-service/pfmgoalsreq.model';

 
 
@Component({
 selector: 'app-retail-pfm-modify-goalreq-form',
  templateUrl: './retail-pfm-modify-goalreq-form.component.html',
  styleUrls: ['./retail-pfm-modify-goalreq-form.component.scss'],
  providers : [ RetailPfmModifyGoalReqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailPfmModifyGoalReqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailPfmModifyGoalReqFormComponent)
  }]
  })

export class RetailPfmModifyGoalReqFormComponent extends  BaseFpxFormComponent<RetailPfmModifyGoalReqFormHelper, RetailPfmModifyGoalReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPfmModifyGoalReqFormHelper: RetailPfmModifyGoalReqFormHelper,
    public pfmgoalsreqService: PfmgoalsreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPfmModifyGoalReqFormHelper);
    this.setServiceCode("RETAILMODIFYPFMGOALSREQ");  
}
   protected override doPreInit(): void {
  this.setDataService(this.pfmgoalsreqService);
  this.addFormControl('goalName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('goalAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('debitAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('advanceDebitAmount', '',[Validators.required, ]   ,[],'blur',1,false);		
  this.addFormControl('startDate', '',[Validators.required, ]   ,[],'blur',1,false);		   		 
  this.addFormControl('debitAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('goalDuration', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('frequency', '',[Validators.required, ]   ,[],'blur',1,false);	
  this.addFormControl('goalInventoryNumber', '',[Validators.required, ]   ,[],'blur',1,false);	

  this.addFormControl('mode', '',[ ]   ,[],'blur',1,false);			   		 	   		 

	this.setServiceCode("RETAILMODIFYPFMGOALSREQ");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

