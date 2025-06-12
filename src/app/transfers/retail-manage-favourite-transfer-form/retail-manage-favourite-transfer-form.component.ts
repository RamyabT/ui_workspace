import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RetailManageFavouriteTransferFormHelper, RetailManageFavouriteTransferFormState } from './retail-manage-favourite-transfer-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { BeneficiariesService } from '../beneficiaries-service/beneficiaries.service';
import { Beneficiaries } from '../beneficiaries-service/beneficiaries.model';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';



@Component({
  selector: 'app-retail-manage-favourite-transfer-form',
  templateUrl: './retail-manage-favourite-transfer-form.component.html',
  styleUrls: ['./retail-manage-favourite-transfer-form.component.scss'],
  providers: [RetailManageFavouriteTransferFormHelper]
})

export class RetailManageFavouriteTransferFormComponent extends BaseFpxFormComponent<RetailManageFavouriteTransferFormHelper, RetailManageFavouriteTransferFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageFavouriteTransferFormHelper: RetailManageFavouriteTransferFormHelper,
    public _favpaymentsService: FavpaymentsService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageFavouriteTransferFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('favtransferdetailsGrid');
    this.setDataService(this._favpaymentsService);
    // this.setServiceCode("RETAILMANAGEBENE");
  }

  protected override doPostInit(): void {

  }

}
