import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { BaseFpxFunctionality, CriteriaQuery } from '@fpx/core';
import { EtransfercustomerService } from '../etransfercustomer-service/etransfercustomer.service';
import { Etransfercustomer } from '../etransfercustomer-service/etransfercustomer.model';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { APPCONSTANTS } from '@dep/constants';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';

@Component({
  selector: 'app-e-transfers-container',
  templateUrl: './e-transfers-container.component.html',
  styleUrls: ['./e-transfers-container.component.scss']
})
export class ETransfersContainerComponent extends BaseFpxFunctionality implements OnInit {
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;
  @ViewChild('loadMoreStart', { static: false, read: ElementRef }) loadMoreStart!: ElementRef;
  @ViewChild('loadMoreEnd', { static: false, read: ElementRef }) loadMoreEnd!: ElementRef;

  private observerStart: any;
  private observerEnd: any;
  stikcyStart: boolean = false;
  stikcyEnd: boolean = false;

  protected moduleHeaderTop: number = 0;
  protected activeTabIndex: number = 0;
  protected hasInteracProfile: any;
  protected appConstant: any = APPCONSTANTS;

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

  constructor(
    protected _deviceMgr: DeviceDetectorService,
    private _eTransferCustomerService: EtransfercustomerService,
    private _router: Router,
    public deviceService: DeviceDetectorService,
    private cd: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
    private _appConfig: AppConfigService,
    private casaAccountService: CasaaccountService,
    private _accountnicknameService: AccountnicknameService,
    private _accountSpaceMgr: AccountsSpaceManager
  ) {
    super();
    activeRoute.queryParams.subscribe((params: any) => {
      if (params && params.refresh && params.refresh == 'Y') {
        this.handleFormOnLoad();
      }
    });
  }

  handleFormOnLoad() {
    let navPath: string[] = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-customer-form'];
    let queryParams: any = {};
    // this.showSpinner();
    this._eTransferCustomerService.fetcheTransferCustomer()().subscribe({
      next: (res: any) => {
        // this.hideSpinner();
        let requestURLInfo = JSON.parse(localStorage.getItem('requestURLInfo') || '{}');
        localStorage.removeItem('requestURLInfo');
        if (res) {
          this.hasInteracProfile = true;
          this._appConfig.setData('eTransferCustomerData', res);
          if (this.getRoutingParam().throughSearch) {
            let serviceCode = this.getRoutingParam().serviceCode;
            let service = this._appConfig.getServiceDetails(serviceCode);
            navPath = service.servicePath;
            queryParams.mode = "M"
          } else {
            if (this.deviceService.isMobile()) {
              if (requestURLInfo && Object.keys(requestURLInfo).length != 0) {
                if (requestURLInfo.requestType == 'receiveMoneyRequest') {
                  navPath = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-receive-money-form'];
                }
                if (requestURLInfo.requestType == 'fulFillRequest') {
                  navPath = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-fulfill-request-money'];
                }
                if (requestURLInfo.requestType == 'reclaimMoneyRequest') {
                  navPath = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-reclaim-money-form'];
                }
              }
              else {
                navPath = ['etransfers-space'];
              }
            }
            else {
              if (requestURLInfo && Object.keys(requestURLInfo).length != 0) {
                if (requestURLInfo.requestType == 'receiveMoneyRequest') {
                  navPath = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-receive-money-form'];
                }
                if (requestURLInfo.requestType == 'fulFillRequest') {
                  navPath = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-fulfill-request-money'];
                }
                if (requestURLInfo.requestType == 'reclaimMoneyRequest') {
                  navPath = ['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-reclaim-money-form'];
                }
              }
              else {
                // if()
                console.log("AAAA")
                navPath = ['etransfers-space', 'etransfers', 'etransfers-home'];
              }

            }
          }
        }
        else {
          this.hasInteracProfile = false;
        }

        this._angularRouter.navigate(navPath, { queryParams: queryParams });
        this.cd.detectChanges();
      },
      error: (err) => {
        // this.hideSpinner();
        this._angularRouter.navigate(navPath);
        console.log("error is", err);
      }
    });

  }

  ngOnInit(): void {
    this.getCasaAccountsDetails();
    if(!this._deviceMgr.isMobile()){
      this._appConfig.setData("activeMenuId", 'ETRANSFERS');
    }
    else {
      this._appConfig.setData("activeMenuId", 'MOBETRANSFERS');
    }
    this.handleFormOnLoad();
    let etransfersUpdate$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('etransfersUpdate$', {
      "observable": etransfersUpdate$.asObservable(),
      "subject": etransfersUpdate$
    });
  }



  ngAfterViewInit() {
    // if (this._deviceMgr.isMobile()) {
    //   setTimeout(() => {
    //     this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
    //   });
    // }
    // this.observerStart = new IntersectionObserver(entries => {
    //   var entry = entries[0];
    //   if (entry.isIntersecting) {
    //     this.stikcyStart = false;
    //   }
    //   else {
    //     this.stikcyStart = true;
    //   }
    // }, {
    //   rootMargin: '0px',
    //   threshold: 0.9
    // });
  
    // if(this.loadMoreStart) 
    //   this.observerStart.observe(this.loadMoreStart.nativeElement);
  }

  casaAccounts: any;
  accountNickName: any;
  getCasaAccountsDetails(){
    let cq = new CriteriaQuery();
    let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
    let preferredAccountSummary$ = this.casaAccountService.fetchPreferredAccount();
    combineLatest([casaSummary$, preferredAccountSummary$]).subscribe({
      next: ([accounts, preferredAccount]) => {
        let isPreferred = preferredAccount?.[0]?.isPreferred;
        let preferredAccountNumber = preferredAccount?.[0]?.accountNumber;
        let tempCasaAccount: Casaaccount[] = [];
        accounts?.forEach((item: Casaaccount) => {
          let itemNickname = this.accountNickName?.find((x: any) => item.accountNumber === x.accountNumber);
          if(isPreferred == "1" && item.accountNumber == preferredAccountNumber) {
            item.preferredAccount = true;
          }
          if(itemNickname){
            tempCasaAccount.push({ ...item, accountNickname: itemNickname?.nickName });
          }
          else{
            tempCasaAccount.push({ ...item});
          }
        });
        // tempCasaAccount = tempCasaAccount.filter(item=>item.accountCurrency == 'CAD');
        this.casaAccounts = tempCasaAccount;
        if(tempCasaAccount && tempCasaAccount.length != 0){
          this._accountSpaceMgr.setCasaAccountsList(tempCasaAccount);
        }
      }
    });
  }

  onTabChanged($event: any) { }

  onActivate(component: any) {

  }

  back() {
    document.getElementsByClassName("body-home-container")[0].scrollTop = 0;
  }

  toggleTheme() {
    console.log('toggleTheme')
    const currentTheme = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', currentTheme ? 'dark' : 'light');
  }

}
