import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { FpxModal, FpxModalAfterClosed, HttpRequest } from '@fpx/core';
import { IFpxMenuChild } from '@fpx/layout';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { BaseFpxFunctionality} from '@fpx/core';
import { HttpContext } from '@angular/common/http';
import { APPCONSTANTS } from '@dep/constants';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TranslateService } from '@ngx-translate/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';

@Component({
  selector: 'app-casa-context-menu',
  templateUrl: './casa-context-menu.component.html',
  styleUrls: ['./casa-context-menu.component.scss']
})
export class CasaContextMenuComponent extends BaseFpxFunctionality implements OnInit {
  protected activeMenu: string = '';

  @ViewChild('contextMenuWrapper', { read: ElementRef }) contextMenuWrapper!: ElementRef;

  @ViewChild("slickModal")
  slickModal!: SlickCarouselComponent;
  casaAccounts?: Casaaccount[];
  quickLinksGrpObject: any = {
    payments: [],
    account: [],
    actions: []
  };

  @Input('resetActiveMenu') 
  set resetActiveMenu(value: boolean){
    if(value) this.activeMenu = '';
  }

  private _accountNumber:string = '';
  @Input() 
  set accountNumber(accNum:string){
    this._accountNumber = accNum;
    if(this._accountNumber) this.prepareContextMenu(this._accountNumber);
  }
  get accountNumber():string{
    return this._accountNumber;
  }
  private _highlightMenu: string = '';
  get highlightMenu(){
    return this._highlightMenu
  }

  @Input() resetActions = false;

  @Input() set highlightMenu(highlightMenu) {
    this._highlightMenu = highlightMenu;
    if(this._highlightMenu == 'open-new-casa') {
      this.openLink({
        id: "RETAILOPENNEWCASA",
        name: "<em>Apply for CASA</em>Account",
        icon: "RETAILOPENNEWCASA"
      });
    }
  }
  quickLinks: any;
  cardData!: Casaaccount;
  
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  private restrictedServices:any;
  protected isPopup:boolean = false;
  protected doShowMoreQuickActions: boolean = false;
  protected sliderWidth : number = 0;
  selectedAccountType: string = '';


  protected appConstant: any = APPCONSTANTS;
  slideConfig: any;
  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) protected _dialogData : any,
    private _appConfig:AppConfigService,
    private _router:Router,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    protected languageService: LanguageService,
    private route: ActivatedRoute,
    private _fileOpener: FileOpenerService,
    protected _device: DeviceDetectorService,
    private _translate:TranslateService,
    private cd: ChangeDetectorRef,
    private _accountsSpaceMgr: AccountsSpaceManager
  ) {
    super();
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
    if(this._dialogData.hasOwnProperty('cardData')){
      this.isPopup = true;
      this.cardData = this._dialogData.cardData;
      this.selectedAccountType = this.cardData.accountType;
      this._accountNumber = this.cardData.accountNumber;
      this.prepareContextMenu(this._accountNumber);
    }
  }

