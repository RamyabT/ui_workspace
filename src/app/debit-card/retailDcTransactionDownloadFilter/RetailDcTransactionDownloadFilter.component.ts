import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDcTransactionDownloadFilterHelper,RetailDcTransactionDownloadFilterState} from './RetailDcTransactionDownloadFilter.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetaildctransactiondownloadfilterService } from '../retaildctransactiondownloadfilter-service/retaildctransactiondownloadfilter.service';
import { Retaildctransactiondownloadfilter } from '../retaildctransactiondownloadfilter-service/retaildctransactiondownloadfilter.model';

 
 
@Component({
 selector: 'app-RetailDcTransactionDownloadFilter',
  templateUrl: './RetailDcTransactionDownloadFilter.component.html',
  styleUrls: ['./RetailDcTransactionDownloadFilter.component.scss'],
  providers : [ RetailDcTransactionDownloadFilterHelper]
  })

export class RetailDcTransactionDownloadFilterComponent extends  BaseFpxFormComponent<RetailDcTransactionDownloadFilterHelper, RetailDcTransactionDownloadFilterState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDcTransactionDownloadFilterHelper: RetailDcTransactionDownloadFilterHelper,
    public retaildctransactiondownloadfilterService: RetaildctransactiondownloadfilterService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDcTransactionDownloadFilterHelper);
  }
   protected override doPreInit(): void {
    this.addFormControl('transactionRangeType', '',  [ ]    ,[],'change',1,false,0);		
    this.addFormControl('fromDate', '',  [ Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('toDate', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('minAmount', '',  []    ,[],'change',1,false,0);			   		 
    this.addFormControl('maximumAmount', '',  [ ]    ,[],'change',1,false,0);	
    this.addFormControl('downloadFileFormat', '',  [Validators.required ]    ,[],'blur',1,false,0);		   
	this.setDataService(this.retaildctransactiondownloadfilterService);
	this.setServiceCode("RETAILDCTRANSACTIONSUMMARY");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
