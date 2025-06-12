 







 


import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
 import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
 import { WallethistroyService } from '../trans-history-service/wallethistroy.service';
import { WalletFilterReceiveFormHelper, WalletFilterReceiveFormState } from './wallet-filter-received-form.helper';

 
 
@Component({
  selector: 'app-wallet-filter-received-form',
  templateUrl: './wallet-filter-received-form.component.html',
  styleUrls: ['./wallet-filter-received-form.component.scss'],
  providers : [ WalletFilterReceiveFormHelper]
  })

export class WalletFilterReceivedFormComponent extends  BaseFpxFormComponent<WalletFilterReceiveFormHelper, WalletFilterReceiveFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public WalletFilterTransactionFormHelper: WalletFilterReceiveFormHelper,
    public WallethistroyService: WallethistroyService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, WalletFilterTransactionFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('transactionPeriod', '',  [  ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('payeeName', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('transactionReference', '',  []    ,[],'blur',1,false,0);	
    //  this.addFormControl('transType', '',  [Validators.required ]    ,[],'blur',1,false,0);		   		 
     this.addFormControl('fromDate', '',  [ ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '',  [ ]    ,[],'blur',1,false,0);			
     this.addFormControl('amount', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('transferType', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('purpose', '',  []    ,[],'blur',1,false,0);	  
    //  this.addFormControl('beneficiaryBank', '',  []    ,[],'blur',1,false,0);			   		  
  this.setDataService(this.WallethistroyService);
  this.setServiceCode("completedpymnts");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
