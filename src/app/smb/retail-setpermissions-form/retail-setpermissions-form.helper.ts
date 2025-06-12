import { Injectable } from "@angular/core";
import { FormArray } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  RoutingInfo,
  HttpRequest,
} from "@fpx/core";
import { AppConfigService, UserAuthService } from "@dep/services";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { Userrestrictionreq } from "../userrestrictionreq-service/userrestrictionreq.model";
import { UserrestrictionsService } from "src/app/foundation/userrestrictions-service/userrestrictions.service";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
export class RetailSetpermissionsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  accountNumber!: string;
  cardData: any;
  casaAccounts: Casaaccount[] = [];
  selectedAccount: Casaaccount | undefined;
  customerCode: any;
}

@Injectable()
export class RetailSetpermissionsFormHelper extends BaseFpxFormHelper<RetailSetpermissionsFormState> {
  multiBill!: FormArray;
  userrestrictionreq: any = {
    usercasarestriction: [],
    userdeprestriction: [],
    userloanrestriction: [],
    userdcrestriction: [],
    userccrestriction: [],
    userpcrestriction: []
  };
  editMode: boolean = false;
  initialFormValue: any;
  currentFormValue: any;
  billerAccountReceived: any;
  activeTabIndex: any = 0;
  userId: any;
  customerCode: any;

  constructor(
    private _httpProvider: HttpProviderService,
    public _appConfig: AppConfigService,
    public userAuth: UserAuthService,
    private _userrestrictionsService: UserrestrictionsService,
    private _casaaccountService: CasaaccountService
  ) {
    super(new RetailSetpermissionsFormState());
  }

  override doPreInit(): void {
    this.userrestrictionreq = {};
    this.userrestrictionreq = {
      usercasarestriction: [],
      userdeprestriction: [],
      userloanrestriction: [],
      userdcrestriction: [],
      userccrestriction: [],
      userpcrestriction: []
    };
    this.userId = "";
    this.customerCode = "";
    this.activeTabIndex = 0;

    this.setServiceCode("RETAILDELEGATEUSER");
    if(this.getRoutingParam('delegateInvNo')){
      this.formGroup.get("delegateInvNo")?.setValue(this.getRoutingParam('delegateInvNo'));
    }
    this.state.customerCode = this.userAuth.getAuthorizationAttr('CustomerCode');
    this.formGroup.get("userId")?.setValue(this.userAuth.userId);
    this.formGroup.get("customerCode")?.setValue(this.state.customerCode);
    if(this.getRoutingParam('operationMode') == 'M'){
      this.editMode = true;
      this.userId = this.getRoutingParam('userId');
      this.customerCode = this.getRoutingParam('customerCode');
      this.formGroup.get("operationMode")?.setValue('M');
    }
    else {
      this.editMode = false;
      this.formGroup.get("operationMode")?.setValue('A');
    }
  }

  override doDestroy(): void {
    this._appConfig.removeData('operationMode');
  }

  handleRowEvent($event: any) {

  }

