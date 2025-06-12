import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailupcomingBillSummaryexfilterService } from '../retail-upcoming-bill-summary-filter-service/retail-upcoming-bill-summary-filter.service';
import { RetailupcomingBillSummaryExFilterHelper, RetailupcomingBillSummaryExFilterState } from './retail-upcoming-bill-summary-filter.component.helper';

//import { RetailupcomingBillSummaryExFilterHelper, RetailupcomingBillSummaryExFilterState } from './retail-upcoming-bill-summary-filter.helper';

 
 
@Component({
 selector: 'retail-upcoming-bill-summary-filter',
  templateUrl: './retail-upcoming-bill-summary-filter.component.html',
styleUrls: ['./retail-upcoming-bill-summary-filter.component.scss'],
  providers : [ RetailupcomingBillSummaryExFilterHelper]
  })

export class RetailupcomingBillSummaryExFilterComponent extends  BaseFpxFormComponent<RetailupcomingBillSummaryExFilterHelper, RetailupcomingBillSummaryExFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailupcomingBillSummaryExFilterHelper: RetailupcomingBillSummaryExFilterHelper,
    public retailupcomingBillSummaryexfilterService: RetailupcomingBillSummaryexfilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailupcomingBillSummaryExFilterHelper);
  }
   protected override doPreInit(): void {
  
     this.addFormControl('fromDate', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('billerId', '',  []    ,[],'change',1,false,0);		
     this.addFormControl('billerName', '',  []    ,[],'change',1,false,0);		
    
	this.setDataService(this.retailupcomingBillSummaryexfilterService);
	this.setServiceCode("CORPBILLSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
