import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailCcTransactionDownloadFilterHelper,RetailCcTransactionDownloadFilterState} from './retail-cc-transaction-download-filter.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailcctransactiondownloadfilterService } from '../retail-pc-transaction-download-filter-service/retail-pc-transaction-download-filter.service';
import { Retaildctransactiondownloadfilter } from '../retail-pc-transaction-download-filter-service/retail-pc-transaction-download-filter.model';

 
 
@Component({
 selector: 'app-retail-cc-transaction-download-filter',
  templateUrl: './retail-cc-transaction-download-filter.component.html',
  styleUrls: ['./retail-cc-transaction-download-filter.component.scss'],
  providers : [ RetailCcTransactionDownloadFilterHelper]
  })

export class RetailCcTransactionDownloadFilterComponent extends  BaseFpxFormComponent<RetailCcTransactionDownloadFilterHelper, RetailCcTransactionDownloadFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailCcTransactionDownloadFilterHelper: RetailCcTransactionDownloadFilterHelper,
    public retailcctransactiondownloadfilterService: RetailcctransactiondownloadfilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailCcTransactionDownloadFilterHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionRangeType', '',  [ ]    ,[],'change',1,false,0);		
    this.addFormControl('fromDate', '',  [ Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('toDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('minAmount', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('maximumAmount', '',  [ ]    ,[],'blur',1,false,0);	
    this.addFormControl('downloadFileFormat', '',  [Validators.required ]    ,[],'blur',1,false,0);		   
	this.setDataService(this.retailcctransactiondownloadfilterService);
	this.setServiceCode("RETAILDCTRANSACTIONSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
