import { Component,ElementRef,EventEmitter,Inject,Optional, ViewChild} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { ReadTermsAndConditionsHelper,ReadTermsAndConditionsState} from './read-terms-and-conditions.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { ReadtermsandconditionsService } from '../readtermsandconditions-service/readtermsandconditions.service';
import { Readtermsandconditions } from '../readtermsandconditions-service/readtermsandconditions.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

 
 
@Component({
 selector: 'app-read-terms-and-conditions',
  templateUrl: './read-terms-and-conditions.component.html',
  styleUrls: ['./read-terms-and-conditions.component.scss'],
  providers : [ ReadTermsAndConditionsHelper]
  })

export class ReadTermsAndConditionsComponent extends  BaseFpxFormComponent<ReadTermsAndConditionsHelper, ReadTermsAndConditionsState>  {
 
  

@ViewChild("content") content!:ElementRef


  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public readTermsAndConditionsHelper: ReadTermsAndConditionsHelper,
    public readTermsandConditionsService: ReadtermsandconditionsService,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,

  ) {
    
    super(formBuilder, router,controlContainer, readTermsAndConditionsHelper);
   

  }
   protected override doPreInit(): void {
    this.addFormControl('termscondition', '',  [Validators.required ]    ,[],'change',1,false,0);	
	this.setDataService(this.readTermsandConditionsService);
	this.setServiceCode("READTERMSANDCONDITIONS");

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
