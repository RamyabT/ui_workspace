import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { APPCONSTANTS } from '@dep/constants';
import { Router } from '@angular/router';
import { AccountsSpaceManager } from '../accounts-space.manager';
import { BaseFpxFormHelper, BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { DepositsAccountsListComponent } from 'src/app/deposits/deposits-accounts-list/deposits-accounts-list.component';
import { DepositsLinkAccountsListComponent } from 'src/app/deposits/deposits-link-accounts-list/deposits-link-accounts-list.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'accounts-module-header',
  templateUrl: './accounts-module-header.component.html',
  styleUrls: ['./accounts-module-header.component.scss']
})
export class AccountsModuleHeaderComponent extends BaseFpxFunctionality implements OnInit {
  protected headerNavBackCallback: any;
  protected headerNavBackRequired: boolean = false;
  protected newAccount: boolean = true;
  protected _depositAccountType = '';
   shouldResetAction = false;

   @Output('onClickingViewAllLink') onClickingViewAllLink: EventEmitter<any> = new EventEmitter();
  constructor(
    protected _activeSpaceInfoService: ActiveSpaceInfoService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _router: Router,
    private _appConfig: AppConfigService,
    private device: DeviceDetectorService,
    private _dialogRef: MatDialogRef<any>,
  ) { 
     super();
  }

  ngOnInit(): void {
    APPCONSTANTS.headerNavBackRequired$.asObservable().subscribe({
      next: (res: any) => {
        this.headerNavBackCallback = res?.callback || undefined;
      }
    });

    if (this._activeSpaceInfoService.getDepositAccountType() == 'AVISO' ||this._activeSpaceInfoService.getDepositAccountType() == 'QTRADE') {
      this.newAccount = false;
    }
  }

  ngAfterViewInit() {

  }
  goToHome() {
    if(this._accountsSpaceMgr.getInvestmentNavigation()){
      if (this._appConfig.hasData('investmentHoldings$')) {
        this._appConfig.getData('investmentHoldings$').subject.next({
          enableInvestmentHoldings: false
        });
      }
      if (this._appConfig.hasData('refreshAvisoDtl$')) {
        this._appConfig.getData('refreshAvisoDtl$').subject.next({
          refreshAvisoDtl: false
        });
      }
      if (this._appConfig.hasData('refreshQtradeDtl$')) {
        this._appConfig.getData('refreshQtradeDtl$').subject.next({
          refreshQtradeDtl: false
        });
      }
      if(this.device.isMobile()){
        this._router.navigate(['accounts-space']);
      }
      else{
        this._router.navigate(['accounts-space','deposits']);
      }
    }
    else{
      if (this._accountsSpaceMgr.getViewAll()) {
        this._accountsSpaceMgr.setViewAll(false);
      }
      else {
        this._router.navigate(['/home']);
      }
    }
  }

  openLink(menu: any) {

  }
  ngOnDestroy() {
  }
  
     viewAllLink(){
    // this.onClickingViewAllLink.emit();
    let modal = new FpxModal();
       modal.setComponent(DepositsLinkAccountsListComponent);
       modal.setPanelClass('dep-alert-popup');
       modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'all-link-accounts-list']);
       //modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'all-accounts-list']);
       modal.setDisableClose(true);
       modal.setData({
         title: 'Link account'
        //  depositsList: this.state.deposits,
        //  selectedAccount: this.state.selectedAccount,
        //  fromAccountsModule: true
       });
       modal.setAfterClosed(this.accountSelectedAfterClose);
       this.openModal(modal);

  }
  
   accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
   
      if (payload.action === 1) {
       // this.state.selectedAccount = payload.data;
        // this.setValue('accountNumber', payload.data.accountNumber);
       // this._activeSpaceInfoService.setAccountNumber(this.state.selectedAccount);
      //   if (this._appConfig.hasData('showInvestmentSecurites$')) {
      //     this._appConfig.getData('showInvestmentSecurites$').subject.next({
      //       showInvestmentSecurites: true,
      //       depositAccount: payload.data.accountNumber
      //     });
      //   }
      // }
      this.shouldResetAction = true;
    }
    this._dialogRef.close();


}
}