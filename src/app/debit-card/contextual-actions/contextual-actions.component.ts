import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { DebitcardContextMenuComponent } from '../debitcard-context-menu/debitcard-context-menu.component';
import { AppConfigService, LanguageService } from '@dep/services';
import { ActiveSpaceInfoService } from 'src/app/dep/core/class/active-space-info.service';

@Component({
  selector: 'contextual-actions',
  templateUrl: './contextual-actions.component.html',
  styleUrls: ['./contextual-actions.component.scss']
})
export class ContextualActionsComponent extends BaseFpxFunctionality implements OnInit {

  @Input('quickLinks') quickLinks: any;
  @Input('cardData') cardData: any;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  constructor(private _router: Router,
    private _appConfig: AppConfigService,
    protected languageService: LanguageService) {
    super();
  }

  ngOnInit(): void {

  }

  openLink(menu: any) {
    let serviceCode = menu.serviceCode;
    this._appConfig.setData('debitCardData', this.cardData);
    let status = this.cardData.status;
    // if (status =='Active') {
      switch (serviceCode) {
        case 'RETAILDCMOREMENU': this.openContextualMenu(); break;

        case serviceCode: this.openLinkForm(menu); break;


        default: this.openContextualMenu(); break;
      }

    // }

  }
  openLinkForm(menu: any) {
    this._appConfig.setData('debitCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.serviceCode);

    this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);

    setTimeout(() => {
      this._router.navigate(service.servicePath, {
        queryParams: {
          cardReference: this.cardData.cardRefNumber
        }
      });
    });
  }

  openContextualMenu() {
    let modal = new FpxModal();
    modal.setComponent(DebitcardContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  };

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

}
