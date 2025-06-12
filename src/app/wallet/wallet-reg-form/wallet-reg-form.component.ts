import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletRegFormHelper,WalletRegFormState} from './wallet-reg-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletregistrationService } from '../walletregistration-service/walletregistration.service';
import { Walletregistration } from '../walletregistration-service/walletregistration.model';

 
 
@Component({
 selector: 'app-wallet-reg-form',
  templateUrl: './wallet-reg-form.component.html',
  styleUrls: ['./wallet-reg-form.component.scss'],
  providers : [ WalletRegFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => WalletRegFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => WalletRegFormComponent)
  }]
  })

export class WalletRegFormComponent extends  BaseFpxFormComponent<WalletRegFormHelper, WalletRegFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public walletRegFormHelper: WalletRegFormHelper,
    public walletregistrationService: WalletregistrationService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, walletRegFormHelper);
    this.setServiceCode("RETAILWALLETREG");  
}
   protected override doPreInit(): void {
  this.setDataService(this.walletregistrationService);
  this.setTabConfiguration("transparent", true, true, false, false, 'tabGroup', '');
  this.addTab('Wallet registration', '', false, false, false, 'walletregistrationTab', 'tabGroup');
	this.addTab('Wallet Settings', '', false, false, false, 'walletLimitsTab', 'tabGroup');

  
  this.addFormControl('walletregistration', '', [Validators.required], [], 'blur', 1, false,'walletregistrationTab');
	this.addFormControl('wallettranlimit', '', [Validators.required], [], 'blur', 1, false,'walletLimitsTab');
  this.setServiceCode("RETAILWALLETREG");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

