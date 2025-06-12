import { inject, Injectable } from "@angular/core";
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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { VideopublishService } from '../videopublish-service/videopublish.service';
import { Videopublish } from '../videopublish-service/videopublish.model';
import moment from "moment";
import { DomSanitizer } from "@angular/platform-browser";
export class RetailPromotionsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
  promotions:any;
  promoVideos: Map<string, any> = new Map<string, any>();
  slideConfig: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  };
  slickModal:any;
  enablePrevious:boolean=false;
  enableNext:boolean=false;
  currentIndex:number=0;
}


@Injectable()
export class RetailPromotionsFormHelper extends BaseFpxFormHelper<RetailPromotionsFormState>{

  private sanitizer: DomSanitizer = inject(DomSanitizer);

   constructor( private retailPromotionsFormService: VideopublishService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailPromotionsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILPROMOTIONS");
 let todayDate = new Date();
 let effDate = moment(todayDate).format("YYYY-MM-DD");
 let key: any = {
  applCode: "DEPRETAIL",
   effDate: effDate,
 };
 this.retailPromotionsFormService
   .findByKey(key)()
   .subscribe({
     next: (res: any) => {
      this.state.promotions=res.videopublishdtls;
      let carouselLength : any =this.state.promotions.length-1;
      if(carouselLength>0){
        this.state.enableNext=true;
      }
      this.state.promotions.forEach((item:any)=>{
        let invNo=item.inventoryNo.inventoryNo;
        let videoURL=item.inventoryNo.videoLink;
         let embdedCode = item.inventoryNo?.embededCode;
           this.state.promoVideos.set(invNo, {
            url: videoURL,
            embededCode: embdedCode
           });
      })
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
  let carouselLength=this.state.promoVideos.size-1;
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
 safeHTML(unsafe: string) {
  return this.sanitizer.bypassSecurityTrustHtml(unsafe);
}
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Videopublish):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Videopublish){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.videopublish.applCode.effDate,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
