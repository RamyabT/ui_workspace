import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { BaseFpxFunctionality } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-etransfers-context-actions',
  templateUrl: './etransfers-context-actions.component.html',
  styleUrls: ['./etransfers-context-actions.component.scss']
})
export class EtransfersContextActionsComponent extends BaseFpxFunctionality implements OnInit {

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

  protected quickLinks: any;
  doShowMoreQuickActions: boolean = false;
  activeMenu: string | undefined = '';
  private restrictedServices:any;

  constructor(
    protected translate: TranslateService,
    private _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _router: Router,
    protected languageService: LanguageService,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }
  slideConfig: any;
  @ViewChild("slickModal")
  slickModal!: SlickCarouselComponent;
  size = 0;
  currentWindowSize = window.innerWidth;
  currentPercent =  100;
  initialPercent = 100;
  @ViewChild('contextMenuWrapper', { read: ElementRef }) contextMenuWrapper!: ElementRef;
  protected sliderWidth : number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let percentChange;
    if(this.currentPercent <=100 && window.innerWidth < this.currentWindowSize) { 
      // percentChange = ((this.currentWindowSize - window.innerWidth)/window.innerWidth)*100;
      this.size = this.size + this.currentPercent == 100?20:10;
      percentChange = this.initialPercent - this.size;
      this.currentPercent = percentChange;
      this.currentWindowSize = window.innerWidth;
      this.sliderWidth = (this.sliderWidth * percentChange/100);
    }
    else {
      this.currentWindowSize = window.innerWidth;
      this.sliderWidth = this.contextMenuWrapper.nativeElement.clientWidth;

    }    
    
