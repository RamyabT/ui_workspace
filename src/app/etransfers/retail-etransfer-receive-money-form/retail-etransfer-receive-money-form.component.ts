import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferReceiveMoneyFormHelper,RetailEtransferReceiveMoneyFormState} from './retail-etransfer-receive-money-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';

 
 
@Component({
 selector: 'app-retail-etransfer-receive-money-form',
  templateUrl: './retail-etransfer-receive-money-form.component.html',
  styleUrls: ['./retail-etransfer-receive-money-form.component.scss'],
  providers : [ RetailEtransferReceiveMoneyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferReceiveMoneyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferReceiveMoneyFormComponent)
  }]
  })

export class RetailEtransferReceiveMoneyFormComponent extends  BaseFpxFormComponent<RetailEtransferReceiveMoneyFormHelper, RetailEtransferReceiveMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferReceiveMoneyFormHelper: RetailEtransferReceiveMoneyFormHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailEtransferReceiveMoneyFormHelper);
    this.setServiceCode("ETRANSFERRECEIVEMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.etransferService);
      // this.addFormControl('contactName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      // this.addFormControl('contactEmailId', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      // this.addFormControl('contactPhoneNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('autoDepositFlag', '',[Validators.required]   ,[],'change',1,false);			   		 
      this.addFormControl('sourceAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('securityQuestion', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('securityAnswer', '',[Validators.required, ]   ,[],'blur',1,false);	
      this.addFormControl('remarks1', '', [Validators.required], [], 'change', 1, false);		   		 
	this.setServiceCode("ETRANSFERRECEIVEMONEY");
  this.addElement('profileDetails');

  }
  

  protected override doPostInit(): void {
   
  }
 
}

