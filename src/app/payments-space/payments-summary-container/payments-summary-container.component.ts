import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { CustomMenuService } from '@dep/services';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'payments-summary-container',
  templateUrl: './payments-summary-container.component.html',
  styleUrls: ['./payments-summary-container.component.scss']
})
export class PaymentsSummaryContainerComponent implements OnInit {
  @Output('onAccountsReceived') onAccountsReceived: EventEmitter<Casaaccount[]> = new EventEmitter();

  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  casaAccounts!: Casaaccount[];
  accountNickName!: any;
  chartData: any;
  accountsInsights: Map<string, any> = new Map();
  casaQuickActions: any[] = [];
  quickMenus: any[] = [];
  restrictedServices: any;
  accountNumber: string = '';

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
    private casaAccountService: CasaaccountService,
    private _commonService: CommonService,
    private _router: Router,
    public _device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.casaAccountService.fetchCasaAccounts().subscribe({
      next: (res) => {
        this.casaAccounts = res;
        this.onAccountsReceived.emit(this.casaAccounts);
      },
      error: (error) => {
        console.log("Casa accounts fetch error");
      }
    });

  }

  ngAfterViewInit(){ }


  onSelectCard(accountNumber: string) {
    this.accountNumber = accountNumber;
    
    if (this.accountsInsights.has(accountNumber)) {
      this.chartData = this.accountsInsights.get(accountNumber);
    } else {
      // this.getAccountsInsights(accountNumber);
    }

    if(this._commonService.casaServiceRestriction.has(accountNumber)){
      this.restrictedServices = this._commonService.casaServiceRestriction.get(accountNumber);
      // this.getQuickActions();
    } else {
      this._commonService.fetchServiceRestriction(accountNumber).subscribe({
        next: (res) => {
          this._commonService.casaServiceRestriction.set(accountNumber, res);
          this.restrictedServices = res;
          // this.getQuickActions();
        }
      });
    }
  }

  openNewCasa() {
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-open-new-casa-form'])
  }

}
