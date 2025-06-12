import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentTransactionSummaryFilterHelper,InvestmentTransactionSummaryFilterState} from './investment-transaction-summary-filter.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { InvestmenttransactionsummaryService } from '../investmenttransactionsummary-service/investmenttransactionsummary.service';
import { Investmenttransactionsummary } from '../investmenttransactionsummary-service/investmenttransactionsummary.model';

 
 
@Component({
 selector: 'app-investment-transaction-summary-filter',
  templateUrl: './investment-transaction-summary-filter.component.html',
  styleUrls: ['./investment-transaction-summary-filter.component.scss'],
  providers : [ InvestmentTransactionSummaryFilterHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => InvestmentTransactionSummaryFilterComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => InvestmentTransactionSummaryFilterComponent)
  }]
  })

export class InvestmentTransactionSummaryFilterComponent extends  BaseFpxFormComponent<InvestmentTransactionSummaryFilterHelper, InvestmentTransactionSummaryFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public investmentTransactionSummaryFilterHelper: InvestmentTransactionSummaryFilterHelper,
    public investmenttransactionsummaryService: InvestmenttransactionsummaryService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, investmentTransactionSummaryFilterHelper);
    this.setServiceCode("RETAILINVESTMENTTRANSUMMARYFILTER");  
}
   protected override doPreInit(): void {
  this.setDataService(this.investmenttransactionsummaryService);
  this.addFormControl('rangeType', '',  [Validators.required ]    ,[],'blur',1,false,0);
      this.addFormControl('fromDate', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('toDate', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('productCode', '',[ ]   ,[],'blur',1,false);	
      this.addElement('view');		   		 
	this.setServiceCode("RETAILINVESTMENTTRANSUMMARYFILTER");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

