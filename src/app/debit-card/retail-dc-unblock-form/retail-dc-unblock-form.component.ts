import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { retaildcunblockHelper,retaildcunblockState} from './retail-dc-unblock-form.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DcunblockrequestService } from '../dcunblockrequest-service/dcunblockrequest.service';
import { Dcunblockrequest } from '../dcunblockrequest-service/dcunblockrequest.model';
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-retail-dc-unblock-form',
  templateUrl: './retail-dc-unblock-form.component.html',
  styleUrls: ['./retail-dc-unblock-form.component.scss'],
  providers : [ retaildcunblockHelper]
  })

export class retaildcunblockComponent extends  BaseFpxFormComponent<retaildcunblockHelper, retaildcunblockState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retaildcunblockHelper: retaildcunblockHelper,
    public dcunblockrequestService: DcunblockrequestService,
    private validatorService: ValidatorService,
    public device: DeviceDetectorService
    
  ) {
    super(formBuilder, router,controlContainer, retaildcunblockHelper);
  }
  protected readonly remarks_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly remarks_minLength: any = 3;
  protected readonly remarks_maxLength: any = 100;
  protected readonly unBlockOtherReason_pattern: any = /^[A-Za-z0-9 _@.'\-\/#&+-,\s]{3,100}$/;
  protected readonly unBlockOtherReason_minLength: any = 3;
  protected readonly unBlockOtherReason_maxLength: any = 100;
   protected override doPreInit(): void {
     this.addFormControl('cardReference', '',  [Validators.required ]    ,[],'blur',1,false,0);		
     //this.addFormControl('charges', '',  []    ,[],'blur',1,false,0);		
     this.addFormControl('blockReason', '',  []    ,[],'blur',1,false,0);		 	
     this.addFormControl('otherReason', '',  []    ,[],'blur',1,false,0);			 	
     this.addFormControl('unBlockOtherReason', '',  [Validators.required,Validators.minLength(this.unBlockOtherReason_minLength), Validators.maxLength(this.unBlockOtherReason_maxLength)]    ,[],'blur',1,false,0);	   		 
     this.addFormControl('reason', '',  [Validators.required ]    ,[],'blur',1,false,0);		
     this.addFormControl('remarks', '',  [ Validators.minLength(this.remarks_minLength), Validators.maxLength(this.remarks_maxLength)]    ,[],'blur',1,false,0);			   		 
     this.addFormControl('termsFlag', '',  [Validators.required ]    ,[],'blur',1,false,0);			   		 
	this.setDataService(this.dcunblockrequestService);
	this.setServiceCode("RETAILDCUNBLOCK");


  }
  

  protected override doPostInit(): void {
   
  }
  
}
