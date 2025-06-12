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
import { NpssproxyService } from '../npssproxy-service/npssproxy.service';
import { Npssproxy } from '../npssproxy-service/npssproxy.model';
import { TransferService } from "src/app/foundation/validator-service/transfers-service";
export class RetailNPSSProxyState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  field1: any;
}


@Injectable()
export class RetailNPSSProxyHelper extends BaseFpxFormHelper<RetailNPSSProxyState>{

  constructor(private retailNPSSProxyService: NpssproxyService, private _httpProvider: HttpProviderService,
    private _router: Router, private _transferService: TransferService) {
    super(new RetailNPSSProxyState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILNPSSPROXY");
    this.addResetHandler('reset', this._onReset);
  }

  private _onReset = () => {
    // this.reset("email");
    this.reset("termsFlag");
    this.handleFormOnLoad();
  }



  public override doPostInit(): void {
    this.setHidden('FieldId_1',true);
    this.setHidden('FieldId_2',true);
    this.handleFormOnLoad();
  }

  handleFormOnLoad() {
    this._transferService
      .fetchEmail()
      .subscribe(res => {
      if (res.customer) {
        if(res.customer.emailFlag=='C'){
          this.setHidden('FieldId_1',true)
          this.setHidden('FieldId_2',false)
          this.setValue('email',res.customer.email);
          this.setHidden('RetailNPSSProxy.FieldId_1.text',true)
        }
        else{
          this.setHidden('FieldId_1',false)
          this.setHidden('FieldId_2',true)
          this.setValue('email',res.customer.email);
          this.setErrors('email','emailError')
          this.setHidden('RetailNPSSProxy.FieldId_1.text',true)
          this.setHidden('termsFlag',true)
        }
      }
      else{
        this.setHidden('FieldId_1',true)
        this.setHidden('FieldId_2',true)
        this.setErrors('email','NoEmail');
        this.setHidden('termsFlag',true)
      }
    })

      

    this.setReadonly("email", true);

  }


  public override preSubmitInterceptor(payload: Npssproxy): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;

  }


  public override postDataFetchInterceptor(payload: Npssproxy) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  handleFormOnPostsubmit(response:any,routingInfo:any){
    // if (response.success) {
    //   routingInfo.setQueryParams({
    //     response: response.success?.body?.npssproxy,
    //     status: "success",
    //   });
    // } else if (response.error) {
    //   let error = response.error.error;
    //   // routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    //   routingInfo.setQueryParams({ 
    //     response:error,
    //     serviceCode: this.serviceCode.value
    //   });
    // }

    if (response.success) {
        routingInfo.setQueryParams({
          response: response.success?.body?.npssproxy,
          status: "success",
        });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        result: {
          statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          code:error.ErrorCode,
          serviceCode: this.serviceCode
        }
      });
    }
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response,routingInfo);
    return routingInfo;
  }


  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


