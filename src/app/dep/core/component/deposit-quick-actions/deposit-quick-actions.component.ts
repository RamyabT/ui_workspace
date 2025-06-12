import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';

@Component({
  selector: 'app-deposit-quick-actions',
  templateUrl: './deposit-quick-actions.html',
  styleUrls: ['./deposit-quick-actions.scss']
})
export class DepositQuickActionsComponent implements OnInit {

  @Input('accountNumber') accountNumber: string = "";
  @Input('accountType') accountType: string = "";

  quickLinks: any;
  doShowMoreQuickActions: boolean = false;
  isPopup: boolean = false;
  cardData: any;
  // activeMenu: string | undefined = '';
  protected activeMenu: string = '';

  constructor(
    protected _appConfig: AppConfigService,
    private _router: Router,
    public device: DeviceDetectorService,
    private _activeSpaceInfo:ActiveSpaceInfoService,
    private _menuService: CustomMenuService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    let quickLinks:any;
    if (this.accountType == 'aviso') quickLinks = this.getQuickActions('AVISOMENU');
    else if (this.accountType == 'registeredproducts')  quickLinks = this.getQuickActions('REGPRODMENU');
    else quickLinks = this.getQuickActions('TERMDEPOSITMENU');

    this.quickLinks = quickLinks;
  }

  getQuickActions(menuCode: string): any {
    let quickActions = this._menuService.getMenuList(menuCode);
    return quickActions || [];
  }

  openLink(menu:any){
    if(menu.serviceCode){
      this._activeSpaceInfo.setAccountNumber(this.accountNumber);
      let service = this._appConfig.getServiceDetails(menu.serviceCode);
      if(menu.serviceCode == 'RETAILRPCONTRACTINFO') {
        this._appConfig.setData('contractType', 'new');
      } else if (menu.serviceCode == 'RETAILRPEXISTINGCONTRACTINFO') {
        this._appConfig.setData('contractType', 'existing');
      } else if (menu.serviceCode == 'RETAILRPOPENTERMDEPOSIT') {
        this._appConfig.setData('contractType', 'deposit');
      }
      setTimeout(()=>{
        this._router.navigate(service.servicePath);
      });
    }
    this.activeMenu = menu.icon;
    this.doShowMoreQuickActions = false;
  }

  closeContextMenu() {
      // this._dialogRef.close();
    }

  showMoreQuickActions() {
      this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }


}
