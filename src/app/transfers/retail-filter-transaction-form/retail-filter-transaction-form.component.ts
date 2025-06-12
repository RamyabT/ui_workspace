import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailFilterTransactionHelper,RetailFilterTransactionState} from './retail-filter-transaction-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CompletedpymntsService } from '../completedpymnts-service/completedpymnts.service';
import { Completedpymnts } from '../completedpymnts-service/completedpymnts.model';

 
 
@Component({
 selector: 'app-retail-filter-transaction-form',
  templateUrl: './retail-filter-transaction-form.component.html',
  styleUrls: ['./retail-filter-transaction-form.component.scss'],
  providers : [ RetailFilterTransactionHelper]
  })

export class RetailFilterTransactionComponent extends  BaseFpxFormComponent<RetailFilterTransactionHelper, RetailFilterTransactionState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailFilterTransactionHelper: RetailFilterTransactionHelper,
    public completedpymntsService: CompletedpymntsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailFilterTransactionHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('transactionPeriod', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('beneficiaryName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);	
    //  this.addFormControl('transType', '',  [Validators.required ]    ,[],'blur',1,false,0);		   		 
     this.addFormControl('fromDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  [Validators.required]    ,[],'blur',1,false,0);			
     this.addFormControl('paymentAmount', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('transferType', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('purpose', '',  []    ,[],'blur',1,false,0);	  
    //  this.addFormControl('beneficiaryBank', '',  []    ,[],'blur',1,false,0);			   		  
	this.setDataService(this.completedpymntsService);
	this.setServiceCode("completedpymnts");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
