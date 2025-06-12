import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fb-quick-actions',
  templateUrl: './fb-quick-actions.component.html',
  styleUrls: ['./fb-quick-actions.component.scss'],
  providers: []

})
 
export class FbQuickActionsComponent implements OnInit {
  activeMenu: string | undefined = '';

  protected _activeMenu: string = '';
  @Input('resetActiveMenu') 
  @Input('receivedValue') receivedValue!: any;

  set resetActiveMenu(value: boolean){
    if(value) this._activeMenu = '';
  }

  quickLinks: any;
  doShowMoreQuickActions: boolean = false;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    protected translate: TranslateService
  ) { }

  ngOnInit(): void {
    console.log("receivedValue12",this.receivedValue)
    if(this.receivedValue == true){
      this.quickLinks = [
        {
          id: this.translate.instant('FBQUICKACTION.manageChild.id'),
          name: "Manage Account",
          serviceCode: this.translate.instant('FBQUICKACTION.manageChild.serviceCode')
        },
        {
          id: this.translate.instant('FBQUICKACTION.manangetransaction.id'),
          name: "Transaction History",
          serviceCode: this.translate.instant('FBQUICKACTION.manangetransaction.serviceCode')
        } 
      ];
    }
    else{
      this.quickLinks = [
        {
          id: this.translate.instant('FBQUICKACTION.createGoal.id'),
          name: "Create Goals",
          serviceCode: this.translate.instant('FBQUICKACTION.createGoal.serviceCode')
        },
        {
          id: this.translate.instant('FBQUICKACTION.createChore.id'),
          name: "Create Chore",
          serviceCode: this.translate.instant('FBQUICKACTION.createChore.serviceCode')
        },
        {
          id: this.translate.instant('FBQUICKACTION.sendMoney.id'),
          name: "Send Money",
          serviceCode: this.translate.instant('FBQUICKACTION.sendMoney.serviceCode')
        },
      ];
    }
    
    
  }

  openContextMenu(menu: any) {
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    if(!this._device.isMobile()){
      this.doShowMoreQuickActions = false;
    }
    this._activeMenu = menu.serviceCode;
    this._router.navigate(service.servicePath);
  }

  toggleMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

  hideMoreQuickActions($event:any){
    $event.stopPropagation();
    this.doShowMoreQuickActions = false;
  }

}
