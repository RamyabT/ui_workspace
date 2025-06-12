import { Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transfers-quick-actions',
  templateUrl: './transfers-quick-actions.component.html',
  styleUrls: ['./transfers-quick-actions.component.scss'],
  providers: []
})
export class TransfersQuickActionsComponent implements OnInit {
  activeMenu: string | undefined = '';

  protected _activeMenu: string = '';
  @Input('resetActiveMenu') 
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
    this.quickLinks = [
      {
        id: this.translate.instant('TRANSFERQUICKACTION.ownAccountTransfer.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.ownAccountTransfer.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.ownAccountTransfer.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.domesticTransfer.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.domesticTransfer.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.domesticTransfer.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.withinBankTransfer.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.withinBankTransfer.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.withinBankTransfer.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.internationalTransfer.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.internationalTransfer.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.internationalTransfer.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.ccTransfer.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.ccTransfer.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.ccTransfer.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.instaPay.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.instaPay.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.instaPay.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.addBeneficiary.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.addBeneficiary.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.addBeneficiary.serviceCode')
      },
      {
        id: this.translate.instant('TRANSFERQUICKACTION.manageBeneficiary.id'),
        name: this.translate.instant('TRANSFERQUICKACTION.manageBeneficiary.name'),
        serviceCode: this.translate.instant('TRANSFERQUICKACTION.manageBeneficiary.serviceCode')
      }
    ];
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
