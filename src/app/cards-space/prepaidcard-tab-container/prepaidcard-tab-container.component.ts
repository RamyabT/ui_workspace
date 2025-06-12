import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';
import moment from 'moment';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { PpCard } from 'src/app/prepaidcard/ppCard-service/ppCard.model';
import { PpCardService } from 'src/app/prepaidcard/ppCard-service/ppCard.service';
import { Prepaidcard } from 'src/app/prepaidcard/prepaidcard-service/prepaidcard.model';
import { PrepaidcardService } from 'src/app/prepaidcard/prepaidcard-service/prepaidcard.service';

@Component({
  selector: 'prepaidcard-tab-container',
  templateUrl: './prepaidcard-tab-container.component.html',
  styleUrls: ['./prepaidcard-tab-container.component.scss']
})
export class PrepaidCardTabContainerComponent implements OnInit {
  @Output('onPrepaidCardReceived') onPrepaidCardReceived: EventEmitter<Prepaidcard[]> = new EventEmitter();

  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  prepaidCards!: Prepaidcard[];
  accountNickName!: any;
  quickLinks: any;
  chartData: any;
  accountsInsights: Map<string, any> = new Map();
  casaQuickActions: any[] = [];
  quickMenus: any[] = [];
  restrictedServices: any;

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
  currentCard: Prepaidcard | undefined;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  prepaidcardDetails!: PpCard;
  currency: any;

  constructor(
    private prepaidcardService: PrepaidcardService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    private cd: ChangeDetectorRef,
    private _appConfig:AppConfigService,
    private _router: Router,
    private retailPCDetailsFormService: PpCardService
  ) { }

  ngOnInit(): void {
    this.prepaidcardService.fetchPrepaidardSummary().subscribe({
      next: (response: any) => {
        this.prepaidCards = (response?.length > 0) ? response : [];
        this.onSelectCard(this.prepaidCards[0]);
        this.onPrepaidCardReceived.emit(this.prepaidCards);
      }
    });

  }

  ngAfterViewInit(){

  }

  getAccountsInsights(event: any) {
    let accountNumber = this.currentCard?.cardRefNumber;
    let payload = {
      fromDate: event.currentSpendDate.startOf('month').format('YYYY-MM-DD'),
      toDate: event.currentSpendDate.endOf('month').format('YYYY-MM-DD'),
      accountNumber: accountNumber,
      currencycode: event.currency
    }

    this.prepaidcardService.fetchPrepaidcardInsights(payload).subscribe({
      next: (response) => {
        // this.accountsInsights.set(accountNumber, response);
        if(this.prepaidCards.length > 0) {
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
        if(this.prepaidCards.length > 0) {
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

  getPrepaidCardDetails() {
    let key: any = {
      cardReference: this.currentCard?.cardRefNumber,
    };
    setTimeout(() => {
      window.scrollTo(0,0);
    },100);
    this.retailPCDetailsFormService
      .findByKey(key)()
      .subscribe((res: any) => {
        this.prepaidcardDetails = res;
        this.currency = res.balanceDetails[0].currency;
        this.getAccountsInsights({
          'currency': this.currency,
          'currentSpendDate': moment()
        });
      });
  }

  getMenuCodeByStatus(status: string) {
    let menuCode = '';
    switch (status) {
      case 'blocked': menuCode = 'PCQUICKBLOCK'; break;
      case 'blocked permanently': menuCode = 'PCQUICKBLOCKP'; break;
      case 'active': menuCode = 'PCQUICK'; break;
    }
    return menuCode;
  }

  getQuickActions(){
    let _quickMenus = this._menuService.getMenuList(this.getMenuCodeByStatus(this.currentCard!.status?.toLowerCase()));
    let serviceMenus = _quickMenus?JSON.parse(JSON.stringify(_quickMenus)): [];

    // if(this.restrictedServices && this.restrictedServices.length){
    //   serviceMenus = serviceMenus.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    // }

    if(serviceMenus?.length > 0) {
      // let moreAction = {
      //     "serviceCode": "RETAILPCMOREMENU",
      //     "name": "RETAILPCMOREMENU",
      //     "icon": "",
      //     "serviceDescription": "More Actions",
      //     "id": "DCQUICK4"
      // };
      // serviceMenus.push(moreAction);
      if(this.currentCard?.multiCurrencySupported == 'No') {
        let index = serviceMenus.findIndex((x: any)=>x.serviceCode == 'RETAILPREPAIDWALLETTRAN');
        if(index != -1) {
          serviceMenus.splice(index,1)
        }
      }
    }

    this.quickMenus = serviceMenus;
    console.log("this.quickMenus", this.quickMenus);
    this.cd.detectChanges();
  }

  onSelectCard(prepaidcard: Prepaidcard) {
    if(!prepaidcard) {
      this.chartData = [];
      return;
    } 
    this.currentCard = prepaidcard;
    let accountNumber = prepaidcard.cardNumber;
    if (this.accountsInsights.has(accountNumber)) {
      this.chartData = this.accountsInsights.get(accountNumber);
    } else {
      this.getPrepaidCardDetails();
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
  getContextMenu(){
    let contextMenu = this._menuService.getMenuList('PCMENU');
    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickLinks = serviceMenus;
  }
  unBlockCard() {
    this._appConfig.setData('prepaidCardData', this.currentCard);
    this._activeSpaceInfoService.setAccountNumber(this.currentCard!.accountNumber);
    setTimeout(()=>{
      this._router.navigate(['cards-space','entry-shell','prepaidcard','retail-pc-unblock-form'], {
        queryParams: {
          accountNumber: this.currentCard?.accountNumber
        }
      });
    });
  }

  activateCard() {
    this._appConfig.setData('prepaidCardData', this.currentCard);
    this._activeSpaceInfoService.setAccountNumber(this.currentCard!.accountNumber);
    setTimeout(()=>{
      this._router.navigate(['cards-space','entry-shell','prepaidcard','retail-pc-activate-form'], {
        queryParams: {
          accountNumber: this.currentCard?.accountNumber
        }
      });
    });
  }
}
