import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Deposits } from '../deposits-service/deposits.model';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { DepositsContextualMenuComponent } from '../deposits-contextual-menu/deposits-contextual-menu.component';

@Component({
  selector: 'deposits-summary-card',
  templateUrl: './deposits-summary-card.component.html',
  styleUrls: ['./deposits-summary-card.component.scss']
})
export class DepositsSummaryCardComponent extends BaseFpxFunctionality implements OnInit {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;
  @Input('cardData') cardData!: Deposits;

  constructor() {
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
      cardData: this.cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

}
