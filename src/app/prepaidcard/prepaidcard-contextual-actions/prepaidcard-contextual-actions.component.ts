import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
//import { DebitcardContextMenuComponent } from '../debitcard-context-menu/debitcard-context-menu.component';
import { AppConfigService, LanguageService } from '@dep/services';
import { ActiveSpaceInfoService } from 'src/app/dep/core/class/active-space-info.service';
import { PrepaidcardContextMenuComponent } from '../prepaidcard-context-menu/prepaidcard-context-menu.component';

@Component({
  selector: 'app-prepaidcard-contextual-actions',
  templateUrl: './prepaidcard-contextual-actions.component.html',
  styleUrls: ['./prepaidcard-contextual-actions.component.scss']
})
export class PrepaidcardContextualActionsComponent extends BaseFpxFunctionality implements OnInit {

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

  openLink(menu:any){
    let serviceCode = menu.serviceCode;
    this._appConfig.setData('prepaidCardData', this.cardData);

    switch (serviceCode) {
      case 'RETAILPCMOREMENU': this.openContextualMenu(); break;

      case serviceCode: this.openLinkForm(menu);break;


      default: this.openContextualMenu(); break;
    }

  }
  openLinkForm(menu:any){
    this._appConfig.setData('prepaidCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    
    this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);

    setTimeout(()=>{
      this._router.navigate(service.servicePath, {
        queryParams: {
          accountNumber: this.cardData.accountNumber,
          cardRefNumber: this.cardData.cardRefNumber
        }
      });
    });
  }

  openContextualMenu() {
      let modal = new FpxModal();
      modal.setComponent(PrepaidcardContextMenuComponent);
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
