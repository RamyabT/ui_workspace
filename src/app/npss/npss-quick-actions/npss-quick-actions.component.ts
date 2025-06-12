import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-npss-quick-actions',
  templateUrl: './npss-quick-actions.component.html',
  styleUrls: ['./npss-quick-actions.component.scss']
})
export class NpssQuickActionsComponent implements OnInit {

  quickLinks: any;
  doShowMoreQuickActions: boolean = false;
  isPopup: boolean = false;
  cardData: any;
  // activeMenu: string | undefined = '';
  protected activeMenu: string = '';
  @Input('resetActiveMenu') 
  set resetActiveMenu(value: boolean){
    if(value) this.activeMenu = 'npss-manage-account';
  }
  constructor(
    private _appConfig: AppConfigService,
    private _router: Router,
    public device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.quickLinks = [
      {
        id: "scan-and-pay",
        name: "<em>Scan & </em>Pay",
        icon: "npss-scan-and-pay",
        serviceCode:"RETAILSCANANDPAY"
      },
      {
        id: "manage-account",
        name: "<em>Manage </em>Account",
        icon: "npss-manage-account",
        serviceCode: "NPSSMANAGEACCOUNTS"
      },
      {
        id: "send-money",
        name: "<em>Send</em>Money",
        icon: "npss-send-money",
        serviceCode:"NPSSSENDCONTACT",  
      },
      {
        id: "request-money",
        name: "<em>Request</em>Money",
        icon: "npss-request-money",
        serviceCode:"NPSSREQUESTCONTACT"
      },
      {
        id: "deactivate-account",
        name: "<em>Deactivate </em>Account",
        icon: "npss-deactivate-account",
        serviceCode: "RETAILINVALIDATENPSS"
      },
      {
        id: "unenroll-account",
        name: "<em>Unenroll </em>Account",
        icon: "npss-unenroll-account",
        serviceCode: "RETAILCUSTOMERUNREGISTER"
      },
      {
        id: "set-proxy",
        name: "<em>Set </em>Proxy",
        icon: "npss-set-proxy",
        serviceCode: "RETAILNPSSPROXY"
      },
      {
        id: "split-bills",
        name: "<em>Split </em>Bills",
        icon: "npss-set-proxy",
        serviceCode: "RETAILSPLITBILLS"
      }
    ];
    if(!this.device.isMobile()) {
      this.quickLinks.shift();
      this.quickLinks.pop();
      this.activeMenu = "npss-manage-account";
      let service = this._appConfig.getServiceDetails('NPSSMANAGEACCOUNTS');
      setTimeout(()=>{
        this._router.navigate(service.servicePath);
      });
    }
  }

  openLink(menu:any){
    if(menu.serviceCode){
      let service = this._appConfig.getServiceDetails(menu.serviceCode);
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
