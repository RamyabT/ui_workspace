import { Component, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';
import { RetailManageFavouriteETransferFormHelper, RetailManageFavouriteETransferFormState } from './retail-manage-favourite-etransfer-form.helper';



@Component({
  selector: 'app-retail-manage-favourite-etransfer-form',
  templateUrl: './retail-manage-favourite-etransfer-form.component.html',
  styleUrls: ['./retail-manage-favourite-etransfer-form.component.scss'],
  providers: [RetailManageFavouriteETransferFormHelper]
})

export class RetailManageFavouriteETransferFormComponent extends BaseFpxFormComponent<RetailManageFavouriteETransferFormHelper, RetailManageFavouriteETransferFormState>  {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailManageFavouriteETransferFormHelper: RetailManageFavouriteETransferFormHelper,
    public _favpaymentsService: FavpaymentsService,
    private validatorService: ValidatorService,

  ) {
    super(formBuilder, router, controlContainer, retailManageFavouriteETransferFormHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl('searchText', '', [], [], 'change');
    this.addElement('favEtransferdetailsGrid');
    this.setDataService(this._favpaymentsService);
  }

  protected override doPostInit(): void {

  }

}
