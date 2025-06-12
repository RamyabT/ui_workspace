import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type {NavigationExtras} from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { CreditcardContextMenuComponent } from 'src/app/credit-cards/creditcard-context-menu/creditcard-context-menu.component';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';
import { CreditcardService } from 'src/app/credit-cards/creditcard-service/creditcard.service';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import {DepUiAlertRichtextContentComponent, DepUiAlertRichtextContentData} from 'src/app/dep/core/component/dep-ui-alert-richtext-content/dep-ui-alert-richtext-content.component';
import { CreditcardSharedBusinessLogic } from 'src/app/credit-cards/creditcard-shared-business-logic/creditcard-shared-business-logic';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-cards-panel',
  templateUrl: './cards-panel.component.html',
  styleUrls: ['./cards-panel.component.scss']
})
export class CardsPanelComponent extends BaseFpxFunctionality implements OnInit {
  @Output() onCardsDataReceived: EventEmitter<any> = new EventEmitter<any | null>();
  protected _appConfig: AppConfigService = inject(AppConfigService);
  creditCards!: Creditcard[];

  private restrictedServices: any;
  contextMenuItems: any;
  quickActionsMenu: { [cardRef: string]: QuickAction[] } = {};
  currentAccountNumber: string | undefined;

  contextMenuPositionX: number = 0;
  contextMenuPositionY: number = 0;
  isDisplayContextMenu: boolean = false;
  cardData!: Creditcard;
  menuOptionBoundingRect: any;
  total: any = {};
  accountCurrency: any;
  currentIndex: any;
  creditcardApiFailed: ApiError | undefined = undefined;
  constructor(
    protected device: DeviceDetectorService,
    private _router: Router,
    private creditCardService: CreditcardService,
    private _commonService: CommonService,
    private _menuService: CustomMenuService,
    protected languageService: LanguageService,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fileOpenerService: FileOpenerService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _creditCardSharedBusinessLogic: CreditcardSharedBusinessLogic,
  ) {
    super()
  }

  ngOnInit(): void {
    this._menuService.getTreeMenuReceived$().pipe(
      mergeMap(() => this.creditCardService.fetchCreditcardSummary())
    ).subscribe({
      next: (response: any) => {
        this.creditCards = (response?.length > 0) ? response : [];

        let totalCAD = 0;
        let totalUSD = 0;
        if (this.creditCards.length > 0) {
          this.creditCards.forEach(card => {
            const outstandingAmount = card.outstandingAmount || 0;
            if (card.accountCurrency == this._appConfig.baseCurrency) {
              totalCAD = totalCAD + outstandingAmount;
            }
            else {
              this.accountCurrency = card.accountCurrency;
              totalUSD = totalUSD + outstandingAmount;
            }
            this.setupQuickActions(card);
          });
          this.total = {
            totalCAD: totalCAD.toFixed(2),
            totalUSD: {
              amount: totalUSD.toFixed(2),
              accountCurrency: this.accountCurrency
            }
          }
        }
        // console.log(this.total.totalCAD,"this CAD")
        // if (!this.total.totalCAD || this.total.totalCAD === undefined) {
          
        //   this.total.totalCAD = '00'
        // }
        this.onCardsDataReceived.emit({ accounts: this.creditCards, total: this.total });
      },
      error: (err) => {
        //this.onCardsDataReceived.emit({ accounts: [], total: {} });
        this.creditCards = [];
        switch (err?.status) {
          case 500:
            this.creditcardApiFailed = ApiError.DATA_CORRUPTED;
            break;
          case 408:
            this.creditcardApiFailed = ApiError.TIMEOUT;
            break;
          default:
            this.creditcardApiFailed = ApiError.UNAVAILABLE;
        }
        this.onCardsDataReceived.emit({accounts:[],total:{totalCAD: '0.00', totalUSD: {amount: '0.00', accountCurrency: ''}}, hasError: true});
      }
    });
  }

  ngAfterViewInit() {

  }

  private setupQuickActions(card: Creditcard) {
    const quickactions: QuickAction[] = this.quickActionsMenu[card.cardRefNumber] = [];
    if (this._creditCardSharedBusinessLogic.userIsPrimaryCardholder(card)) {
      const menuCode = this._creditCardSharedBusinessLogic.getMenuCodeBasedOnCard(card);
      let contextMenu = this._menuService.getMenuList(menuCode);
      let serviceMenus = (contextMenu ?? []).filter((menuItem) => 
        this._creditCardSharedBusinessLogic.filterMenuListBasedOnCardLockUnlockStatus(this.cardData, menuItem)
      );
      const configuredQuickActionItems = serviceMenus.slice(0, this.getNumQuickActionItems(card)) as any;
      configuredQuickActionItems.forEach((configuredMenuItem: any) => {
        quickactions.push({
          serviceCode: configuredMenuItem.serviceCode,
          serviceDescriptionI18n: configuredMenuItem.serviceDescriptionI18n,
          serviceDescription: configuredMenuItem.serviceDescription,
          showTooltip: false,
        })
      });
    }
  }

