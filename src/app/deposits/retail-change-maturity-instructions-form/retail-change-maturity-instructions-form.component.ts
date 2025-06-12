import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailChangeMaturityInstructionsFormHelper,RetailChangeMaturityInstructionsFormState} from './retail-change-maturity-instructions-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { MaturityinstructionService } from '../maturityinstruction-service/maturityinstruction.service';
import { Maturityinstruction } from '../maturityinstruction-service/maturityinstruction.model';

 
 
@Component({
 selector: 'app-retail-change-maturity-instructions-form',
  templateUrl: './retail-change-maturity-instructions-form.component.html',
  styleUrls: ['./retail-change-maturity-instructions-form.component.scss'],
  providers : [ RetailChangeMaturityInstructionsFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => RetailChangeMaturityInstructionsFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => RetailChangeMaturityInstructionsFormComponent)
  }]
  })

export class RetailChangeMaturityInstructionsFormComponent extends  BaseFpxFormComponent<RetailChangeMaturityInstructionsFormHelper, RetailChangeMaturityInstructionsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailChangeMaturityInstructionsFormHelper: RetailChangeMaturityInstructionsFormHelper,
    public maturityinstructionService: MaturityinstructionService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailChangeMaturityInstructionsFormHelper);
    this.setServiceCode("RETAILCHNGMATURITYINSTR");  
}
   protected override doPreInit(): void {
  this.setDataService(this.maturityinstructionService);
      this.addFormControl('accountNumber', '',[Validators.required, ]   ,[],'blur',1,false);	
      this.addFormControl('inventoryNumber', '',[]   ,[],'blur',1,true);			   		 
      this.addFormControl('depositDetailsTitleLbl', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('maturityInstruction', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('creditAccountNumber', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('charity', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('charityPercentage', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('termsFlag', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
    this.addElement('depositDetailsGroup');
	this.setServiceCode("RETAILCHNGMATURITYINSTR");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

