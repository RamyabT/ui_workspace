import { Injectable } from '@angular/core';
import { BaseFpxControlHelper } from '@fpx/core';
import { Observable } from 'rxjs';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';


@Injectable()
export class virtualCardOptionsControlHelper extends BaseFpxControlHelper{
constructor(private _BannerAdsService:BannerAdsService) 
    {
        super();
     
    }

    override doPreInit(): void {
        

    }
   
   
     public override doPostInit(): void {
     }


}