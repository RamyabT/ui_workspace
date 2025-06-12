import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailpctransactionexfilterService } from '../retailpctransactionexfilter-service/retailpctransactionexfilter.service';
import { RetailPcTransactionExFilterHelper,RetailPcTransactionExFilterState} from './retail-pc-transaction-ex-filter.helper';

//import { Retailpctransactionexfilter } from '../retailpctransactionexfilter-service/retailpctransactionexfilter.model';

 
 
@Component({
 selector: 'app-retail-pc-transaction-ex-filter',
  templateUrl: './retail-pc-transaction-ex-filter.component.html',
  styleUrls: ['./retail-pc-transaction-ex-filter.component.scss'],
  providers : [ RetailPcTransactionExFilterHelper]
  })

export class RetailPcTransactionExFilterComponent extends  BaseFpxFormComponent<RetailPcTransactionExFilterHelper, RetailPcTransactionExFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPcTransactionExFilterHelper: RetailPcTransactionExFilterHelper,
    public retailpctransactionexfilterService: RetailpctransactionexfilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPcTransactionExFilterHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('fromDate', '1',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '1',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('minAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('maximumAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.retailpctransactionexfilterService);
	this.setServiceCode("RETAILPCTRANSACTION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
