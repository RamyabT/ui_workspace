import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, CriteriaQuery, FpxActionMap, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { CASAAccountsListComponent } from 'src/app/accounts/casa-accounts-list/casa-accounts-list.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { Eligibletoaccount } from 'src/app/foundation/eligibletoaccount-service/eligibletoaccount.model';
import { EligibletoaccountService } from 'src/app/foundation/eligibletoaccount-service/eligibletoaccount.service';
import { BillPaymentsService } from 'src/app/foundation/validator-service/billpayments.service';

@Component({
  selector: 'app-payments-container',
  templateUrl: './payments-container.component.html',
  styleUrls: ['./payments-container.component.scss']
})
export class PaymentsContainerComponent extends BaseFpxFunctionality implements OnInit, OnDestroy {
  protected _device: DeviceDetectorService = inject(DeviceDetectorService);
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  // upcomingBillActionMap$: Subject<FpxActionMap> = new Subject();
  show = false;
  upcomingloader: boolean = true;
  upcomingData: any[] = [];
  billhistoryloader: boolean = true;
  billHistoryData: any[] = [];

  savedBillerloader: boolean = true;
  savedBillerData: any[] = [];
  billsApiFailed: boolean = false;

  protected activeTabIndex: number = 0;
  protected moduleHeaderTop: number = 0;
  serviceCode: string = "RETAILDASHBOARD";


  adsBannerSlids = [
    {
      id: '01',
      banner: './assets/images/banners/ads-banner1.jpg',
      content: 'Quick, <br>Easy, <br>Sure and Digital'
    },
    {
      id: '02',
      banner: './assets/images/banners/ads-banner2.jpg',
      content: 'Reach financial freedom with tailored investment'
    },
    {
      id: '03',
      banner: './assets/images/banners/ads-banner3.jpg',
      content: '<h4 class="h4">Personal loan</h4> for any purpose'
    }
  ]
  protected isReceivedAccounts: any = undefined;
  showTemplate: boolean = false;
  casaAccounts: any;
  protected appConstant: any = APPCONSTANTS;
  accountNickName: any;
  showCard: boolean = true;
  multipleBillsSelected: boolean = false;
  selectedBillsCount: number = 0;
  hasAtleastOneTransferFromAccount: boolean = false;
  hasAtleastOneTransferToAccount: boolean = false;

  constructor(
    private _billPaymentsService: BillPaymentsService,
    private _appConfig: AppConfigService,
    private _router: Router,
    private _deviceDetectorService: DeviceDetectorService,
    private _accountSpaceMgr: AccountsSpaceManager,
    private eligibletoaccountService: EligibletoaccountService,
    private casaAccountService: CasaaccountService,
    private _accountnicknameService: AccountnicknameService) {
    super();
  }


  ngOnInit(): void {
    this._appConfig.setData("activeMenuId", 'BILLS');
    // this.getUpcomingBillSummary();
    this.upcomingloader = true;
    this.billhistoryloader = true;
    this.savedBillerloader = true;
    this._billPaymentsService.billpaymentsDesktopActionPublisher = new Subject();

    if (!this._device.isMobile()) {
      let moduleRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });

