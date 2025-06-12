import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { FpxAppConfig } from '@fpx/core';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';

@Component({
  selector: 'transfers-aside-bar',
  templateUrl: './transfers-aside-bar.component.html',
  styleUrls: ['./transfers-aside-bar.component.scss']
})
export class TransfersAsideBarComponent implements OnInit {

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
  serviceCode: string = "RETAILDASHBOARD";


  constructor(private _router: Router, private _appConfig: FpxAppConfig,
    private _device: DeviceDetectorService,
    private _bannerAdsService: BannerAdsService
  ) { }

  ngOnInit(): void {
    let serviceCode = this._device.isMobile() ? "RETAILMOBDASHBOARD" : "RETAILDESKDASHBOARD";
    this._bannerAdsService.fetchBannerAds({ serviceCode: serviceCode }).subscribe({
      next: (res: any) => {
        console.log("ADS Banner:", res);
        this.bannersList = res || [];
      }
    });
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

}
