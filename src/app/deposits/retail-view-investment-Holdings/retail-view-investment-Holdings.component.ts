import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { RetailViewInvestmentHoldingsComponentHelper, RetailViewInvestmentHoldingsComponentState } from './retail-view-investment-Holdings.helper';


@Component({
  selector: 'retail-view-investment-Holdings',
  templateUrl: './retail-view-investment-Holdings.component.html',
  styleUrls: ['./retail-view-investment-Holdings.component.scss'],
  providers: [
    RetailViewInvestmentHoldingsComponentHelper
  ]
})
export class RetailViewInvestmentHoldingsComponent extends BaseFpxFormComponent<RetailViewInvestmentHoldingsComponentHelper,RetailViewInvestmentHoldingsComponentState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _etransferHistoryFormComponentHelper: RetailViewInvestmentHoldingsComponentHelper
  ) { 
    super(formBuilder, router,controlContainer, _etransferHistoryFormComponentHelper);
    this.setServiceCode("RETAILSCHETRANSFER");
  }

  override doPreInit(){
    // this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('investmentHoldingsGrid');
  }


}
