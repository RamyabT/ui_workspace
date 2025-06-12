import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAdhocAccStmtReqFormHelper,RetailAdhocAccStmtReqFormState} from './retail-adhoc-accStmtReq-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { AccountStmtReqService } from '../accountStmtReq-service/accountStmtReq.service';

 
 
@Component({
 selector: 'app-retail-adhoc-accStmtReq-form',
  templateUrl: './retail-adhoc-accStmtReq-form.component.html',
  styleUrls: ['./retail-adhoc-accStmtReq-form.component.scss'],
  providers : [ RetailAdhocAccStmtReqFormHelper]
  })

export class RetailAdhocAccStmtReqFormComponent extends  BaseFpxFormComponent<RetailAdhocAccStmtReqFormHelper, RetailAdhocAccStmtReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAdhocAccStmtReqFormHelper: RetailAdhocAccStmtReqFormHelper,
    public accountStmtReqService: AccountStmtReqService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailAdhocAccStmtReqFormHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('accountNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('requestFor', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('fromDate', '1',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('toDate', '1',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('otherReason', '',  [Validators.required]    ,[],'change',1,false,0);			   		 
     this.addFormControl('deliveryOption', '',  [Validators.required]    ,[],'change',1,false,0);
     this.addFormControl('branch', '',  [Validators.required]    ,[],'change',1,false,0);
     this.addFormControl('emailId', '', [], [], 'blur', 1, false, 0);			   		 
     this.addFormControl('chargesAmount', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);
     this.addFormControl('address', '',  []    ,[],'blur',1,false,0);			
     this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);	
     this.addFormControl('addressInformation', '',  []    ,[],'blur',1,false,0);			   		 
     this.addElement('address');
	this.setDataService(this.accountStmtReqService);
	this.setServiceCode("RETAILADHOCACCSTMT");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