      let showSelectedScheduleBillDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('showSelectedScheduleBillDetails$', {
        "observable": showSelectedScheduleBillDetails$.asObservable(),
        "subject": showSelectedScheduleBillDetails$
      });

    }
    else {
      let defaultAccount$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('defaultAccount$', {
        "observable": defaultAccount$.asObservable(),
        "subject": defaultAccount$
      });
      this._appConfig.getData('defaultAccount$').observable.subscribe(
        (res: any) => {
          this.casaAccounts.forEach((element: Casaaccount) => {
            if (element.accountNumber != res?.accountNumber) element.preferredAccount = false;
          });
        }
      );
    }

    if (!APPCONSTANTS.requiredAccountsSpaceNavigation) {
      this.getCasaAccountsDetails();
    }
  }

  getCasaAccountsDetails() {
    let cq = new CriteriaQuery();
    let accountNickName$ = this._accountnicknameService.findAll(cq)();
    let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
    let preferredAccountSummary$ = this.casaAccountService.fetchPreferredAccount();
    let eligibleAccountListSummary$ = this.eligibletoaccountService.fetchEligibleAccounts();

    combineLatest([accountNickName$, casaSummary$, preferredAccountSummary$, eligibleAccountListSummary$]).subscribe({
      next: ([nickName, accounts, preferredAccount, eligibleAccountList]) => {

        let isPreferredInterac: any;
        let isPreferredTransfer: any;
        let isPreferredBillPayments: any;
        let preferredIneteracAccountNumber: any;
        let preferredTransferAccountNumber: any;
        let preferredBillPaymentsAccountNumber: any;

        preferredAccount.forEach((item: any) => {
          if (item.serviceCode == "TRANSFERS") {
            isPreferredTransfer = item.isPreferred;
            preferredTransferAccountNumber = item.accountNumber;
          }
          else if (item.serviceCode == "BILLPAYMENTS") {
            isPreferredBillPayments = item.isPreferred;
            preferredBillPaymentsAccountNumber = item.accountNumber;
          }
          else if (item.serviceCode == "INTERAC") {
            isPreferredInterac = item.isPreferred;
            preferredIneteracAccountNumber = item.accountNumber;
          }
        });

        this.accountNickName = nickName.data;
        let tempCasaAccount: Casaaccount[] = [];
        let tempEligibleAccount: any[] = [];

        eligibleAccountList?.forEach((item: Eligibletoaccount) => {
          if (isPreferredBillPayments == "1" && item.accountNumber == preferredBillPaymentsAccountNumber) {
            item.preferredAccount = true;
          }
          tempEligibleAccount.push({ ...item });
        });



        accounts?.forEach((item: Casaaccount) => {
          let itemNickname = this.accountNickName?.find((x: any) => item.accountNumber === x.accountNumber);
          if (isPreferredBillPayments == "1" && item.accountNumber == preferredBillPaymentsAccountNumber) {
            item.preferredAccount = true;
          }
          if (itemNickname) {
            tempCasaAccount.push({ ...item, accountNickname: itemNickname?.nickName });
          }
          else {
            tempCasaAccount.push({ ...item });
          }
        });


        tempEligibleAccount.forEach((item: any) => {
          tempCasaAccount.forEach((casaItem: any) => {
            if (item.accountNumber == casaItem.accountNumber) {
              item.accountTypeDesc = casaItem.accountTypeDesc;
              item.accountStatus = casaItem.accountStatus;
              item.ownership = casaItem.ownership;
            }
          });
        });

        tempCasaAccount = tempCasaAccount.filter(item => item.accountCurrency == 'CAD');



        this.casaAccounts = tempCasaAccount;
        console.log(tempCasaAccount)
        this._appConfig.setCasaAccountList(tempCasaAccount);
        this.onCasaAccountReceivedHandler(tempCasaAccount);

        console.log("tempEligibleAccount in payments container", tempEligibleAccount)

        this.hasAtleastOneTransferFromAccount = this.checkForAtleastOneTransferFromAccount(tempEligibleAccount);
        this.hasAtleastOneTransferToAccount = this.checkForAtleastOneTransferToAccount(tempEligibleAccount);
        console.log("this.hasAtleastOneTransferFromAccount", this.hasAtleastOneTransferFromAccount)
        console.log("this.hasAtleastOneTransferToAccount", this.hasAtleastOneTransferToAccount)

        if (this.hasAtleastOneTransferFromAccount) {
          console.log("hasAtleastOneTransferFromAccount", this.hasAtleastOneTransferFromAccount)
        } else {
          this.openUnavailableEligibleAccountsPopup()
        }

        this._accountSpaceMgr.setEligibleAccountsList(tempEligibleAccount);
        this._appConfig.setData('wholeEligibleAccountsList', tempEligibleAccount);
      },
      error: (error) => {
        this.isReceivedAccounts = [];
        this.billsApiFailed = true;
        this.isReceivedAccounts = [];

      }
    });
  }

  openUnavailableEligibleAccountsPopup() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass("dep-alert-popup");
    modal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'transfers-unavailable-popup', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      message: "eligibleUnavailable.payments.message",
      description: "eligibleUnavailable.payments.description",
      okBtnLbl: "eligibleUnavailable.payments.okBtnLbl",
      cancelBtnLbl: "eligibleUnavailable.payments.cancelBtnLbl",
      confirmationIcon: "transfers-alert",
      hideOkBtn: true
    })
    modal.setAfterClosed(this.unavailablePopupAfterClosed);
    this.openModal(modal);
  }

  unavailablePopupAfterClosed: FpxModalAfterClosed = (payload: any) => {
    this._router.navigate(['home'])
  }

  checkForAtleastOneTransferFromAccount(eligibleAccountList: any[]) {
    let transferOutAccounts = eligibleAccountList.filter((item: any) => item.transferOut == '1' && item.accountCurrency == 'CAD');
    return transferOutAccounts.length > 0 ? true : false;
  }

  checkForAtleastOneTransferToAccount(eligibleAccountList: any[]) {
    let transferInAccounts = eligibleAccountList.filter((item: any) => item.transferIn == '1' && item.accountCurrency == 'CAD');
    return transferInAccounts.length > 0 ? true : false;
  }

  ngAfterViewInit() {
    if (this._device.isMobile()) {
      setTimeout(() => {
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      });
    }
  }
  currentCard: Casaaccount | undefined;
  accountNumber: string = '';
  cardReady: boolean = false;
  onSelectCard(currentCard: Casaaccount) {
    this.currentCard = currentCard;
    this.showCard = true;
    this.accountNumber = currentCard?.accountNumber;
    this.cardReady = true;

    this._activeSpaceInfoService.setAccountNumber(this.accountNumber);
    if (!APPCONSTANTS.requiredAccountsSpaceNavigation) {
      this._router.navigate(['payments-space'], {
        queryParams: {
          rid: Math.floor(Math.random() * 99999999)
        }
      });

    }
  }



  viewAll() {
    this.showCard = false;
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    modal.setPanelClass('full-view-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Selected Account',
      accountsList: this.casaAccounts,
      selectedAccount: this.currentCard
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)

    if (payload.action === 1) {
      this._activeSpaceInfoService.setAccountNumber(payload.data.accountNumber);
      this.onSelectCard(payload.data);
    } else {
      this.showCard = true;
    }
  }

  ngOnDestroy(): void {
    if (!this._deviceDetectorService.isMobile()) {
      this._billPaymentsService?.billpaymentsDesktopActionPublisher?.unsubscribe();
    }
  }

  // getUpcomingBillSummary() {
  //   this.upcomingloader = true;
  //   const criteriaQuery = new CriteriaQuery();
  //   this.upcomingBillActionMap$.next({
  //     action: 'SETGRIDCRITERIA',
  //     'nestedControl': '',
  //     'value': criteriaQuery,
  //     'rowIndex': undefined
  //   })
  // }

  onTabChanged($event: any) {

  }

  onCasaAccountReceivedHandler(casaAccountsList: Casaaccount[]) {
    if (casaAccountsList && casaAccountsList.length != 0) {
      this._accountSpaceMgr.setCasaAccountsList(casaAccountsList);
      this.isReceivedAccounts = casaAccountsList;
    }
    else {
      this.isReceivedAccounts = [];
      this.showTemplate = false;
    }
  }

  addNewAccount() {
    this.showTemplate = true;
    this.isReceivedAccounts = [];
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-open-new-casa-form'], {
      queryParams: {
        routeFrom: 'otherModule',
        navTo: 'openNewCasa',
        title: ' Apply for CASA Account'
      }
    });
  }

  onActivate(component: any) {
    if (component.upcomingData && this.showTemplate) this.checkCASAData();
  }

  checkCASAData() {
    this.isReceivedAccounts = undefined;
    this.showTemplate = false;
    this.casaAccountService.fetchCasaAccounts().subscribe({
      next: (response: any) => {
        this.casaAccounts = (response?.length > 0) ? response : [];
        this.onCasaAccountReceivedHandler(this.casaAccounts);
      },
      error: (error: any) => {
        console.log("Casa accounts fetch error");
      }
    });
  }

  viewAllSavedBiller() {
    let service = this._appConfig.getServiceDetails('RETAILSAVEDBILLER');
    this._angularRouter.navigate(service.servicePath, {
      queryParams: {
        serviceCode: 'RETAILSAVEDBILLER'
      }
    });
  }

  viewAllBillerCategory() {
    let sertvice = this._appConfig.getServiceDetails('RETAILCATEGORYGROUPBILLER');
    this._angularRouter.navigate(sertvice.servicePath, {
      queryParams: {
        serviceCode: 'RETAILCATEGORYGROUPBILLER'
      }
    });
  }

  handleSavedBillerGridEvent(payload: any) {
    this.savedBillerloader = false;
    this.savedBillerData = payload?.payload?.data || [];

  }

  initiateNewTransaction() {

  }

  handleUpcomingBillGridEvent(payload: any) {
    this.upcomingloader = false;
    this.upcomingData = payload?.payload?.data || [];

  }

  handleBillHistoryGridEvent(payload: any) {
    this.billhistoryloader = false;
    this.billHistoryData = payload?.payload?.data || [];

  }

  navToAddBiller() {
    let sertvice = this._appConfig.getServiceDetails('RETAILCATEGORYGROUPBILLER');
    this._angularRouter.navigate(sertvice.servicePath, {
      queryParams: {
        serviceCode: 'RETAILCATEGORYGROUPBILLER'
      }
    });
  }

  toggleTheme() {
    console.log('toggleTheme')
    const currentTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentTheme ? 'dark' : 'light');
  }
}
