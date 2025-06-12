import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPcTransactionDownloadFilterHelper,RetailPcTransactionDownloadFilterState} from './retail-pc-transaction-download-filter.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailPctransactiondownloadfilterService } from '../retail-pc-transaction-download-filter-service/retail-pc-transaction-download-filter.service';

 
 
@Component({
 selector: 'app-retail-pc-transaction-download-filter',
  templateUrl: './retail-pc-transaction-download-filter.component.html',
  styleUrls: ['./retail-pc-transaction-download-filter.component.scss'],
  providers : [ RetailPcTransactionDownloadFilterHelper]
  })

export class RetailPcTransactionDownloadFilterComponent extends  BaseFpxFormComponent<RetailPcTransactionDownloadFilterHelper, RetailPcTransactionDownloadFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPcTransactionDownloadFilterHelper: RetailPcTransactionDownloadFilterHelper,
    public retailPctransactiondownloadfilterService: RetailPctransactiondownloadfilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailPcTransactionDownloadFilterHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionRangeType', '',  [ ]    ,[],'change',1,false,0);		
    this.addFormControl('fromDate', '',  [ Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('toDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('minAmount', '',  []    ,[],'blur',1,false,0);			   		 
    this.addFormControl('maximumAmount', '',  [ ]    ,[],'blur',1,false,0);	
    this.addFormControl('downloadFileFormat', '',  [Validators.required ]    ,[],'blur',1,false,0);		   
    this.addFormControl('transactionReference', '',  []    ,[],'change',1,false,0);	
	this.setDataService(this.retailPctransactiondownloadfilterService);
	this.setServiceCode("RETAILDCTRANSACTIONSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
