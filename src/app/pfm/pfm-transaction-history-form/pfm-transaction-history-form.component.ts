import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { PfmTransactionHistoryFormHelper,PfmTransactionHistoryFormState} from './pfm-transaction-history-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PfmtransactionService } from '../pfmtransaction-service/pfmtransaction.service';
import { Pfmtransaction } from '../pfmtransaction-service/pfmtransaction.model';

 
 
@Component({
 selector: 'app-pfm-transaction-history-form',
  templateUrl: './pfm-transaction-history-form.component.html',
  styleUrls: ['./pfm-transaction-history-form.component.scss'],
  providers : [ PfmTransactionHistoryFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => PfmTransactionHistoryFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => PfmTransactionHistoryFormComponent)
  }]
  })

export class PfmTransactionHistoryFormComponent extends  BaseFpxFormComponent<PfmTransactionHistoryFormHelper, PfmTransactionHistoryFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public pfmTransactionHistoryFormHelper: PfmTransactionHistoryFormHelper,
    public pfmtransactionService: PfmtransactionService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, pfmTransactionHistoryFormHelper);
    this.setServiceCode("RETAILPFMTRANHISTORY");  
}
   protected override doPreInit(): void {
    this.addElement('pfmTranHistoryRoGrid');
  this.setDataService(this.pfmtransactionService);
	this.setServiceCode("RETAILPFMTRANHISTORY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

