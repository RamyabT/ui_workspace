import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { NativeStorageManager } from '@dep/native';
import { AppConfigService } from '@dep/services';
import { CriteriaQuery } from '@fpx/core';
import { combineLatest } from 'rxjs';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);

  adsBannerSlids = [
    {
      id: '01',
      banner: './assets/images/banners/ads-banner1.jpg',
      content: 'BANNER_SLIDES.01'
    },
    { 
      id: '02',
      banner: './assets/images/banners/ads-banner2.jpg', 
      content: 'BANNER_SLIDES.02'
    }, 
    { 
      id: '03',
      banner: './assets/images/banners/ads-banner3.jpg', 
      content: 'BANNER_SLIDES.03'
    }
  ];

  spendData = [
    {
      category: "atm",
      value: 1234,
      currency: this._appConfig.baseCurrency
    },
    {
      category: "food",
      value: 800,
      currency: this._appConfig.baseCurrency
    },
    {
      category: "fuel",
      value: 520,
      currency: this._appConfig.baseCurrency
    },
    {
      category: "medical",
      value: 480,
      currency: this._appConfig.baseCurrency
    },
    {
      category: "travel",
      value: 1100,
      currency: this._appConfig.baseCurrency
    }
  ];
  bannersList:any;
  showAds: boolean = false;
  showClosebtn: boolean = false;
  serviceCode: string = "RETAILDASHBOARD";

  constructor(
    protected device:DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager,
    private _router: Router,
    private _activeSpaceInfo:ActiveSpaceInfoService,
    private _bannerAdsService: BannerAdsService,
    private casaAccountService: CasaaccountService,
    private _accountSpaceMgr: AccountsSpaceManager
  ) { 
    if(this.device.isHybrid() && this.device.getDeviceInfo().os.toLowerCase() == "ios" &&  APPCONSTANTS.enableApplePay){
      this._nativeStorageMgr.loadData("appPayIntroFlag").then(
        (res: any) => {
          if (res) {
            // no action
          } else {
            this._router.navigate(["staging/app-pay-intro"]);
          }
        }
      ).catch(
        (err: any) => {
          this._router.navigate(["staging/app-pay-intro"]);
        }
      );
    }
  }

  ngOnInit(): void {
    this.showAds = sessionStorage.getItem('portfolioShowAds')? true: false;
    this.getCasaAccountsDetails();
    this._activeSpaceInfo.setOrginSpace("home");
    this.serviceCode = this.device.isMobile() ? "RETAILMOBHEADER" : "RETAILDESKHEADER";
    // this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
    //   next: (res: any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //     if(this.bannersList.length > 0) {
    //       this.showAds = true;
    //     }
    //   }
    // });
  }

  ngAfterViewInit(){
    
  }

  close() {
    sessionStorage.removeItem('portfolioShowAds');
    this.showAds = false;
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


  receivedData($event : any){
    console.log("RECIEVVED")
    this.showClosebtn=true;
  }
}
