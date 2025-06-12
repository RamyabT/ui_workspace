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
import { RegistercardstatementService } from '../registercardstatement-service/registercardstatement.service';
import { Registercardstatement } from '../registercardstatement-service/registercardstatement.model';
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { CreditcardService } from "src/app/credit-cards/creditcard-service/creditcard.service";
import { Creditcard } from "src/app/credit-cards/creditcard-service/creditcard.model";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
export class RegisterCardStatementState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  customerEmail: string = "";

  action: any = {
    ckValues: { checked: "Y", unchecked: "N" }
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class RegisterCardStatementHelper extends BaseFpxFormHelper<RegisterCardStatementState> {

  creditCardDetails !: Creditcard[];
  cardData: any;
  showForm = true;
  doDeregister = false;
  lblName = "";
  shouldDeregister = false;
  dataLoaded = false;



  constructor(private registerCardStatementService: RegistercardstatementService, private _httpProvider: HttpProviderService, private _router: Router,
    private accountsService: AccountsService,
    private userService: CustomerService,
    private _appConfig: AppConfigService,
    public device: DeviceDetectorService,
    private creditCardService: CreditcardService
  ) {
    super(new RegisterCardStatementState());
  }

  override doPreInit(): void {
    this.removeShellBtn('RESET');
    this.setServiceCode("RETAILVISACARDSTMTREQ");
  }


  public override doPostInit(): void {
    this.handleFormOnLoad();
  }


  register() {
    this._showShellAction = true;
    this.showForm = true;
    this.lblName = "registerLbl";
    this.setValue("action", true)
  }


  handleFormOnLoad() {
    this.setReadonly('emailId', true);
    this.shouldDeregister = this.getRoutingParam('deregister') || false;


    this.creditCardService
      .fetchCreditCardRegistrationStatus()
      .subscribe((res) => {
        if (res) {
          this.setValue('emailId', res.cardregistrationstatus.emailId);
          this.cardData = res.cardregistrationstatus.cards;
          if (!this.shouldDeregister) {
            this.dataLoaded = true;
            if (res.cardregistrationstatus.cards[0].status === "0") {
              this._showShellAction = false;
              this.showForm = false;
            } else {
              let downloadeVisaStmtMenu = {
                "serviceCode": "RETAILCCSTATEMENT",
                "name": "RETAILCCSTATEMENT",
                "icon": "",
                "serviceDescription": "Visa eStatement",
                "id": "EDOCUMENTSMENU6",
                "serviceDescriptionI18n": {
                  "EN": "Visa eStatement"
                }
              }
              let service = this._appConfig.getServiceDetails(downloadeVisaStmtMenu.serviceCode);
              let rid: number = Math.floor(Math.random() * 99999999);
              this._router.navigate(service.servicePath, {
                queryParams: {
                  rid: rid
                }
              });
            }
          } else {
            this.dataLoaded = true;
            this.lblName = "deregisterLbl";
            this.showForm = true;
            this.setFormTitle("Manage Visa eStatement")
          }
        }else{
          this.dataLoaded = true;
          this._showShellAction = false;
          this.showForm = false;
        }
      });
  }


  public override preSubmitInterceptor(payload: Registercardstatement): any {

    let cardDetails: any = [];
    let status = this.getValue("action") == true ? 1 : 0;

    if (this.shouldDeregister) {
      status = this.getValue("action") == true ? 0 : 1;
    }

    this.cardData.forEach((element: any) => {
      cardDetails.push({ "cardRefNum": element.cardRefNumber, "status": status.toString() })
    });

    let modifiedPayload = {
      "termsFlag": "Y",
      "emailId": this.getValue("emailId"),
      "cards": cardDetails
    }
    this._appConfig.setData('estatementAction', status.toString());

    // WRITE CODE HERE TO HANDLE 
    return modifiedPayload;
  }


  public override postDataFetchInterceptor(payload: Registercardstatement) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  close() {
    this._router.navigate(['/home'])
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {

      let res = response.success?.body?.registercardstatement;
      routingInfo.setQueryParams({
        response: res
      });

    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


