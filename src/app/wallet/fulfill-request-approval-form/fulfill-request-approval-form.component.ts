import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { FulfillRequestApprovalFormHelper,FulfillRequestApprovalFormState} from './fulfill-request-approval-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { WalletTransferService } from '../walletTransfer-service/walletTransfer.service';
 
@Component({
 selector: 'app-fulfill-request-approval-form',
  templateUrl: './fulfill-request-approval-form.component.html',
  styleUrls: ['./fulfill-request-approval-form.component.scss'],
  providers : [ FulfillRequestApprovalFormHelper,WalletTransferService]
  })

export class FulfillRequestApprovalComponent extends  BaseFpxFormComponent<FulfillRequestApprovalFormHelper, FulfillRequestApprovalFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public fulfillRequestApprovalFormHelper: FulfillRequestApprovalFormHelper,
    private validatorService: ValidatorService,
    public walletTransferService: WalletTransferService
    
  ) {
    super(formBuilder, router,controlContainer, fulfillRequestApprovalFormHelper);
  }
   protected override doPreInit(): void {		   		 
     this.addFormControl('feedBackComments', '',  []   ,[],'change',1,false,0);
  this.setDataService(this.walletTransferService);
	  this.setServiceCode("RETAILWALLETTRANSFER");
  }
  

  protected override doPostInit(): void {
   
  }
  
}
