import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { DepositsContextualMenuComponent } from '../deposits-contextual-menu/deposits-contextual-menu.component';
import { Deposits, DepositsSummary } from '../deposits-service/deposits.model';
import { AppConfigService } from '@dep/services';
import { Router } from '@angular/router';
import { MoreMenuComponent } from 'src/app/layout/more-menu/more-menu.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DepositsMobLinkAccountsComponent } from '../deposits-mob-link-accounts-list/deposits-mob-link-accounts-list.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';

@Component({
  selector: 'deposits-product-card',
  templateUrl: './deposits-product-card.component.html',
  styleUrls: ['./deposits-product-card.component.scss']
})
export class DepositsProductCardComponent extends BaseFpxFunctionality implements OnInit {

  protected _appConfig: AppConfigService = inject(AppConfigService)
  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;
  @Input('cardData') cardData!: any;
  inverstedAmount: number = 0;
  protected isPopup:boolean = false;

  constructor(
     private _router:Router,
      private _dialogRef: MatDialogRef<any>,
  ) { 
   super();
  }

  ngOnInit(): void {
  }

  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(DepositsContextualMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData,
      isMainProduct: true
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  getInverstmentAmount(){
    this.inverstedAmount = this.cardData.accountDetails.reduce((accumulator: number, currentObj: { depositAmount: any; }) => {
      return accumulator + Number(currentObj.depositAmount);
    }, 0);
    return this.inverstedAmount;
  }


  getInverstmentRegAmount(){
    let inverstedAmount = this.cardData.accountDetails?.reduce((accumulator: number, currentObj: { principalAmount?: string; }) => {
      return accumulator + Number(currentObj.principalAmount);
    }, 0);
    return inverstedAmount;
  }

  getMarketInvestmentAmount(){
    let inverstedAmount = this.cardData.accountDetails.reduce((accumulator: number, currentObj: { totalMarketValue?: any } ) => {
      return accumulator + Number(currentObj.totalMarketValue);
    }, 0);
    return inverstedAmount;
  }
  plusAcc(){
    
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
}
