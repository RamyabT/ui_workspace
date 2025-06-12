import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { MembershipService } from './membership.service';
import { Membership } from './membership.model';

@Component({
  selector: 'app-membership-panel',
  templateUrl: './membership-panel.component.html',
  styleUrls: ['./membership-panel.component.scss'],
  providers: [
    MembershipService
  ]
})
export class MembershipPanelComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);
  membership!: Membership[];
  @Output() onMemebershipsDataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
  total: any = {};
  accountCurrency: string = '';
  membershipApiFailed: boolean = false;
constructor(
    protected device:DeviceDetectorService,
    private _router: Router,
    private _membershipService: MembershipService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
  ) { }

  ngOnInit(): void {
    this._membershipService.fetchMembership().subscribe({
      next: (res: any) => {
        this.membership = (res?.length > 0) ? res : [];

        let totalCAD:any = 0;
        let totalUSD:any = 0;
        if(this.membership.length > 0) {
          this.membership.forEach(card => {
            if(card.accountCurrency == this._appConfig.baseCurrency) {
              totalCAD = totalCAD + card.availableBalance;
            }
            else {
              this.accountCurrency = card.accountCurrency;
              totalUSD = totalUSD + card.availableBalance;
            }
          });
          this.total = {
            totalCAD: totalCAD.toFixed(2),
            totalUSD: totalUSD.toFixed(2)
          }
        }
        this.onMemebershipsDataReceived.emit({accounts:this.membership,total:this.total});
      },
      error: (error) => {
        // console.log("Membership Accounts fetch error");
        // this.onMemebershipsDataReceived.emit({accounts:[],total:{}});
        this.membership = [];
        this.membershipApiFailed = true;
        this.onMemebershipsDataReceived.emit({accounts:[],total:{totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}, hasError: true});
      },
      
    });
  }

  ngAfterViewInit(){
    
  }

  sendMoney() {

  }

  payBill() {

  }
  gotoAccounts(accountNumber: string) {
    return;
    if(this.device.isMobile()) this._activeSpaceInfoService.setModule('membership');
    this._activeSpaceInfoService.setAccountNumber(accountNumber);
    this._router.navigate(['accounts-space','membership']);
   
  }

  getAbsoluteValue(value: any | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: any | undefined): string {
    return value && value < 0 ? '-' : '';
  }

}
