import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { FpxAppConfig, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { PanningService } from 'src/app/dep/services/panning.service';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';

@Component({
  selector: 'bills-aside-bar',
  templateUrl: './bills-aside-bar.component.html',
  styleUrls: ['./bills-aside-bar.component.scss']
})
export class BillsAsideBarComponent extends DepPanningComponent implements OnInit {
  serviceCode: string = "";
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
  bannersList: any;
  selectedScheduleBillDetails: any;
  showScheduleBillDetails: boolean = false;

  scheduleBillDetails: any = [
    // {
    //   title: "Payee",
    //   value: "",
    //   showLabel: true
    // },
    {
      title: "Account number",
      value: "",
      showLabel: true
    },
    {
      title: "Pay from",
      value: "",
      showLabel: true
    },
    // {
    //   title: "Amount",
    //   value: "",
    //   showLabel: true
    // },
    {
      title: "Payment date",
      value: "",
      showLabel: true
    },
    {
      title: "Recurring",
      value: "",
      showLabel: false
    }, {
      title: "Ends after",
      value: "",
      showLabel: false
    },
    {
      title: "Ends on",
      value: "",
      showLabel: false
    }
  ]

  constructor(private _router: Router, private _appConfig: FpxAppConfig,
    private _device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  override ngOnInit(): void {
    this.serviceCode = this._device.isMobile() ? "RETAILMOBDASHBOARD" : "RETAILDESKDASHBOARD";
    // this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
    //   next: (res: any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //   }
    // });

    let selectedScheduleBill$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('selectedScheduleBill$', {
      "observable": selectedScheduleBill$.asObservable(),
      "subject": selectedScheduleBill$
    });
    let closeScheduleBill$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('closeScheduleBill$', {
      "observable": closeScheduleBill$.asObservable(),
      "subject": closeScheduleBill$
    });


    if (this._appConfig.hasData('selectedScheduleBill$')) {
      this._appConfig.getData('selectedScheduleBill$').observable.subscribe(
        (res: any) => {
          console.log(res)
          if (res.selectedData?.beneficiaryName) {
            this.showScheduleBillDetails = true;
          } else {
            this.showScheduleBillDetails = false;
          }
          console.log("selectedScheduleBill", res);
          this.selectedScheduleBillDetails = res?.selectedData ? res : null;
          if (this.selectedScheduleBillDetails?.selectedData) {
            // this.scheduleBillDetails[0].value = this.selectedScheduleBillDetails.selectedData.beneficiaryName;
            this.scheduleBillDetails[0].value = this.selectedScheduleBillDetails.selectedData.creditAccountNumber;
            this.scheduleBillDetails[1].value = this.selectedScheduleBillDetails.selectedData.sourceAccount;
            // this.scheduleBillDetails[3].value = this.selectedScheduleBillDetails.selectedData.paymentAmount;
            this.scheduleBillDetails[2].value = this.formatDate(this.selectedScheduleBillDetails.selectedData.paymentDate, 'DD MMM yyyy');
            if (this.selectedScheduleBillDetails.selectedData.scheduleType === '3') {
              this.scheduleBillDetails[3].value = this.selectedScheduleBillDetails.selectedData.paymentFrequency;
              this.scheduleBillDetails[3].showLabel = true;
              this.scheduleBillDetails[4].value = this.selectedScheduleBillDetails.selectedData.numberOfPayments;
              this.scheduleBillDetails[4].showLabel = true;
            } else {
              this.scheduleBillDetails[3].showLabel = false;
              this.scheduleBillDetails[4].showLabel = false;
            }
            this.scheduleBillDetails[5].value = this.formatDate(this.selectedScheduleBillDetails.selectedData.paymentEndDate, 'd MMM yyyy');
          }
        }
      );
    }
  }

  formatDate(date: string, format: string) {
    return moment(date).format(format);
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

  closeBillDetails() {
    if (this._appConfig.hasData('closeScheduleBill$')) {
      this._appConfig.getData('closeScheduleBill$').subject.next();
    }
    this.selectedScheduleBillDetails = null;
  }

  deleteBill() {
    // $event.stopPropagation();
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'delete-bill-backdrop', 'bottom-transparent-overlay', 'delete-scheduled-bill-backdrop']);
    modal.setDisableClose(true);
    modal.setData({
      title: "Delete your scheduled bill to" + " " + this.selectedScheduleBillDetails.selectedData.beneficiaryName + "?",
      // message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteScheduledBillPopup.okBtnLbl",
      cancelBtnLbl: "DeleteScheduledBillPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }


  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload == 1) {
      if (this._appConfig.hasData('scheduledBillRefresh$')) {
        this._appConfig.getData('scheduledBillRefresh$').subject.next({ payload: this.selectedScheduleBillDetails.selectedData, deleteRequest: 1 });
        this.selectedScheduleBillDetails = null;
      }
    }
  }

}
