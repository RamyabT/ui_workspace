import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWalletWithDrawMoneyFormHelper,RetailWalletWithDrawMoneyFormState} from './retail-wallet-withdraw-money.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletwithdrawmoneyService } from '../walletwithdrawmoney-service/walletwithdrawmoney.service';
import { Walletwithdrawmoney } from '../walletwithdrawmoney-service/walletwithdrawmoney.model';
import { PaymentsFormComponent } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-wallet-withdraw-money',
  templateUrl: './retail-wallet-withdraw-money.component.html',
  styleUrls: ['./retail-wallet-withdraw-money.component.scss'],
  providers : [ RetailWalletWithDrawMoneyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailWalletWithDrawMoneyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailWalletWithDrawMoneyFormComponent)
  }]
  })

export class RetailWalletWithDrawMoneyFormComponent extends PaymentsFormComponent {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWalletWithDrawMoneyFormHelper: RetailWalletWithDrawMoneyFormHelper,
    public walletwithdrawmoneyService: WalletwithdrawmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWalletWithDrawMoneyFormHelper);
    this.setServiceCode("RETAILWALLETWITHDRAWMONEY");  
}
   protected override doPreInitAddOn(): void {
  this.setDataService(this.walletwithdrawmoneyService);
      this.addFormControl('walletAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('isBalanceTransfer', '',[ ]   ,[],'change',1,false);			   		 
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'change',1,false);
      this.addFormControl('paymentDate', '',[ ]   ,[],'blur',1,false);			   		 			   		 
      this.addFormControl('toAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chargesAmount', '',[ ]   ,[],'blur',1,false);	
      this.addFormControl('charges', '',[ ]   ,[],'blur',1,false);			   	
      this.addFormControl('chargesBorneBy', '', [], [], 'blur', 1, false, 0);
      this.addFormControl('termsFlag', '',[Validators.required,  ]   ,[],'blur',1,false);	
      this.addFormControl('exchangeRate', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('baseRate', '',[ ]   ,[],'blur',1,false);	 
      this.addElement('exchangeDetails');  		 
	this.setServiceCode("RETAILWALLETWITHDRAWMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

