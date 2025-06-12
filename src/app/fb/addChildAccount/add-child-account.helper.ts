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
  FpxModal,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ChildlogService } from '../childlog-service/childlog.service';
import { Childlog } from '../childlog-service/childlog.model';
import { Childreqdocdtl } from '../childreqdocdtl-service/childreqdocdtl.model';
import { AppConfigService } from "@dep/services";
import { NotificationprefService } from "../notificationpref-service/notificationpref.service";
export class addChildAccountState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dob: any = {
    minDate: "",
    maxDate: "",
  }
}


@Injectable()
export class addChildAccountHelper extends BaseFpxFormHelper<addChildAccountState> {
  @Input() selectedData!: any;
  childDetails!: FormGroup;
  accountDetailsForm!: FormGroup;
  paymentSettings!: FormGroup;
  notificationAndControl!: FormGroup;
  maxDate: any;
  minDate: any;

  constructor(public notificationprefService: NotificationprefService, private _addChildAccountService: ChildlogService, private _httpProvider: HttpProviderService, private _router: Router) {
    super(new addChildAccountState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILCHILDINFO");
    
  }


  public override doPostInit(): void {
    this.childDetails = this.formGroup.get("childDetails") as FormGroup;
    this.accountDetailsForm = this.formGroup.get("accountDetailsForm") as FormGroup;
    this.paymentSettings = this.formGroup.get("paymentSettings") as FormGroup;
    this.notificationAndControl = this.formGroup.get("notificationAndControl") as FormGroup;
    this.notificationControl();
    this.childlogModify();
    this.addResetHandler('reset',this._reset);
  }

  private _reset: FpxResetHandler = (payload: any) => {
      console.log("payload", payload);
      this.reset("fullName", true);
          this.reset("nickName", true);
          this.reset("dob", true);
          this.reset("gender", true);
          this.reset("relationship", true);
          this.reset("email", true);
          this.reset("mobileNumber", true);
          this.reset("childDetails[$].fullName", true);
          this.reset("childDetails[$].nickName", true);
          this.reset("childDetails[$].dob", true);
          this.reset("childDetails[$].gender", true);
          this.reset("childDetails[$].relationship", true);
          this.reset("childDetails[$].email", true);
          this.reset("childDetails[$].mobileNumber", true);
          this.reset("childDetails[$].profileImage", true);
          this.reset("childreqaccountdtl[$].debitAccNo", true);
          this.reset("childreqaccountdtl[$].recurringAmount", true);
          this.reset("childreqaccountdtl[$].endDate", true);
          this.reset("childreqaccountdtl[$].recurringfrequency", true);
          this.reset("childreqaccountdtl[$].initialBalance", true);
          this.reset("childreqaccountdtl[$].startDate", true);
          this.reset("childreqaccountdtl[$].noOfInstallments", true);

          this.reset("paymentsetting[$].poslimit", true);
          this.reset("paymentsetting[$].issueCard", true);
          this.reset("paymentsetting[$].dailTranLimit", true);
          this.reset("paymentsetting[$].themeCode", true);
          this.reset("paymentsetting[$].scanandPayAllowed", true);
          this.reset("paymentsetting[$].maxTranLimit", true);
          this.reset("paymentsetting[$].atmlimit", true);
          this.reset("paymentsetting[$].contactlesspaymentLimit", true);
          payload.childnotification.map((item: any, index: number) => {
            console.log("item", item);
            this.reset(`childreqnotification[${index}].detailSerial`, true);
            this.reset(`childreqnotification[${index}].notificationEnabled`, true);
          });
    }

  childlogModify() {
    let mode = this.getRoutingParam('mode')
    let inventoryNumber = this.getRoutingParam('inventoryNumber')
    if (mode == 'M') {
      this._addChildAccountService.childInfo(inventoryNumber).subscribe((res) => {
        console.log("Response", res);
        if (res) {
          this.setValue("mode", "M");
          this.setValue("fullName", res.fullName);
          this.setValue("nickName", res.nickName);
          this.setValue("dob", res.dob);
          this.setValue("gender", res.gender);
          this.setValue("relationship", res.relationship);
          this.setValue("email", res.email);
          this.setValue("mobileNumber", res.mobileNumber);
          this.setValue("childDetails[$].fullName", res?.fullName);
          this.setValue("childDetails[$].nickName", res?.nickName);
          this.setValue("childDetails[$].dob", res?.dob);
          this.setValue("childDetails[$].gender", res?.gender);
          this.setValue("childDetails[$].relationship", res?.relationship);
          this.setValue("childDetails[$].email", res?.email);
          this.setValue("childDetails[$].mobileNumber", res?.mobileNumber);
          this.setValue("childDetails[$].profileImage", res?.profileImage);
          this.setValue("childreqaccountdtl[$].debitAccNo", res?.childaccountdtl?.debitAccNo);
          this.setValue("childreqaccountdtl[$].recurringAmount", {
            amount: res?.childaccountdtl?.recurringAmount
          });
          this.setValue("childreqaccountdtl[$].endDate", res?.childaccountdtl?.endDate);
          this.setValue("childreqaccountdtl[$].recurringfrequency", res?.childaccountdtl?.recurringfrequency);
          this.setValue("childreqaccountdtl[$].initialBalance", {
            amount: res?.childaccountdtl?.initialBalance
          });
          this.setValue("childreqaccountdtl[$].startDate", res?.childaccountdtl?.startDate);
          this.setValue("childreqaccountdtl[$].noOfInstallments", res?.childaccountdtl?.noOfPaymets);

          this.setValue("paymentsetting[$].poslimit", res?.paysetting?.poslimit);
          this.setValue("paymentsetting[$].issueCard", res?.paysetting?.issueCard);
          this.setValue("paymentsetting[$].dailTranLimit", res?.paysetting?.dailTranLimit);
          this.setValue("paymentsetting[$].themeCode", res?.paysetting?.themeCode);
          this.setValue("paymentsetting[$].scanandPayAllowed", res?.paysetting?.scanandPayAllowed);
          this.setValue("paymentsetting[$].maxTranLimit", res?.paysetting?.maxTranLimit);
          this.setValue("paymentsetting[$].atmlimit", res?.paysetting?.atmlimit);
          this.setValue("paymentsetting[$].contactlesspaymentLimit", res?.paysetting?.contactlesspaymentLimit);
          res.childnotification.map((item: any, index: number) => {
            console.log("item", item);
            this.setValue(`childreqnotification[${index}].detailSerial`, item.detailSerial);
            this.setValue(`childreqnotification[${index}].notificationEnabled`, item.notificationEnabled == "0" ? false : true);
          });

          this.setReadonly("childDetails[$].fullName", true);
          this.setReadonly("childDetails[$].dob", true);
          this.setReadonly("childDetails[$].gender", true);
          this.setReadonly("childDetails[$].relationship", true);
          this.setReadonly("childDetails[$].email", true);
          this.setReadonly("childDetails[$].mobileNumber", true);
          // this.setReadonly("childDetails[$].profileImage",true);
          this.setReadonly("childreqaccountdtl[$].debitAccNo", true);
          this.setReadonly("childreqaccountdtl[$].recurringAmount", true);
          this.setReadonly("childreqaccountdtl[$].endDate", true);
          this.setReadonly("childreqaccountdtl[$].recurringfrequency", true);
          this.setReadonly("childreqaccountdtl[$].initialBalance", true);
          this.setReadonly("childreqaccountdtl[$].startDate", true);
          this.setReadonly("childreqaccountdtl[$].noOfInstallments", true);
          this.setReadonly("paymentsetting[$].scanandPayAllowed", true);
          this.setReadonly("paymentsetting[$].issueCard", true);
          this.setReadonly("paymentsetting[$].poslimit", true);
          this.setReadonly("paymentsetting[$].issueCard", true);
          this.setReadonly("paymentsetting[$].themeCode", true);
          this.setReadonly("paymentsetting[$].atmlimit", true);
          this.setReadonly("paymentsetting[$].contactlesspaymentLimit", true);
        }
      })
    }
  }


  alertCategoryChange(event: any, payload: any) {
    this.selectedData.enabled = event.checked ? '1' : '0';
  }

  notificationControl() {
    this.notificationprefService.findAll()().subscribe({
      next: (response) => {
        console.log("responce", response);
        let notificationRes = response || [];
        let list: any = [];
        notificationRes.forEach((element: any, index: number) => {
          list.push({
            "notificationpref": element.id,
            "notificationDesc": element.description,
          });
        });
        this.setValue("childreqnotification", list);
      }
    });
  }




  public override preSubmitInterceptor(payload: Childlog): any {
    // WRITE CODE HERE TO HANDLE 
    // payload.mode = 'A'
    payload.mode = this.getRoutingParam('mode')
    payload.fullName = payload?.childDetails?.fullName
    payload.nickName = payload?.childDetails?.nickName
    payload.dob = payload?.childDetails?.dob
    payload.gender = payload?.childDetails?.gender
    payload.relationship = payload?.childDetails?.relationship
    payload.email = payload?.childDetails?.email
    payload.mobileNumber = payload?.childDetails?.mobileNumber
    payload.profileImage = payload?.childDetails?.profileImage
    // payload.childOfficialID = payload?.childDetails?.profileImage
    payload.childreqaccountdtl.initialBalance = payload?.childreqaccountdtl?.initialBalance?.amount
    payload.childreqaccountdtl.recurringAmount = payload?.childreqaccountdtl?.recurringAmount?.amount
    payload.paymentsetting.issueCard == true ? '1' : '0'
    payload.paymentsetting.scanandPayAllowed == true ? '1' : '0'

    let childreqnotification = payload.childreqnotification.map((item: any, index: number) => {
      const notification: any = {
        detailSerial: index,
        notificationEnabled: item?.notificationEnabled == true ? '1' : '0',
        notificationpref: item?.notificationpref
      };
      return notification
    });
    payload.childreqnotification = childreqnotification
    return payload;
  }


  public override postDataFetchInterceptor(payload: Childlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.childlog;
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode
      });
    }
    else if (response.error) {
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