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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { BillerService } from '../biller-service/biller.service';
import { Biller } from '../biller-service/biller.model';
export class RetailBillerListRoGriFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
   _gridData:any;
   _totalGridData:any;
}


@Injectable()
export class RetailBillerListRoGriFormHelper extends BaseFpxFormHelper<RetailBillerListRoGriFormState>{

   constructor( private billerListRoGriFormService: BillerService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new RetailBillerListRoGriFormState());
    }
   
  override doPreInit(): void {
    this.hideShellActions()
 this.setServiceCode("BILLERLISTROGRIDFORM");
 }
   

  public override doPostInit(): void {
    this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);
    this.addControlEventHandler("BILLERLISTDATAEMIT", this.onBillerListReceived);  
  }

  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(this.state._gridData && value && value != ' '){
      let searchTextVal = value.toLocaleLowerCase();
      let _data = this.state._gridData.filter((rowData:any) => Object.values([
        rowData?.shortName, 
      ]).some((val:any) => {
        let txt = '';
        if (val && typeof(val) === 'string' || typeof(val) === 'number') {
          txt = val.toString().toLocaleLowerCase();
          return txt.includes(searchTextVal);
        } else {
          return false;
        }
      }));
      this.setGridData('billersGrid', _data);
    }else{
      
      this.setGridData('billersGrid', this.state._totalGridData);

    }
  }

  public onBillerListReceived: BaseFpxControlEventHandler = (res: any) => {
    this.state._gridData = res?.data
    this.state._totalGridData = res?.data
  }
  
 
  public override preSubmitInterceptor(payload: Biller):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Biller){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.biller.billerId,
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
 
 
