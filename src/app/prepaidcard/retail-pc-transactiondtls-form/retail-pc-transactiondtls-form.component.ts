import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPCTransactiondtlsFormHelper,RetailPCTransactiondtlsFormState} from './retail-pc-transactiondtls-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PctransactiondtlsService } from '../pctransactiondtls-service/pctransactiondtls.service';
import { Pctransactiondtls } from '../pctransactiondtls-service/pctransactiondtls.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-pc-transactiondtls-form',
  templateUrl: './retail-pc-transactiondtls-form.component.html',
  styleUrls: ['./retail-pc-transactiondtls-form.component.scss'],
  providers : [ RetailPCTransactiondtlsFormHelper]
  })

export class RetailPCTransactiondtlsFormComponent extends  BaseFpxFormComponent<RetailPCTransactiondtlsFormHelper, RetailPCTransactiondtlsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPCTransactiondtlsFormHelper: RetailPCTransactiondtlsFormHelper,
    public pctransactiondtlsService: PctransactiondtlsService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailPCTransactiondtlsFormHelper);
  }
   
  override doPreInit(){
    this.addElement('pctransactionSummaryGrid');
  }
  

  protected override doPostInit(): void {
   
  }
  
}
