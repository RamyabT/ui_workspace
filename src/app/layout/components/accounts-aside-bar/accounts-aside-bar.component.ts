import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APPCONSTANTS } from '@dep/constants';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { CriteriaQuery, FpxAppConfig, FpxModal } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { AccountsSpaceManager } from 'src/app/accounts-space/accounts-space.manager';
import { StopchequeService } from 'src/app/accounts/stopcheque-service/stopcheque.service';
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';
import { ObapplicantsignatureService } from 'src/app/onboarding/obapplicantsignature-service/obapplicantsignature.service';
import { gsap } from "gsap";
import { CustomDatePipe } from 'src/app/common/pipe/custom-date/custom-date.pipe';
declare let $: any;
@Component({
  selector: 'accounts-aside-bar',
  templateUrl: './accounts-aside-bar.component.html',
  styleUrls: ['./accounts-aside-bar.component.scss'],
  providers: [CustomDatePipe]

})
export class AccountsAsideBarComponent implements OnInit, AfterViewInit {
   protected appConsatance:any = APPCONSTANTS;
  expandAsideBar: boolean = true;
  showWidget: boolean = true;
  adsBannerSlids = [
    {
      id: '01',
      banner: './assets/images/banners/ads-banner1.jpg',
      content: 'BANNER_SLIDES.01'
    },
    { 
      id: '02',
      banner: './assets/images/banners/ads-banner2.jpg', 
      content: 'BANNER_SLIDES.02'
    }, 
    { 
      id: '03',
      banner: './assets/images/banners/ads-banner3.jpg', 
      content: 'BANNER_SLIDES.03'
    }
  ];
  bannersList:any;
  serviceCode : string = "";
  showTransactionDetails: boolean = false;
  viewChequeImg: boolean = false;
  casaTransactionDetailsObj: any = {};
  accountCurrency:any;
  casaTransactionDetails: any = [
    {
      title: this._translateService.instant('RetailViewCasaTranDtlsForm.transactionDate'),
      value: "",
      showLabel: true,
      format: 'date'
    },
    {
      title: this._translateService.instant('RetailViewCasaTranDtlsForm.balance'),
      value: "",
      showLabel: true,
      format: 'currency'
    },
    {
      title: this._translateService.instant('RetailViewCasaTranDtlsForm.transactionDescription'),
      value: "",
      showLabel: true
    },
    {
      title: this._translateService.instant('RetailViewCasaTranDtlsForm.transactionReference'),
      value: "",
      showLabel: true
    }
  ]
  showStopChequeDetails: boolean = false;
  stopChequeDetails: any;
  stoppedChequesTooltip: string = "These are your stopped cheques. You can expand each one to view details or revoke the stop cheque.";

