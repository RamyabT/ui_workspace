import { ChangeDetectorRef, Component, inject, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FavouriteTransactionComponentHelper, FavouriteTransactionComponentState } from './favourite-transaction.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { FavpaymentsService } from '../favpayments-service/favpayments.service';
import { SkinManager } from '@dep/ui';

@Component({
  selector: 'app-favourite-transaction',
  templateUrl: './favourite-transaction.component.html',
  styleUrls: ['./favourite-transaction.component.scss'],
  providers: [
    FavouriteTransactionComponentHelper,
  ]
})
export class FavouriteTransactionComponent extends BaseFpxFormComponent<FavouriteTransactionComponentHelper, FavouriteTransactionComponentState> {
  protected skinManager: SkinManager = inject(SkinManager);

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _favouriteTransactionHelper: FavouriteTransactionComponentHelper,
  ) { 
    super(formBuilder, router,controlContainer, _favouriteTransactionHelper);
  }

  override doPreInit(){
    this.addElement('favtransferdetailsGrid');
  }

}
