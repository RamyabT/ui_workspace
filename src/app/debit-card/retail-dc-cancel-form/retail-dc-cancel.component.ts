import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retaildccancelHelper,retaildccancelState} from './retail-dc-cancel.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { CanceldebitcardService } from '../canceldebitcard-service/canceldebitcard.service';
//import { Canceldebitcard } from '../canceldebitcard-service/canceldebitcard.model';

 
 
@Component({
 selector: 'app-retail-dc-cancel',
  templateUrl: './retail-dc-cancel.component.html',
  styleUrls: ['./retail-dc-cancel.component.scss'],
  providers : [ retaildccancelHelper]
  })

export class retaildccancelComponent extends  BaseFpxFormComponent<retaildccancelHelper, retaildccancelState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retaildccancelHelper: retaildccancelHelper,
    public canceldebitcardService: CanceldebitcardService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retaildccancelHelper);
  }
   protected override doPreInit(): void {
     this.addFormControl('cardRefNumber', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);			  
     this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   		  		 
     this.addFormControl('remarks', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('terms', '',  []    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.canceldebitcardService);
	this.setServiceCode("RETAILDCCANCEL");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
