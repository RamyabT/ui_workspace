import { ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { gsap } from "gsap";
import { Membership } from '../membership-panel/membership.model';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';
import { DepositsSummary } from 'src/app/deposits/deposits-service/deposits.model';
import { Loans } from 'src/app/loans/loans-service/loans.model';
import { AppConfigService } from '@dep/services';

declare let $: any;
@Component({
  selector: 'portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss'],
})
export class PortfolioSummaryComponent implements OnInit {
  @Input('accountSummary') accountSummary: any;
  @Input('cardSummary') cardSummary: any;
  portfolioData: any = [
    {
      category: "homeLayout.banking",
      type: "banking",
      data: [],
      total: {},
      hasAccount: true,
      accordianOpened: false,
      dateReceived: false,
      hasError: false,
      showPanel: true
    },
    {
      category: "homeLayout.cards",
      type: "cards",
      data: [],
      total: {},
      hasAccount: true,
      accordianOpened: false,
      dateReceived: false,
      hasError: false,
      showPanel: true
    },
    {
      category: "homeLayout.loans",
      type: "loans",
      data: [],
      total: {},
      hasAccount: true,
      accordianOpened: false,
      dateReceived: false,
      hasError: false,
      showPanel: true
    },
    {
      category: "homeLayout.deposits",
      type: "deposits",
      data: [],
      total: {},
      hasAccount: true,
      accordianOpened: false,
      dateReceived: false,
      hasError: false,
      showPanel: true
    },
    {
      category: "homeLayout.membership",
      type: "membership",
      data: [],
      total: {},
      hasAccount: true,
      accordianOpened: false,
      dateReceived: false,
      hasError: false,
      showPanel: true
    }
  ];

  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  protected _appConfig: AppConfigService = inject(AppConfigService);
  count: number = 0;
  

  constructor(
    protected device:DeviceDetectorService,
    private _router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    // if(this.device.isMobile()) {
      // this.setupAccordionAnimation();
      // this.accountsAccordionIndexes[0].play(); 
    // }
  }

  onAccountDataReceivedHandler(event: any) {

    let accounts = event.accounts;
    let index = this.portfolioData.findIndex((x:any)=> x.type == 'banking');
    this.portfolioData[index].dateReceived = true;
    if(event.hasError) this.portfolioData[index].hasError = true;
    if(accounts?.length > 0) {
      this.portfolioData[index].data = accounts;
      this.portfolioData[index].total = event?.total;
      this._appConfig.setData('CASAACCOUNTSLIST', accounts);
      this.portfolioData[index].accordianOpened = true;
      this.cd.detectChanges();
    }
    else this.portfolioData[index].hasAccount = false;
    this.isAllAccountsReceived('accounts');
  }

  onCardsDataReceivedHandler(event: any) {
    let accounts = event.accounts;
    let index = this.portfolioData.findIndex((x:any)=> x.type == 'cards');
    this.portfolioData[index].dateReceived = true;
    if(event.hasError) this.portfolioData[index].hasError = true;
    if(accounts?.length > 0) {
      this.portfolioData[index].data = accounts;
      this.portfolioData[index].total = event?.total;
      this.cd.detectChanges();
    }
    else this.portfolioData[index].hasAccount = false;
    this.isAllAccountsReceived();
  }
  onDepositsDataReceivedHandler(event: any) {
    let accounts = event.accounts;
    let index = this.portfolioData.findIndex((x:any)=> x.type == 'deposits');
    this.portfolioData[index].dateReceived = true;
    if(event.hasError) this.portfolioData[index].hasError = true;
    if(accounts?.length > 0) {
      this.portfolioData[index].data = accounts;
      this.portfolioData[index].total = event?.total;
      this.cd.detectChanges();
    }
    else this.portfolioData[index].hasAccount = false;
    this.isAllAccountsReceived();
  }
  onLoansDataReceivedHandler(event: any) {
    let accounts = event.accounts;
    let index = this.portfolioData.findIndex((x:any)=> x.type == 'loans');
    this.portfolioData[index].dateReceived = true;
    if(event.hasError) this.portfolioData[index].hasError = true;
    if(accounts?.length > 0) {
      this.portfolioData[index].data = accounts;
      this.portfolioData[index].total = event?.total;
      this.cd.detectChanges();
    }
    else this.portfolioData[index].hasAccount = false;
    this.isAllAccountsReceived();
  }

