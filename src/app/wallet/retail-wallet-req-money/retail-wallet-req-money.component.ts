import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailWalletReqMoneyFormHelper,RetailWalletReqMoneyFormState} from './retail-wallet-req-money.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletrequestmoneyService } from '../walletrequestmoney-service/walletrequestmoney.service';
import { Walletrequestmoney } from '../walletrequestmoney-service/walletrequestmoney.model';

 
 
@Component({
 selector: 'app-retail-wallet-req-money',
  templateUrl: './retail-wallet-req-money.component.html',
  styleUrls: ['./retail-wallet-req-money.component.scss'],
  providers:[RetailWalletReqMoneyFormHelper]
   })

export class RetailWalletReqMoneyFormComponent extends  BaseFpxFormComponent<RetailWalletReqMoneyFormHelper, RetailWalletReqMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailWalletReqMoneyFormHelper: RetailWalletReqMoneyFormHelper,
    public walletrequestmoneyService: WalletrequestmoneyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailWalletReqMoneyFormHelper);
    this.setServiceCode("RETAILWALLETREQMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.walletrequestmoneyService);
      this.addFormControl('mobileNumber', '',[Validators.required, ]   ,[],'change',1,false);	
      this.addFormControl('fromAccount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('toAccount', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('amount', '',[Validators.required, ]   ,[],'blur',1,false);		   		 	   		 
      this.addFormControl('charges', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chargesCur', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('walletCurr', '',[ ]   ,[],'blur',1,false);			
      this.addFormControl('chargesBorneBy', '', [Validators.required], [], 'blur', 1, false, 0);
      this.addFormControl('chargesAmount', '', [], [], 'change', 1, false, 0);   		 
      this.addElement('selectContact');
	this.setServiceCode("RETAILWALLETREQMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

