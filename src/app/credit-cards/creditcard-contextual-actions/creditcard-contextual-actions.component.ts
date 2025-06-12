import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { AppConfigService, LanguageService } from '@dep/services';
import { ActiveSpaceInfoService } from '@dep/core';
import { CreditcardContextMenuComponent } from '../creditcard-context-menu/creditcard-context-menu.component';

@Component({
  selector: 'creditcard-contextual-actions',
  templateUrl: './creditcard-contextual-actions.component.html',
  styleUrls: ['./creditcard-contextual-actions.component.scss']
})
export class CreditcardContextualActionsComponent extends BaseFpxFunctionality implements OnInit {

  @Input('quickLinks') quickLinks: any;
  @Input('cardData') cardData: any;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);

  constructor(private _router: Router,
  private _appConfig: AppConfigService,
  protected languageService: LanguageService)
  { 
    super();
  }

  ngOnInit(): void {

  }

  openLink(menu:any){
    let serviceCode = menu.serviceCode;
    this._appConfig.setData('creditCardData', this.cardData);

    switch (serviceCode) {
      case 'RETAILCCMOREMENU': this.openContextualMenu(); break;

      case serviceCode: this.openLinkForm(menu);break;
      default: this.openContextualMenu(); break;
    }
  }

  openLinkForm(menu:any){
    this._appConfig.setData('creditCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    
    this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);

    setTimeout(()=>{
      this._router.navigate(service?.servicePath, {
        queryParams: {
          accountNumber: this.cardData.primaryCardAccNumber,
          cardRefNumber: this.cardData.cardRefNumber
        }
      });
    });
  }

  openContextualMenu() {
      let modal = new FpxModal();
      modal.setComponent(CreditcardContextMenuComponent);
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
