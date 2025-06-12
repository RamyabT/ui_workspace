import { Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal,
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { OfferspublishService } from "../offerspublish-service/offerspublish.service";
import { Offerspublish } from "../offerspublish-service/offerspublish.model";
import moment from "moment";
import { CustomFileUploadService } from "@dep/services";

export class RetailViewOffersFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  images = [
    { image: "assets/images/banners/ads-banner1.jpg" },
    { image: "assets/images/banners/ads-banner2.jpg" },
    { image: "assets/images/banners/ads-banner3.jpg" },
  ];
  slideConfig: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  offers: any;
  imageInvNo: any;
  url: any;
  offerImages: Map<string, any> = new Map<string, any>();
  slickModal:any;
  enablePrevious:boolean=false;
  enableNext:boolean=false;
  currentIndex:number=0;
}

@Injectable()
export class RetailViewOffersFormHelper extends BaseFpxFormHelper<RetailViewOffersFormState> {
  constructor(
    private retailViewOffersFormService: OfferspublishService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _customFileUploadService: CustomFileUploadService
  ) {
    super(new RetailViewOffersFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILVIEWOFFERS");
    let todayDate = new Date();
    let effDate = moment(todayDate).format("YYYY-MM-DD");
    let key: any = {
      applicationCode: "DEPRETAIL",
      effDate: effDate,
    };
    this.retailViewOffersFormService
      .findByKey(key)()
      .subscribe({
        next: (res: any) => {
          this.state.offers = res.offerspublishdtls;
          let carouselLength : any =this.state.offers.length-1;
          if(carouselLength>0){
            this.state.enableNext=true;
          }
          this.state.offers.forEach((element: any) => {
            let imgInvNo=element.offerInvNumber.imgInventoryNumber.inventoryNumber;
            let url='data:image/png;base64,'+element.offerInvNumber.imgInventoryNumber.documentContentEncoded;
            this.state.offerImages.set(imgInvNo, url);
            // this.fetchOfferImages(imgInvNo);
          });
        },
      });
  }
  slickInit(event:any){
    this.state.slickModal=event.slick;
   }
  
   previous(){
    this.state.slickModal.slickPrev();
    let prevIndex:any;
    prevIndex=this.state.currentIndex-1;
    this.state.currentIndex=prevIndex;
    this.state.enableNext=true;
    if(prevIndex==0){
      this.state.enablePrevious=false;
    }
    else{
      this.state.currentIndex=this.state.currentIndex--;
      this.state.enablePrevious=true;
    }
   }
   next(){
    this.state.slickModal.slickNext();
    let nextIndex:any;
    let carouselLength=this.state.offerImages.size-1;
    nextIndex=this.state.currentIndex+1;
    this.state.currentIndex=nextIndex;
    if(nextIndex<carouselLength){
      this.state.enablePrevious=true;
    }
    else if(nextIndex==carouselLength){
      this.state.enablePrevious=true;
      this.state.enableNext=false;
    }
    else{
      this.state.enableNext=false;
    }
   }
  fetchOfferImages(invNo: any) {
    this._customFileUploadService.download(invNo).subscribe({
      next: (res: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(res.body);
        reader.onloadend = () => {
          let url = reader.result;
          this.state.offerImages.set(invNo, url);
        };
      },
    });
  }
  public override doPostInit(): void {
    this.removeShellBtn('BACK');
  }

  public override preSubmitInterceptor(payload: Offerspublish): any {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Offerspublish) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.offerspublish.applicationCode.effDate,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
