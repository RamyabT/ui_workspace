import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { PfmGoalsRequestFormHelper,PfmGoalsRequestFormState} from './pfm-goals-req-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmgoalsreqService } from '../pfmgoalsreq-service/pfmgoalsreq.service';
import { Pfmgoalsreq } from '../pfmgoalsreq-service/pfmgoalsreq.model';

 
 
@Component({
 selector: 'app-pfm-goals-req-form',
  templateUrl: './pfm-goals-req-form.component.html',
  styleUrls: ['./pfm-goals-req-form.component.scss'],
  providers : [ PfmGoalsRequestFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PfmGoalsRequestFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => PfmGoalsRequestFormComponent)
  }]
  })

export class PfmGoalsRequestFormComponent extends  BaseFpxFormComponent<PfmGoalsRequestFormHelper, PfmGoalsRequestFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public pfmGoalsRequestFormHelper: PfmGoalsRequestFormHelper,
    public pfmgoalsreqService: PfmgoalsreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, pfmGoalsRequestFormHelper);
    this.setServiceCode("RETAILPFMGOALSREQ");  
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
      this.addFormControl('mode', '',[ ]   ,[],'blur',1,false);			   		 	   		 
      // this.addFormControl('status', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      // this.addFormControl('accruedAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILPFMGOALSREQ");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

