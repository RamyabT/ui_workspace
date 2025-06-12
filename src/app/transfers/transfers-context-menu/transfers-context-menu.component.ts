import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { IFpxMenuChild } from '@fpx/layout';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-transfers-context-menu',
  templateUrl: './transfers-context-menu.component.html',
  styleUrls: ['./transfers-context-menu.component.scss']
})
export class TransfersContextMenuComponent extends BaseFpxFunctionality implements OnInit {
  @ViewChild('contextMenuWrapper', { read: ElementRef }) contextMenuWrapper!: ElementRef;
  @ViewChild("slickModal")
  slickModal!: SlickCarouselComponent;

  @Input('hasAtleastOneTransferToAccount') hasAtleastOneTransferToAccount: boolean = true;


  protected _activeMenu: string = '';
  @Input('resetActiveMenu')
  set resetActiveMenu(value: boolean) {
    if (value) this._activeMenu = '';
  }

  private _accountNumber:string = '';
  @Input() 
  set accountNumber(accNum:string){
    this._accountNumber = accNum;
    if (this._accountNumber) this.prepareContextMenu(this._accountNumber, true);
  }
  get accountNumber():string{
    return this._accountNumber;
  }

  private restrictedServices:any;
  protected sliderWidth : number = 0;


  quickLinks: any;
  cardData!: Casaaccount;

  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  
  protected isPopup: boolean = false;
  protected doShowMoreQuickActions: boolean = false;
  protected activeMenu: string = '';
  slideConfig: any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _appConfig: AppConfigService,
    private _router: Router,
    private _menuService: CustomMenuService,
    protected languageService: LanguageService,
    private _commonService: CommonService,
    public _device: DeviceDetectorService
  ) {
    super();
   }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 3, 
      slidesToScroll: 2,
      dots: false,
      arrows: true,
      infinite: false,
      swipeToSlide: false,
      rtl: this.languageService.isRtl,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
      // variableWidth: true,
      prevArrow:'<div class="btn-wrapper slick-prev"><div class="btn"><button class="button" type="button"><img src="./assets/images/icons/back-arrow.svg"></button></div></div>',
      nextArrow:'<div class="btn-wrapper slick-next"><div class="btn"><button class="button" type="button"><img src="./assets/images/icons/back-arrow.svg"></button></div></div>',
      // responsive: [
      //   {
      //     breakpoint: 2300,
      //     settings: {
      //       slidesToShow: 8,
      //       slidesToScroll: 8,
      //     },
      //   },
      //   {
      //     breakpoint: 2100,
      //     settings: {
      //       slidesToShow: 7,
      //       slidesToScroll: 7,
      //     },
      //   },
      //   {
      //     breakpoint: 1900,
      //     settings: {
      //       slidesToShow: 6,
      //       slidesToScroll: 6,
      //     },
      //   },
      //   {
      //     breakpoint: 1700,
      //     settings: {
      //       slidesToShow: 5,
      //       slidesToScroll: 5,
      //     },
      //   },
      //   {
      //     breakpoint: 1500,
      //     settings: {
      //       slidesToShow: 5,
      //       slidesToScroll: 5,
      //     },
      //   },
      //   {
      //     breakpoint: 1300,
      //     settings: {
      //       slidesToShow: 4,
      //       slidesToScroll: 4,
      //     },
      //   },
      //   {
      //     breakpoint: 1100,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //     },
      //   },
      //   {
      //     breakpoint: 800,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //     },
      //   },
      // ],
    }
    // this.prepareContextMenu(this._accountNumber, false);

    this.getContextMenu(false);
  }

  ngAfterViewInit(): void {
    if (this._appConfig.hasData('moduleRefresh$')) {
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res: any) => {
          console.log("refresh accounts QUICKACTION...");
          if(res?.action === 'TRANSFERSQUICKACTION'){
            this.activeMenu = res.data.serviceCode;
            if(res.data.serviceCode=="RETAILSCHOAT"){
              this.activeMenu = "RETAILTRANOAT";
              this.slickModal.slickGoTo(0);
            }
            else {
              let index = this.quickLinks.findIndex((x: any)=>x.serviceCode == res.data.serviceCode);
              this.slickModal.slickGoTo(index);
            }
          }
        }
      );
    }

    this.sliderWidth = this.contextMenuWrapper.nativeElement.clientWidth;
}

  openLink(menu: any, setAccountNumber: boolean = true) {
    if (this.isPopup) {
      this._dialogRef.close();
    }
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    this.doShowMoreQuickActions = false;
    let rid:number = Math.floor(Math.random() * 99999999);
      if(setAccountNumber) this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
      this._router.navigate(service.servicePath, {
        queryParams: {
          rid: rid
        }
      });
      let index = this.quickLinks.findIndex((x: any)=>x.serviceCode == menu.serviceCode);
      this.activeMenu = menu.serviceCode;
      this.slickModal.slickGoTo(index);
  }

  closeContextMenu() {
    this._dialogRef.close();
  }

  getContextMenu(isAccountChanged: boolean) {
    let serviceCode = this._appConfig.getData('setScheduleData')?.serviceCode;

    let contextMenu = this._menuService.getMenuList('TRANSFERSMENU');
    let serviceMenus = contextMenu;

    // let additionalMenu = [{
    //   "serviceCode": "RETAILTRANADDBENE",
    //   "name": "RETAILTRANADDBENE",
    //   "icon": "",
    //   "serviceDescription": "Add New Beneficiary",
    //   "id": "RETAILTRANSFERS5"
    // }, {
    //   "serviceCode": "RETAILMANAGEBENE",
    //   "name": "RETAILMANAGEBENE",
    //   "icon": "",
    //   "serviceDescription": "Manage Beneficiary",
    //   "id": "RETAILTRANSFERS5"
    // }];

    console.log("serviceMenus is ", serviceMenus);

    this.quickLinks = [...serviceMenus];
    if (!isAccountChanged) {
      if (this.getRoutingParam().routeFrom == 'otherModule' && this.getRoutingParam().serviceCode != "RETAILSCHOAT") {
        let index = this.quickLinks.findIndex((x: any) => x.serviceCode == this.getRoutingParam().serviceCode);
        this.activeMenu = this.getRoutingParam().serviceCode;
        // this.activeMenu = this.getRoutingParam().serviceCode;
      }
      else if (serviceCode == "RETAILSCHOAT") {
        this.activeMenu = "RETAILTRANOAT";
      }
    }
  }

  prepareContextMenu(accountNumber: string, isAccountChanged = false) {
    // this.activeMenu = '';
    if (APPCONSTANTS.contextMenuRestrictionRequired) {
      if (this._commonService.casaServiceRestriction.has(accountNumber)) {
        this.restrictedServices = this._commonService.casaServiceRestriction.get(accountNumber);
        this.getContextMenu(isAccountChanged);
      } else {
        this._commonService.fetchServiceRestriction(accountNumber).subscribe({
          next: (res) => {
            this._commonService.casaServiceRestriction.set(accountNumber, res);
            this.restrictedServices = res;
            this.getContextMenu(isAccountChanged);
          },
          error: (reason) => {
            this.getContextMenu(isAccountChanged);
          }
        });
      }
    } else {
      this.getContextMenu(isAccountChanged);
    }
    
  }

  openContextMenu(menu: any) {
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    console.log("service  for edit profile is ", service);
    if (!this._device.isMobile()) {
      this.doShowMoreQuickActions = false;
    }
    this._activeMenu = menu.serviceCode;
    console.log("active menu is ", this._activeMenu);
    console.log("service path is ", service);

    if (menu.serviceCode == 'RETAILTRANOAT' || menu.serviceCode == 'RETAILTRANINTBT') {
      if (this.getRoutingParam().fromHome == 'true') {
        if (!this.hasAtleastOneTransferToAccount && menu.serviceCode == 'RETAILTRANOAT') {
          this.openUnavailableEligibleAccountsPopup();
          return;
        }
        this._router.navigate(service.servicePath, {
          queryParams: {
            accountNumber: this.getRoutingParam().accountNumber,
            fromHome: true
          }
        });
      } else {
        if (!this.hasAtleastOneTransferToAccount && menu.serviceCode == 'RETAILTRANOAT') {
          this.openUnavailableEligibleAccountsPopup();
          return;
        }
        this._router.navigate(service.servicePath);
      }
    } else {
      this._angularRouter.navigate(service.servicePath);
    }
  }

  openUnavailableEligibleAccountsPopup() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass("dep-alert-popup");
    modal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'transfers-unavailable-popup', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      message: "eligibleUnavailable.message",
      description: "eligibleUnavailable.description",
      okBtnLbl: "eligibleUnavailable.okBtnLbl",
      cancelBtnLbl: "eligibleUnavailable.cancelBtnLbl",
      confirmationIcon: "transfers-alert"
    })
    modal.setAfterClosed(this.unavailablePopupAfterClosed);
    this.openModal(modal);
  }

  unavailablePopupAfterClosed: FpxModalAfterClosed = (payload: any) => {
    this._router.navigate(['home'])
  }

  showMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

}
