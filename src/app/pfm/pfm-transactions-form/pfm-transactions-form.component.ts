import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { PfmTransactionsFormHelper,PfmTransactionsFormState} from './pfm-transactions-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmtransactionService } from '../pfmtransaction-service/pfmtransaction.service';
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';

 
 
@Component({
 selector: 'app-pfm-transactions-form',
  templateUrl: './pfm-transactions-form.component.html',  
  styleUrls: ['./pfm-transactions-form.component.scss'],
  providers : [ PfmTransactionsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PfmTransactionsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => PfmTransactionsFormComponent)
  }]
  })

export class PfmTransactionsFormComponent extends  BaseFpxFormComponent<PfmTransactionsFormHelper, PfmTransactionsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public pfmTransactionsFormHelper: PfmTransactionsFormHelper,
    public pfmtransactionService: PfmtransactionService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, pfmTransactionsFormHelper);
    this.setServiceCode("RETAILPFMTRANCATMAPPING");  
}
   protected override doPreInit(): void {
  this.setDataService(this.pfmtransactionService);
      this.addFormControl('externalReferenceNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentDate', '1',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAmount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactioncategory', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('categoryCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('merchant', '',[ ]   ,[],'blur',1,false);			   		 

  }
  

  protected override doPostInit(): void {
   
  }
 
}

