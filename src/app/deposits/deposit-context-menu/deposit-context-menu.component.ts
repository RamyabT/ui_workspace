import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { IFpxMenuChild } from '@fpx/layout';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { APPCONSTANTS } from '@dep/constants';
import { Deposits, DepositsSummary } from '../deposits-service/deposits.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';

@Component({
  selector: 'app-deposit-context-menu',
  templateUrl: './deposit-context-menu.component.html',
  styleUrls: ['./deposit-context-menu.component.scss']
})
export class DepositContextMenuComponent implements OnInit {
  @ViewChild('contextMenuWrapper', { read: ElementRef }) contextMenuWrapper!: ElementRef;
  
  @ViewChild("slickModal")
  slickModal!: SlickCarouselComponent;
  casaAccounts?: DepositsSummary;

  private _accountNumber:string = '';
  @Input() 
  set accountNumber(accNum:string){
    this._accountNumber = accNum;
    if(this._accountNumber) this.prepareContextMenu(this._accountNumber);
  }
  get accountNumber():string{
    return this._accountNumber;
  }

  @Input('resetActiveMenu') 
  set resetActiveMenu(value: boolean){
    if(value) this.activeMenu = '';
  }


  
  protected appConstant: any = APPCONSTANTS;
  quickLinks: any;
  cardData!: Deposits;
  
  protected _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private restrictedServices:any;
  protected isPopup:boolean = false;
  protected doShowMoreQuickActions: boolean = false;
  protected activeMenu: string = '';
  protected sliderWidth : number = 0;

  slideConfig: any;

  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _appConfig:AppConfigService,
    private _router:Router,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    protected languageService: LanguageService,
    protected _device: DeviceDetectorService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private route: ActivatedRoute,



  ) { }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 5, 
      slidesToScroll: 5,
      dots: false,
      arrows: true,
      infinite: false,
      rtl: this.languageService.isRtl,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
    }
    if(this._dialogData.hasOwnProperty('cardData')){
      this.isPopup = true;
      this.cardData = this._dialogData.cardData;
      this._accountNumber = this.cardData.accountNumber;
      this.prepareContextMenu(this._accountNumber);
    }
  }

  // openLink(menu:any){
  //   this._appConfig.setData('serviceCode', menu.serviceCode);
  //   if(this.isPopup) {
  //     this._dialogRef.close();
  //     this._appConfig.setData('accountCardData', this.cardData);
  //     this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);
  //   }

  //   this.activeMenu = menu.serviceCode;
  //   let service = this._appConfig.getServiceDetails(menu.serviceCode);

  //   // if (menu.serviceCode !== 'RETAILAPPLYLOAN') {
  //   //   setTimeout(() => {
  //   //     this._router.navigate(service.servicePath, {
  //   //       queryParams: {
  //   //         accountNumber: this._accountNumber
  //   //       }
  //   //     });
  //   //   });
  //   // } else if (menu.serviceCode === 'RETAILAPPLYLOAN') {
  //   //   if (this._device.isMobile()) {
  //   //     this._router.navigate(['accounts-space/apply-loan'])
  //   //   } else {
  //   //     this._router.navigate(['accounts-space/accounts/apply-loan'])
  //   //   }
  //   // }
  //   // this.showMoreQuickActions();
  //   this.doShowMoreQuickActions = false;
  // }

  openLink(menu:any){
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
      let rid:number = Math.floor(Math.random() * 99999999);
      this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
      this._router.navigate(service.servicePath, {
        queryParams: {
          rid: rid
        }
      });

    if(this.isPopup) {
      this._dialogRef.close();
      this._appConfig.setData('accountCardData', this.cardData);
      this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);
    }

    this.doShowMoreQuickActions = false;
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

  // getContextMenu(){
  //   let contextMenu = this._menuService.getMenuList('DEPOSITSMENU');
  //   let serviceMenus = contextMenu;

  //   if(this.restrictedServices && this.restrictedServices.length){
  //     serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
  //   }

  //   this.quickLinks = serviceMenus;
  // }

  getContextMenu(){
    let contextMenu = JSON.parse(JSON.stringify(this._menuService.getMenuList('DEPOSITSMENU')));
    this.casaAccounts = this._accountsSpaceMgr.getDeposits();
    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickLinks = serviceMenus;

    if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
      let menu = this.quickLinks.find((x: any)=>x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
      this.openLink(menu);
    }
  }


  prepareContextMenu(accountNumber:string){
    this.activeMenu = '';
    if(this._commonService.casaServiceRestriction.has(accountNumber)){
      this.restrictedServices = this._commonService.casaServiceRestriction.get(accountNumber);
      this.getContextMenu();
    } else {
      this._commonService.fetchServiceRestriction(accountNumber).subscribe({
        next: (res) => {
          this._commonService.casaServiceRestriction.set(accountNumber, res);
          this.restrictedServices = res;
          this.getContextMenu();
        },
        error: (err) => {
          this.getContextMenu();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (this._appConfig.hasData('moduleRefresh$')) {
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res: any) => {
          console.log("refresh accounts QUICKACTION...");
          if(res?.action === 'ACCOUNTSQUICKACTION'){
            this.activeMenu = res.data.serviceCode;
          }
        }
      );
    }

    this.sliderWidth = this.contextMenuWrapper.nativeElement.clientWidth;
}

  showMoreQuickActions(){
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

}
