import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';
import { BaseFpxFunctionality, CriteriaQuery, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { MenuService } from '@fpx/layout';
import { combineLatest, forkJoin } from 'rxjs';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { CASAAccountsListComponent } from 'src/app/accounts/casa-accounts-list/casa-accounts-list.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { AccountsSpaceManager } from '../accounts-space.manager';

@Component({
  selector: 'casa-tab-container',
  templateUrl: './casa-tab-container.component.html',
  styleUrls: ['./casa-tab-container.component.scss']
})
export class CasaTabContainerComponent extends BaseFpxFunctionality implements OnInit {
  @Output('onAccountsReceived') onAccountsReceived: EventEmitter<Casaaccount[]> = new EventEmitter();

  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  protected appConstants:any = APPCONSTANTS;

  casaAccounts!: Casaaccount[];
  accountNickName!: any;
  chartData: any;
  accountsInsights: Map<string, any> = new Map();
  casaQuickActions: any[] = [];
  quickMenus: any[] = [];
  restrictedServices: any;
  accountNumber: string = '';
  cardReady: boolean = false;
  showCard : boolean = true;
  serviceCode: string = "RETAILDASHBOARD";
  casaAccountsApiFailed: boolean = false;
  casaAccountsFromAccountsSpace: Casaaccount[] = [];
  selecetdAccountNumber: any;
  selectedAccount: any;


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
  currentCard: Casaaccount = {} as Casaaccount;
  constructor(
    private casaAccountService: CasaaccountService,
    private _accountnicknameService: AccountnicknameService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private appConfig: AppConfigService,
    private _accountsSpaceMgr: AccountsSpaceManager,

  ) {
    super();
  }

  ngOnInit(): void {

    let cq = new CriteriaQuery();
    //let accountNickName$ = this._accountnicknameService.findAll(cq)();
    let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
    combineLatest([casaSummary$]).subscribe({
      next: ([accounts]) => {
        //this.accountNickName = nickName.data;
        
        let tempCasaAccount: Casaaccount[] = []
        accounts?.forEach((item: Casaaccount) => {
        
            tempCasaAccount.push({ ...item});

          
        });
        this.casaAccounts = tempCasaAccount;
        this.onAccountsReceived.emit(this.casaAccounts);
      },
      error: (error) => {
        console.error("Error fetching CASA accounts:", error);
        this.casaAccountsApiFailed = true;

        // Reset received accounts
        // Optionally, you can show a user-friendly message or notification here
      }
    });

  }

  ngAfterViewInit() {
    this.casaAccountsFromAccountsSpace = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    if (!accountNumber) {
      accountNumber = this.casaAccountsFromAccountsSpace[0].accountNumber;
    }

    this.selecetdAccountNumber = accountNumber;

    let selectedAccount = this.casaAccountsFromAccountsSpace.filter((item) => item.accountNumber === this.selecetdAccountNumber);
    this.selectedAccount = selectedAccount[0];

    console.log(this.selectedAccount)

    if (this.appConfig.hasData('accountDetailsData$')) {
      this.appConfig.getData('accountDetailsData$').subject.next({ action: 'ACCOUNTDETAILSDATA', data: { accountDetails: this.selectedAccount } });
    }

  }

  getAccountsInsights(accountNumber: string) {
    this.casaAccountService.fetchAccountsInsights(accountNumber).subscribe({
      next: (response) => {
        this.accountsInsights.set(accountNumber, response);
        this.chartData = response;
      }
    });
  }

  getMenuCodeByStatus(status: string | undefined) {
    let menuCode = '';
    switch (status) {
      case 'sba': menuCode = 'CASAQUICKSA'; break;
      case 'caa': menuCode = 'CASAQUICK'; break;
    }
    return menuCode;
  }

  getQuickActions(){
    let contextMenu = this._menuService.getMenuList(this._menuService.getAccountsMenuCodeByAccountType(this.currentCard?.accountType));
    if (this.currentCard?.accountCurrency == 'USD') {
      contextMenu = contextMenu.filter((item: any) => item.serviceCode != 'RETAILMULTIBILLPAYMENT' && item.serviceCode != 'RETAILETRANSFER' && item.serviceCode != 'RETAILMULTIBILLREQUEST')
    }
    let serviceMenus = (contextMenu && contextMenu.length) ? contextMenu : [];
    this.quickMenus = serviceMenus;
  }

  onSelectCard(currentCard: Casaaccount) {
    this.appConfig.setData('selectedAccountNicknameDetails', currentCard);
    this.currentCard = currentCard;
    this.showCard = true;
    this.accountNumber = currentCard?.accountNumber;
    this.cardReady = true;

    this._activeSpaceInfoService.setAccountNumber(this.accountNumber);
    if(!APPCONSTANTS.requiredAccountsSpaceNavigation){
      this._router.navigate(['accounts-space'], {
        queryParams: {
          rid: Math.floor(Math.random() * 99999999)
        }
      });
      
    } else {
      if (this.accountsInsights.has(this.accountNumber)) {
        this.chartData = this.accountsInsights.get(this.accountNumber);
      } else {
        this.getAccountsInsights(this.accountNumber);
      }
    }

    if(this._commonService.casaServiceRestriction.has(this.accountNumber)){
      this.restrictedServices = this._commonService.casaServiceRestriction.get(this.accountNumber);
      this.getQuickActions();
    } else {
      this._commonService.fetchServiceRestriction(this.accountNumber).subscribe({
        next: (res) => {
          this._commonService.casaServiceRestriction.set(this.accountNumber, res);
          this.restrictedServices = res;
          this.getQuickActions();
        },
        error:(err)=> {
          this.getQuickActions();
        },
      });
    }
  }

  openNewCasa() {
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-open-new-casa-form'])
  }


  viewAll() {
    let selectedAccount: any;
    if (this.currentCard?.accountNumber) {
      selectedAccount = this.currentCard;
    }
    else {
      selectedAccount = this.casaAccounts[0];
    }

    this.showCard = false;
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    modal.setPanelClass('full-view-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop', 'mobile-all-accounts-list']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Everyday banking',
      accountsList: this.casaAccounts,
      selectedAccount: selectedAccount,
      fromAccountsModule: true
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

}
