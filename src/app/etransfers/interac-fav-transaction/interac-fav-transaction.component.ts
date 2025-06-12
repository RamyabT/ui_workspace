import { Component, OnInit, Optional } from '@angular/core';
import { InteracFavTransactionComponentHelper, InteracFavTransactionComponentState } from './interac-fav-transaction.helper';
import { BaseFpxFormComponent } from '@fpx/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interac-fav-transaction',
  templateUrl: './interac-fav-transaction.component.html',
  styleUrls: ['./interac-fav-transaction.component.scss'],
  providers: [InteracFavTransactionComponentHelper]
})
export class InteracFavTransactionComponent extends BaseFpxFormComponent<InteracFavTransactionComponentHelper, InteracFavTransactionComponentState> {

  constructor(
      @Optional() controlContainer: ControlContainer,
      formBuilder: FormBuilder,
      private router: Router,
      public _favouriteTransactionHelper: InteracFavTransactionComponentHelper,
    ) { 
      super(formBuilder, router,controlContainer, _favouriteTransactionHelper);
    }
    override doPreInit(){
      this.addElement('favEtransferdetailsGrid');
    }

}
