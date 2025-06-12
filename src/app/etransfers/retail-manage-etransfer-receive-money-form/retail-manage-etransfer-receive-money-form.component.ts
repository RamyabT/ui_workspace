import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailManageEtransferReceiveMoneyFormHelper,RetailManageEtransferReceiveMoneyFormState} from './retail-manage-etransfer-receive-money-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
//import { RetailmanageetransferreceivemoneyformService } from '../retailmanageetransferreceivemoneyform-service/retailmanageetransferreceivemoneyform.service';
//import { Retailmanageetransferreceivemoneyform } from '../retailmanageetransferreceivemoneyform-service/retailmanageetransferreceivemoneyform.model';

 
@Component({
 selector: 'app-retail-manage-etransfer-receive-money-form',
  templateUrl: './retail-manage-etransfer-receive-money-form.component.html',
  styleUrls: ['./retail-manage-etransfer-receive-money-form.component.scss'],
  providers : [ RetailManageEtransferReceiveMoneyFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailManageEtransferReceiveMoneyFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailManageEtransferReceiveMoneyFormComponent)
  }]
  })

export class RetailManageEtransferReceiveMoneyFormComponent extends  BaseFpxFormComponent<RetailManageEtransferReceiveMoneyFormHelper, RetailManageEtransferReceiveMoneyFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageEtransferReceiveMoneyFormHelper: RetailManageEtransferReceiveMoneyFormHelper,
    //public retailmanageetransferreceivemoneyformService: RetailmanageetransferreceivemoneyformService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailManageEtransferReceiveMoneyFormHelper);
    this.setServiceCode("RETAILMANAGEETRANSFERRECEIVEMONEY");  
}
   protected override doPreInit(): void {
  //this.setDataService(this.retailmanageetransferreceivemoneyformService);
	//this.setServiceCode("RETAILMANAGEETRANSFERRECEIVEMONEY");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

