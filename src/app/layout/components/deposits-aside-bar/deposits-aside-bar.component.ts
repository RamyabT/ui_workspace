import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { BaseFpxFunctionality, CriteriaQuery, FpxAppConfig, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { StopchequeService } from 'src/app/accounts/stopcheque-service/stopcheque.service';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { ObapplicantsignatureService } from 'src/app/onboarding/obapplicantsignature-service/obapplicantsignature.service';
import { gsap } from "gsap";
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
declare let $: any;
@Component({
  selector: 'deposits-aside-bar',
  templateUrl: './deposits-aside-bar.component.html',
  styleUrls: ['./deposits-aside-bar.component.scss']
})
export class DepositsAsideBarComponent extends BaseFpxFunctionality implements OnInit, AfterViewInit {
  protected appConsatance: any = APPCONSTANTS;
  expandAsideBar: boolean = true;
  showWidget: boolean = true;
  shouldResetAction: boolean = false;
  showAvisoDetails: boolean = false;
  showQtradeDetails: boolean = false;
  isAviso: boolean = false;
  isQtrade: boolean = false;
  selectedInvestement: any;
  investmentHoldings: any;
  enableInvestmentHoldings: boolean=false;
  deposits: any;
  selectedDeposit: any
  securityNum: any
  selectedSecurityNum: any

  constructor(private _router: Router, private _appConfig: FpxAppConfig,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService,
    private _translateService: TranslateService,
    private _casaTransactionDtls: CasatransactiondtlsService,
    private _dialogRef: MatDialogRef<any>,
    public _obService: ObapplicantsignatureService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _stopChequeService: StopchequeService,
    public _appconfig: AppConfigService,
    private cd: ChangeDetectorRef,
    protected _accountSpaceMgr: AccountsSpaceManager,
  ) {
    super();
  }

  ngOnInit(): void {

    let refreshAvisoDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('refreshAvisoDtl$', {
      "observable": refreshAvisoDtl$.asObservable(),
      "subject": refreshAvisoDtl$
    });

    let refreshQtradeDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('refreshQtradeDtl$', {
      "observable": refreshQtradeDtl$.asObservable(),
      "subject": refreshQtradeDtl$
    });


    if (this._appConfig.hasData('refreshAvisoDtl$')) {
      this._appConfig.getData('refreshAvisoDtl$').observable.subscribe(
        (res: any) => {
          console.log("refreshAvisoDtl", res);
          this.showAvisoDetails = res?.refreshAvisoDtl ? true : false;
          this.selectedSecurityNum=null;
          this.securityNum=null;
        })
    }
    
    if (this._appConfig.hasData('refreshQtradeDtl$')) {
      this._appConfig.getData('refreshQtradeDtl$').observable.subscribe(
        (res: any) => {
          console.log("refreshQtradeDtl", res);
          this.showQtradeDetails = res?.refreshQtradeDtl ? true : false;
        })
    }

    if (this._appConfig.hasData('avisoWealthFlag$')) {
      this.isAviso = true;
    }

    if (this._appConfig.hasData('qtradeFlag$')) {
      this.isQtrade = true;
    }

    let investmentHoldings$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('investmentHoldings$', {
      "observable": investmentHoldings$.asObservable(),
      "subject": investmentHoldings$
    });

    if (this._appConfig.hasData('investmentHoldings$')) {
      this._appConfig.getData('investmentHoldings$').observable.subscribe(
        (res: any) => {
          console.log("investmentHoldings", res);
          if(res){
            this.investmentHoldings = res?.investmentHoldings;
            this.selectedInvestement=res?.selectedInvestement;
            this.enableInvestmentHoldings=res?.enableInvestmentHoldings;
            this.showQtradeDetails=true;
            this.showAvisoDetails=true;
            this.deposits = this._accountSpaceMgr.getDeposits();
            let activeAccountNumber= this._activeSpaceInfoService.getAccountNumber();
            this.deposits= this.deposits.filter((item: any) => activeAccountNumber == item.accountNumber);
            this.selectedDeposit=this.deposits[0];
            this.selectedSecurityNum=this.selectedInvestement?.securityNum;
          }
        });
    }

  }

  ngAfterViewInit() {
  }
  toggleAsideBar() {
    this.expandAsideBar = !this.expandAsideBar;
    this.showWidget = this.expandAsideBar;
  }
  unlinkAccount() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    modal.setDisableClose(true);
    modal.setData({
      title: "Remove this account?",
      message: "Do you wish to remove your current Aviso Wealth* account from your online banking?",
      okBtnLbl: "Confirm",
      cancelBtnLbl: "Back",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }
  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload.action === 1) {
      this.shouldResetAction = true;
    }
    this._dialogRef.close();
  }
  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
  getInvestementTransactions(item: any){
   if(this.securityNum){
    this.selectedSecurityNum=null;
      if(this.securityNum==item.securityNum){
      }
      else{
        this.securityNum=item.securityNum;
      this._activeSpaceInfoService.setDepositSecurity(item);
      if (this._appConfig.hasData('investmentTranscations$')) {
        this._appConfig.getData('investmentTranscations$').subject.next({
          investmentTranscations: true
        });
      }
      }
    }
    else{
      if(this.selectedSecurityNum==item.securityNum){
        this.selectedSecurityNum==item.securityNum
      }
      else{
        this.selectedSecurityNum=null;
        this.securityNum=item.securityNum;
        this._activeSpaceInfoService.setDepositSecurity(item);
        if (this._appConfig.hasData('investmentTranscations$')) {
          this._appConfig.getData('investmentTranscations$').subject.next({
            investmentTranscations: true
          });
        }
      }
    }
  }
}
