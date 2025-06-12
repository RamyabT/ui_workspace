import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { FpxMenuService, IFpxMenuChild } from '@fpx/layout';
import { MoreMenuComponent } from '../../more-menu/more-menu.component';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent extends BaseFpxFunctionality implements OnInit {
  protected _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  protected _device: DeviceDetectorService = inject(DeviceDetectorService);

  public menuList: any[] = [];
  
  public mainMenuList: any[] = [];
  public mobMainMenuList: any[] = [];
  public moreActionsList: any[] = [];
  public moreMobileList: any[] = [];

  activeMenuId: string = "home";
  moreActiveMenuId: string = '';
  protected isPopup:boolean = false;
  constructor(
    private _router: Router,
    private _menuService: CustomMenuService,
    protected _appConfig: AppConfigService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.showSpinner();
    if(this._menuService.menuList){
      console.log("Menu available");
      this.constructMenu();
    } else {
      this._menuService
      .findAll()()
      .subscribe({
        next: (res: Array<any>) => {
          console.log("Menu service called");
          this.constructMenu();
        },
        error: () => { 
          this.hideSpinner();
        },
        complete: () => { 
          this.hideSpinner();
        },
      });
    }
    
  }

  constructMenu(){
    this.hideSpinner();

    this.mainMenuList = this._menuService.getMenuList("DESKMENU");
    const mobileMenuRecords = this._menuService.getMenuList("MOBMENU");
    const mobileMoreMenuRecords = this._menuService.getMenuList("MOBMORE");

    const activeSortedMobMenuCodes = [
      'MOBBILLS', 
      'MOBTRANSFERS', 
      'MOBHOME', 
      'MOBETRANSFERS', 
      'MOBMORE'
    ]

    this.mobMainMenuList = activeSortedMobMenuCodes.map((menuCode) => {
      if (menuCode === 'MOBHOME') {
        return {
          name: 'Home',
          id: 'home'
        };
      } else {
        return mobileMenuRecords.find((record) => record.menuCode === menuCode)
      }
    });

    const activeSortedMobMoreMenuCodes = [
      'MOBEDOCUMENTS',
      'MOBRATES',
      'MOBOFFERS',
      'MOBCHEQUEDEPOSIT',
    ];
    this.moreMobileList = activeSortedMobMoreMenuCodes.map((menuCode) => {
      return mobileMoreMenuRecords.find((record) => record.menuCode === menuCode)
    });

    if(this._device.isMobile() ){
      this.activeMenuId = 'home';
    }
    else {
      this._appConfig.setData("activeMenuId", 'HOME');
      this.activeMenuId = 'HOME';
    }
    this.cd.detectChanges();
  }

  navigateTo(menuId: string) {
    this._appConfig.removeData('etransferHistoryRes');
    console.log(menuId, "menuId")
    this._appConfig.setData("selectedAccountFromSummary", undefined);

    if (this._device.isMobile() && (menuId == 'MOREACTIONS' || menuId == 'MOBMORE')) {
      let modal = new FpxModal();
      modal.setComponent(MoreMenuComponent);
      // modal.setPanelClass('dep-info-popup');
      modal.setPanelClass('context-menu-popup');
      // modal.setBackDropClass('dep-popup-back-drop');
      modal.setDisableClose(false);
      modal.setData({
        title: "WIDGIT_TITLES.moreMenusTtl",
        moreActionsList: this.moreMobileList
      });
      modal.setAfterClosed(this.onCloseMoreActionPopup);
      this.openModal(modal);
      this.isPopup = true;
    } else {
      if(menuId == 'MORE' && this._appConfig.getData("activeMenuId") == 'MORE' && this.activeMenuId == 'MORE'){
        this.moreActiveMenuId = '';
        this._appConfig.setData("activeMenuId", '');
        this.activeMenuId = menuId;
        return;
      }

      this._appConfig.setData("activeMenuId", menuId);
      this.activeMenuId = menuId;
      this.moreActiveMenuId = '';
      this._activeSpaceInfoService.setAccountNumber('');
      this._activeSpaceInfoService.setModule('');
      this._activeSpaceInfoService.setOrginSpace(menuId as any);

      let service = this._appConfig.getServiceDetails(menuId);
      if (window.location.href.includes('etransfers-space') && !window.location.href.includes('etransfers-home') && menuId == 'ETRANSFERS') {
        this._angularRouter.navigate(['etransfers-space'], {
          queryParams: {
            refresh: "Y"
          }
        });
      }
      else if(window.location.href.includes('etransfers-space') && window.location.href.includes('etransfers-home') && service?.servicePath == 'etransfers-space'){
        return;
      }
      else if(service?.servicePath){
        this._router.navigate(service?.servicePath);
      }
      this.cd.detectChanges();
      
      // this._router.navigate([menuId]);
    }
  }

  getActiveMenu(id: any) {
    return id == this._appConfig.getActiveMenuId()? true: false;
  }

  navigateFromMoreMenu(menu: any, parent: any) {
    this._appConfig.setData("selectedAccountFromSummary", undefined);
    if (menu) {
      this._appConfig.setData("activeMenuId", parent.id);
      this.activeMenuId = parent.id;
      this.moreActiveMenuId = menu.id;
      this._activeSpaceInfoService.setAccountNumber('');
      this._activeSpaceInfoService.setModule('');
      let service = this._appConfig.getServiceDetails(menu.serviceCode || menu.id);

      if(service?.servicePath){
        this._activeSpaceInfoService.setOrginSpace(menu.id);
        this._router.navigate(service?.servicePath);
      }
    }
  }
  onCloseMoreActionPopup: FpxModalAfterClosed = (menu: any) => {
    if (menu) {
      this._activeSpaceInfoService.setAccountNumber('');
      this._activeSpaceInfoService.setModule('');
      let service = this._appConfig.getServiceDetails(menu.serviceCode || menu.id);

      if(service?.servicePath){
        // this._appConfig.activeMenuId = 'MOREACTIONS';
        this._appConfig.setData("activeMenuId", "MOREACTIONS");
        this._activeSpaceInfoService.setOrginSpace(service?.servicePath[0]);
        this._router.navigate(service?.servicePath);
      }
    }
    this.isPopup = false;
  }
}
