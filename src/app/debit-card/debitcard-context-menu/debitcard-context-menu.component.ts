import { Component, Inject, Input, OnInit, inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AppConfigService, CustomMenuService, LanguageService } from "@dep/services";
import { IFpxMenuChild } from "@fpx/layout";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { Debitcard } from "../debitcard-service/debitcard.model";
import { DebitcardService } from "../debitcard-service/debitcard.service";

@Component({
  selector: "app-debitcard-context-menu",
  templateUrl: "./debitcard-context-menu.component.html",
  styleUrls: ["./debitcard-context-menu.component.scss"],
})
export class DebitcardContextMenuComponent implements OnInit {
  private _cardData: Debitcard | undefined;
  @Input()
  set cardData(cardData: Debitcard | undefined) {
    this._cardData = cardData;
    if (this._cardData) this.getContextMenu();
  }
  get cardData(): Debitcard | undefined {
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
    private _debitCardService: DebitcardService,
    protected languageService: LanguageService
  ) {}

  ngOnInit(): void {
    if (this._dialogData.hasOwnProperty("cardData")) {
      this.isPopup = true;
      this._cardData = this._dialogData.cardData;
      this.getContextMenu();
    }
    this._cardData = this._dialogData.cardData;
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
        // this.cardData.accountNumber
        this.cardData!.cardRefNumber
      );
    }
    this._appConfig.setData('debitCardData', this.cardData);

    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    setTimeout(() => {
      this._router.navigate(service.servicePath, {
        queryParams: {
          // accountNumber: this._accountNumber,
          cardReference: this.cardData!.cardRefNumber
        },
      });
    });
    setTimeout(() => {
      if(menu.serviceCode == 'RETAILDCTRANSACTIONSUMMARY') this._debitCardService.updateDebitcard(this._cardData)
    }, 1000);
    this.doShowMoreQuickActions = false;
  }

  closeContextMenu() {
    this._dialogRef.close();
  }

  getMenuCodeByStatus(status: string | undefined) {
    let menuCode = '';
    switch (status) {
      case 'blocked': menuCode = 'DECMENUBLOCK'; break;
      case 'blocked permanently': menuCode = 'DECMENUBLOCKP'; break;
      case 'active': menuCode = 'DECMENU'; break;
      case 'inactive': menuCode = 'DECMENUINACTIVE'; break;
    }
    return menuCode;
  }

  getContextMenu() {
    // let contextMenu = this._menuService.getMenuList("DECMENU");
    let contextMenu = this._menuService.getMenuList(this.getMenuCodeByStatus(this._cardData?.status?.toLowerCase()));
    let serviceMenus = contextMenu?contextMenu:[];

    // if (this.restrictedServices && this.restrictedServices.length) {
    //   serviceMenus = contextMenu.filter(
    //     (obj1: any) =>
    //       !this.restrictedServices.find(
    //         (obj2: any) => obj1.serviceCode == obj2.serviceCode
    //       )
    //   );
    // }

    this.quickLinks = serviceMenus;
  }

  showMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }
}
