import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailLoanModificationHelper,RetailLoanModificationState} from './retail-loan-modification.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { LoanmodificationreqService } from '../loanmodificationreq-service/loanmodificationreq.service';
import { Loanmodificationreq } from '../loanmodificationreq-service/loanmodificationreq.model';

 
 
@Component({
 selector: 'app-retail-loan-modification',
  templateUrl: './retail-loan-modification.component.html',
  styleUrls: ['./retail-loan-modification.component.scss'],
  providers : [ RetailLoanModificationHelper]
  })

export class RetailLoanModificationComponent extends  BaseFpxFormComponent<RetailLoanModificationHelper, RetailLoanModificationState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoanModificationHelper: RetailLoanModificationHelper,
    public loanmodificationreqService: LoanmodificationreqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailLoanModificationHelper);
  }
  protected readonly remarks_minlength: any = 1;
  protected readonly remarks_maxlength: any = 150;
   protected override doPreInit(): void {
    this.addFormControl('inventoryNumber', '',  []    ,[],'blur',0,true,0);		
     this.addFormControl('loanAccountNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('loanNoOfInstallments', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		   		 			   		 
     this.addFormControl('currentInstDate', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('remarks', '',  []   ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('purposeOfDeferment', '',  [Validators.required]    ,[],'change',1,false,0);  
    this.addFormControl('otherReason', '',  [Validators.required,Validators.minLength(this.remarks_minlength), Validators.maxLength(this.remarks_maxlength)]    ,[],'blur',1,false,0); 		 
    this.addElement('loanDetails');		   		 

	this.setDataService(this.loanmodificationreqService);
	this.setServiceCode("RETAILLOANMODIFICATION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
