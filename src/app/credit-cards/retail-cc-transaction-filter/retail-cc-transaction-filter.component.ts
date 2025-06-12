import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 

import { RetailDcTransactionExFilterState, RetailCcTransactionFilterHelper } from './retail-cc-transaction-filter.helper';
import { RetailCcTransactionFilterService } from '../retail-cc-transaction-filter-service/retail-cc-transaction-filter.service';

 
 
@Component({
 selector: 'app-retail-cc-transaction-filter',
  templateUrl: './retail-cc-transaction-filter.component.html',
  styleUrls: ['./retail-cc-transaction-filter.component.scss'],
  providers : [ RetailCcTransactionFilterHelper]
  })

export class RetailCcTransactionFilterComponent extends  BaseFpxFormComponent<RetailCcTransactionFilterHelper, RetailDcTransactionExFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDcTransactionExFilterHelper: RetailCcTransactionFilterHelper,
    public retailcctransactionexfilterService: RetailCcTransactionFilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDcTransactionExFilterHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionRangeType', '',  [ ]    ,[],'change',1,false,0);		
     this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('minAmount', '',  []    ,[],'change',1,false,0);			   		 
     this.addFormControl('maximumAmount', '',  [ ]    ,[],'change',1,false,0);	
     this.addFormControl('cardRefNumber', '',  [ ]    ,[],'blur',1,false,0);			   		 
		   		 
	this.setDataService(this.retailcctransactionexfilterService);
	this.setServiceCode("RETAILCCTRANSACTION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
