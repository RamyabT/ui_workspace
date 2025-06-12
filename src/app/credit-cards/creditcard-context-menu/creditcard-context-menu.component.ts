import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { IFpxMenuChild } from '@fpx/layout';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { Creditcard } from '../creditcard-service/creditcard.model';
import { CreditcardSharedBusinessLogic } from '../creditcard-shared-business-logic/creditcard-shared-business-logic';
import { DepUiModalActionsMenuComponent, ActionsMenuData, ActionsMenu } from '../../dep/core/component/dep-ui-modal-actions-menu/dep-ui-modal-actions-menu.component';
import { BaseFpxFunctionality, FpxModal } from '@fpx/core';

@Component({
  selector: 'app-creditcard-context-menu',
  templateUrl: './creditcard-context-menu.component.html',
  styleUrls: ['./creditcard-context-menu.component.scss']
})
export class CreditcardContextMenuComponent extends BaseFpxFunctionality implements OnInit {

  quickLinks: any;
  moreQuickActions: any;
  meunActionsGroupedByType?: ActionsMenu[];
  cardNeedsActivation: boolean = false;
  private _cardData: Creditcard | undefined;
  @Input()
  set cardData(cardData: Creditcard | undefined) {
    this._cardData = cardData;
    if (this._cardData) this.getContextMenu();
  }
  get cardData(): Creditcard | undefined {
    return this._cardData;
  }
  protected showMoreQuickActions: boolean = false;
  protected activeMenu: string = "";

  
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private restrictedServices:any;
  protected isPopup: boolean = false;
  protected hasMoreQuickActions: boolean = false;


  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _appConfig:AppConfigService,
    private _router:Router,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    public _device: DeviceDetectorService,
    protected languageService: LanguageService,
    private route: ActivatedRoute,
    private _creditCardSharedBusinessLogic: CreditcardSharedBusinessLogic,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this._dialogData.hasOwnProperty("cardData")) {
      this.isPopup = true;
      this._cardData = this._dialogData.cardData;
      this.getContextMenu();
    }
    this.cardData = this._dialogData.cardData;

    // const accountNumber = this.cardData.creditCardNumber;
    // if(this._commonService.casaServiceRestriction.has(accountNumber)){
    //   this.restrictedServices = this._commonService.casaServiceRestriction.get(accountNumber);
    //   this.getContextMenu();
    // } else {
    //   this._commonService.fetchServiceRestriction(accountNumber).subscribe({
    //     next: (res) => {
    //       this._commonService.casaServiceRestriction.set(accountNumber, res);
    //       this.restrictedServices = res;
    //       this.getContextMenu();
    //     }
    //   })
    // }
 }

//  prepareContextMenu(accountNumber: string) {
//   this.activeMenu = "";
//   if (this._commonService.casaServiceRestriction.has(accountNumber)) {
//     this.restrictedServices =
//       this._commonService.casaServiceRestriction.get(accountNumber);
//     this.getContextMenu();
//   } else {
//     this._commonService.fetchServiceRestriction(accountNumber).subscribe({
//       next: (res) => {
//         this._commonService.casaServiceRestriction.set(accountNumber, res);
//         this.restrictedServices = res;
//         this.getContextMenu();
//       },
//       error: (reason) => {
//         this.getContextMenu();
//       },
//     });
//   }
// }
  openLink(menu:any){
    if (this.isPopup) {
      this._dialogRef?.close();
    }
    this._appConfig.setData('creditCardData', this.cardData);
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    
    this._activeSpaceInfoService.setAccountNumber(this._cardData!.primaryCardAccNumber);
    this.activeMenu = menu.serviceCode;

    setTimeout(()=>{
      this._router.navigate(service.servicePath, {
        queryParams: {
          cardRefNumber: this.cardData!.cardRefNumber
        }
      });
    });
    this.showMoreQuickActions = false;
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

  getMenuGroupedByType(): ActionsMenu[] {
    const allServiceMenuItems = [...this.quickLinks, ...this.moreQuickActions];
    const actionsServiceCodes = [
      'RETAILCCBILLPAYMENT',
      'RETAILCCSTATEMENT',
      'RETAILCCREWARDS'
    ];
    const settingsServiceCodes = [
      'RETAILCCPINREQ',
      'RETAILCCBLOCK',
      'RETAILCCUNBLOCK',
      'RETAILCCSTATEMENTSETTINGS',
    ];
    const servicesServiceCodes = [
      'RETAILCCRAISEDISPUTE',
      'RETAILCCRAISEDIPUTE',
      'RETAILCCLIMITCHANGE',
      'RETAILCCPRODLIMIT',
      'RETAILCCREPLACE',
    ];
    const actionsActions = allServiceMenuItems.filter((action: any) => actionsServiceCodes.includes(action.serviceCode));
    const servicesActions = this.moreQuickActions.filter((action: any) => servicesServiceCodes.includes(action.serviceCode));
    const settingsActions = allServiceMenuItems.filter((action: any) => settingsServiceCodes.includes(action.serviceCode));

    return [
      {
        heading: 'cardsPanel.contextMenu.actionsHeading',
        menuItems: actionsActions,
      },
      {
        heading: 'cardsPanel.contextMenu.settingsHeading',
        menuItems: settingsActions,
      },
      {
        heading: 'cardsPanel.contextMenu.servicesHeading',
        menuItems: servicesActions,
      }
    ];
  }

  getContextMenu(){
    const menuCode = this._creditCardSharedBusinessLogic.getMenuCodeBasedOnCard(this.cardData);
    let contextMenu = this._menuService.getMenuList(menuCode);
    
    let serviceMenus = (contextMenu ?? []).filter((menuItem) => 
      this._creditCardSharedBusinessLogic.filterMenuListBasedOnCardLockUnlockStatus(this.cardData, menuItem)
    );

    const cardNeedsActivated = this._creditCardSharedBusinessLogic.cardNeedsToBeActivated(this.cardData);

    if (cardNeedsActivated) {
      serviceMenus = serviceMenus.filter((menu: any) => {
        if (menu.serviceCode === 'RETAILCCACTIVATION') {
          this.cardNeedsActivation = true;
          return false;
        };
        return true;
      })
    }
    
    const numVisibleMenuItems = 5;
    this.quickLinks = serviceMenus.slice(0, numVisibleMenuItems);
    this.moreQuickActions = serviceMenus.slice(numVisibleMenuItems);
    this.hasMoreQuickActions = this.moreQuickActions.length > 0;
     
    if (this._device.isMobile()) {
      this.meunActionsGroupedByType = this.getMenuGroupedByType();
    }

    if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
      let menu = this.quickLinks.find((x: any)=>x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
      this.openLink(menu);
    }
  }

  showMoreActions(){
    this.showMoreQuickActions = true;
    let modal = new FpxModal();
    modal.setComponent(DepUiModalActionsMenuComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop']);
    modal.setDisableClose(false);
    const actionsMenu = this.getMenuGroupedByType();
   
    modal.setData({
      heading: 'RetailCreditCardDetails.manageCreditCard.title',
      actionsMenu: actionsMenu,
    } as ActionsMenuData);
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }
  contextmenuModelAfterClose = (actionMenuItem: any) => {
    this.openLink(actionMenuItem);
  }
}
