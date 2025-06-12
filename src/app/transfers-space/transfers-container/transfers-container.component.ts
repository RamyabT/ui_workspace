import { Component, ElementRef, OnDestroy, OnInit, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, CriteriaQuery, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { AccountnicknameService } from 'src/app/accounts/accountnickname-service/accountnickname.service';
import { CASAAccountsListComponent } from 'src/app/accounts/casa-accounts-list/casa-accounts-list.component';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { Eligibletoaccount } from 'src/app/foundation/eligibletoaccount-service/eligibletoaccount.model';
import { EligibletoaccountService } from 'src/app/foundation/eligibletoaccount-service/eligibletoaccount.service';
import { BeneficiariesService } from 'src/app/transfers/beneficiaries-service/beneficiaries.service';
import { BeneinternalService } from 'src/app/transfers/beneinternal-service/beneinternal.service';

@Component({
  selector: 'app-transfers-container',
  templateUrl: './transfers-container.component.html',
  styleUrls: ['./transfers-container.component.scss']
})
export class TransfersContainerComponent  extends BaseFpxFunctionality  implements OnInit, OnDestroy {
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  
  protected activeTabIndex: number = 0;
  protected moduleHeaderTop: number = 0;
  highlightMenu: string = '';
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
  eligibleAccounts: any;
  protected appConstant: any = APPCONSTANTS;
  accountNickName: any;
  serviceCode: string = "RETAILDASHBOARD";
  isEntryForm: boolean = false;
  hasAtleastOneTransferFromAccount: boolean = false;
  hasAtleastOneTransferToAccount: boolean = false;
  casaAccountsApiFailed: boolean = false;

  constructor(
    private _appConfig: AppConfigService,
    private _router: Router,
    private casaAccountService: CasaaccountService,
    private eligibletoaccountService: EligibletoaccountService,
    private _accountnicknameService: AccountnicknameService,
    private _beneinternalService: BeneinternalService,
    private _beneficiariesService: BeneficiariesService,
    private _accountSpaceMgr: AccountsSpaceManager
  ) {
    super();
   }

  ngOnInit(): void {
    this._appConfig.setData("activeMenuId", 'TRANSFERS');
    if(!this._device.isMobile()){
      let moduleRefresh$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('moduleRefresh$', {
        "observable": moduleRefresh$.asObservable(),
        "subject": moduleRefresh$
      });
    }

    let accountDropdownChange$:BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appConfig.setData('accountDropdownChange$', {
        "observable": accountDropdownChange$.asObservable(),
        "subject": accountDropdownChange$
      });
    
    let transfersUpdate$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('transfersUpdate$', {
      "observable": transfersUpdate$.asObservable(),
      "subject": transfersUpdate$
    });
    if (!APPCONSTANTS.requiredAccountsSpaceNavigation) {
      this.getCasaAccountsDetails();
      this.getBeneficiaryAccountsDetails();
      // this.getEligibleAccountsList();
    }

    console.log(this.getRoutingParam())
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    console.log(this.getRoutingParam())
  }

  getCasaAccountsDetails() {
    setTimeout(() => {
      this.showSpinner();
    }, 100);
    let cq = new CriteriaQuery();
    let accountNickName$ = this._accountnicknameService.findAll(cq)();
    let casaSummary$ = this.casaAccountService.fetchCasaAccounts();
    let preferredAccountSummary$ = this.casaAccountService.fetchPreferredAccount();
    let eligibleAccountListSummary$ = this.eligibletoaccountService.fetchEligibleAccounts();

    combineLatest([accountNickName$, casaSummary$, preferredAccountSummary$, eligibleAccountListSummary$]).subscribe({
      next: ([nickName, accounts, preferredAccount, eligibleAccountList]) => {

        setTimeout(() => {
          this.hideSpinner();
        }, 100);

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
          if (isPreferredTransfer == "1" && item.accountNumber == preferredTransferAccountNumber) {
            item.preferredAccount = true;
          }
          tempEligibleAccount.push({ ...item });
        });

        // tempEligibleAccount = [
        //   {
        //     "productDesc": "Chequing Plus",
        //     "transferOut": "1",
        //     "productCode": "AR.RTL.CHQ.TXN.NOFEE",
        //     "accountType": "CA",
        //     "currentBalance": "15649179.71",
        //     "accountNickname": "Chequing Plus",
        //     "accountCurrency": "CAD",
        //     "transferIn": "0",
        //     "accountNumber": "10100057558174",
        //     "availableBalance": "15664129.71"
        //   },
        //   {
        //     "productDesc": "Chequing Plus 2",
        //     "transferOut": "0",
        //     "productCode": "AR.RTL.CHQ.TXN.NOFEE",
        //     "accountType": "CA",
        //     "currentBalance": "156",
        //     "accountNickname": "Chequing Plus",
        //     "accountCurrency": "CAD",
        //     "transferIn": "0",
        //     "accountNumber": "10100057558176",
        //     "availableBalance": "1566"
        //   }
        // ];
        console.log("tempEligibleAccount", tempEligibleAccount);

        accounts?.forEach((item: Casaaccount) => {
          let itemNickname = this.accountNickName?.find((x: any) => item.accountNumber === x.accountNumber);
          if (isPreferredBillPayments == "1" && item.accountNumber == preferredBillPaymentsAccountNumber) {
            item.preferredAccount = true;
          }
          if(itemNickname){
            tempCasaAccount.push({ ...item, accountNickname: itemNickname?.nickName });
          }
          else{
            tempCasaAccount.push({ ...item});
          }
        });


        tempEligibleAccount.forEach((item: any) => {
          tempCasaAccount.forEach((casaItem: any) => {
            if (item.accountNumber == casaItem.accountNumber) {
              item.accountTypeDesc = casaItem.accountTypeDesc;
            }
          });
        });

        // tempCasaAccount = tempCasaAccount.filter(item=>item.accountCurrency == 'CAD');
        this.accountNumber = tempCasaAccount[0]?.accountNumber;
        this._activeSpaceInfoService.setAccountNumber(this.accountNumber);
        this.casaAccounts = tempCasaAccount;
        this._appConfig.setData("CASAAccounts", tempCasaAccount);
        this.onCasaAccountReceivedHandler(tempCasaAccount);

        this.hasAtleastOneTransferFromAccount = this.checkForAtleastOneTransferFromAccount(tempEligibleAccount);
        this.hasAtleastOneTransferToAccount = this.checkForAtleastOneTransferToAccount(tempEligibleAccount);
        if (this.hasAtleastOneTransferFromAccount) {

        } else {
          this.openUnavailableEligibleAccountsPopup()
        }

        console.log("hasAtleastOneTransferFromAccount", this.hasAtleastOneTransferFromAccount)
        console.log(tempEligibleAccount)
        this._accountSpaceMgr.setEligibleAccountsList(tempEligibleAccount);
        this._appConfig.setData('wholeEligibleAccountsList', tempEligibleAccount);
      },
      error: (error: any) => {
        setTimeout(() => {
          this.hideSpinner();
        }, 100);
        console.log("error", error)
        this.casaAccountsApiFailed = true;
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
      message: "eligibleUnavailable.message",
      description: "eligibleUnavailable.description",
      okBtnLbl: "eligibleUnavailable.okBtnLbl",
      cancelBtnLbl: "eligibleUnavailable.cancelBtnLbl",
      confirmationIcon: "transfers-alert"
    })
    modal.setAfterClosed(this.unavailablePopupAfterClosed);
    this.openModal(modal);
  }

  unavailablePopupAfterClosed: FpxModalAfterClosed = (payload: any) => {
    this._router.navigate(['home'])
  }

  checkForAtleastOneTransferFromAccount(eligibleAccountList: any[]) {
    let transferOutAccounts = eligibleAccountList.filter((item: any) => item.transferOut == '1');
    return transferOutAccounts.length > 0 ? true : false;
  }

  checkForAtleastOneTransferToAccount(eligibleAccountList: any[]) {
    let transferInAccounts = eligibleAccountList.filter((item: any) => item.transferIn == '1');
    return transferInAccounts.length > 0 ? true : false;
  }

  getBeneficiaryAccountsDetails() {

    this._beneinternalService.findAll()().subscribe({
      next:(value: any)=>{
        this._accountSpaceMgr.setBeneficiaryList(value.data);

        this._appConfig.setData('BENEACCOUNTSLIST', value.data)
      },
      error:(err: any)=> {
        
      },
    });

  }

  getEligibleAccountsList() {
    this.eligibletoaccountService.fetchEligibleAccounts().subscribe({
      next: (value: any) => {
        console.log("value", value)
        this._accountSpaceMgr.setEligibleAccountsList(value);
        this._appConfig.setData('wholeEligibleAccountsList', value);
      },
      error: (err: any) => {

      }
    })
  }



  ngAfterViewInit(){
    if(this._device.isMobile()){
      setTimeout(()=>{
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      });
    }
  }

  ngOnDestroy(){
    if(this._appConfig.hasData('moduleRefresh$')){
      this._appConfig.getData('moduleRefresh$').subject.unsubscribe();
      this._appConfig.removeData('moduleRefresh$');
    }
    if(this._appConfig.hasData('accountDropdownChange$')){
      this._appConfig.getData('accountDropdownChange$').subject.unsubscribe();
      this._appConfig.removeData('accountDropdownChange$');
    }
  }

  currentCard: Casaaccount | undefined;
  accountNumber: string = '';
  cardReady: boolean = false;
  showCard : boolean = true;
  onSelectCard(currentCard: Casaaccount) {
    this.currentCard = currentCard;
    this.accountNumber = currentCard?.accountNumber;
    this.cardReady = true;
    this.showCard = true;
    this._activeSpaceInfoService.setAccountNumber(this.accountNumber);
    // if(!APPCONSTANTS.requiredAccountsSpaceNavigation){
    //   this._router.navigate(['payments-space'], {
    //     queryParams: {
    //       rid: Math.floor(Math.random() * 99999999)
    //     }
    //   });
      
    // } 
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
    this.openModal(modal);
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

  onTabChanged($event:any){}

  onCasaAccountReceivedHandler(casaAccountsList:Casaaccount[]){
    if(casaAccountsList && casaAccountsList.length != 0){
      this._accountSpaceMgr.setCasaAccountsList(casaAccountsList);
      this.isReceivedAccounts = casaAccountsList;
    }
    else {
      this.isReceivedAccounts = [];
    } 
  }


  addNewAccount() {
    this.showTemplate = true;
    this.isReceivedAccounts = [];
    this._router.navigate(['accounts-space','entry-shell','accounts','retail-open-new-casa-form'],{
      queryParams:{
        routeFrom: 'otherModule',
        navTo: 'openNewCasa',
        title:' Apply for CASA Account'
      }
    });
  }

  onActivate(component: any) {
    if(component.activeTabIndex && this.showTemplate) this.checkCASAData();
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

  goBack(){
    this._router.navigate(['home']);
  }

}
