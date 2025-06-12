import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retailpcunblockHelper,retailpcunblockState} from './retail-pc-unblock-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { PcunblockrequestService } from '../pcunblockrequest-service/pcunblockrequest.service';
import { Pcunblockrequest } from '../pcunblockrequest-service/pcunblockrequest.model';

 
 
@Component({
 selector: 'app-retail-pc-unblock-form',
  templateUrl: './retail-pc-unblock-form.component.html',
  styleUrls: ['./retail-pc-unblock-form.component.scss'],
  providers : [ retailpcunblockHelper]
  })

export class retailpcunblockComponent extends  BaseFpxFormComponent<retailpcunblockHelper, retailpcunblockState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailpcunblockHelper: retailpcunblockHelper,
    public pcunblockrequestService: PcunblockrequestService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailpcunblockHelper);
  }
  protected readonly remarks_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 100;
  protected readonly unblkOtherReason_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly unblkOtherReason_minLength: any = 3;
  protected readonly unblkOtherReason_maxLength: any = 100;
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('reason', '',  [Validators.required]    ,[],'blur',1,false,0);	
     this.addFormControl('blockReason', '',  []    ,[],'blur',1,false,0);	  
     this.addFormControl('otherReason', '',  []    ,[],'blur',1,false,0);	
     this.addFormControl('unblkOtherReason', '',  [Validators.required,Validators.minLength(this.unblkOtherReason_minLength), Validators.maxLength(this.unblkOtherReason_maxLength)]    ,[],'blur',1,false,0);		 
     //this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);			   		 
     this.addFormControl('remarks', '',  [Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.pcunblockrequestService);
	this.setServiceCode("RETAILPCUNBLOCK");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
