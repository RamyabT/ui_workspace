import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailPrepaidWalletTransferFormHelper,RetailPrepaidWalletTransferFormState} from './retail-prepaid-wallet-transfer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PrepaidwallettransferreqService } from '../prepaidwallettransferreq-service/prepaidwallettransferreq.service';
import { Prepaidwallettransferreq } from '../prepaidwallettransferreq-service/prepaidwallettransferreq.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-prepaid-wallet-transfer-form',
  templateUrl: './retail-prepaid-wallet-transfer-form.component.html',
  styleUrls: ['./retail-prepaid-wallet-transfer-form.component.scss'],
  providers : [ RetailPrepaidWalletTransferFormHelper]
  })

export class RetailPrepaidWalletTransferFormComponent extends  BaseFpxFormComponent<RetailPrepaidWalletTransferFormHelper, RetailPrepaidWalletTransferFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailPrepaidWalletTransferFormHelper: RetailPrepaidWalletTransferFormHelper,
    public prepaidwallettransferreqService: PrepaidwallettransferreqService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailPrepaidWalletTransferFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('fromCurrency', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('toCurrency', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('paymentAmount', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('paymentCurrency', '',  []    ,[],'change',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.maxLength(250)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('cbxrTerms', '',  [Validators.required ]    ,[],'blur',1,false,0);		
     this.addFormControl('baseRate', '', [], [], 'change', 1, false, 0);
     this.addFormControl('exchangeRate', '', [], [], 'blur', 1, false, 0);
     this.addFormControl('creditAmount', '', [], [], 'blur', 1, false, 0);
     this.addFormControl('debitAmount', '', [], [], 'blur', 1, false, 0);
     this.addElement('exchangeDetails');	   		 
	this.setDataService(this.prepaidwallettransferreqService);
	this.setServiceCode("RETAILPREPAIDWALLETTRAN");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