    this.cd.detectChanges();
    this.slickModal?.initSlick();
  }
  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 5, 
      slidesToScroll: 5,
      dots: false,
      arrows: true,
      infinite: false,
      swipeToSlide: false,
      rtl: this.languageService.isRtl,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
      cssEase: 'linear',
      centerMode:false,
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
      //       slidesToShow: 6,
      //       slidesToScroll: 6,
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
      //       slidesToShow: 6,
      //       slidesToScroll: 6,
      //     },
      //   },
      //   {
      //     breakpoint: 1500,
      //     settings: {
      //       slidesToShow: 6,
      //       slidesToScroll: 6,
      //     },
      //   },
      //   {
      //     breakpoint: 1300,
      //     settings: {
      //       slidesToShow: 6,
      //       slidesToScroll: 6,
      //     },
      //   },
      //   {
      //     breakpoint: 1100,
      //     settings: {
      //       slidesToShow: 6,
      //       slidesToScroll: 6,
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
    // sendMoney, requestMoney, Auto Deposit, Contacts, Edit Your Profile
  //   this.quickLinks = [
  //     {
  //       id: "ETRANSFERSENDMONEY",
  //       name: this.translate.instant('ETRANSFERQUICKACTION.ETRANSFERSENDMONEY'),
  //       serviceCode: "ETRANSFERSENDMONEY"
  //     },
  //     {
  //       id: "ETRANSFERREQUESTMONEY",
  //       name: this.translate.instant('ETRANSFERQUICKACTION.ETRANSFERREQUESTMONEY'),
  //       serviceCode: "ETRANSFERREQUESTMONEY"
  //     },
  //     {
  //       id: "GETETRFAUTODEPOSIT",
  //       name: this.translate.instant('ETRANSFERQUICKACTION.GETETRFAUTODEPOSIT'),
  //       serviceCode: "GETETRFAUTODEPOSIT"
  //     },
  //     {
  //       id: "RETAILETRANSFERMANAGECONTACT",
  //       name: this.translate.instant('ETRANSFERQUICKACTION.RETAILETRANSFERMANAGECONTACT'),
  //       serviceCode: "RETAILETRANSFERMANAGECONTACT"
  //     },
  //     {
  //       id: "RETAILETRANSFERREGISTRATION",
  //       name: this.translate.instant('ETRANSFERQUICKACTION.RETAILETRANSFERREGISTRATION'),
  //       serviceCode: "RETAILETRANSFERREGISTRATION"
  //     },
	// {
  //       id: "RETAILMANAGEETRANSFERCONTACT",
  //       name: this.translate.instant('ETRANSFERQUICKACTION.RETAILMANAGEETRANSFERCONTACT'),
  //       serviceCode: "RETAILMANAGEETRANSFERCONTACT"
  //     },
  //     // {
  //     //   id: "ETRANSFERFULFILLREQUESTMONEY",
  //     //   name: this.translate.instant('ETRANSFERQUICKACTION.ETRANSFERFULFILLREQUESTMONEY'),
  //     //   serviceCode: "ETRANSFERFULFILLREQUESTMONEY"
  //     // },
  //   ];
  }

  ngAfterViewInit(){
    this.sliderWidth = this.contextMenuWrapper.nativeElement.clientWidth;
    this.cd.detectChanges();
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

  openLink(menu: any) {
    this._appConfig.removeData('etransferHistoryRes');
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    let rid:number = Math.floor(Math.random() * 99999999);
    this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
    if(menu.serviceCode=='RETAILETRANSFERREGISTRATION'){
      this._angularRouter.navigate( [
        "etransfers-space",
        "entry-shell",
        "etransfers",
        "retail-etransfer-customer-form-edit"
      ],
        {
          queryParams: {
            serviceCode: menu.serviceCode,
            mode : 'M'
          },
        }
       
      )
    }
    else{
      this._router.navigate(service.servicePath, {
        queryParams: {
          rid: rid,
          serviceCode : menu.serviceCode
        }
      });
    }

    // if(this.isPopup) {
    //   this._dialogRef.close();
    //   this._appConfig.setData('accountCardData', this.cardData);
    //   this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);
    // }
    
    // setTimeout(()=>{
      
    // });

    this.doShowMoreQuickActions = false;
  }


  getContextMenu(isAccountChanged: boolean) {
    let serviceCode = this._appConfig.getData('setScheduleData')?.serviceCode;

    let contextMenu = this._menuService.getMenuList('MOBETRANSFERSMENU');
    let serviceMenus = contextMenu;

    this.quickLinks = [...serviceMenus];
    if(this.quickLinks.length == 0){
      this.quickLinks = [
        {
          id: "ETRANSFERSENDMONEY",
          name: this.translate.instant('ETRANSFERQUICKACTION.ETRANSFERSENDMONEY'),
          serviceCode: "RETAILMANAGEETRANSFERSENDMONEY"
        },
        {
          id: "ETRANSFERREQUESTMONEY",
          name: this.translate.instant('ETRANSFERQUICKACTION.ETRANSFERREQUESTMONEY'),
          serviceCode: "RETAILMANAGEETRANSFERREQUESTMONEY"
        },
        {
          id: "GETETRFAUTODEPOSIT",
          name: this.translate.instant('ETRANSFERQUICKACTION.GETETRFAUTODEPOSIT'),
          serviceCode: "GETETRFAUTODEPOSIT"
        },
        {
          id: "RETAILETRANSFERMANAGECONTACT",
          name: this.translate.instant('ETRANSFERQUICKACTION.RETAILETRANSFERMANAGECONTACT'),
          serviceCode: "RETAILETRANSFERMANAGECONTACT"
        },
        {
          id: "RETAILETRANSFERREGISTRATION",
          name: this.translate.instant('ETRANSFERQUICKACTION.RETAILETRANSFERREGISTRATION'),
          serviceCode: "RETAILETRANSFERREGISTRATION"
        },
    {
          id: "RETAILMANAGEETRANSFERCONTACT",
          name: this.translate.instant('ETRANSFERQUICKACTION.RETAILMANAGEETRANSFERCONTACT'),
          serviceCode: "RETAILMANAGEETRANSFERCONTACT"
        },
        // {
        //   id: "ETRANSFERFULFILLREQUESTMONEY",
        //   name: this.translate.instant('ETRANSFERQUICKACTION.ETRANSFERFULFILLREQUESTMONEY'),
        //   serviceCode: "ETRANSFERFULFILLREQUESTMONEY"
        // },
      ];
    }
  }

  openContextMenu(menu: any) {
    this._appConfig.removeData('etransferHistoryRes');
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    this._activeSpaceInfoService.setOrginSpace(this._activeSpaceInfoService.getActiveSpace());
    console.log("service  for edit profile is ",service);
    if (!this._device.isMobile()) {
      this.doShowMoreQuickActions = false;
    }
    this._activeMenu = menu.serviceCode;
    console.log("active menu is ", this._activeMenu );
    if(menu.serviceCode=='RETAILETRANSFERREGISTRATION'){
      this._angularRouter.navigate( [
        "etransfers-space",
        "entry-shell",
        "etransfers",
        "retail-etransfer-customer-form-edit"
      ],
        {
          queryParams: {
            serviceCode: menu.serviceCode,
            mode : 'M'
          },
        }
       
      )
        
    }
    else if(menu.serviceCode=='RETAILMANAGEETRANSFERCONTACT' || menu.serviceCode=='RETAILMANAGEETRANSFERSENDMONEY'){
      this._angularRouter.navigate(service.servicePath,{
        queryParams: {
          serviceCode: menu.serviceCode
        }
      });
    }
    else if(menu.serviceCode=='RETAILMANAGEETRANSFERCONTACT' || menu.serviceCode=='RETAILMANAGEETRANSFERREQUESTMONEY'){
      this._angularRouter.navigate(service.servicePath,{
        queryParams: {
          serviceCode: menu.serviceCode
        }
      });
    }
    else{
      this._angularRouter.navigate(service.servicePath);
    }


  }

  toggleMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

  hideMoreQuickActions($event:any){
    $event.stopPropagation();
    this.doShowMoreQuickActions = false;
  }

}
