import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailAccountEStatementReqFormHelper,RetailAccountEStatementReqFormState} from './retail-account-estatement-req-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { AccountStatementService } from '../accountStatement-service/accountStatement.service';
import { AccountStatement } from '../accountStatement-service/accountStatement.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-account-estatement-req-form',
  templateUrl: './retail-account-estatement-req-form.component.html',
  styleUrls: ['./retail-account-estatement-req-form.component.scss'],
  providers : [ RetailAccountEStatementReqFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailAccountEStatementReqFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailAccountEStatementReqFormComponent)
  }]
  })

export class RetailAccountEStatementReqFormComponent extends  BaseFpxFormComponent<RetailAccountEStatementReqFormHelper, RetailAccountEStatementReqFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailAccountEStatementReqFormHelper: RetailAccountEStatementReqFormHelper,
    public accountStatementService: AccountStatementService,
    private validatorService: ValidatorService,
    public _device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retailAccountEStatementReqFormHelper);
    this.setServiceCode("ACCOUNTESTATEMENT");  
}
   protected override doPreInit(): void {
  this.setDataService(this.accountStatementService);
      this.addFormControl('relationshipNumber', '',[Validators.required, ]  ,
		      [],'blur',0,false);			   		 
      this.addFormControl('year', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("ACCOUNTESTATEMENT");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

