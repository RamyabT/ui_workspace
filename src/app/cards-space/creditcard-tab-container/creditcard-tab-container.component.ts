import { ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import moment from 'moment';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';
import { CreditcardService } from 'src/app/credit-cards/creditcard-service/creditcard.service';
import { CreditCardsListComponent } from 'src/app/credit-cards/creditcards-list/creditcards-list.component';
import { cctransactionsummaryComponent } from 'src/app/credit-cards/retail-cc-transaction-summary/retail-cc-transaction-summary.component';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'creditcard-tab-container',
  templateUrl: './creditcard-tab-container.component.html',
  styleUrls: ['./creditcard-tab-container.component.scss']
})
export class CreditCardTabContainerComponent extends BaseFpxFunctionality implements OnInit {
  @Output('onCreditCardReceived') onCreditCardReceived: EventEmitter<Creditcard[]> = new EventEmitter();
  @ViewChild("ccTransactionSummary") ccTransactionSummary: ComponentRef<cctransactionsummaryComponent> | any;
  @Output('onCreditCardSelected') onCreditCardSelected: EventEmitter<Creditcard> = new EventEmitter();

  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  creditCards!: Creditcard[];
  accountNickName!: any;
  chartData: any;
  accountsInsights: Map<string, any> = new Map();
  casaQuickActions: any[] = [];
  quickMenus: any[] = [];
  restrictedServices: any;
  serviceCode: string = "RETAILDASHBOARD";
  showCard: boolean = false;

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
  currentCard: Creditcard | undefined;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  bannersList: any;
  constructor(
    private creditCardService: CreditcardService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    private _appConfig:AppConfigService,
    private _router: Router,
    private cd: ChangeDetectorRef,
    private _device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService
  ) {
    super();
   }

  ngOnInit(): void {
    this.creditCardService.fetchCreditcardSummary().subscribe({
      next: (response) => {
        this.creditCards = (response?.length > 0) ? response : [];
        this.onSelectCard(this.getDefaultSelectedCard(this.creditCards));
        this.onCreditCardReceived.emit(this.creditCards);
      }
    });
    this.serviceCode = this._device.isMobile() ? "RETAILMOBDASHBOARD" : "RETAILDESKDASHBOARD";
    // this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
    //   next: (res: any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //   }
    // });
  }

  ngAfterViewInit(){
  }

  /**
   * Returns the selected card (using "cardRefNumber") from state service, if any. Otherwise, select the first card in the list.
   */
  private getDefaultSelectedCard(creditCards: Creditcard[]): Creditcard {
    const defaultCreditCard = creditCards[0];
    const selectedCardRefNumberFromAppState = this._activeSpaceInfoService.getAccountNumber();
    const selectedCard = (selectedCardRefNumberFromAppState) ? creditCards.find((card) => card.cardRefNumber === selectedCardRefNumberFromAppState) : defaultCreditCard
    return selectedCard || defaultCreditCard;
  }

  getMenuCodeByStatus(status: string) {
    let menuCode = '';
    switch (status) {
      case 'blocked': menuCode = 'CCQUICKBLOCK'; break;
      case 'blocked permanently': menuCode = 'CCQUICKBLOCKP'; break;
      case 'active': menuCode = 'CCQUICK'; break;
    }
    return menuCode;
  }
   unBlockCard() {
    this._appConfig.setData('creditCardData', this.currentCard);
    this._activeSpaceInfoService.setAccountNumber(this.currentCard!.cardRefNumber);
    setTimeout(()=>{
      this._router.navigate(['cards-space','entry-shell','credit-cards','retail-cc-unblocked-form'], {
        queryParams: {
          accountNumber: this.currentCard?.cardRefNumber
        }
      });
    });
  }

  applyCreditCard() {
    this._router.navigate([
      "cards-space",
      "entry-shell",
      "credit-cards",
      "retail-apply-credit-card"
    ]);
  }

  getAccountsInsights(moment?: any) {
    let accountNumber = this.currentCard?.cardRefNumber;
    let payload = {
      fromDate: moment.startOf('month').format('YYYY-MM-DD'),
      toDate: moment.endOf('month').format('YYYY-MM-DD'),
      accountNumber: accountNumber
    }

    this.creditCardService.fetchCreditCardInsights(payload).subscribe({
      next: (response) => {
        // this.accountsInsights.set(accountNumber, response);
        if(this.creditCards.length > 0) {
          this.chartData = (response?.length > 0) ? response : [{
            category: "",
            value: 100,
            currency: this._appConfig.baseCurrency
          }];
        }
        else {
          this.chartData = [];
        }
      },
      error:(err) => {
        if(this.creditCards.length > 0) {
          this.chartData = [{
            category: "",
            value: 100,
            currency: this._appConfig.baseCurrency
          }];
        }
        else {
          this.chartData = [];
        }
      },
    });
  }

