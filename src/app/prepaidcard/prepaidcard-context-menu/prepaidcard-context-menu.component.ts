import { Component, Inject, Input, OnInit, inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService, CustomMenuService, LanguageService } from "@dep/services";
import { IFpxMenuChild } from "@fpx/layout";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { Prepaidcard } from "../prepaidcard-service/prepaidcard.model";

@Component({
  selector: 'app-prepaidcard-context-menu',
  templateUrl: './prepaidcard-context-menu.component.html',
  styleUrls: ['./prepaidcard-context-menu.component.scss']
})
export class PrepaidcardContextMenuComponent implements OnInit {

  private _cardData: Prepaidcard | undefined;
  @Input()
  set cardData(cardData: Prepaidcard | undefined) {
    this._cardData = cardData;
    if (this._cardData) this.getContextMenu();
  }
  get cardData(): Prepaidcard | undefined {
    return this._cardData;
  }

  quickLinks: any;

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(
    ActiveSpaceInfoService
  );
  private restrictedServices: any;
  protected isPopup: boolean = false;
  protected doShowMoreQuickActions: boolean = false;
  protected activeMenu: string = "";

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _appConfig: AppConfigService,
    private _router: Router,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    public _device: DeviceDetectorService,
    protected languageService: LanguageService
  ) {}

  ngOnInit(): void {
    if (this._dialogData.hasOwnProperty("cardData")) {
      this.isPopup = true;
      this.cardData = this._dialogData.cardData;
      this.getContextMenu();
    }

    this.cardData = this._dialogData.cardData;

    // const accountNumber = this.cardData.accountNumber;
    // if (this._commonService.casaServiceRestriction.has(accountNumber)) {
    //   this.restrictedServices =
    //     this._commonService.casaServiceRestriction.get(accountNumber);
    //   this.getContextMenu();
    // } else {
    //   this._commonService.fetchServiceRestriction(accountNumber).subscribe({
    //     next: (res) => {
    //       this._commonService.casaServiceRestriction.set(accountNumber, res);
    //       this.restrictedServices = res;
    //       this.getContextMenu();
    //     },
    //   });
    // }
  }

  // prepareContextMenu(accountNumber: string) {
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

  openLink(menu: any) {
    if (this.isPopup) {
      this._dialogRef.close();
      this._activeSpaceInfoService.setAccountNumber(
        this.cardData!.accountNumber
      );
    }
    this._appConfig.setData("prepaidCardData", this.cardData);

    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);

    setTimeout(() => {
      this._router.navigate(service.servicePath, {
        queryParams: {
          // accountNumber: this.cardData!.accountNumber,
          cardRefNumber: this.cardData!.cardRefNumber
        },
      });
    });

    this.doShowMoreQuickActions = false;
  }

  closeContextMenu() {
    this._dialogRef.close();
  }

  getMenuCodeByStatus(status: string) {
    let menuCode = '';
    switch (status) {
      case 'blocked': menuCode = 'PCMENUBLOCK'; break;
      case 'blocked permanently': menuCode = 'PCMENUBLOCKP'; break;
      case 'active': menuCode = 'PCMENU'; break;
      case 'inactive': menuCode = 'PCMENUINACTIVE'; break;
    }
    return menuCode;
  }

  getContextMenu() {
    let contextMenu = this._menuService.getMenuList(this.getMenuCodeByStatus(this.cardData!.status?.toLowerCase()));
    let serviceMenus = contextMenu?contextMenu:[];

    // if (this.restrictedServices && this.restrictedServices.length) {
    //   serviceMenus = contextMenu.filter(
    //     (obj1: any) =>
    //       !this.restrictedServices.find(
    //         (obj2: any) => obj1.serviceCode == obj2.serviceCode
    //       )
    //   );
    // }
    if(serviceMenus?.length > 0) {
      if(this.cardData?.multiCurrencySupported == 'No') {
        let index = serviceMenus.findIndex((x: any)=>x.serviceCode == 'RETAILPREPAIDWALLETTRAN');
        if(index != -1) {
          serviceMenus.splice(index,1)
        }
      }
    }
    this.quickLinks = serviceMenus;
  }

  showMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

}
