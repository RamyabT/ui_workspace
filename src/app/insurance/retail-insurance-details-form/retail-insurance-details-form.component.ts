import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { AccountsService } from 'src/app/foundation/validator-service/accounts.service';
import {
  RetailInsuranceDetailsFormState,
  RetailInsuranceDetailsFormHelper,
  travelFields,
  homeFields,
  vehicleFields
} from './retail-insurance-details-form.helper';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { InsurancesummaryService } from '../insurance-summary-service/insurancesummary.service';
import { DeviceDetectorService } from '@dep/core';
import { insurance } from '../insurance-summary-service/insurancesummary.model';

@Component({
  selector: 'app-retail-insurance-details-form',
  templateUrl: './retail-insurance-details-form.component.html',
  styleUrls: ['./retail-insurance-details-form.component.scss'],
  providers: [RetailInsuranceDetailsFormHelper, InsurancesummaryService]
})
export class RetailInsuranceDetailsFormComponent
  extends BaseFpxFormComponent<RetailInsuranceDetailsFormHelper, RetailInsuranceDetailsFormState>
  implements OnInit
{
  travelFields = travelFields;
  vehicleFields = vehicleFields;
  homeFields = homeFields;

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public device: DeviceDetectorService,
    public RetailInsuranceDetailsFormHelper: RetailInsuranceDetailsFormHelper,
    public _insuranceService: InsurancesummaryService
  ) {
    super(formBuilder, router, controlContainer, RetailInsuranceDetailsFormHelper);
  }

  override ngOnInit(): void {
    // this._insuranceService.selectedInsurance$.subscribe((insurance: insurance | null) => {
    //   if (insurance) {
    //     this.RetailInsuranceDetailsFormHelper.setSelectedInsurance(insurance);
    //   }
    // });  
    // this._insuranceService.insuranceSummaryLoad$.subscribe((event) => {
    //   if (event === 'load') {
    //     this.RetailInsuranceDetailsFormHelper.handleFormOnLoad();
    //   }
    // });
  }
}
