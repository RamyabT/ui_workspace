import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LanguageService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { BannerAdsService } from './banner-ads.service';
import { FileOpenerService } from '@dep/native';
import { FpxAppConfig } from '@fpx/core';

@Component({
  selector: 'banner-ads',
  templateUrl: './banner-ads.component.html',
  styleUrls: ['./banner-ads.component.scss']
})
export class BannerAdsComponent implements OnInit, OnChanges {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  @Input('slidesStore') slidesStore: any;
  @Input('fromMailbox') fromMailbox: boolean = false;
  @Input('expandAsideBar') expandAsideBar: boolean = false;

  @Output()
  public afterAdsFetch: EventEmitter<any> = new EventEmitter<any>();

  adsLoaded : boolean = false;

  @Input() set serviceCode(code: string) {
    this._bannerAdsService.fetchBannerAds({ serviceCode: code }).subscribe({
      next: (res: any) => {
        console.log(this.fromMailbox)
        console.log("ADS Banner:", res);
        this.bannersList = res || [];
        this.adsLoaded = true;

        this.afterAdsFetch.emit()

        if (this._appConfig.hasData('mailBoxOffersData$') && this.fromMailbox) {
          this._appConfig.getData('mailBoxOffersData$').subject.next({ action: 'RECEIVEDMAILBOXOFFERS', mailBoxOfferData: res });
        }

      }
    });
  }

  slideConfig: any;
  bannersList:any;

  constructor(
    private _languageService: LanguageService,
    private _bannerAdsService: BannerAdsService,
    private _fileOpenerService: FileOpenerService,
    private _appConfig: FpxAppConfig,
  ) { }

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: 1, 
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      infinite: true,
      rtl: this._languageService.isRtl,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['expandAsideBar']) {
        this.adsLoaded = false;
        if(changes['expandAsideBar'].currentValue) {
          setTimeout(() => {
            this.adsLoaded = true;
            this.slickModal.slickGoTo(0);
          }, 1000);
        }
      }
  }

  
  ngAfterViewInit() {
    // this._bannerAdsService.fetchBannerAds({ serviceCode: "RETAILDASHBOARD" }).subscribe({
    //   next: (res:any) => {
    //     console.log("ADS Banner:", res);
    //     this.bannersList = res || [];
    //   }
    // });
  }

  adAction(adData:any){
    if(adData.url){
      this._fileOpenerService.openLink(adData.url);
    }
  }

}
