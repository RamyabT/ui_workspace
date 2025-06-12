import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed, FpxToastService } from '@fpx/core';
import { CasaContextMenuComponent } from '../casa-context-menu/casa-context-menu.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { AppConfigService } from '@dep/services';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AccountSharingInformationComponent } from '../account-sharing-information/account-sharing-information.component';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { Router } from '@angular/router';

import { DepTooltipComponent } from 'src/app/dep/core/component/dep-tooltip/dep-tooltip.component';

@Component({
  selector: 'casa-summary-card',
  templateUrl: './casa-summary-card.component.html',
  styleUrls: ['./casa-summary-card.component.scss']
})
export class CasaSummaryCardComponent extends BaseFpxFunctionality implements OnInit {

  protected _appConfig: AppConfigService = inject(AppConfigService);


  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any | null>();
  @Input('contextmenuBtn') contextmenuBtn: boolean = false;
  @Input('cardData') cardData!: Casaaccount;
  @Input('payFromLabel') payFromLabel: string = 'Paying From';
  accountNumber: string = "";
  details: any = "";

  dormantInfo = 'CASASUMMARYCARD.dormantInfo';
  showTooltip = false;
  isSharingInProgress: boolean = false;

  constructor(
    protected translate: TranslateService,
    private _commonService: CommonService,
    private _casaAccountService: CasaaccountService,
    private _fpxToastService: FpxToastService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _casaAccountsService: CasaaccountService,
    private _translate: TranslateService,
    public device: DeviceDetectorService,
    private _router: Router
  ) {

    super();
  }

  ngOnInit(): void {
    //console.log(this.cardData);

  }

  MenuClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    setTimeout(() => {
      if (this.device.isMobile()) {
        this._router.navigate(['/home']);
      }
      else {
        if (this._appConfig.hasData('moduleRefresh$')) {
          this._appConfig.getData('moduleRefresh$').subject.next({ action: 'ACCOUNTSQUICKACTION', data: { serviceCode: null } });
        }
        this._router.navigate(['accounts-space/accounts']);
      }
    });
  }
  notifyContextMenuClick() {
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(CasaContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }



  dataShare() {
    this.isSharingInProgress = true;
    this.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    let keys: any = {
      accountNumber: this.accountNumber || this._appConfig.getData('CASAACCOUNTSLIST')[0].accountNumber
    }
    this._casaAccountsService.findByKey(keys)().subscribe({
      next: (res) => {
        let d = res as Casaaccount;
        this.details = d;
        this.details.accountNumber=this.details.accountNumber?.slice(2);
        let modal = new FpxModal();
        modal.setComponent(AccountSharingInformationComponent);
        modal.setPanelClass('dep-alert-popup');
        modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
        modal.setDisableClose(true);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: 'Share',
          accountInfo: this.details

        });
        this.openModal(modal);
      },
      error: (error) => {
        this.isSharingInProgress = false;
      }
    })
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
    this.isSharingInProgress = false;
  }

  getServiceRestriction(accountNumber: string) {
    this._commonService.fetchServiceRestriction(accountNumber).subscribe({
      next: (res) => {
        console.log("fetchServiceRestriction: ", res);
        this._commonService.casaServiceRestriction.set(accountNumber, res);
      },
      error: (reason) => {
        console.log("fetch service restriction error");
      }
    });
  }

  setDefaultAccount(cardData: Casaaccount) {
    this.showSpinner();
    let preferredaccount = {
      "preferredaccount": {
        "accountNumber": cardData.accountNumber,
        "isPreferred": cardData.preferredAccount ? "0" : "1"
      }
    };
    this._casaAccountService.postPreferredAccount(preferredaccount).subscribe({
      next: (res) => {
        cardData.preferredAccount = !cardData.preferredAccount;
        if (this._appConfig.hasData('defaultAccount$')) {
          let sub = this._appConfig.getData('defaultAccount$').subject;
          sub.next(cardData);
        }
        this.hideSpinner();
        let message = cardData.preferredAccount ? "Account set as default" : "Default account removed";
        this._fpxToastService.showSuccessAlert("Success", message, { duration: 2000 });
      },
      error: (reason) => {
        this.hideSpinner();
        console.log("fetch service restriction error");
      }
    });

  }

  openDormantInfo() {
    let modal = new FpxModal();
    modal.setComponent(DepTooltipComponent);
    modal.setPanelClass("dep-tooltip-popup");
    modal.setDisableClose(false);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    modal.setData({
      message: this.dormantInfo,
    });
    this.openModal(modal);
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

}