size = 0;
  currentWindowSize = window.innerWidth;
  currentPercent =  100;
  initialPercent = 100;
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
    else { //zoom out
      // percentChange = ((window.innerWidth - this.currentWindowSize)/this.currentWindowSize)*100;
      // this.size = this.size - this.currentPercent == 100?20:10;
      // percentChange = this.initialPercent + Math.abs(this.size);
      // this.currentPercent = percentChange;

      this.currentWindowSize = window.innerWidth;
      this.sliderWidth = this.contextMenuWrapper.nativeElement.clientWidth;

    }    
    
    this.cd.detectChanges();
    this.slickModal.initSlick();
  }
  ngOnChanges() {
    if (this.resetActions) {
      this.slickModal.slickGoTo(0);
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

  enabledServices = [
    'RETAILMULTIBILLREQUEST',
    'RETAILETRANSFER',
    'RETAILACCNICKNAME',
    'RETAILVOIDCHEQUE',
    'RETAILSTOPCHEQUE',
    'RETAILACCOUNT',
    'RETAILTRANSFERS'
  ]

  openLink(menu:any){
    this.activeMenu = menu.serviceCode;
    if(!this.enabledServices.includes(menu.serviceCode)) return;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    if(this.activeMenu == "RETAILVOIDCHEQUE"){
      this.onDownloadClick();
    } else if (menu.serviceCode == 'RETAILTRANSFERS' || menu.serviceCode == 'RETAILMULTIBILLREQUEST') {
      this._appConfig.setData('selectedAccountFromSummary', this._accountNumber);
      this._router.navigate(service.servicePath);
    }
    else {
      let rid:number = Math.floor(Math.random() * 99999999);
      this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
      this._router.navigate(service.servicePath, {
        queryParams: {
          rid: rid,
          serviceCode: menu.serviceCode
        }
      });
    }

    if(this.isPopup) {
      this._dialogRef.close();
      this._appConfig.setData('accountCardData', this.cardData);
      this._activeSpaceInfoService.setAccountNumber(this.cardData.accountNumber);
    }
    
    // setTimeout(()=>{
      
    // });

    this.doShowMoreQuickActions = false;
  }

  closeContextMenu(){
    this._dialogRef.close();
  }

  getContextMenu(){
    let contextMenu = JSON.parse(JSON.stringify(this._menuService.getMenuList(this._menuService.getAccountsMenuCodeByAccountType(this.cardData.accountType))));
    // console.log("typeof contextmenu",typeof(contextMenu))

    // const menuArray = Object.values(contextMenu)
    // const categorized ={
    //   payment:[] as any[],
    //   account:[] as any[],
    //   product:[] as any[]
    // };

    // menuArray.forEach((item: any) =>{
    //   const desc = item.serviceDescription.toLowerCase();
    //   if(desc.includes('bill') || desc.includes('transfer') || desc.includes('cheque deposit')){
    //     categorized.payment.push(item);
    //   }else if(desc.includes('account') || desc.includes('change')){
    //     categorized.account.push(item);
    //   }else if(desc.includes('statement') || desc.includes('chequebook') || desc.includes('download') || desc.includes('stop cheque')){
    //     categorized.product.push(item);
    //   }
    // })
    // console.log("categorized",categorized)
    this._dialogData.showSubGroupHeader = true

    this.casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let cardData: any = this.casaAccounts.filter((item: any) => item.accountNumber === this.accountNumber);
    if(cardData[0]?.accountCurrency == 'USD') {
      contextMenu = contextMenu.filter((item: any)=>item.serviceCode != 'RETAILMULTIBILLPAYMENT' && item.serviceCode != 'RETAILETRANSFER')
    }
    // if (!this._device.isMobile()) {
    //   contextMenu = contextMenu.filter((item: any) => item.serviceCode != 'CHEQUEDEPOSIT')
    // }

    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }

    this.quickLinks = serviceMenus;
    console.log(this.quickLinks)
    console.log(this.cardData)
    setTimeout(() => {
      if (this.cardData.accountCurrency === 'USD') {
        this.quickLinks = this.quickLinks.filter((item: any) => item.serviceCode !== 'RETAILMULTIBILLREQUEST');
        console.log('quickLinks', this.quickLinks);
      }

      if(this._dialogData.showSubGroupHeader){
        this.quickLinks.forEach((item: any) => {
          if (item.serviceCode == 'RETAILMULTIBILLPAYMENT' || item.serviceCode == 'RETAILETRANSFER' || item.serviceCode == 'RETAILTRANSFERS' || item.serviceCode == 'RETAILMULTIBILLREQUEST' || item.serviceCode == 'CHEQUEDEPOSIT') {
            this.quickLinksGrpObject.payments.push(item);
        }
        else if(item.serviceCode == 'RETAILACCOUNT' || item.serviceCode == 'RETAILACCNICKNAME' || item.serviceCode == 'RETAILCHANGEPRODUCT'){
          this.quickLinksGrpObject.account.push(item);
        }
          else this.quickLinksGrpObject.actions.push(item);
        });
      }
    }, 50);



    // if (this.selectedAccountType !== 'CAA') {
    //   this.quickLinks = this.quickLinks.filter((item: any) => item.serviceCode !== 'RETAILSTOPCHEQUESUMMARY');
    // }

    // if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
    //   let menu = this.quickLinks.find((x: any)=>x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
    //   this.openLink(menu);
    // }
  }

  showMoreQuickActions(){
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  prepareContextMenu(accountNumber:string){
    this.activeMenu = '';
    if(APPCONSTANTS.contextMenuRestrictionRequired){
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
          error: (reason) => {
            this.getContextMenu();
          }
        });
      }
    } else {
      this.getContextMenu();
    }
    
  }

  onDownloadClick() {
    console.log('qwerty');
    let accountNumber = this._accountNumber;
    this.showSpinner();
    this._commonService.downloadVoidCheque(accountNumber).subscribe({
      next: (response: any) => {
        this.hideSpinner();
        if (this._device.isHybrid()) {
          this._fileOpener.openPDF(
            response,
            "application/pdf",
            "Direct Deposit Form.pdf"
          );
        } else {
          let documentURL = URL.createObjectURL(
            new Blob([response.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "Direct Deposit Form.pdf";
          downloadLink.download = fileName;
        }
        let modal = new FpxModal();
        modal.setComponent(DepConfirmationComponent);
        modal.setPanelClass('dep-alert-popup');
        // modal.setBackDropClass(['accounts-menu-backdrop']);
        modal.setBackDropClass(['dep-popup-back-drop', 'dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
        modal.setDisableClose(false);
        modal.setData({
          title: 'RetailVoidChequeform.title',
          message: 'RetailVoidChequeform.message',
          confirmationIcon: 'success',
          okBtnLbl: 'RetailVoidChequeform.okBtnLbl',
          cancelBtnLbl: 'RetailVoidChequeform.cancelBtnLbl'
        });
        modal.setAfterClosed(this.ModelAfterClose);
        this.openModal(modal);
      },
      error: (error) => {
        this.hideSpinner();
        let errMsg: any;
        let titleMsg: any;
        if (error.status == 500) {
          titleMsg = this._translate.instant('RetailVoidChequeform.dataErrorTitle');
          errMsg = this._translate.instant('RetailVoidChequeform.DataError')
        }
        else if (error.status == 404) {
          titleMsg = this._translate.instant('RetailVoidChequeform.serviceUnavailableTitle');
          errMsg = this._translate.instant('RetailVoidChequeform.serverError');
        }
        else if (error.status == 504) {
          titleMsg = this._translate.instant('RetailVoidChequeform.timeOutTitle');
          errMsg = this._translate.instant('RetailVoidChequeform.TimeOutError');
        }
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('etransfer-send-limits');
        fpxModal.setData({
          title: titleMsg,
          message: errMsg
        });
        this.openModal(fpxModal);
      }
    });

  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(this._device.isMobile()){
      this._angularRouter.navigate(['home']);
    }
    else{
      this._angularRouter.navigate(['accounts-space']);
    }
  }
  ModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if(payload==1){
      this._angularRouter.navigate(['home']);
    }
  }

}
