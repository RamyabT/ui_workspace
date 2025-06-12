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
import { NpsssendmoneyService } from '../npsssendmoney-service/npsssendmoney.service';
import { Npsssendmoney } from '../npsssendmoney-service/npsssendmoney.model';
import { AppConfigService } from "@dep/services";
import { TransferService } from "src/app/foundation/validator-service/transfers-service";
export class RetailNPSSSendMoneyState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
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
export class RetailNPSSSendMoneyHelper extends BaseFpxFormHelper<RetailNPSSSendMoneyState>{

  constructor(private retailNPSSSendMoneyService: NpsssendmoneyService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _transferService: TransferService,
    private _appConfig: AppConfigService) {
    super(new RetailNPSSSendMoneyState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSENDMONEYSTART");
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
            if(res){
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
        
        else{
          this.setErrors('mobileNumber','notRegistered');
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
            if(res){
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
          else{
            this.setErrors('email','notRegistered');
          }}
        })

    }

  }




  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    this._appConfig.setData('npssSendMoney', this.state.customPayload);

    let service = this._appConfig.getServiceDetails("RETAILNPSSSENDMONEY");


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


  public override preSubmitInterceptor(payload: Npsssendmoney): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Npsssendmoney) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");

    let service = this._appConfig.getServiceDetails("RETAILNPSSSENDMONEY");

    setTimeout(() => {
      this._router.navigate(service.servicePath, {
      });
    });

    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


