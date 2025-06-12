import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWalletTransferFormHelper,RetailWalletTransferFormState} from './retail-wallet-transfer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletTransferService } from '../walletTransfer-service/walletTransfer.service';
import { WalletTransfer } from '../walletTransfer-service/walletTransfer.model';

 
 
@Component({
 selector: 'app-retail-wallet-transfer-form',
  templateUrl: './retail-wallet-transfer-form.component.html',
  styleUrls: ['./retail-wallet-transfer-form.component.scss'],
  providers : [ RetailWalletTransferFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailWalletTransferFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailWalletTransferFormComponent)
  }]
  })

export class RetailWalletTransferFormComponent extends  BaseFpxFormComponent<RetailWalletTransferFormHelper, RetailWalletTransferFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWalletTransferFormHelper: RetailWalletTransferFormHelper,
    public walletTransferService: WalletTransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWalletTransferFormHelper);
    this.setServiceCode("RETAILWALLETTRANSFER");  
}
   protected override doPreInit(): void {
  this.setDataService(this.walletTransferService);
      this.addFormControl('sourceWalletAccount', '',[Validators.required, ]   ,[],'change',1,false);			   		 
      this.addFormControl('creditWalletAccount', '',[Validators.required ]   ,[],'change',1,false);			
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);	  
      this.addFormControl('contactPhoneNumber', '',[Validators.required, ]   ,[],'blur',1,false);
      this.addFormControl('exchangeRate', 1,[ ]   ,[],'blur',1,false);			  
      this.addFormControl('termsFlag', '',[Validators.required, ]   ,[],'blur',1,false);			   		 		
      this.addFormControl('chargesBorneBy', '', [Validators.required], [], 'blur', 1, false, 0);
      this.addFormControl('chargesAmount', '', [], [], 'change', 1, false, 0);
      this.addFormControl('remarks', '',[Validators.required ]   ,[],'blur',1,false);			   		 
      this.addElement('exchangeDetails');
      this.addElement('selectContact');
	this.setServiceCode("RETAILWALLETTRANSFER");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

