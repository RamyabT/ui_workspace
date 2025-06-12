import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 

import { RetailDcTransactionExFilterState, RetailpcTransactionFilterHelper } from './retail-pc-transaction-filter.helper';
import { RetailpcTransactionFilterService } from '../retail-pc-transaction-filter-service/retail-pc-transaction-filter.service';

 
 
@Component({
 selector: 'app-retail-pc-transaction-filter',
  templateUrl: './retail-pc-transaction-filter.component.html',
  styleUrls: ['./retail-pc-transaction-filter.component.scss'],
  providers : [ RetailpcTransactionFilterHelper]
  })

export class RetailpcTransactionFilterComponent extends  BaseFpxFormComponent<RetailpcTransactionFilterHelper, RetailDcTransactionExFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDcTransactionExFilterHelper: RetailpcTransactionFilterHelper,
    public retailpctransactionexfilterService: RetailpcTransactionFilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDcTransactionExFilterHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionRangeType', '',  [ ]    ,[],'change',1,false,0);		
     this.addFormControl('fromDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('minAmount', '',  []    ,[],'change',1,false,0);		
     this.addFormControl('transactionReference', '',  []    ,[],'change',1,false,0);		   		 
     this.addFormControl('maximumAmount', '',  [ ]    ,[],'change',1,false,0);			   		 
	this.setDataService(this.retailpctransactionexfilterService);
	this.setServiceCode("RETAILCCTRANSACTIONSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
