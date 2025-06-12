import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailUnlockuserFormHelper,RetailUnlockuserFormState} from './retail-unlockuser-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailunlockuserService } from '../retailunlockuser-service/retailunlockuser.service';

 
 
@Component({
 selector: 'app-retail-unlockuser-form',
  templateUrl: './retail-unlockuser-form.component.html',
  styleUrls: ['./retail-unlockuser-form.component.scss'],
  providers : [ RetailUnlockuserFormHelper]
  })

export class RetailUnlockuserFormComponent extends  BaseFpxFormComponent<RetailUnlockuserFormHelper, RetailUnlockuserFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailUnlockuserFormHelper: RetailUnlockuserFormHelper,
    public retailunlockuserService: RetailunlockuserService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailUnlockuserFormHelper);
  }
   protected override doPreInit(): void {
	this.addElement('Reactivate');
	this.setDataService(this.retailunlockuserService);
	this.setServiceCode("RETAILUNLOCKUSER");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
