import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { DepositsMobLinkAccountsComponent } from '../deposits-mob-link-accounts-list/deposits-mob-link-accounts-list.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';

@Component({
  selector: 'app-deposits-mob-quick-actions',
  templateUrl: './deposits-mob-quick-actions.component.html',
  styleUrls: ['./deposits-mob-quick-actions.component.scss']
})
export class DepositsMobQuickActionsComponent extends BaseFpxFunctionality implements OnInit {

  title: string = 'Aviso Wealth*';
  protected _appConfig: AppConfigService = inject(AppConfigService);
   protected isPopup:boolean = false;
  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    protected _device: DeviceDetectorService,
    private _router:Router
  ) {
    super();
  }

  ngOnInit(): void {
    //this.moreActions =  this._dialogData.moreActionsList;
    // this.linkAcccountsLists=[{
    //   name:
    // }]

    // let refreshAvisoMobDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    //     this._appConfig.setData('refreshAvisoMobDtl$', {
    //       "observable": refreshAvisoMobDtl$.asObservable(),
    //       "subject": refreshAvisoMobDtl$
    //     });
    
    //     let refreshQtradeMobDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    //     this._appConfig.setData('refreshQtradeMobDtl$', {
    //       "observable": refreshQtradeMobDtl$.asObservable(),
    //       "subject": refreshQtradeMobDtl$
    //     });
  }

  openLink(menu:any){
    console.log("MORE ACTION: ", menu);
    this._dialogRef.close(menu);
  }
  closeContextMenu() {
    this._dialogRef.close();
  }

  goToAvisoOnline(){

  }

  goToLinkAccount(){
  
    let modal = new FpxModal();
      modal.setComponent(DepositsMobLinkAccountsComponent);
      modal.setPanelClass('context-menu-popup');
      modal.setDisableClose(false);
      modal.setData({
        title: "Link account",
       // moreActionsList: this.moreMobileList
      });
      modal.setAfterClosed(this.onCloseMoreActionPopup);
      this.openModal(modal);
      this.isPopup = true;
  }

    onCloseMoreActionPopup: FpxModalAfterClosed = (menu: any) => {
   
     this._dialogRef.close();
    this.isPopup = false;
  }

  goToUnlinkAccount()
{
 const fpxModal = new FpxModal();
          // fpxModal.setComponent(DepAlertComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          // fpxModal.setBackDropClass('etransfer-send-limits');
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
          fpxModal.setDisableClose(true);
          fpxModal.setAfterClosed(this.MenuClose);
          fpxModal.setData({
            title: "Remove this account?",
            message: "Do you wish to remove your current Aviso Wealth* account from your online banking?",
            confirmationIcon: 'alert',
            okBtnLbl: 'Confirm',
            cancelBtnLbl: 'Back'
          });
          this.openModal(fpxModal);
}

    MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    
       
            //this._router.navigate(['/home']);
            this._dialogRef.close();
        
}
    

}
