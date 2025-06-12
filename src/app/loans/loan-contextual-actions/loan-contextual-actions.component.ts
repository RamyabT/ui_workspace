import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { AppConfigService, LanguageService } from '@dep/services';
import { Loans } from '../loans-service/loans.model';
import { LoanContextMenuComponent } from '../loan-context-menu/loan-context-menu.component';

@Component({
  selector: 'loan-contextual-actions',
  templateUrl: './loan-contextual-actions.component.html',
  styleUrls: ['./loan-contextual-actions.component.scss']
})
export class LoanContextualActionsComponent extends BaseFpxFunctionality implements OnInit {

  @Input('accountNumber') accountNumber: string = '';
  @Input('cardData') cardData: Loans | undefined;;

  @Input('quickLinks') 
  set quickLinks(data:any){
    if(data && data.length){
      if(data.length > 3){
        let cloneList = data.slice();
        this.quickActionsList = cloneList.splice(0,5);
        this.showMore = true;
      } else {
        this.quickActionsList = data;
      }
    }
  }
  get quickLinks(){
    return this.quickActionsList;
  }
  protected showMore:boolean = false;
  protected quickActionsList:any;

  constructor(private _router: Router,
    private _appConfig: AppConfigService,
    protected languageService: LanguageService) { 
    super();
  }

  ngOnInit(): void {

  }

  openLink(menu:any){
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    this._router.navigate(service.servicePath, {
      queryParams: {
        accountNumber: this.accountNumber
      }
    });
  }

  showMoreActions(){
    let modal = new FpxModal();
    modal.setComponent(LoanContextMenuComponent);
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
