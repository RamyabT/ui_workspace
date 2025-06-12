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
import { TaxstatementreqService } from "../taxstatementreq-service/taxstatementreq.service";
import { Taxstatementreq } from "../taxstatementreq-service/taxstatementreq.model";
export class RetailTaxStatementReqState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class RetailTaxStatementReqHelper extends BaseFpxFormHelper<RetailTaxStatementReqState>{

  constructor(private retailTaxStatementReqService: TaxstatementreqService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new RetailTaxStatementReqState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILTAXSTMT");
  }


  public override doPostInit(): void {
    this.addValueChangeHandler("terms", this.handleTermsFlagOnvalueChange);
    this.addValueChangeHandler("year", this.handleYearOnvalueChange);
    this.handleFormOnLoad();
  }
  public handleYearOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value != null){
  
        this.setValue('terms',null)
      
    }
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('terms',null)
    }
  }
  handleFormOnLoad() {

  //   let i = 1;
  //   let data = [{
  //     id:"Jan",
  //     text:"January"
  //   },{
  //     id:"Feb",
  //     text:"February"
  //   },
  //   {
  //     id:"Mar",
  //     text:"March"
  //   },
  //   {
  //     id:"Apr",
  //     text:"April"
  //   },
  //   {
  //     id:"May",
  //     text:"May"
  //   },
  //   {
  //     id:"Jun",
  //     text:"June"
  //   },
  //   {
  //     id:"Jul",
  //     text:"July"
  //   },
  //   {
  //     id:"Aug",
  //     text:"August"
  //   },
  //   {
  //     id:"September",
  //     text:"S"
  //   },
  //   {
  //     id:"Oct",
  //     text:"October"
  //   },
  //   {
  //     id:"Nov",
  //     text:"November"
  //   },
  //   {
  //     id:"Dec",
  //     text:"December"
  //   }
  // ];


  //   // for (i; i <= 12; i++) {
  //   //   if (i == 1) {
  //   //     data.push({ id: String(i), text: i + ' Month' })
  //   //   }
  //   //   else {
  //   //     data.push({ id: String(i), text: i + ' Months' })
  //   //   }
  //   // }

  //   this.setStaticDropdown('Month', of(data))
  this.reset('terms');

  }





  public override preSubmitInterceptor(payload: Taxstatementreq): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Taxstatementreq) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response)
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.taxstatementreq;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


