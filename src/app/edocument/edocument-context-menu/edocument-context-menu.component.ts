import { Component, ElementRef, Inject, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { FileOpenerService } from '@dep/native';
import { AppConfigService, CustomMenuService, LanguageService } from '@dep/services';
import { FpxModal, HttpRequest } from '@fpx/core';
import { IFpxMenuChild } from '@fpx/layout';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { BaseFpxFunctionality} from '@fpx/core';
import { HttpContext } from '@angular/common/http';
import { APPCONSTANTS } from '@dep/constants';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edocument-context-menu',
  templateUrl: './edocument-context-menu.component.html',
  styleUrls: ['./edocument-context-menu.component.scss']
})
export class eDocumentContextMenuComponent extends BaseFpxFunctionality implements OnInit {
  protected activeMenu: string = '';

  @ViewChild('contextMenuWrapper', { read: ElementRef }) contextMenuWrapper!: ElementRef;

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
  @Input() set highlightMenu(highlightMenu){
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

  protected appConstant: any = APPCONSTANTS;
  slideConfig: any;
  constructor(
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _appConfig:AppConfigService,
    private _router:Router,
    private _menuService: CustomMenuService,
    private _commonService: CommonService,
    protected languageService: LanguageService,
    private route: ActivatedRoute,
    private _fileOpener: FileOpenerService,
    protected _device: DeviceDetectorService,
    private _translate:TranslateService
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
    this.prepareContextMenu(this._accountNumber);
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

  openLink(menu:any){
    this.activeMenu = menu.serviceCode;
    let service = this._appConfig.getServiceDetails(menu.serviceCode);
    if(this.activeMenu == "RETAILVOIDCHEQUE"){
      this.onDownloadClick();
    }
    else {
      let rid:number = Math.floor(Math.random() * 99999999);
      this._activeSpaceInfoService.setAccountNumber(this._accountNumber);
      this._router.navigate(service.servicePath, {
        queryParams: {
          rid: rid
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

  private getServiceMenus() {
    let contextMenu = this._menuService.getMenuList('EDOCUMENTSMENU');
    let serviceMenus = contextMenu;

    if(this.restrictedServices && this.restrictedServices.length){
      serviceMenus = contextMenu.filter((obj1:any) => !this.restrictedServices.find((obj2:any) => obj1.serviceCode == obj2.serviceCode));
    }
    return serviceMenus;
  }

  getContextMenu(){
    this.quickLinks = this.getServiceMenus();

    if(this.route?.snapshot?.queryParams?.['serviceCode'] && this.quickLinks.length > 0) {
      let menu = this.quickLinks.find((x: any)=>x.serviceCode == this.route?.snapshot?.queryParams?.['serviceCode'])
      this.openLink(menu);
    }
    this.openLink(this.quickLinks[0])
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

  showMoreQuickActions(){
    this.doShowMoreQuickActions = !this.doShowMoreQuickActions;
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
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: titleMsg,
          message: errMsg
        });
        this.openModal(fpxModal);
      }
    });

  }

}