  constructor(private _router: Router, private _appConfig: FpxAppConfig,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService,
    private _translateService: TranslateService,
    private _casaTransactionDtls:CasatransactiondtlsService,
    private _dialogRef: MatDialogRef<any>,
    public _obService: ObapplicantsignatureService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _stopChequeService: StopchequeService,
    protected _appconfig: AppConfigService,
    private customDatePipe: CustomDatePipe,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
     this.serviceCode = this._device.isMobile() ? "RETAILMOBDASHBOARD" : "RETAILDESKDASHBOARD";
    // this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
    //   next: (res: any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //   }
    // });

    let showTransactionDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showTransactionDetails$', {
      "observable": showTransactionDetails$.asObservable(),
      "subject": showTransactionDetails$
    });

    let showStopChequeDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('showStopChequeDetails$', {
      "observable": showStopChequeDetails$.asObservable(),
      "subject": showStopChequeDetails$
    });
     

    if (this._appConfig.hasData('showTransactionDetails$')) {
      this._appConfig.getData('showTransactionDetails$').observable.subscribe(
        (res: any) => {
          console.log("selectedScheduleBill", res);
          this.showTransactionDetails = res?.showTransactionDetails ? true : false;
          if(this.showTransactionDetails){
            window.scroll({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }
          this.casaTransactionDetailsObj = res?.casaTransactionDetailsObj;
          this.casaTransactionDetails[0].value = this.customDatePipe.transform(moment(this.casaTransactionDetailsObj.transactionDate),'YYYY-MM-DD');
          this.casaTransactionDetails[1].value = this.casaTransactionDetailsObj.balance;
          this.casaTransactionDetails[2].value = this.casaTransactionDetailsObj.transactionDescription;
          this.casaTransactionDetails[3].value = this.casaTransactionDetailsObj.transactionReference;
        }
      );
    }

    if (this._appConfig.hasData('showStopChequeDetails$')) {
      this._appConfig.getData('showStopChequeDetails$').observable.subscribe(
        (res: any) => {
          if(this.showStopChequeDetails&&this.showStopChequeDetails==res.showStopChequeDetails){
            return
          }
          this.showStopChequeDetails = res?.showStopChequeDetails ? true : false;
          if(this.showStopChequeDetails){
            this.stopChequeDetails = undefined;
            this.hideStopChequeLoader = false;
            this.getStopChequeDetails();
          }
          // else {
          //   if (this._appConfig.hasData('showStopChequeDetails$')) {
          //     this._appconfig.getData('showRevokeStopChequeDetails$').subject.next({
          //       showRevokeStopChequeDetails: true
          //     });
          //   }
          // }
        }
      );
    }
  }

  ngAfterViewInit(){
  }

  toggleAsideBar(){
    this.expandAsideBar = !this.expandAsideBar;
    this.showWidget = this.expandAsideBar;
  }

  navToScreen(serviceCode:string){
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service?.servicePath, {
      queryParams: {
        "serviceCode": serviceCode,
      }
    });
  }

  closeTranDetails(){
    this.showTransactionDetails = false;
  }
  closeBillDetails() {
    this.showTransactionDetails = false;
    if (this._appConfig.hasData('refreshTransferHistoryGrid$')) {
      this._appConfig.getData('refreshTransferHistoryGrid$').subject.next();
    }
  }
  pendingCheques(){
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-stopcheque-display-grid']);
  }

  getChequeImage(data:any){
    if(this.casaTransactionDetailsObj.chequeImage){
      this.viewChequeImg =true;
    } else {
      // this.showSpinner();
      this._casaTransactionDtls.fetchChequeImage(data).subscribe({
        next: (res:any) => {
          this.casaTransactionDetailsObj.chequeImage = res;
          this.viewChequeImg =true;
        },
        error: (err:any) => {
          this.viewChequeImg =false;
        }
      });
    }
  }

  downloadImage() {
    const blobData = this._obService.base64ToBlob(this.casaTransactionDetailsObj.chequeImage);
    let documentURL = URL.createObjectURL(
      new Blob([blobData], { type: "image/png" })
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = documentURL;
    const fileName = "View_Cheque.png";
    downloadLink.download = fileName;
    downloadLink.click();
    this.viewChequeImg=false;
    this.showTransactionDetails=true;

  }
  
  getReason(selectedData: any) {
    let reasonText;
    switch (selectedData.reason) {
      case '1': reasonText = 'Lost/Stolen'; break;
      case '2': reasonText = 'Mailed to incorrect address'; break;
      case '3': reasonText = 'Alternate payment arrangements made'; break;
      case '4': reasonText = 'Cheque contains incorrect information'; break;
      case '5': reasonText = 'Do not want to pay'; break;
      case '6': reasonText = 'Other: '+ selectedData.otherReason; break;
    }
    return reasonText;
  }
  revoke(selectedData: any){
    this._appconfig.setData('setStopChequeData', selectedData);
    this._router.navigate(['accounts-space', 'entry-shell', 'accounts', 'retail-revoke-stop-cheque'], {
      queryParams: {
        relatedReference: selectedData.relatedReference
      }
    });
    if (this._appconfig.hasData('showRevokeStopChequeDetails$')) {
      this._appconfig.getData('showRevokeStopChequeDetails$').subject.next({
        showRevokeStopChequeDetails: true
      });
    }
      this.setupAccordionAnimation();
  }
  hideStopChequeLoader: boolean = false;
  getStopChequeDetails(){
    const criteriaQuery: CriteriaQuery = new CriteriaQuery();
    criteriaQuery.addFilterCritertia('accountNumber', 'String', 'equals', {
      searchText: this._activeSpaceInfoService.getAccountNumber()
    });
    this._stopChequeService.findAll(criteriaQuery)().subscribe({
      next: (res:any) => {
        this.stopChequeDetails = res.data;
        if(res.data.length=='0' || !res.data){
          this.hideStopChequeLoader = true;
        }
        setTimeout(() => {
          this.setupAccordionAnimation();
        }, 1000);
      }
    });
  }

  getAccountDetails(){
    let casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    let selectedAccount = casaAccounts.filter((item:any) => item.accountNumber === accountNumber);
    return selectedAccount?.[0]?.accountNickname || selectedAccount?.[0]?.productDesc;
  }
  getAccountCurrency(){
    let casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    let selectedAccount = casaAccounts.filter((item:any) => item.accountNumber === accountNumber);
    return selectedAccount?.[0]?.accountCurrency;
  }

  private accountsAccordionIndexes: any = [];
  private opnedAccordionIndex = 0;
  count: number = 0;
  
  setupAccordionAnimation() {
    this.accountsAccordionIndexes = new Array();

    this.stopChequeDetails.slice(0, 4).forEach((element: any, i: any) => {
      let accordionAnimation = gsap.timeline({ reversed: true, paused: true });
      let target = ".accordion-item-" + i;

      accordionAnimation.eventCallback("onStart", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onUpdate", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.eventCallback("onComplete", () => {
        $(target)[0].classList.add('accordion-content-open');
      });

      accordionAnimation.eventCallback("onReverseComplete", () => {
        $(target)[0].classList.remove('accordion-content-open');
      });

      accordionAnimation.fromTo(target + " .panel-body", {
        css: { height:0 }
      }, {
        css: { height: 'auto' }
      }, 0);
      
      accordionAnimation.fromTo(target + " .btn-accordion-toggle", {
        css: { rotationZ: 0 }
      }, {
        css: { rotationZ: -180 }
      }, 0);

      this.accountsAccordionIndexes[i] = accordionAnimation;

    },0);
    setTimeout(() => {
      this.hideStopChequeLoader = true;
    }, 1000);
  }

  toggleAccordion(index:number){
    let animation = this.accountsAccordionIndexes[this.opnedAccordionIndex];
    if(this.opnedAccordionIndex == index){

    } else if(this.opnedAccordionIndex >= 0){
      if(this._device.isDesktop()) {
        animation = this.accountsAccordionIndexes[this.opnedAccordionIndex]; 
        animation.reverse(); 
      }
    }
    animation = this.accountsAccordionIndexes[index];
    if(animation?.reversed()) {
      animation.play();
      this.stopChequeDetails[index].accordianOpened = true;
    }
    else {
      animation.reverse();
      this.stopChequeDetails[index].accordianOpened = false;
    }
    this.opnedAccordionIndex = index;
    this.cd.detectChanges();
  }
  getXChangeCurrancy(transactionCurrency:string):string{
    return APPCONSTANTS.getExchangeCurrency(transactionCurrency);
  }

  getAbsoluteValue(value: any | undefined): any {
    value = value?.toString().replaceAll(',', '');
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: any | undefined): string {
    return value && value < 0 ? '-' : '';
  }

}
