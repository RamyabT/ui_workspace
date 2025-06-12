import { Component,EventEmitter,Optional} from '@angular/core';
import { FormBuilder,Validators,ControlContainer,FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { QuickActionHelper,QuickActionState} from './quick-action.helper';
import { BaseFpxFormComponent,ValidatorService } from '@fpx/core'; 
import { DeviceDetectorService } from '@dep/core';
import { LanguageService } from '@dep/services';

 
 
@Component({
 selector: 'home-quick-actions',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.scss'],
  providers : [ QuickActionHelper]
  })

export class QuickActionComponent extends  BaseFpxFormComponent<QuickActionHelper, QuickActionState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDebitCardLimitRequestHelper: QuickActionHelper,
    protected languageService: LanguageService
  ) {
    super(formBuilder, router,controlContainer, retailDebitCardLimitRequestHelper);
  }
   protected override doPreInit(): void {

  }
  

  protected override doPostInit(): void {
    
  }
  
}
