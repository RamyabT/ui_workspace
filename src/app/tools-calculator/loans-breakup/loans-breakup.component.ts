import { Component, OnInit, Optional } from '@angular/core';
// import { RetailDepositBreakupFormHelper, RetailDepositBreakupFormState } from './deposit-breakup.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { RetailLoansBreakupFormHelper, RetailLoansBreakupFormState } from './loans-breakup.helper';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-loans-breakup',
  templateUrl: './loans-breakup.component.html',
  styleUrls: ['./loans-breakup.component.scss']
})
export class RetailloansBreakupFormComponent extends  BaseFpxFormComponent<RetailLoansBreakupFormHelper, RetailLoansBreakupFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailLoansBreakupFormHelper: RetailLoansBreakupFormHelper,
    public appConfig:AppConfigService
    
  ) {
    super(formBuilder, router,controlContainer, retailLoansBreakupFormHelper);
  }

  protected override doPreInit(): void {
  }
  
  protected override doPostInit(): void {
    
  }

}
