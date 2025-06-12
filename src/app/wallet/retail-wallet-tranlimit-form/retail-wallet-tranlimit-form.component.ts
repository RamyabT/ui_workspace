import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWalletTransactionLimitFormHelper,RetailWalletTransactionLimitFormState} from './retail-wallet-tranlimit-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WallettranlimitService } from '../wallettranlimit-service/wallettranlimit.service';

 
 
@Component({
 selector: 'app-retail-wallet-tranlimit-form',
  templateUrl: './retail-wallet-tranlimit-form.component.html',
  styleUrls: ['./retail-wallet-tranlimit-form.component.scss'],
  providers : [ RetailWalletTransactionLimitFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailWalletTransactionLimitFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailWalletTransactionLimitFormComponent)
  }]
  })

export class RetailWalletTransactionLimitFormComponent extends  BaseFpxFormComponent<RetailWalletTransactionLimitFormHelper, RetailWalletTransactionLimitFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWalletTransactionLimitFormHelper: RetailWalletTransactionLimitFormHelper,
    public wallettranlimitService: WallettranlimitService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWalletTransactionLimitFormHelper);
    this.setServiceCode("RETAILWALLETLIMIT");  
}
   protected override doPreInit(): void {
  this.setDataService(this.wallettranlimitService);
      this.addFormControl('scanPayFlag', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('scanPayLimit', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('scanPayMinLimit', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('scanPayMaxLimit', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('onlinePurchaseFlag', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('onlinePurchaseLimit', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('onlinePurchaseMinLimit', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('onlinePurchaseMaxLimit', '',[ ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("RETAILWALLETLIMIT");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

