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
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EstmtrequestService } from '../estmtrequest-service/estmtrequest.service';
import { Estmtrequest } from '../estmtrequest-service/estmtrequest.model';
import { AccountsService } from "src/app/foundation/validator-service/accounts.service";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
export class RetailEstmtRequestFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  customerEmail: string = "";
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
}


@Injectable()
export class RetailEstmtRequestFormHelper extends BaseFpxFormHelper<RetailEstmtRequestFormState> {

  userRelationshipDetails: any;
  showForm = true;
  doDeregister = false;
  lblName = "";
  shouldDeregister = false;
  dataLoaded = false;

  constructor(private accountsService: AccountsService,
    public device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private userService: CustomerService, private retailEstmtRequestFormService: EstmtrequestService, private _httpProvider: HttpProviderService, private _router: Router, private _appConfig: AppConfigService) {
    super(new RetailEstmtRequestFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILESTATEMENTREQ");
    this.removeShellBtn('RESET');
  }


  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.shouldDeregister = this.getRoutingParam('deregister') || false;
    this.userService
      .fetchUserRelationshipDetails()
      .subscribe((res) => {
        if (res) {
          this.setValue('email', res.emailId);
          this.userRelationshipDetails = res;
          if (!this.shouldDeregister) {
            this.dataLoaded = true;
            if (this.userRelationshipDetails.relationship[0].status === "0") {
              this._showShellAction = false;
              this.showForm = false;
            } else {
              let downloadeStmtMenu = {
                "serviceCode": "ACCOUNTESTATEMENT",
                "name": "ACCOUNTESTATEMENT",
                "icon": "",
                "serviceDescription": "Accounts eStatement",
                "id": "EDOCUMENTSMENU5",
                "serviceDescriptionI18n": {
                  "EN": "Accounts eStatement"
                }
              }

              let service = this._appConfig.getServiceDetails(downloadeStmtMenu.serviceCode);

              let rid: number = Math.floor(Math.random() * 99999999);
              this._router.navigate(service.servicePath, {
                queryParams: {
                  rid: rid
                }
              });
            }
          }
          else {
            this.dataLoaded = true;
            this.lblName = "deregisterLbl";
            this.showForm = true;
            this.setFormTitle("Manage eStatement")
          }
        } else {
          this.dataLoaded = true;
          console.log(res)
          this._showShellAction = false;
          this.showForm = false;
        }
        console.log("RELATIONSHIP DETAILS", res)
      });

    this.setReadonly('email', true);
    this.reset('termsFlag');
    this.setReadonly('action', false);
    //  this.setDisabled('status',true);
    this.setReadonly('status', true);
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {

    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.estmtrelationshiprequest;
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
    return response;
  }


  public handleActionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    // this.reset('email',"");
    this.setValue("action", value)
    this.reset('termsFlag', "");

    console.log(this.getValue("action"))
  }


  public override doPostInit(): void {
    this.addValueChangeHandler("action", this.handleActionOnvalueChange);
    this.handleFormOnLoad();
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (payload.inventoryNumber == "") {
      delete payload.inventoryNumber
    }
  }

  public override preSubmitInterceptor(payload: Estmtrequest): any {
    // WRITE CODE HERE TO HANDLE 
    let relationshipPayloadReq: any = [];
    let status = this.getValue("action") == true ? 1 : 0;

    if (this.shouldDeregister) {
      status = this.getValue("action") == true ? 0 : 1;
    }

    this.userRelationshipDetails.relationship.forEach((element: any) => {
      relationshipPayloadReq.push({ "relationshipCode": element.relationshipCode, "status": status.toString() })
    });

    let modifiedPayload = {
      "termsFlag": "Y",
      "emailId": this.getValue("email"),
      "relationship": relationshipPayloadReq
    }

    console.log(modifiedPayload)

    this.handleFormOnPresubmit(modifiedPayload);
    this._appConfig.setData('estatementAction', status.toString());
    return modifiedPayload;
  }

  public override postDataFetchInterceptor(payload: Estmtrequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  close() {
    this._router.navigate(['/home'])
  }

  register() {
    this._showShellAction = true;
    this.showForm = true;
    this.lblName = "registerLbl";
    this.setValue("action", true)
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
}


