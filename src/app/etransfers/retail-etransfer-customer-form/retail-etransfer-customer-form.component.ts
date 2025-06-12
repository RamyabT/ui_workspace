import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailEtransferCustomerFormHelper,RetailEtransferCustomerFormState} from './retail-etransfer-customer-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { EtransfercustomerlogService } from '../etransfercustomerlog-service/etransfercustomerlog.service';
import { Etransfercustomerlog } from '../etransfercustomerlog-service/etransfercustomerlog.model';

 
 
@Component({
 selector: 'app-retail-etransfer-customer-form',
  templateUrl: './retail-etransfer-customer-form.component.html',
  styleUrls: ['./retail-etransfer-customer-form.component.scss'],
  providers : [ RetailEtransferCustomerFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferCustomerFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailEtransferCustomerFormComponent)
  }]
  })

export class RetailEtransferCustomerFormComponent extends  BaseFpxFormComponent<RetailEtransferCustomerFormHelper, RetailEtransferCustomerFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailEtransferCustomerFormHelper: RetailEtransferCustomerFormHelper,
    public etransfercustomerlogService: EtransfercustomerlogService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailEtransferCustomerFormHelper);
    this.setServiceCode("RETAILETRANSFERREGISTRATION");  
}
   protected override doPreInit(): void {
  this.setDataService(this.etransfercustomerlogService);
      this.addFormControl('firstName', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('email', '',[]   ,[],'blur',1,false);			   		 
      this.addFormControl('phoneNumber', '',[]   ,[],'blur',1,false);			   		 
      this.addFormControl('notificationType', '',[Validators.required, ]   ,[],'change',1,false);
      this.addFormControl('preferredLanguage', '',  [Validators.required]    ,[],'change',1,false);		
      this.addFormControl('hiddenField', '',  [Validators.required]    ,[],'change',1,false);			   		 
   	this.setServiceCode("RETAILETRANSFERREGISTRATION");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

