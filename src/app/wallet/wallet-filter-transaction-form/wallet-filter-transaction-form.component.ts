 


import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
 import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
  import { WalletFilterTransactionFormHelper, WalletFilterTransactionFormState } from './wallet-filter-transaction-form.helper';
import { WallethistroyService } from '../trans-history-service/wallethistroy.service';

 
 
@Component({
  selector: 'app-wallet-filter-transaction-form',
  templateUrl: './wallet-filter-transaction-form.component.html',
  styleUrls: ['./wallet-filter-transaction-form.component.scss'],
  providers : [ WalletFilterTransactionFormHelper]
  })

export class WalletFilterTransactionFormComponent extends  BaseFpxFormComponent<WalletFilterTransactionFormHelper, WalletFilterTransactionFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public WalletFilterTransactionFormHelper: WalletFilterTransactionFormHelper,
    public WallethistroyService: WallethistroyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, WalletFilterTransactionFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('transactionPeriod', '',  [  ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('walletName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);	
    //  this.addFormControl('transType', '',  [Validators.required ]    ,[],'blur',1,false,0);		   		 
     this.addFormControl('fromDate', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  [ ]    ,[],'blur',1,false,0);			
     this.addFormControl('transactionAmount', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('transType', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('purpose', '',  []    ,[],'blur',1,false,0);	  
    //  this.addFormControl('beneficiaryBank', '',  []    ,[],'blur',1,false,0);			   		  
  this.setDataService(this.WallethistroyService);
  this.setServiceCode("completedpymnts");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