  BillPayment(){
    this._router.navigate(["cards-space","entry-shell","credit-cards","retail-cc-bill-payment"],
    {
      queryParams: {
        serviceCode:"RETAILFORGOTUSERNAME" 
      }
    })

  }
  getQuickActions(){
    let _quickMenus = this._menuService.getMenuList(this.getMenuCodeByStatus(this.currentCard!.status?.toLowerCase()));
    let serviceMenus = _quickMenus?JSON.parse(JSON.stringify(_quickMenus)): [];

    // if(this.restrictedServices && this.restrictedServices.length){
    //   serviceMenus = serviceMenus.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    // }
    // if(serviceMenus?.length > 0) {
    //   let moreAction = {
    //     "serviceCode": "RETAILCCMOREMENU",
    //     "name": "RETAILCCMOREMENU",
    //     "icon": "",
    //     "serviceDescription": "More Actions",
    //     "id": "DCQUICK4"
    //   };
    //   serviceMenus.push(moreAction);
    // }

    this.quickMenus = serviceMenus;
    console.log("this.quickMenus", this.quickMenus);
    this.cd.detectChanges();  
  }
  activateCard() {
    this._appConfig.setData('creditCardData', this.currentCard);
    this._activeSpaceInfoService.setAccountNumber(this.currentCard!.cardRefNumber);
    setTimeout(()=>{
      this._router.navigate(['cards-space','entry-shell','credit-cards','retail-cc-activation-form'], {
        queryParams: {
          accountNumber: this.currentCard?.cardRefNumber
        }
      });
    });
  }
  onSelectCard(creditCard: Creditcard) {
    this.showCard = true;
    if(!creditCard) {
      this.chartData = [];
      return;
    }
    this.currentCard = creditCard;
    this._appConfig.setData('creditCardData', this.currentCard);

    this.ccTransactionSummary?.cctransactionsummaryHelper.onTabChanged({index: 0})
    
    let accountNumber = creditCard.creditCardNumber;
    if (this.accountsInsights.has(accountNumber)) {
      this.chartData = this.accountsInsights.get(accountNumber);
    } else {
      this.getAccountsInsights(moment());
    }

    if(this._commonService.casaServiceRestriction.has(accountNumber)){
      this.restrictedServices = this._commonService.casaServiceRestriction.get(accountNumber);
      this.getQuickActions();
    } else {
      this._commonService.fetchServiceRestriction(accountNumber).subscribe({
        next: (res) => {
          this._commonService.casaServiceRestriction.set(accountNumber, res);
          this.restrictedServices = res;
          this.getQuickActions();
        }
      });
    }
  }

  getSpendPercent() {
    let spend = this.currentCard!.creditLimit - this.currentCard!.availableCreditLimit;
    return ((spend/this.currentCard!.creditLimit)*100);
  }

  viewAll() {
    let selectedCard: any;
    if (this.currentCard?.creditCardNumber) {
      selectedCard = this.currentCard;
    } else {
      selectedCard = this.creditCards[0];
    }

    this.showCard = false;
    let modal = new FpxModal();
    modal.setComponent(CreditCardsListComponent);
    modal.setPanelClass('full-view-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop', 'mobile-all-accounts-list']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Credit Cards',
      accountsList: this.creditCards,
      selectedAccount: selectedCard,
      fromAccountsModule: true
    });
    modal.setAfterClosed(this.creditCardSelectedAfterClose);
    this.openModal(modal);
  }

  creditCardSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (this.device.isMobile()) {
      this.onSelectCardMobile(payload.data);
    } else {
      this.onSelectCard(payload.data);
    }
  }

  onSelectCardMobile(card: Creditcard) {
    this.showCard = true;
    this._activeSpaceInfoService.setAccountNumber(card.cardRefNumber);
    this._appConfig.setData('creditCardData', card);
    this._router.navigate(['cards-space'], {
      queryParams: {
        cardRefNumber: card.cardRefNumber,
      },
    })
  }

}
