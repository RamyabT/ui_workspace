import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService } from '@dep/services';

@Component({
  selector: 'app-insurance-quick-actions',
  templateUrl: './insurance-quick-actions.html',
  styleUrls: ['./insurance-quick-actions.scss']
})
export class InsuranceQuickActionsComponent implements OnInit {


  @Input('insuranceId') insuranceId: string = "";
  @Input('insuranceStatus') insuranceStatus: string = "";
  @Output('onSelectCard') onSelectCard: EventEmitter<any> = new EventEmitter();
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
    if (this.insuranceId) {
      if(this.insuranceStatus.toLowerCase() == 'active'){
      this.quickLinks = this.getQuickActions('INSURANCEACTIVEQUICK');
      }else if(this.insuranceStatus.toLowerCase() == 'inactive'){
        this.quickLinks = this.getQuickActions('INSURANCEINACTIVEQUICK');
      }
    }
  }

  ngAfterViewInit(){     
  }

  getQuickActions(menuCode: string): any {
    let quickActions = this._menuService.getMenuList(menuCode);
    return quickActions || [];
  }

  openLink(menu:any){
    if(menu.serviceCode){
      this.onSelectCard.emit('SETACTIVECARDDATA');
      this._activeSpaceInfo.setActiveSpace(this.insuranceId);
      let service = this._appConfig.getServiceDetails(menu.serviceCode);
      if(menu.serviceCode == 'RETAILPAYINSURANCE') {
        // this._appConfig.setData('contractType', 'new');
      } else if (menu.serviceCode == 'RETAILINSURANCENOMINEEDTLS') {
        // this._appConfig.setData('contractType', 'existing');
      } else if (menu.serviceCode == 'RETAILINSURANCEDETAILS') {
        //  this._appConfig.setData('insuranceId', this.insuranceId);
      }
      setTimeout(()=>{
        this._router.navigate(service.servicePath,{
          queryParams: {
            insuranceId: this.insuranceId
          }
        });
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
