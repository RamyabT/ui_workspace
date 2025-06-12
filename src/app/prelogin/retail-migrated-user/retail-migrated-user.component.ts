import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { OverridempinService } from '../overridempin-service/overridempin.service';
import { Overridempin } from '../overridempin-service/overridempin.model';
import { RetailMigratedUserHelper, RetailMigratedUserState } from './retail-migrated-user.helper';

 
 
@Component({
 selector: 'app-retail-migrated-user',
  templateUrl: './retail-migrated-user.component.html',
  styleUrls: ['./retail-migrated-user.component.scss'],
  providers : [ RetailMigratedUserHelper,OverridempinService]
  })

export class RetailMigratedUserComponent extends  BaseFpxFormComponent<RetailMigratedUserHelper, RetailMigratedUserState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailMigratedUserHelper: RetailMigratedUserHelper,
    // public overridempinService: OverridempinService,
    private validatorService: ValidatorService,
    
  ) {
    super(formBuilder, router,controlContainer, retailMigratedUserHelper);
  }
   protected override doPreInit(): void {
	// this.setDataService(this.overridempinService);
	// this.setServiceCode("RETAILOVERRIDEMPIN");

  }
  

  protected override doPostInit(): void {
   
  }
  
}