  public override doPostInit(): void {
    if(this.state.customerCode){
      this.setUserCasaRestriction(this.state.customerCode);
      this.setUserDepRestriction(this.state.customerCode);
      this.setUserLoanRestriction(this.state.customerCode);
      this.setUserDebitCardRestriction(this.state.customerCode);
      this.setUserCreditCardRestriction(this.state.customerCode);
      this.setUserPrepaidCardRestriction(this.state.customerCode);
    }
    if(this.editMode) {
      setTimeout(() => {
        let payload = {
          customerCode: this.customerCode,
          userId: this.userId
        }
        this._userrestrictionsService.findByKey(payload)().subscribe((res: any) => {
          res.hiddenField = "1";
          res.operationMode = "M";

          res.usercasarestriction.forEach((item: any) => {
            if(item.approvalRequired == "1" || item.inquiryAllowed == "1" || item.transactionAllowed == "1" || item.requestAllowed == "1"){
              item.accordianOpen = true;
            }
          });
          res.userdeprestriction.forEach((item: any) => {
            if(item.approvalRequired == "1" || item.inquiryAllowed == "1" || item.transactionAllowed == "1" || item.requestAllowed == "1"){
              item.accordianOpen = true;
            }
          });
          res.userloanrestriction.forEach((item: any) => {
            if(item.approvalRequired == "1" || item.inquiryAllowed == "1" || item.transactionAllowed == "1" || item.requestAllowed == "1"){
              item.accordianOpen = true;
            }
          });
          res.userdcrestriction.forEach((item: any) => {
            if(item.approvalRequired == "1" || item.inquiryAllowed == "1" || item.transactionAllowed == "1" || item.requestAllowed == "1"){
              item.accordianOpen = true;
            }
          });
          res.userccrestriction.forEach((item: any) => {
            if(item.approvalRequired == "1" || item.inquiryAllowed == "1" || item.transactionAllowed == "1" || item.requestAllowed == "1"){
              item.accordianOpen = true;
            }
          });
          res.userpcrestriction.forEach((item: any) => {
            if(item.approvalRequired == "1" || item.inquiryAllowed == "1" || item.transactionAllowed == "1" || item.requestAllowed == "1"){
              item.accordianOpen = true;
            }
          });
          this.formGroup.patchValue(res);
          this.formGroup.updateValueAndValidity();
        });
      },2000);
    }
    
  }
  tabChanged(event: any) {
  }

