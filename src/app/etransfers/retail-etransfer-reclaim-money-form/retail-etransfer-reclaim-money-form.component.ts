import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferReclaimMoneyFormHelper,RetailEtransferReclaimMoneyFormState} from './retail-etransfer-reclaim-money-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';

 
 
@Component({
 selector: 'app-retail-etransfer-reclaim-money-form',
  templateUrl: './retail-etransfer-reclaim-money-form.component.html',
  styleUrls: ['./retail-etransfer-reclaim-money-form.component.scss'],
  providers : [ RetailEtransferReclaimMoneyFormHelper]
  })

export class RetailEtransferReclaimMoneyFormComponent extends  BaseFpxFormComponent<RetailEtransferReclaimMoneyFormHelper, RetailEtransferReclaimMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferReclaimMoneyFormHelper: RetailEtransferReclaimMoneyFormHelper,
    public etransferService: EtransferService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailEtransferReclaimMoneyFormHelper);
    this.setServiceCode("ETRANSFERRECLAIMMONEY");  
}
   protected override doPreInit(): void {
  this.setDataService(this.etransferService);
      this.addFormControl('contactName', '',[]   ,[],'blur',1,false);			   		 
      this.addFormControl('contactEmailId', '',[]   ,[],'blur',1,false);			   		 
      this.addFormControl('contactPhoneNumber', '',[]   ,[],'blur',1,false);			   		 
      this.addFormControl('paymentAmount', '',[]   ,[],'blur',1,false);		
      this.addFormControl('sourceAccount', '',[]  ,[],'blur',1,false);	   		 			   		 
	this.setServiceCode("ETRANSFERRECLAIMMONEY");
  this.addElement('profileDetails');

  }
  

  protected override doPostInit(): void {
   
  }
 
}

