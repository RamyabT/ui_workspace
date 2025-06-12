import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { InvestmentTransactionSummaryFilterHelper, InvestmentTransactionSummaryFilterState } from '../investment-transaction-summary-filter/investment-transaction-summary-filter.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { InvestmenttransactionsummaryService } from '../investmenttransactionsummary-service/investmenttransactionsummary.service';
import { investmenttransactionsummarydownloadfilterHelper, investmenttransactionsummarydownloadfilterState } from './investment-transaction-summary-download-filter.helper';

@Component({
  selector: 'app-investment-transaction-summary-download-filter',
  templateUrl: './investment-transaction-summary-download-filter.component.html',
  styleUrls: ['./investment-transaction-summary-download-filter.component.scss'],
  providers : [ investmenttransactionsummarydownloadfilterHelper]
})
export class InvestmentTransactionSummaryDownloadFilterComponent extends  BaseFpxFormComponent<investmenttransactionsummarydownloadfilterHelper, investmenttransactionsummarydownloadfilterState>  {

  constructor(
     @Optional() controlContainer: ControlContainer,
        formBuilder: FormBuilder,
        private router: Router,
            public investmenttransactionsummarydownloadfilterHelper: investmenttransactionsummarydownloadfilterHelper,
            public investmenttransactionsummaryService: InvestmenttransactionsummaryService,
  ) { super(formBuilder, router,controlContainer,investmenttransactionsummarydownloadfilterHelper );

  }

  protected override doPreInit(): void {
    this.addElement('download');
	this.addElement('view');
  this.addFormControl('rangeType', '',  [Validators.required ]    ,[],'blur',1,false,0);
        this.addFormControl('fromDate', '',[ ]   ,[],'blur',1,false);			   		 
        this.addFormControl('toDate', '',[ ]   ,[],'blur',1,false);	
        this.addFormControl('downloadFileFormat', '',  [Validators.required ]    ,[],'blur',1,false,0);
        this.setServiceCode("RETAILINVESTMENTTRANSUMMARYFILTER");
  }

  protected override doPostInit(): void {
   
  }

}
