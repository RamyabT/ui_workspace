import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailTrackGoalsFormHelper,RetailTrackGoalsFormState} from './pfm-track-goals-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmgoalsService } from '../pfmgoals-service/pfmgoals.service';
import { Pfmgoals } from '../pfmgoals-service/pfmgoals.model';

 
 
@Component({
 selector: 'app-pfm-track-goals-form',
  templateUrl: './pfm-track-goals-form.component.html',
  styleUrls: ['./pfm-track-goals-form.component.scss'],
  providers : [ RetailTrackGoalsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailTrackGoalsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailTrackGoalsFormComponent)
  }]
  })

export class RetailTrackGoalsFormComponent extends  BaseFpxFormComponent<RetailTrackGoalsFormHelper, RetailTrackGoalsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailTrackGoalsFormHelper: RetailTrackGoalsFormHelper,
    public pfmgoalsService: PfmgoalsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailTrackGoalsFormHelper);
    this.setServiceCode("RETAILMODIFYPFMGOALSREQ");  
}
   protected override doPreInit(): void {
  this.setDataService(this.pfmgoalsService);
  this.addFormControl('goalName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('goalSegments', '',[ ]   ,[],'change',1,false);		
  this.addFormControl('goalsGrid', '',[ ]   ,[],'blur',1,false);				   		 
  this.addFormControl('debitAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('advanceDebitAmount', '',[Validators.required, ]   ,[],'blur',1,false);		
  this.addFormControl('goalInventoryNumber', '',[Validators.required, ]   ,[],'blur',1,false);		   		 
  this.addFormControl('debitAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('goalDuration', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
  this.addFormControl('frequency', '',[Validators.required, ]   ,[],'blur',1,false);		
  this.addFormControl('mode', '',[ ]   ,[],'blur',1,false);			   		 	   		
	this.setServiceCode("RETAILMODIFYPFMGOALSREQ");
  }
  

  protected override doPostInit(): void {
   
  }
 
}

