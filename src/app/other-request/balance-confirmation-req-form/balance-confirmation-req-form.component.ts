import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BalanceConfirmationReqHelper,BalanceConfirmationReqState} from './balance-confirmation-req-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BalanceConfirmationReqService } from '../balanceConfirmationReq-service/BalanceConfirmationReq.service';

 
 
@Component({
 selector: 'app-balance-confirmation-req-form',
  templateUrl: './balance-confirmation-req-form.component.html',
  styleUrls: ['./balance-confirmation-req-form.component.scss'],
  providers : [ BalanceConfirmationReqHelper]
  })

export class BalanceConfirmationReqComponent extends  BaseFpxFormComponent<BalanceConfirmationReqHelper, BalanceConfirmationReqState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public balanceConfirmationReqHelper: BalanceConfirmationReqHelper,
    public balanceConfirmationReqService: BalanceConfirmationReqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, balanceConfirmationReqHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('letterFor', '',  [Validators.required ]    ,[],'change',1,false,0);			   		 
     this.addFormControl('date', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required]     ,[],'change',1,false,0);			   		 
     this.addFormControl('emailId', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('branch', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('chargesAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('acknowledgement', '',   [Validators.required]     ,[],'blur',1,false,0);				   		 
     this.addFormControl('remarks', '',  []    ,[],'change',1,false,0);	
     this.addFormControl('addressInfo', '',  []    ,[],'blur',1,false,0);					   		 
     this.addFormControl('balanceConfirmationDetails', '',  []    ,[],'blur',1,false,0);
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);		   		
     this.addElement('addressInfo');			   		 
	this.setDataService(this.balanceConfirmationReqService);
	this.setServiceCode("RETAILSRVREQBALCONFIRM");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
