import { Component,EventEmitter,Optional,ViewChild,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChqdDepositFormHelper,RetailChqdDepositFormState} from './retail-chqd-deposit-form.helper';
import { BaseFpxFormComponent,FpxCurrAmountComponent,ValidatorService } from '@fpx/core'; 
import { ChequedepositService } from '../chequedeposit-service/chequedeposit.service';
import { Chequedeposit } from '../chequedeposit-service/chequedeposit.model';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
@Component({
 selector: 'app-retail-chqd-deposit-form',
  templateUrl: './retail-chqd-deposit-form.component.html',
  styleUrls: ['./retail-chqd-deposit-form.component.scss'],
  providers : [ RetailChqdDepositFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailChqdDepositFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailChqdDepositFormComponent)
  }]
  })

export class RetailChqdDepositFormComponent extends  BaseFpxFormComponent<RetailChqdDepositFormHelper, RetailChqdDepositFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChqdDepositFormHelper: RetailChqdDepositFormHelper,
    public chequedepositService: ChequedepositService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailChqdDepositFormHelper);
    this.setServiceCode("CHEQUEDEPOSIT");  
}
   protected override doPreInit(): void {
  this.setDataService(this.chequedepositService);
      this.addFormControl('depositAccount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chequeAmount', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chequeImageFrontSide', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('chequeImageBackSide', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('cbxrTerms', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
	this.setServiceCode("CHEQUEDEPOSIT");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

