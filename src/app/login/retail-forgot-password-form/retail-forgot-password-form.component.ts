import { ChangeDetectorRef, Component,EventEmitter,forwardRef,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailForgotPasswordFormHelper,RetailForgotPasswordFormState} from './retail-forgot-password-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RetailForgotpasswordService } from '../retailforgotpassword-service/forgotpassword.service';


 
 
@Component({
 selector: 'app-retail-forgot-password-form',
  templateUrl: './retail-forgot-password-form.component.html',
  styleUrls: ['./retail-forgot-password-form.component.scss'],
  providers : [ RetailForgotPasswordFormHelper, 
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RetailForgotPasswordFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => RetailForgotPasswordFormComponent)
    }]
  })

export class RetailForgotPasswordFormComponent extends  BaseFpxFormComponent<RetailForgotPasswordFormHelper, RetailForgotPasswordFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
    formBuilder: FormBuilder,
    private router: Router,
    public retailForgotPasswordFormHelper: RetailForgotPasswordFormHelper,
    private validatorService: ValidatorService,
    private retailForgotpasswordService : RetailForgotpasswordService
    
    
  ) {
    super(formBuilder, router,controlContainer, retailForgotPasswordFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('username', '', [Validators.required], [], 'blur', 1, false, 0);
    this.addFormControl('identificationMode', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('identificationNumber', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('identificationDate', '', [], [], 'blur', 1, false, 0);
    this.addFormControl('debitcardNumber', '',  [Validators.required,Validators.minLength(16),Validators.maxLength(16)]    ,[],'blur',1,false,0);				   		 
     this.addFormControl('dob', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
    this.addFormControl('accountNumber', '',  [Validators.required,Validators.minLength(5),Validators.maxLength(10)]    ,[],'blur',1,false,0);			   		 	

    this.addFormControl('pin', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('customerCif', '',  [Validators.required ]    ,[],'blur',1,false,0);
    this.addFormControl('expiryYear', '', [Validators.required], [], 'change', 1, false, 0);
    this.addFormControl('expiryMonth', '', [Validators.required], [], 'change', 1, false, 0);
    this.addElement('expiryDate');
    this.addFormControl('termsFlag', '', [Validators.required], [], 'blur', 1, false, 0);

    this.setDataService(this.retailForgotpasswordService);
    this.setServiceCode("RETAILFORGOTPASSWORD");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
