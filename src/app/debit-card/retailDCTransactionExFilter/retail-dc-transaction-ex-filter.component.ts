import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetaildctransactionexfilterService } from '../retaildctransactionexfilter-service/retaildctransactionexfilter.service';

import { RetailDcTransactionExFilterHelper, RetailDcTransactionExFilterState } from './retail-dc-transaction-ex-filter.helper';

 
 
@Component({
 selector: 'app-retail-dc-transaction-ex-filter',
  templateUrl: './retail-dc-transaction-ex-filter.component.html',
  styleUrls: ['./retail-dc-transaction-ex-filter.component.scss'],
  providers : [ RetailDcTransactionExFilterHelper]
  })

export class RetailDcTransactionExFilterComponent extends  BaseFpxFormComponent<RetailDcTransactionExFilterHelper, RetailDcTransactionExFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDcTransactionExFilterHelper: RetailDcTransactionExFilterHelper,
    public retaildctransactionexfilterService: RetaildctransactionexfilterService,
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
	this.setDataService(this.retaildctransactionexfilterService);
	this.setServiceCode("RETAILDCTRANSACTIONSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