  onMemebershipsDataReceivedHandler(event: any) {
    let accounts = event.accounts;
    let index = this.portfolioData.findIndex((x:any)=> x.type == 'membership');
    this.portfolioData[index].dateReceived = true;
    if(event.hasError) this.portfolioData[index].hasError = true;
    if(accounts?.length > 0) {
      this.portfolioData[index].data = accounts;
      this.portfolioData[index].total = event?.total;
      this.cd.detectChanges();
      this.isAllAccountsReceived();
      this.portfolioData[index].showPanel = true;
    }
    else {
      this.portfolioData[index].hasAccount = false;
      this.isAllAccountsReceived();
      if(!this.portfolioData[index].hasError) this.portfolioData[index].showPanel = false;
    }
  }

  isAllAccountsReceived(event?:any) {
    ++this.count;
    if(this.count >= 5) {
      if(this.portfolioData.every((x:any)=> x.dateReceived)) {
        this.setupAccordionAnimation();
        this.accountsAccordionIndexes[0].play(); 
      }
    }
    // if(this.portfolioData.every((x:any)=> x.dateReceived)) {
    //   this.setupAccordionAnimation();
    //   this.accountsAccordionIndexes[0].play(); 
    // }
    // if(event == 'accounts') {
    //   this.setupAccordionAnimation();
    //   this.accountsAccordionIndexes[0].play(); 
    // }
  }

  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.portfolioData.forEach((element: any, i: any) => {
      let accordionAnimation = gsap.timeline({ reversed: true, paused: true });
      let target = ".accordion-item-" + i;

      accordionAnimation.eventCallback("onStart", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onUpdate", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onComplete", () => {
        $(target)[0].classList.add('accordion-content-open');
      });

      accordionAnimation.eventCallback("onReverseComplete", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.fromTo(target + " .panel-body", {
        css: { height:0 }
      }, {
        css: { height: 'auto' }
      }, 0);
      
      accordionAnimation.fromTo(target + " .btn-accordion-toggle", {
        css: { rotationZ: 0 }
      }, {
        css: { rotationZ: -180 }
      }, 0);

      this.accountsAccordionIndexes[i] = accordionAnimation;

    },0);
  }

  toggleAccordion(index:number){
    if(index == 4 && !(this.portfolioData[index].data.length > 0)){
      return;
    }
    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    if(this.opnedAccordionIndex == index){

    } else if(this.opnedAccordionIndex >= 0){
      // if(this.device.isMobile()) {
      //   animation = this.accountsAccordionIndexes[this.opnedAccordionIndex]; 
      //   animation.reverse(); 
      //   this.portfolioData.forEach((element: any) => {
      //     element.accordianOpened = false;
      //   });
      // }
    }
    animation = this.accountsAccordionIndexes[index];
    
    if(animation?.reversed()) {
      animation.play();
      this.portfolioData[index].accordianOpened = true;
    }
    else {
      animation?.reverse();
      this.portfolioData[index].accordianOpened = false;
    }
    this.opnedAccordionIndex = index;
    this.cd.detectChanges();
  }

  newAccount(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }
  newDeposit(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }
  newLoan(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.device.isMobile()) {
      this._router.navigate(['accounts-space/apply-loan'])
    } else {
      this._router.navigate(['accounts-space/accounts/apply-loan'])
    }
  }
  newCreditCard(event: any) {
    window.open("https://creditcards.vancity.com/?product=VANCITY", "_blank");
  }
  getAbsoluteValue(value: number | undefined): any {
    return value ? Math.abs(value) : 0;
  }
  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
  checkLoanTotalAmount(value: number | undefined): string {
    return value && value < 0 ? '' : '';
  }
  ngOnDestroy() {
    this.count = 0;
  }
}
