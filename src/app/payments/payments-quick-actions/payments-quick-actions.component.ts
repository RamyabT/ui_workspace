import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, inject, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent } from '@fpx/core';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { BillPaymentsService } from 'src/app/foundation/validator-service/billpayments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { APPCONSTANTS } from '@dep/constants';

@Component({
  selector: 'app-payments-quick-actions',
  templateUrl: './payments-quick-actions.component.html',
  styleUrls: ['./payments-quick-actions.component.scss'],
  providers: []
})
export class PaymentsQuickActionsComponent implements OnInit,AfterViewInit {
  activeMenu: string = 'RETAILMULTIBILLREQUEST';
  quickLinks: any;
  doShowMoreQuickActions: boolean = false;

  @Input('resetActiveMenu') 
  set resetActiveMenu(value: boolean){
    this.activeMenu = 'RETAILMULTIBILLREQUEST';
  }

  private _accountNumber:string = '';
  @Input() 
  set accountNumber(accNum:string){
    this._accountNumber = accNum;
    // if(this._accountNumber) this.prepareContextMenu(this._accountNumber);
  }
  get accountNumber():string{
    return this._accountNumber;
  }

  cardData!: Casaaccount;
  slideConfig: any;
  @ViewChild("slickModal")
  slickModal!: SlickCarouselComponent;
  protected appConstant: any = APPCONSTANTS;
  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _billPaymentsService:BillPaymentsService,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    protected languageService: LanguageService,
    private cd: ChangeDetectorRef,
    private _menuService: CustomMenuService
  ) { }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 5, 
      slidesToScroll: 5,
      dots: false,
      arrows: false,
      infinite: false,
      swipeToSlide: false,
      rtl: this.languageService.isRtl,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 1000,
      cssEase: 'linear',
      centerMode:false,
      responsive: [
        {
          breakpoint: 2300,
          settings: {
            slidesToShow: 8,
            slidesToScroll: 8,
          },
        },
        {
          breakpoint: 2100,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          },
        },
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          },
        },
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
      // this.quickLinks = [
      //   {
      //     id: "pay-bill",
      //     serviceDescription: "Bill Payment",
      //     serviceCode: "RETAILMULTIBILLREQUEST"
      //   },
      //   {
      //     id: "add-payee",
      //     serviceDescription: "Add payee",
      //     serviceCode: "RETAILBILLERACCOUNT"
      //   },
      //   {
      //     id: "manage-payee",
      //     serviceDescription: "Manage Payee",
      //     serviceCode: "RETAILSAVEDBILLER"
      //   },
      //   {
      //     id: "scheduled-bills",
      //     serviceDescription: "Scheduled bills",
      //     serviceCode: "RETAILVIEWSCHEDULEDBILLS"
      //   }
      // ];
      this.getContextMenu();
    }
    getContextMenu() {
      let contextMenu = this._menuService.getMenuList('BILLSMENU');
        let serviceMenus = contextMenu;
        this.quickLinks = serviceMenus;
    }

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
    this.slickModal.initSlick();
  }

  showMoreQuickActions(){
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

    ngAfterViewInit(): void {
      if(!this._device.isMobile()){
      this._billPaymentsService.billpaymentsDesktopActionPublisher?.subscribe((res:any)=>{
        if(res?.action === 'QUICKACTION'){
          if(res.data.serviceCode == 'HOME'){
            // this.activeMenu = res.data.serviceCode;

          }

        }
      })    
    }
    this.activeMenu = 'RETAILMULTIBILLREQUEST';
    this.sliderWidth = this.contextMenuWrapper.nativeElement.clientWidth;
    this.cd.detectChanges();
    }
  
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  protected isPopup:boolean = false;
  openLink(menu: any) {
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    let rid:number = Math.floor(Math.random() * 99999999);
    this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
    // this._router.navigate(service.servicePath, {
    //   queryParams: {
    //     rid: rid,
    //     serviceCode : menu.serviceCode
    //   }
    // });

    if(this.isPopup) {
      this._dialogRef.close();
      this._appConfig.setData('accountCardData', this.cardData);
      this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);
    }
    
    // setTimeout(()=>{
      
    // });

    this.doShowMoreQuickActions = false;
  }

  toggleMoreQuickActions() {
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

  hideMoreQuickActions($event:any){
    $event.stopPropagation();
    this.doShowMoreQuickActions = false;
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

}
