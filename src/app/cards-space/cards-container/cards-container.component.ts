import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { defaultRoutes, mobileRoutes } from '../cards-space-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { DebitcardService } from 'src/app/debit-card/debitcard-service/debitcard.service';
import { CreditcardService } from 'src/app/credit-cards/creditcard-service/creditcard.service';
import { PrepaidcardService } from 'src/app/prepaidcard/prepaidcard-service/prepaidcard.service';
import { Debitcard } from 'src/app/debit-card/debitcard-service/debitcard.model';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';
import { CardsSpaceManager } from '../cards-space.manager';
import { Prepaidcard } from 'src/app/prepaidcard/prepaidcard-service/prepaidcard.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { CreditcardNavigationFormState } from '../creditcard-navigation-form/creditcard-navigation-form.helper';


@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
  providers: [ CardsSpaceManager ]
})

export class CardsContainerComponent implements OnInit {

  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;
  
  protected accountNavigator: string = '';

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  protected _device:DeviceDetectorService = inject(DeviceDetectorService);
  private tabs = ['debit-card', 'credit-card', 'prepaid-card'];
  protected activeTabIndex: number = 0;
  protected moduleHeaderTop: number = 0;

  routes = mobileRoutes;
  debitCardLength: number = 0;
  creditCardLength: number = 0;
  prepaidCardLength: number = 0;
  protected isReceivedAccounts: any = undefined;
  private scrollable:any;
  private targetEl:any;

  private windowScrollY:number = 0;
  noTemplate: boolean = false;
  summary: any;
  showTemplate: boolean = false;
  creditCards: Creditcard[] = [];
  cardData!: CreditcardNavigationFormState;

  constructor( private _router:Router,
    protected creditCardService: CreditcardService,
    protected debitcardService: DebitcardService,
    protected prepaidcardService: PrepaidcardService,
    private _cardsSpaceMgr: CardsSpaceManager,
    private cd: ChangeDetectorRef,
    private _commonService: CommonService,
    private route: ActivatedRoute) { 
    // if(this._device.isMobile()){
    //   this.routes = mobileRoutes;
    // } else {
    //   this.routes = defaultRoutes;
    // }
    
    // this._router.resetConfig(this.routes);
    this.route.queryParams.subscribe(params => {
      if(params['serviceCode']!='RETAILCCLIMITS'){
        let selecetedIndex: any = params['selecetedIndex'];
        if(selecetedIndex) this.activeTabIndex = selecetedIndex;
      }

    });
  }

  ngOnInit(): void {
    let activeModule = this._activeSpaceInfoService.getModule();
    this.activeTabIndex = this.tabs.indexOf(activeModule as string);

    let space = this._activeSpaceInfoService.getActiveSpace();
    if(!activeModule || activeModule == 'home'){
      if(space == 'cards-space') activeModule = 'credit-card';
    }
    this._activeSpaceInfoService.setActiveModule(activeModule as string);
    this.accountNavigator = activeModule as string;

    this._commonService.fetchCardSummary().subscribe({
      next: (res:any) => {
        this.summary = res.cards;
      }
    });

    this.creditCardService.fetchCreditcardSummary().subscribe({
      next: (response) => {
        this.creditCards = (response?.length > 0) ? response : [];
        this.onCreditCardReceivedHandler(this.creditCards);
      }
    })
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      // this.scrollable = document.querySelector('app-root');
      // this.targetEl = document.querySelector('.module-home');
    });
  }

  // @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
  //   this.requestStickView($event);
  // } 

  // requestStickView($event: any){
  //   this.windowScrollY = Math.abs(this.scrollable.getBoundingClientRect().top);
	// 	requestAnimationFrame(this.update.bind(this));
  // }

  // update(){
  //   if (this.windowScrollY >= 320 && !this.targetEl.classList.contains('pin-card')) {
  //     this.targetEl.classList.add('pin-card');
  //   } else if (this.windowScrollY < 320 && this.targetEl.classList.contains('pin-card')) {
  //     this.targetEl.classList.remove('pin-card')
  //   }

  //   if (this.windowScrollY >= 185 && !this.targetEl.classList.contains('pin-module-bg')) {
  //     this.targetEl.classList.add('pin-module-bg');
  //   } else if (this.windowScrollY < 185 && this.targetEl.classList.contains('pin-module-bg')) {
  //     this.targetEl.classList.remove('pin-module-bg')
  //   }
  // }

  onCreditCardReceivedHandler(creditcards:Creditcard[]){
    if(creditcards && creditcards.length != 0){
      this._cardsSpaceMgr.setCreditCardList(creditcards);
      this.isReceivedAccounts = creditcards;
    }
    else {
      this.isReceivedAccounts = [];
      this.showTemplate = false;
    }
    this.creditCardLength = creditcards.length || 0;
  }

  creditCardSelected(currentCreditCard: CreditcardNavigationFormState) {
    this.cardData = currentCreditCard;
  }

  applyCreditCard() {
    this.showTemplate = true;
    this.isReceivedAccounts = [];
    this._router.navigate(["cards-space", "entry-shell","credit-cards","retail-apply-credit-card"],{
      queryParams:{
        routeFrom: 'otherModule',
        // title:'Apply credit card',
        serviceCode: "RETAILAPPLYCREDITCARD"
      }
    });
  }

  onActivate(component: any) {
    if(component.chartData && this.showTemplate) this.checkCreditCardData();
  }

  checkCreditCardData() {
    this.isReceivedAccounts = undefined;
    this.showTemplate = false;
    this.creditCardService.fetchCreditcardSummary().subscribe({
      next: (response) => {
        this.creditCards = (response?.length > 0) ? response : [];
        this.onCreditCardReceivedHandler(this.creditCards)
      }
    });
  }

}
