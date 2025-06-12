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
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { NpssrequestmoneyService } from '../npssrequestmoney-service/npssrequestmoney.service';
import { Npssrequestmoney } from '../npssrequestmoney-service/npssrequestmoney.model';
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { TransferService } from "src/app/foundation/validator-service/transfers-service";
export class RetailNpssRequestMoneyState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	FieldId_1:any={
	 text:" Sample Text"
	}
  customPayload: any = {
    receipientCustomerId: "",
    firstName: "",
    lastName: "",
    iban: "",
    mobileNumber: "",
    currency: "",
    availableBalance: "",
    accountNumber: "",
    productDesc:"",
    beneValue:""
  };
}


@Injectable()
export class RetailNpssRequestMoneyHelper extends BaseFpxFormHelper<RetailNpssRequestMoneyState>{

   constructor( private retailNpssRequestMoneyService: NpssrequestmoneyService, 
    private _httpProvider : HttpProviderService,private _router: Router,
    private _appConfig: AppConfigService,
    private _transferService: TransferService) 
    {
        super(new RetailNpssRequestMoneyState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILREQUESTMONEY");
 }
   

  public override doPostInit(): void {
    this.addValueChangeHandler("mobileNumber", this.handleMobileNumberOnvalueChange);
    this.addValueChangeHandler("email", this.handleEmailOnvalueChange);
    this.addSubmitHandler('submit', this.customSubmitHandler);
  
  }

  public handleMobileNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      let i = 0;
      let iban: any;
      let currency: any;
      this._transferService
        .fetchIBAN(value,1)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            for (i; i < res.accountDetails.length; i++) {
              if (res.accountDetails[i].defaultAccount == 'Y') {
                iban = res.accountDetails[i].iban;
                currency = res.accountDetails[i].currency;
                this.state.customPayload = {
                  receipientCustomerId: res.bankUserId,
                  firstName: res.customerName,
                  lastName: res.surname,
                  iban: iban,
                  productDesc:res.accountDetails[i].productDesc,
                  mobileNumber: value,
                  beneValue:value,
                  accountNumber: res.accountDetails[i].accountNumber,
                  availableBalance: res.accountDetails[i].availableBalance

                }
              }
            }
          }
        })

    }

  }


  
  public handleEmailOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value) {
      let i = 0;
      let iban: any;
      let currency: any;
      this._transferService
        .fetchIBAN(value,2)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            for (i; i < res.accountDetails.length; i++) {
              if (res.accountDetails[i].defaultAccount == 'Y') {
                iban = res.accountDetails[i].iban;
                currency = res.accountDetails[i].currency;



                this.state.customPayload = {
                  receipientCustomerId: res.bankUserId,
                  firstName: res.customerName,
                  lastName: res.surname,
                  iban: iban,
                  productDesc:res.accountDetails[i].productDesc,
                  mobileNumber: value,
                  beneValue:value,
                  accountNumber: res.accountDetails[i].accountNumber,
                  availableBalance: res.accountDetails[i].availableBalance

                }
              }
            }
          }
        })

    }

  }




  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    this._appConfig.setData('npssRequestMoney', this.state.customPayload);

    let service = this._appConfig.getServiceDetails("RETAILNPSSREQUESTMONEY");


    setTimeout(() => {
      this._router.navigate(service.servicePath, {

        queryParams: {
          accountNumber: payload.iban
        }
      });
    });

    return {
      success: () => {
        console.log("on submit");
      },
      error: () => {
        console.log("error");
      }
    }
  }
  
 
  public override preSubmitInterceptor(payload: Npssrequestmoney):any {
     // WRITE CODE HERE TO HANDLE 

    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Npssrequestmoney){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.npssrequestmoney.inventoryNumber,
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
 
 