  cardHasActiveAccountStatus(card: any | Creditcard): boolean {
    return this._creditCardSharedBusinessLogic.cardHasActiveAccountStatus(card);
  }
  cardHasInactiveAccountStatus(card: any | Creditcard): boolean {
    return this._creditCardSharedBusinessLogic.cardHasInactiveAccountStatus(card);
  }
  cardHasDerogatoryAccountStatus(card: any | Creditcard): boolean {
    return this._creditCardSharedBusinessLogic.cardHasDerogatoryAccountStatus(card);
  }

  payCard($event: any) {
    $event.preventDefault();
    $event.stopPropagation()
  }

  lockCard($event: any) {
    $event.preventDefault();
    $event.stopPropagation()
  }

  showMoreActions(cardData: Creditcard) {
    let modal = new FpxModal();
    modal.setComponent(CreditcardContextMenuComponent);
    modal.setPanelClass('context-menu-popup-full-height');
    modal.setDisableClose(false);
    modal.setData({
      cardData: cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  };

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  /** Display context menu */
  displayContextMenu($event: any, card: Creditcard, index?: number): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.resetActiveMenu();

    if (this.device.isMobile()) {
      this.showMoreActions(card);
      return;
    }
    this.menuOptionBoundingRect = $event.currentTarget?.getBoundingClientRect();
    this.cardData = card;
    this.getContextMenu();
    this.currentIndex = index;
  }

  setMenuPosition() {
    let currentTarget = this.menuOptionBoundingRect;
    let menuDefaultHeight = 20;
    let quickMenuHeight = ((this.contextMenuItems.length * (menuDefaultHeight)) + 32) + this.contextMenuItems.length * 16 + 3 * 16;
    let footerHeight = 0;
    let menuTopFromCurrentTarget = this.device.isMobile() ? 38 : 42;
    let menuLeftToCurrentTarget = this.device.isMobile() ? 32 : 36;
    let menuSpaceTopY = menuTopFromCurrentTarget + quickMenuHeight;
    let endBottomY = currentTarget.top + menuTopFromCurrentTarget + quickMenuHeight + footerHeight;
    let quickMenuWidth = 280;

    this.contextMenuPositionX = currentTarget.left + menuLeftToCurrentTarget - quickMenuWidth;
    if (endBottomY < window.innerHeight) {
      this.contextMenuPositionY = currentTarget.top + menuTopFromCurrentTarget;
    }
    else if (currentTarget.top > menuSpaceTopY) {
      let finalY = currentTarget.top - 6 - quickMenuHeight;
      this.contextMenuPositionY = finalY;
    }
    else {
      this.contextMenuPositionY = currentTarget.top + 36 - (quickMenuHeight / 2);
    }
    this.isDisplayContextMenu = true;
    setTimeout(() => {
      this.creditCards[this.currentIndex].displayContextMenu = true;
      this._changeDetectorRef.detectChanges();
    }, 100);
  }

  resetActiveMenu() {
    this.creditCards?.forEach(element => {
      element.displayContextMenu = false;
    });
    this._changeDetectorRef.detectChanges();
  }

  /** context-menu */
  getContextMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.contextMenuPositionX}px`,
      top: `${this.contextMenuPositionY}px`,
    };
  }

  @HostListener('document:click', ['$event'])
  toggleProfile(event: Event): void {
    this.isDisplayContextMenu = false;
    this.resetActiveMenu();
  }

  getNumQuickActionItems(card: Creditcard) {
    let numActions = 0;
    if (this.device.isDesktop() && this._creditCardSharedBusinessLogic.userIsPrimaryCardholder(card)) {
      numActions = 2;
      if (this._creditCardSharedBusinessLogic.cardNeedsToBeActivated(card)) {
        numActions++;
      }
    }
    return numActions;
  }

  getContextMenu() {
    const menuCode = this._creditCardSharedBusinessLogic.getMenuCodeBasedOnCard(this.cardData);
    let contextMenu = this._menuService.getMenuList(menuCode);
    const authorizedCardHolderMenuItems = this._menuService.getMenuList('CREDMENU2');
    let serviceMenus =  (contextMenu ?? [])
      .filter((menuItem) => 
        this._creditCardSharedBusinessLogic.filterMenuListBasedOnCardLockUnlockStatus(this.cardData, menuItem),
      ).filter((menuItem) => 
        this._creditCardSharedBusinessLogic.filterMenuListBasedOnPrimaryCardHolder(this.cardData, menuItem, authorizedCardHolderMenuItems)
      );
    this.contextMenuItems = serviceMenus.slice(this.getNumQuickActionItems(this.cardData));

    if (this.route?.snapshot?.queryParams?.['serviceCode'] && this.contextMenuItems.length > 0) {
      let menu = this.contextMenuItems.find((x: any) => x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
      this.openLink(menu);
    }
    this.setMenuPosition();
  }

  openLink(menu: any) {
    this._appConfig.setData('creditCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.serviceCode);

    setTimeout(() => {
      this._router.navigate(service.servicePath, {
        queryParams: {
          // accountNumber: this.cardData!.primaryCardAccNumber,
          routeFrom: 'otherModule',
          cardRefNumber: this.cardData!.cardRefNumber
        }
      });
    });
    this.isDisplayContextMenu = false;
    this.resetActiveMenu();
  }
  getQuickActions(card: Creditcard) {
    return this.quickActionsMenu[card.cardRefNumber];
  }
  onClickQuickAction(event: Event, card: Creditcard, serviceCode: string)  {
    event.stopPropagation();
    this._activeSpaceInfoService.setOrginSpace("home");
    this._appConfig.setData('creditCardData', card);
    const service = this._appConfig.getServiceDetails(serviceCode);
    this._activeSpaceInfoService.setAccountNumber(card.cardRefNumber);
    const navExtras: NavigationExtras = {
      queryParams: {
        routeFrom: 'otherModule',
        cardReference: card.cardRefNumber,
      }
    };
    if (serviceCode === 'RETAILCCSTATEMENT') {
      navExtras.queryParams!['serviceCode'] = serviceCode;
    }
    this._router.navigate(service.servicePath, navExtras);
  }
  showQuickMenuTooltip(event: Event, card: Creditcard, quickAction: QuickAction) {
    for (const cardRef in this.quickActionsMenu) {
      this.quickActionsMenu[cardRef].forEach((q) => (q.showTooltip = false));
    }
    event.stopPropagation();
    event.preventDefault();
    quickAction.showTooltip = true;
  }
  hideQuickMenuTooltip(event: Event, card: Creditcard, quickAction: QuickAction) {
    event.stopPropagation();
    event.preventDefault();
    quickAction.showTooltip = false
  }
  newCreditCard() {
    this._fileOpenerService.openLink('https://www.vancity.com/bank/credit-cards/');
  }
  linkAccount() {
    const modal = new FpxModal();
    modal.setComponent(DepUiAlertRichtextContentComponent);
    modal.setPanelClass('ui-alert-richtext-content');
    modal.setBackDropClass(["dep-popup-back-drop"]);
    modal.setDisableClose(false);
    modal.setData({
      title: 'cardsPanel.linkAccountModal.title',
      messageHtml: 'cardsPanel.linkAccountModal.messageHtml',
      primaryButtonLabel: 'cardsPanel.linkAccountModal.primaryButtonLabel',
      iconClass: 'icon-link-account',
    } as DepUiAlertRichtextContentData);
    
    this.openModal(modal);

  }
  onClickDerogatoryStatus(event: Event) {
    event.stopPropagation();
    const modal = new FpxModal();
    modal.setComponent(DepUiAlertRichtextContentComponent);
    modal.setPanelClass('ui-alert-richtext-content');
    modal.setBackDropClass(["dep-popup-back-drop"]);
    modal.setDisableClose(false);
    modal.setData({
      title: 'cardsPanel.derogatoryAccountModal.title',
      messageHtml: 'cardsPanel.derogatoryAccountModal.messageHtml',
      primaryButtonLabel: 'cardsPanel.derogatoryAccountModal.primaryButtonLabel',
      iconClass: 'icon-alert-hexagon',
    } as DepUiAlertRichtextContentData);
    
    this.openModal(modal);
  }
  getAbsoluteValue(value: number | undefined): any {
    return value ? Math.abs(value) : 0;
  }
  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
  gotoCards(card: Creditcard) {
    this._activeSpaceInfoService.setAccountNumber(card.cardRefNumber);
    this._appConfig.setData('creditCardData', card);
    this._router.navigate(['cards-space'], {
      queryParams: {
        cardRefNumber: card.cardRefNumber,
      },
    });
  }
}
enum ApiError {
  UNAVAILABLE = 'UNAVAILABLE',
  DATA_CORRUPTED = 'DATA_CORRUPTED',
  TIMEOUT = 'TIMEOUT',
}
interface QuickAction extends ServiceMenuItem {
  showTooltip: boolean;
}
interface ServiceMenuItem {
  serviceCode: string;
  serviceDescriptionI18n?: any;
  serviceDescription?: string;
}