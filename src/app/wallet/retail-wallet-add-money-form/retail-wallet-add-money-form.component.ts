import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWalletAddMoneyFormHelper,RetailWalletAddMoneyFormState} from './retail-wallet-add-money-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletaddmoneyService } from '../walletaddmoney-service/walletaddmoney.service';
import { Walletaddmoney } from '../walletaddmoney-service/walletaddmoney.model';

 
 
@Component({
 selector: 'app-retail-wallet-add-money-form',
  templateUrl: './retail-wallet-add-money-form.component.html',
  styleUrls: ['./retail-wallet-add-money-form.component.scss'],
  providers : [ RetailWalletAddMoneyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailWalletAddMoneyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailWalletAddMoneyFormComponent)
  }]
  })

export class RetailWalletAddMoneyFormComponent extends  BaseFpxFormComponent<RetailWalletAddMoneyFormHelper, RetailWalletAddMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWalletAddMoneyFormHelper: RetailWalletAddMoneyFormHelper,
    public walletaddmoneyService: WalletaddmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWalletAddMoneyFormHelper);
    this.setServiceCode("RETAILWALLETADDMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.walletaddmoneyService);
      this.addFormControl('walletAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('fromAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[]   ,[],'blur',1,false);			   		 
      this.addFormControl('termsFlag', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('exchangeRate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('baseRate', '',[ ]   ,[],'blur',1,false);			 
      this.addFormControl('chargesBorneBy', '', [Validators.required], [], 'blur', 1, false, 0);
      this.addFormControl('chargesAmount', '', [], [], 'change', 1, false, 0);     		 
      this.addElement('exchangeDetails');
	this.setServiceCode("RETAILWALLETADDMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

