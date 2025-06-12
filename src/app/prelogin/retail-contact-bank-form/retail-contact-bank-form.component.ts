import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailContactBankFormHelper,RetailContactBankFormState} from './retail-contact-bank-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { BankcontactsService } from '../bankcontacts-service/bankcontacts.service';
import { Bankcontacts } from '../bankcontacts-service/bankcontacts.model';

 
 
@Component({
 selector: 'app-retail-contact-bank-form',
  templateUrl: './retail-contact-bank-form.component.html',
  styleUrls: ['./retail-contact-bank-form.component.scss'],
  providers : [ RetailContactBankFormHelper]
  })

export class RetailContactBankFormComponent extends  BaseFpxFormComponent<RetailContactBankFormHelper, RetailContactBankFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailContactBankFormHelper: RetailContactBankFormHelper,
    public bankcontactsService: BankcontactsService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailContactBankFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.bankcontactsService);
  this.addFormControl('bankContact',[],[],[],'blur',0,false,0);
	this.setServiceCode("RETAILCONTACTBANK");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