  setUserCasaRestriction(customerCode: string = "") {
    this._casaaccountService.fetchCasaForUserPermission(customerCode).subscribe(
      (res:any) => {
        if (res && res.body?.casaaccount) {
          this.setValue("usercasarestriction", res.body.casaaccount);
          this.userrestrictionreq.usercasarestriction = res.body.casaaccount;
          this.formGroup.updateValueAndValidity();
        }
      });
  }
  setUserDepRestriction(customerCode: string) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/deposits");
    httpRequest.setContextPath('Deposits');
    httpRequest.addHeaderParamter("ServiceCode", "RETAILDEPOSITSUMMARY");
    httpRequest.addQueryParameter("customerCode", customerCode?.toString());
    this._httpProvider.invokeRestApi(httpRequest).subscribe(
      (depRes) => {
        console.log(customerCode);
        if (depRes) {
          for (let i = 0; i < depRes.body?.deposits?.termDeposits?.product.length; i++) {
            depRes.body?.deposits?.termDeposits?.product[i]?.accountDetails.forEach((item: any) => {
              item.accountTypeDesc = item.depositTypeDesc;
            });
            this.formGroup.get("userdeprestriction")?.setValue(depRes.body?.deposits?.termDeposits?.product[i]?.accountDetails);
            this.userrestrictionreq.userdeprestriction = this.formGroup.value.userdeprestriction
            this.formGroup.updateValueAndValidity();
            return;
          }
        }
      });
  }
  setUserLoanRestriction(customerCode: string) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/loans");
    httpRequest.setContextPath('Loans');
    httpRequest.addHeaderParamter("ServiceCode", "RETAILLOANSUMMARY");
    httpRequest.addQueryParameter("customerCode", customerCode?.toString());
    this._httpProvider.invokeRestApi(httpRequest).subscribe(
      (loanRes) => {
        console.log(customerCode);
        if (loanRes) {
          if (loanRes?.body?.loans && loanRes?.body?.loans?.length > 0) {
            loanRes.body.loans.forEach((loan: any) => {
              if(loan.loanAccountNumber){ 
                loan.accountNumber = loan.loanAccountNumber; // Replace 'newValue' with the desired value
              }
              if(loan.loanType){
                loan.accountType = loan.loanType;
              }
              if(loan.productDesc){
                loan.accountTypeDesc = loan.productDesc;
              }
            });
          }
          this.formGroup.get("userloanrestriction")?.setValue(loanRes.body.loans);
          this.userrestrictionreq.userloanrestriction =this.formGroup.get("userloanrestriction")?.value;
          this.formGroup.updateValueAndValidity();
          return;
        }
      });
  }
  setUserDebitCardRestriction(customerCode: string) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/debitcard");
    httpRequest.setContextPath('Cards');
    httpRequest.addHeaderParamter("ServiceCode", "RETAILDCSUMMARY");
    httpRequest.addQueryParameter("customerCode", customerCode?.toString());
    this._httpProvider.invokeRestApi(httpRequest).subscribe(
      (dcRes) => {
        console.log(customerCode);
        if (dcRes) {
          if (dcRes?.body?.debitcard && dcRes?.body?.debitcard?.length > 0) {
            dcRes.body.debitcard.forEach((card: any) => {
                if(card.cardRefNumber){ 
                  card.accountNumber = card.cardRefNumber; // Replace 'newValue' with the desired value
                }
                if(card.cardType){
                  card.accountType = card.cardType;
                }
                if(card.productDesc){
                  card.accountTypeDesc = card.productDesc;
                }
              });
            }
          this.formGroup.get("userdcrestriction")?.setValue(dcRes.body.debitcard);
          this.userrestrictionreq.userdcrestriction =this.formGroup.get("userdcrestriction")?.value;
          this.formGroup.updateValueAndValidity();
          return;
        }
      });
  }
  setUserCreditCardRestriction(customerCode: string) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/creditcard");
    httpRequest.setContextPath('Cards');
    httpRequest.addHeaderParamter("ServiceCode", "RETAILCCSUMMARY");
    httpRequest.addQueryParameter("customerCode", customerCode?.toString());
    this._httpProvider.invokeRestApi(httpRequest).subscribe(
      (ccRes) => {
        console.log(customerCode);
        if (ccRes) {
          if (ccRes?.body?.creditcard && ccRes?.body?.creditcard?.length > 0) {
            ccRes.body.creditcard.forEach((card: any) => {
                if(card.cardRefNumber){ 
                  card.accountNumber = card.cardRefNumber; // Replace 'newValue' with the desired value
                }
                if(card.cardType){
                  card.accountType = card.cardType;
                }
                if(card.productDesc){
                  card.accountTypeDesc = card.productDesc;
                }
              });
            }
          this.formGroup.get("userccrestriction")?.setValue(ccRes.body.creditcard);
          this.userrestrictionreq.userccrestriction =this.formGroup.get("userccrestriction")?.value;
          this.formGroup.updateValueAndValidity();
          return;
        }
      });
  }
  setUserPrepaidCardRestriction(customerCode: string) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/ppCard");
    httpRequest.setContextPath('Cards');
    httpRequest.addHeaderParamter("ServiceCode", "RETAILPCSUMMARY");
    httpRequest.addQueryParameter("customerCode", customerCode?.toString());
    this._httpProvider.invokeRestApi(httpRequest).subscribe(
      (pcRes) => {
        console.log(customerCode);
        if (pcRes) {
          if (pcRes?.body?.prepaidcard && pcRes?.body?.prepaidcard?.length > 0) {
            pcRes.body.prepaidcard.forEach((card: any) => {
                if(card.cardRefNumber){ 
                  card.accountNumber = card.cardRefNumber; // Replace 'newValue' with the desired value
                }
                if(card.cardType){
                  card.accountType = card.cardType;
                }
                if(card.productDesc){
                  card.accountTypeDesc = card.productDesc;
                } 
              });
            }
          this.formGroup.get("userpcrestriction")?.setValue(pcRes.body.prepaidcard);
          this.userrestrictionreq.userpcrestriction =this.formGroup.get("userpcrestriction")?.value;
          this.formGroup.updateValueAndValidity();
          return;
        }
      });
  }

  // afterValuePatch() {
  //   this.initialFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
  //   this.formGroup.valueChanges
  //     .pipe(
  //       startWith(this.formGroup.value),
  //       pairwise(),
  //       map(([oldValues, newValues]) => {
  //         return Object.keys(newValues).find(
  //           (k) => newValues[k] != oldValues[k]
  //         );
  //       })
  //     )
  //     .subscribe((key) => {
  //       if(key && key != 'hiddenField') {
  //         this.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
  //         this.reCheckForm();
  //       }
  //       this.multiBillCount = this.formGroup.value.usercasarestriction?.filter((x: any)=> (x.paymentAmount != ''&& !Number.isNaN(x.paymentAmount)))?.length;

  //       if(key && key == "usercasarestriction") {
  //         let total = 0;
  //         this.formGroup.value.usercasarestriction.forEach((element: any) => {
  //           total =  total + ((element.paymentAmount!= "" && !Number.isNaN(element.paymentAmount))?element.paymentAmount:0)
  //         });
  //         this.formGroup.get('totalBillAmount')?.patchValue(total);
  //       }
  //       console.log(this.formGroup.valid)
  //     });
  // }

  cancel() {
    this._angularRouter.navigate(['home'])
  }

  // reCheckForm() {
  //   this.currentFormValue.hiddenField = '1';
  //   if (this.currentFormValue && this.initialFormValue && this._commonService.isSameObject(this.currentFormValue,this.initialFormValue)) {
  //       this.formGroup.get("hiddenField")?.enable();
  //       console.log("Not Changed")
  //   } 
  //   else {
  //     this.formGroup.get("hiddenField")?.disable();
  //     console.log("Changed");
  //   }
  // }


  public override preSubmitInterceptor(payload: Userrestrictionreq): any {
    delete payload.hiddenField;
    if(payload.usercasarestriction){
      payload.usercasarestriction?.forEach((item: any) => {
        delete item.hiddenField;
        delete item.accordianOpen;
        delete item.accountTypeDesc;
      });
    }
    if(payload.userdeprestriction){
      payload.userdeprestriction?.forEach((item: any) => {
        delete item.hiddenField;
        delete item.accordianOpen;
        delete item.accountTypeDesc;  
      });
    }
    if(payload.userloanrestriction){
      payload.userloanrestriction?.forEach((item: any) => {
        delete item.hiddenField;
        delete item.accordianOpen;
        delete item.accountTypeDesc;
      });
    }
    if(payload.userdcrestriction){
      payload.userdcrestriction?.forEach((item: any) => {
        delete item.hiddenField;
        delete item.accordianOpen;
        item.cardRef = item.accountNumber;
        item.cardType = item.accountType;
        delete item.accountNumber;
        delete item.accountType;
        delete item.accountTypeDesc;
      });
    }
    if(payload.userccrestriction){
      payload.userccrestriction?.forEach((item: any) => {
        delete item.hiddenField;
        delete item.accordianOpen;
        item.cardRef = item.accountNumber;
        item.cardType = item.accountType;
        delete item.accountNumber;
        delete item.accountType;
        delete item.accountTypeDesc;
      });
    }
    if(payload.userpcrestriction){
      payload.userpcrestriction?.forEach((item: any) => {
        delete item.hiddenField;
        delete item.accordianOpen;
        item.cardRef = item.accountNumber;
        item.cardType = item.accountType;
        delete item.accountNumber;
        delete item.accountType;
        delete item.accountTypeDesc;
      });
    }
    
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postDataFetchInterceptor(payload: Userrestrictionreq) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    // routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      let res = response.success?.body?.userrestrictionreq;
      routingInfo.setQueryParams({
        response: res,
        status: "success"
      });
    } else if (response.error) {
      routingInfo.setQueryParams({
        errMsg: response.error?.error?.ErrorMessage,
        status: "failed",
      });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
