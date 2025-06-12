import { Component,EventEmitter,Optional,forwardRef} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup,NG_VALUE_ACCESSOR, NG_VALIDATORS  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { RpcontractinfoService } from '../rpcontractinfo-service/rpcontractinfo.service';
import { Rpcontractinfo } from '../rpcontractinfo-service/rpcontractinfo.model';
import { retailrpContainerFormHelper, retailrpContainerFormState } from './retail-rp-container-form.helper';

 
 
@Component({
 selector: 'app-retail-rp-container-form',
  templateUrl: './retail-rp-container-form.component.html',
  styleUrls: ['./retail-rp-container-form.component.scss'],
  providers : [ retailrpContainerFormHelper, 
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => retailrpContainerFormComponent)
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => retailrpContainerFormComponent)
  }]
  })

export class retailrpContainerFormComponent extends  BaseFpxFormComponent<retailrpContainerFormHelper, retailrpContainerFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailrpContainerFormHelper: retailrpContainerFormHelper,
    public rpcontractinfoService: RpcontractinfoService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailrpContainerFormHelper);
    this.setServiceCode("RETAILRPCONTAINER");  
}
   protected override doPreInit(): void {
  this.setDataService(this.rpcontractinfoService);
	this.setServiceCode("RETAILRPCONTAINER");

  }
  

  protected override doPostInit(): void {
   
  }
 
}

