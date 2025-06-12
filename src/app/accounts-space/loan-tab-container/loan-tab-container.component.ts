import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { CustomMenuService } from '@dep/services';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { Loans } from '../../loans/loans-service/loans.model';
import { LoansService } from '../../loans/loans-service/loans.service';
import { APPCONSTANTS } from '@dep/constants';
import { Router } from '@angular/router';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { CASAAccountsListComponent } from 'src/app/accounts/casa-accounts-list/casa-accounts-list.component';
import { LOANAccountsListComponent } from 'src/app/loans/loan-accounts-list/loan-accounts-list.component';

@Component({
  selector: 'loan-tab-container',
  templateUrl: './loan-tab-container.component.html',
  styleUrls: ['./loan-tab-container.component.scss']
})
export class LoanTabContainerComponent extends BaseFpxFunctionality implements OnInit{
  @Output('onLoanAccountReceived') onLoanAccountReceived: EventEmitter<Loans[]> = new EventEmitter();

  protected device: DeviceDetectorService = inject(DeviceDetectorService);
  protected appConstants:any = APPCONSTANTS;
  loanAccounts!: Loans[];
  accountNickName!: any;
  chartData: any;
  accountsInsights: Map<string, any> = new Map();
  casaQuickActions: any[] = [];
  quickMenus: any[] = [];
  restrictedServices: any;
  accountNumber: string = '';
  cardReady: boolean = false;
  showCard: boolean = true;
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
  currentCard: Loans | undefined;
  serviceCode : string = "RETAILDASHBOARD";
  
  constructor(
    private _loansService: LoansService,
    private _accountnicknameService: AccountnicknameService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) { 
    super();
  }

  ngOnInit(): void {
    this._loansService.fetchLoans().subscribe({
      next: (res) => {
        this.loanAccounts = (res?.length > 0) ? res : [];;
        this.onLoanAccountReceived.emit(this.loanAccounts);
      },
      error: (error) => {
        console.log("Casa accounts fetch error");
      }
    });
  }

  ngAfterViewInit(){ }

  getAccountsInsights(accountNumber: string) {
    this._loansService.fetchLoansInsights(accountNumber).subscribe({
      next: (response) => {
        this.accountsInsights.set(accountNumber, response);
        this.chartData = response;
      }
    });
  }

  getQuickActions(){
    let _quickMenus = this._menuService.getMenuList('LOANQUICK');
    let serviceMenus = _quickMenus;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = _quickMenus.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickMenus = serviceMenus;
  }

  onSelectCard(currentCard: Loans) {
    this.currentCard = currentCard;
    this.showCard = true;
    this.accountNumber = currentCard?.loanAccountNumber;
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
        }
      });
    }
  }

  viewAll() {
    this.showCard = false;
    let modal = new FpxModal();
    modal.setComponent(LOANAccountsListComponent);
    modal.setPanelClass('full-view-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Selected Account',
      loansList: this.loanAccounts,
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

}
