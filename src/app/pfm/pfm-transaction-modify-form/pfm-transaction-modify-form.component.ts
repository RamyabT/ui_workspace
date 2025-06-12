import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { PfmTransactionModifyFormHelper,PfmTransactionModifyFormState} from './pfm-transaction-modify-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmtransactionService } from '../pfmtransaction-service/pfmtransaction.service';
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';

 
 
@Component({
 selector: 'app-pfm-transaction-modify-form',
  templateUrl: './pfm-transaction-modify-form.component.html',
  styleUrls: ['./pfm-transaction-modify-form.component.scss'],
  providers : [ PfmTransactionModifyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PfmTransactionModifyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => PfmTransactionModifyFormComponent)
  }]
  })

export class PfmTransactionModifyFormComponent extends  BaseFpxFormComponent<PfmTransactionModifyFormHelper, PfmTransactionModifyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public pfmTransactionModifyFormHelper: PfmTransactionModifyFormHelper,
    public pfmtransactionService: PfmtransactionService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, pfmTransactionModifyFormHelper);
    this.setServiceCode("RETAILPFMTRANCATMAPMODIFY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.pfmtransactionService);
      this.addFormControl('externalReferenceNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentDate', '1',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('merchantCode', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactionAmount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('categoryCode', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('transactioncategory', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('pfmSubCategory', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILPFMTRANCATMAPMODIFY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

