import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailDcTransactionDtlsFormHelper,RetailDcTransactionDtlsFormState} from './retail-dc-transaction-dtls-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DctransactiondtlsService } from '../dctransactiondtls-service/dctransactiondtls.service';
import { Dctransactiondtls } from '../dctransactiondtls-service/dctransactiondtls.model';

 
 
@Component({
 selector: 'app-retail-dc-transaction-dtls-form',
  templateUrl: './retail-dc-transaction-dtls-form.component.html',
  styleUrls: ['./retail-dc-transaction-dtls-form.component.scss'],
  providers : [ RetailDcTransactionDtlsFormHelper]
  })

export class RetailDcTransactionDtlsFormComponent extends  BaseFpxFormComponent<RetailDcTransactionDtlsFormHelper, RetailDcTransactionDtlsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDcTransactionDtlsFormHelper: RetailDcTransactionDtlsFormHelper,
    public dctransactiondtlsService: DctransactiondtlsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailDcTransactionDtlsFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('transactionReference', '',  [Validators.required ]   ,
		      [
		        this.validatorService.dataAvailabilityCheck(
		          this.embadedFormMode,
		          'transactionReference',
		          this.dctransactiondtlsService,
		          this.dataAvailable$
		        ),
		      ],'blur',0,true,0);			   		 
     this.addFormControl('valueDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionDate', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionDescription', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transType', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('balance', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.dctransactiondtlsService);
	this.setServiceCode("RETAILDCTRANSACTIONDTLS");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
