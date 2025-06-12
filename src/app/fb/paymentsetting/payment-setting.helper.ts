import { inject, Injectable, Input } from "@angular/core";
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
import { AppConfigService } from "@dep/services";
import { BannerAdsService } from "src/app/foundation/banner-ads/banner-ads.service";
import { ChildlogService } from "../childlog-service/childlog.service";
export class paymentsettingState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  private _appConfig: AppConfigService = inject(AppConfigService);
  maxTranLimit: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  dailTranLimit: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  atmlimit: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  contactlesspaymentLimit: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  poslimit: any = {
    step: 100,
    currencyCode: this._appConfig.baseCurrency
  }
  cardData: Map<string, any> = new Map();
  cardImage:any;
}


@Injectable()
export class paymentsettingHelper extends BaseFpxFormHelper<paymentsettingState> {
  @Input() selectedData!: any;
  toggleScanAndPay: any = '0';
  toggleVirtualCard: any = '0';
  accNum: any;
  maxTranMinLimit:any
  maxtranlimit:any
  contactlessMinLimit:any
  contactlessMaxLimit:any
  posMaxLimit:any
  posMinLimit:any
  atmMinLimit:any
  atmMaxLimit:any
  dailyTranMInLimit:any
  dailtTranMaxLimit:any
  constructor(private _httpProvider: HttpProviderService, private _router: Router, private _BannerAdsService:BannerAdsService , private _childlog : ChildlogService) {
    super(new paymentsettingState());

    this._childlog.accNumberValue.subscribe( (x) => {
      // console.log("accNumberValue",x);    
      this.payLimits(x);
    });

  }

  override doPreInit(): void {
    //  this.setServiceCode("paymentsetting");
    this.addValueChangeHandler("themeCode", this.virtualCardOptionsOnvalueChange);
    this.addValueChangeHandler("scanandPayAllowed", this.scanandPayAllowedOnvalueChange);
    this.addValueChangeHandler("issueCard", this.issueCardOnvalueChange);
  }


  scanAndPayaleryCatTog(toggleScanAndPay: boolean) {

  }

  public scanandPayAllowedOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  //  console.log("value scanandPayAllowedOnvalueChange",value);
   if (value) {
    this.toggleScanAndPay = '1';
  } else {
    this.reset("maxTranLimit", true);
    this.reset("dailTranLimit", true);
    this.toggleScanAndPay = '0';
  } 
  }

  public issueCardOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
   if (value) {
    this.toggleVirtualCard = '1';
  } else {
    this.reset("atmlimit", true);
    this.reset("contactlesspaymentLimit", true);
    this.reset("poslimit", true);
    this.toggleVirtualCard = '0';
  }
  }

  public override doPostInit(): void {
    let data: any = {
      serviceCode: "RETAILCHILDPAYMENT"
    }
    this._BannerAdsService.fetchBannerAds(data).subscribe({
      next: (response) => {
        // console.log("responce", response);
        let cardList: any = response;
        cardList.map((item: any) => {
          item.id = item.contentId;
          item.text = item.contentId;
          this.state.cardData.set( item.id,item.image);
        }
        );
        this.setStaticDropdown("themeCode",cardList);
        let themeCode = this.getValue("themeCode")
        if(!themeCode){
          this.setValue("themeCode",cardList[0].contentId);
        }
        else{
          this.setValue("themeCode",themeCode);
          this.state.cardImage=this.state.cardData.get(themeCode);
        }
      }
    });
  }

  payLimits(accNum: any){
    this._childlog.payLimit(accNum).subscribe({
      next: (response) => {
        // console.log("responce", response);
        this.maxTranMinLimit = response.maxTranMinLimit
        this.maxtranlimit = response.maxtranlimit
        this.dailyTranMInLimit = response.dailyTranMInLimit
        this.dailtTranMaxLimit = response.dailtTranMaxLimit
        this.atmMinLimit = response.atmMinLimit
        this.atmMaxLimit = response.atmMaxLimit
        this.contactlessMinLimit = response.contactlessMinLimit
        this.contactlessMaxLimit = response.contactlessMaxLimit
        this.posMinLimit = response.posMinLimit
        this.posMaxLimit = response.posMaxLimit   
      }
    });
  }

  public virtualCardOptionsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  //  console.log("valuevikas",value,this.state.cardData.get(value));
   this.state.cardImage=this.state.cardData.get(value);
    
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.paymentsetting.tenantId.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


