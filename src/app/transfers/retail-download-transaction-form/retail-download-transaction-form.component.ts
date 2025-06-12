import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailDownloadTransactionFormHelper,retailDownloadTransactionFormState} from './retail-download-transaction-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CompletedpymntsService } from '../completedpymnts-service/completedpymnts.service';
import { Completedpymnts } from '../completedpymnts-service/completedpymnts.model';

 
 
@Component({
 selector: 'app-retail-download-transaction-form',
  templateUrl: './retail-download-transaction-form.component.html',
  styleUrls: ['./retail-download-transaction-form.component.scss'],
  providers : [ retailDownloadTransactionFormHelper]
  })

export class retailDownloadTransactionFormComponent extends  BaseFpxFormComponent<retailDownloadTransactionFormHelper, retailDownloadTransactionFormState>  {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDownloadTransactionFormHelper: retailDownloadTransactionFormHelper,
    public completedpymntsService: CompletedpymntsService
    
  ) {
    super(formBuilder, router,controlContainer, retailDownloadTransactionFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('transactionPeriod', '',  [Validators.required ]    ,[],'blur',1,false,0);	
    //  this.addFormControl('transType', '',  [Validators.required ]    ,[],'blur',1,false,0);		   		 
     this.addFormControl('fromDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('beneficiaryName', '',  []    ,[],'blur',1,false,0);			   		 
    //  this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);	
    //  this.addFormControl('beneficiaryBank', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('paymentAmount', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('transferType', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('purpose', '',  []    ,[],'blur',1,false,0);	 
    //  this.addFormControl('downloadFileFormat', '1',  [Validators.required ]    ,[],'blur',1,false,0);		 
    this.addFormControl('fileFormat', '1',  [Validators.required]    ,[],'change',1,false,0);  		 
	  this.setDataService(this.completedpymntsService);
	  this.setServiceCode("completedpymnts");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
