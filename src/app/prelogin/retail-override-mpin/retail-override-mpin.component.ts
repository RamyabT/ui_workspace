import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailOverrideMpinHelper,RetailOverrideMpinState} from './retail-override-mpin.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { OverridempinService } from '../overridempin-service/overridempin.service';
import { Overridempin } from '../overridempin-service/overridempin.model';

 
 
@Component({
 selector: 'app-retail-override-mpin',
  templateUrl: './retail-override-mpin.component.html',
  styleUrls: ['./retail-override-mpin.component.scss'],
  providers : [ RetailOverrideMpinHelper,OverridempinService]
  })

export class RetailOverrideMpinComponent extends  BaseFpxFormComponent<RetailOverrideMpinHelper, RetailOverrideMpinState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailOverrideMpinHelper: RetailOverrideMpinHelper,
    public overridempinService: OverridempinService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailOverrideMpinHelper);
  }
   protected override doPreInit(): void {
	this.setDataService(this.overridempinService);
	this.setServiceCode("RETAILOVERRIDEMPIN");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
