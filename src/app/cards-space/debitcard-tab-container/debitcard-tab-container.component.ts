import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';
import { CriteriaQuery } from '@fpx/core';
import moment from 'moment';
import { combineLatest } from 'rxjs';
import { Debitcard } from 'src/app/debit-card/debitcard-service/debitcard.model';
import { DebitcardService } from 'src/app/debit-card/debitcard-service/debitcard.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'debitcard-tab-container',
  templateUrl: './debitcard-tab-container.component.html',
  styleUrls: ['./debitcard-tab-container.component.scss']
})
export class DebitCardTabContainerComponent implements OnInit {
  @Output('onDebitCardReceived') onDebitCardReceived: EventEmitter<Debitcard[]> = new EventEmitter();

  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  debitCards!: Debitcard[];
  accountNickName!: any;
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
  currentCard: Debitcard | undefined;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private _appConfig: AppConfigService = inject(AppConfigService);

  constructor(
    private debitcardService: DebitcardService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    private cd: ChangeDetectorRef,
    private _router: Router
  ) { }

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

  ngOnInit(): void {
    this.debitcardService.fetchDebitcardSummary().subscribe({
      next: (response) => {
        this.debitCards = (response?.length > 0) ? response : [];
        this.onSelectCard(this.debitCards[0]);
        this.onDebitCardReceived.emit(this.debitCards);
      }
    });
 }

  ngAfterViewInit(){

  }

  getAccountsInsights(moment?: any) {
    let accountNumber = this.currentCard!.accountNumber;
    let payload = {
      fromDate: moment.startOf('month').format('YYYY-MM-DD'),
      toDate: moment.endOf('month').format('YYYY-MM-DD'),
      accountNumber: accountNumber
    }

    this.debitcardService.fetchDebitCardInsights(payload).subscribe({
      next: (response) => {
        // this.accountsInsights.set(accountNumber, response);
        if(this.debitCards.length > 0) {
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
        if(this.debitCards.length > 0) {
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

  getMenuCodeByStatus(status: string) {
    let menuCode = '';
    switch (status) {
      case 'blocked': menuCode = 'DCQUICKBLOCK'; break;
      case 'blocked permanently': menuCode = 'DCQUICKBLOCKP'; break;
      case 'active': menuCode = 'DCQUICK'; break;
      case 'inactive': menuCode = 'DCQUICKINACTIVE'; break;
    }
    return menuCode;
  }

  getQuickActions(){
    let _quickMenus = this._menuService.getMenuList(this.getMenuCodeByStatus(this.currentCard!.status?.toLowerCase()));
    let serviceMenus = _quickMenus?JSON.parse(JSON.stringify(_quickMenus)): [];

    // if(this.restrictedServices && this.restrictedServices.length){
    //   serviceMenus = serviceMenus.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    // }

    // if(serviceMenus?.length > 0) {
      // let moreAction = {
      //     "serviceCode": "RETAILDCMOREMENU",
      //     "name": "RETAILDCMOREMENU",
      //     "icon": "",
      //     "serviceDescription": "More Actions",
      //     "id": "DCQUICK4"
      // };
      // serviceMenus.push(moreAction);
    // }

    this.quickMenus = serviceMenus;
    console.log("this.quickMenus", this.quickMenus);
    this.cd.detectChanges();
  }

  onSelectCard(debitcard: Debitcard) {
    if(!debitcard) {
      this.chartData = [];
      return;
    } 
    this.currentCard = debitcard;
    let accountNumber = debitcard.accountNumber;
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

  unBlockCard() {
    this._appConfig.setData('debitCardData', this.currentCard);
    this._activeSpaceInfoService.setAccountNumber(this.currentCard!.cardRefNumber);
    setTimeout(()=>{
      this._router.navigate(['cards-space','entry-shell','debit-card','retail-dc-unblock-form'], {
        queryParams: {
          cardReference: this.currentCard?.cardRefNumber
        }
      });
    });
  }

  activateCard() {
    this._appConfig.setData('debitCardData', this.currentCard);
    this._activeSpaceInfoService.setAccountNumber(this.currentCard!.cardRefNumber);
    setTimeout(()=>{
      this._router.navigate(['cards-space','entry-shell','debit-card','retail-activate-dc-form'], {
        queryParams: {
          // accountNumber: this.currentCard?.accountNumber
          cardReference: this.currentCard?.cardRefNumber
        }
      });
    });
  }

}
