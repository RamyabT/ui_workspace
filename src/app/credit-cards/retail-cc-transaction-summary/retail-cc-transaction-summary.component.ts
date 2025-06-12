import { Component,EventEmitter,Input,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { cctransactionsummaryHelper,cctransactionsummaryState} from './retail-cc-transaction-summary.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CctransactionsummaryService } from '../cctransactionsummary-service/cctransactionsummary.service';
import { Cctransactionsummary } from '../cctransactionsummary-service/cctransactionsummary.model';

 
 
@Component({
 selector: 'app-retail-cc-transaction-summary',
  templateUrl: './retail-cc-transaction-summary.component.html',
  styleUrls: ['./retail-cc-transaction-summary.component.scss'],
  providers : [ cctransactionsummaryHelper]
  })

export class cctransactionsummaryComponent extends  BaseFpxFormComponent<cctransactionsummaryHelper, cctransactionsummaryState>  {
  @Input('tranType') 'tranType': string;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cctransactionsummaryHelper: cctransactionsummaryHelper,
    public cctransactionsummaryService: CctransactionsummaryService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, cctransactionsummaryHelper);
  }
   protected override doPreInit(): void {
    this.addElement('billedCcTransactionHistory');
    this.addElement('unBilledCcTransactionHistory');
    this.setDataService(this.cctransactionsummaryService);
    this.setServiceCode("RETAILCCTRANSACTION");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
