import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomizeQuickActionHelper,CustomizeQuickActionState} from './customize-quick-action.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DeviceDetectorService } from '@dep/core';

 
 
@Component({
 selector: 'app-customize-quick-action',
  templateUrl: './customize-quick-action.component.html',
  styleUrls: ['./customize-quick-action.component.scss'],
  providers : [ CustomizeQuickActionHelper]
  })

export class CustomizeQuickActionComponent extends  BaseFpxFormComponent<CustomizeQuickActionHelper, CustomizeQuickActionState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDebitCardLimitRequestHelper: CustomizeQuickActionHelper,
  ) {
    super(formBuilder, router,controlContainer, retailDebitCardLimitRequestHelper);
  }
   protected override doPreInit(): void {

  }
  

  protected override doPostInit(): void {
    
  }
  
}
