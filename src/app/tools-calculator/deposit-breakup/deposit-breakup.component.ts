import { Component, OnInit, Optional } from '@angular/core';
import { RetailDepositBreakupFormHelper, RetailDepositBreakupFormState } from './deposit-breakup.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-deposit-breakup',
  templateUrl: './deposit-breakup.component.html',
  styleUrls: ['./deposit-breakup.component.scss']
})
export class RetailDepositBreakupFormComponent extends  BaseFpxFormComponent<RetailDepositBreakupFormHelper, RetailDepositBreakupFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailDepositBreakupFormHelper: RetailDepositBreakupFormHelper,
    public appConfig:AppConfigService
    
  ) {
    super(formBuilder, router,controlContainer, retailDepositBreakupFormHelper);
  }

  protected override doPreInit(): void {
  }
  
  protected override doPostInit(): void {
    
  }

}
