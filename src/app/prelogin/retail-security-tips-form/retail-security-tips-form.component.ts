import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailSecurityTipsFormHelper,RetailSecurityTipsFormState} from './retail-security-tips-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { SecuritypublishService } from '../securitypublish-service/securitypublish.service';
import { Securitypublish } from '../securitypublish-service/securitypublish.model';

 
 
@Component({
 selector: 'app-retail-security-tips-form',
  templateUrl: './retail-security-tips-form.component.html',
  styleUrls: ['./retail-security-tips-form.component.scss'],
  providers : [ RetailSecurityTipsFormHelper]
  })

export class RetailSecurityTipsFormComponent extends  BaseFpxFormComponent<RetailSecurityTipsFormHelper, RetailSecurityTipsFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailSecurityTipsFormHelper: RetailSecurityTipsFormHelper,
    public securitypublishService: SecuritypublishService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailSecurityTipsFormHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.securitypublishService);
	this.setServiceCode("RETAILSECURITYPUBLISH");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
