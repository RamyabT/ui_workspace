import { Component,ElementRef,EventEmitter,Inject,Optional, ViewChild} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginReadTermsAndConditionsHelper, LoginReadTermsAndConditionsState } from './login-read-terms-and-conditions.helper';
import { LoginReadtermsandconditionsService } from '../loginreadtermsandconditions-service/loginreadtermsandconditions.service';

 
 
@Component({
 selector: 'login-read-terms-and-conditions',
  templateUrl: './login-read-terms-and-conditions.component.html',
  styleUrls: ['./login-read-terms-and-conditions.component.scss'],
  providers : [ LoginReadTermsAndConditionsHelper, LoginReadtermsandconditionsService]
  })

export class LoginReadTermsAndConditionsComponent extends  BaseFpxFormComponent<LoginReadTermsAndConditionsHelper, LoginReadTermsAndConditionsState>  {
 
@ViewChild("content") content!:ElementRef

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public loginReadTermsAndConditionsHelper: LoginReadTermsAndConditionsHelper,
    public readTermsandConditionsService: LoginReadtermsandconditionsService,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,

  ) {
    
    super(formBuilder, router,controlContainer, loginReadTermsAndConditionsHelper);
   

  }
   protected override doPreInit(): void {
    this.addFormControl('termscondition', '',  [Validators.required ]    ,[],'change',1,false,0);	
	this.setDataService(this.readTermsandConditionsService);
	this.setServiceCode("LOGINREADTERMSANDCONDITIONS");

  }
  
 
  protected override doPostInit(): void {
   
  }
 
  onDicline()
  {
    this._dialogRef.close({
      agree:false

    });
  }
  onAgree(){
    this._dialogRef.close({
      agree:true
    });
  }
 


  
  
}
