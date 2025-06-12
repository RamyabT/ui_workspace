import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { PaymentsQuickActionsComponent } from '../payments-quick-actions/payments-quick-actions.component';

@Component({
  selector: 'payments-contextual-actions',
  templateUrl: './payments-contextual-actions.component.html',
  styleUrls: ['./payments-contextual-actions.component.scss']
})
export class PaymentsContextualActionsComponent extends BaseFpxFunctionality implements OnInit {
  @Input('accountNumber') accountNumber: string = '';
  @Input('cardData') cardData: Casaaccount | undefined;;

  

  protected quickLinks: any;
  protected showMore:boolean = false;
  protected quickActionsList:any;

  constructor(
    private _appConfig: AppConfigService,
    private _router: Router,
    protected languageService: LanguageService,
    private _menuService: CustomMenuService
  ) {
    super();
   }

  ngOnInit(): void {
    this.quickLinks = [
      // {
      //   id: "pay-bill",
      //   name: "<em>Pay </em>Bill",
      //   serviceCode: "RETAILCATEGORYGROUPBILLER"
      // },
      // {
      //   id: "add-payee",
      //   serviceDescription: "Add payee",
      //   serviceCode: "RETAILBILLERACCOUNT"
      // },
      // {
      //   id: "manage-payee",
      //   serviceDescription: "Manage Payee",
      //   serviceCode: "RETAILSAVEDBILLER"
      // },
      // {
      //   id: "scheduled-bills",
      //   serviceDescription: "Scheduled bills",
      //   serviceCode: "RETAILVIEWSCHEDULEDBILLS"
      // }
    ];
    this.getContextMenu();
    }
    getContextMenu() {
      let contextMenu = this._menuService.getMenuList('BILLSMENU');
        let serviceMenus = contextMenu;
        this.quickLinks = serviceMenus;
    }

  openLink(menu:any){
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    // this._router.navigate(service.servicePath, {
    //   queryParams: {
    //     // accountNumber: this.accountNumber
    //   }
    // });
  }

  showMoreActions(){
    let modal = new FpxModal();
    modal.setComponent(PaymentsQuickActionsComponent);
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
