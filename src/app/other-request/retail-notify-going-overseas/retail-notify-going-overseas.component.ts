import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { notifygoingoverseasHelper,notifygoingoverseasState} from './retail-notify-going-overseas.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { NotifygoingoverseasService } from '../notifygoingoverseas-service/notifygoingoverseas.service';
import { Notifygoingoverseas } from '../notifygoingoverseas-service/notifygoingoverseas.model';

 
 
@Component({
 selector: 'app-notifygoingoverseas',
  templateUrl: './retail-notify-going-overseas.component.html',
  styleUrls: ['./retail-notify-going-overseas.component.scss'],
  providers : [ notifygoingoverseasHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => notifygoingoverseasComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => notifygoingoverseasComponent)
  }]
  })

export class notifygoingoverseasComponent extends  BaseFpxFormComponent<notifygoingoverseasHelper, notifygoingoverseasState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public notifygoingoverseasHelper: notifygoingoverseasHelper,
    public notifygoingoverseasService: NotifygoingoverseasService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, notifygoingoverseasHelper);
    this.setServiceCode("RETAILNOTIFYGOINGOVERSEAS");  
}
   protected override doPreInit(): void {
  this.setDataService(this.notifygoingoverseasService);
      this.addFormControl('depatureDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('arivalDate', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('country', '',[Validators.required, ]   ,[],'blur',1,false);
    // this.addFormControl('country', [], [Validators.required], [], 'blur', 1, false);			   		 
      this.addFormControl('contactNumber', '',[ ]   ,[],'blur',1,false);			   		 
      this.addFormControl('temporarilyBlockCard', '',[Validators.required, ]   ,[],'blur',1,false);			   		 
      this.addFormControl('remarks', '',[ Validators.maxLength(150)]   ,[],'blur',1,false);			   		 
      this.addFormControl('termsFlag', '',[Validators.required, ]   ,[],'blur',1,false);		
      this.addFormControl('inventoryNumber', '',  []    ,[],'blur',1,true,0);	
	   		 
	this.setServiceCode("RETAILNOTIFYGOINGOVERSEAS");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

