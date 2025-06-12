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
  CriteriaQuery,
  FpxModalAfterClosed,
} from "@fpx/core";
import { Observable, map, of, pairwise, startWith } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MultibillrequestService } from "../multibillrequest-service/multibillrequest.service";
import { Multibillrequest } from "../multibillrequest-service/multibillrequest.model";
import { BilleraccountService } from "../billeraccount-service/billeraccount.service";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import moment from "moment";
export class RetailMultiBillRequestFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  accountNumber!: string;
  cardData: any;
  casaAccounts: Casaaccount[] = [];

  casaAccountList: any[] = [];
  selectedAccount: any;
  casaWithoutUSDAccount: any[] = [];
  selectedBillerAccount: any;
  wholeEligibleAccountsList: any;
  eligibleTransferFromAccountsList: any;
  preferredTransferAccount: any;
}

@Injectable()
export class RetailMultiBillRequestFormHelper extends BaseFpxFormHelper<RetailMultiBillRequestFormState> {
  multiBill!: FormArray;
  multiBillDtls: any;
  editMode: boolean = false;
  multibillrequest: any;
  initialFormValue: any;
  currentFormValue: any;
  billerAccountReceived: any;
  multiBillCount: any;
  multiBillSelection: boolean = false;
  disclaimerText: string = '';
  COBDisclaimerText: string = '';
  hideCOBDisclaimer: boolean = false;
  showInsufficientBalanceError: boolean = false;
  showCustomLoader: boolean = false;
  hideFromAccountChangeBtn: boolean = false;


  constructor(
    private retailMultiBillRequestFormService: MultibillrequestService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private _billeraccountService: BilleraccountService,
    public _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private route: ActivatedRoute,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _commonService: CommonService,
    private _deviceDetectorService: DeviceDetectorService
  ) {
    super(new RetailMultiBillRequestFormState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid) this.onParamChange();
    });
  }

  goToAddPayee() {
    let service = this._appConfig.getServiceDetails('RETAILBILLERACCOUNT');
    let rid:number = Math.floor(Math.random() * 99999999);

    this._router.navigate(service.servicePath, {
      queryParams: {
        rid: rid,
        serviceCode : 'RETAILBILLERACCOUNT'
      }
    });
  }
  onParamChange() {
    // this.state.accountNumber = this._activeSpaceInfoService.getAccountNumber();
    // this.state.casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    // if (!this.state.accountNumber) {
    //   this.state.accountNumber = this.state.casaAccounts[0].accountNumber;
    // }
    // let selectedAccount = this.state.casaAccounts.filter((item) => item.accountNumber === this.state.accountNumber);
    // this.state.selectedAccount = selectedAccount[0];
  }

  override doPreInit(): void {
    this.disclaimerText = 'RetailSingleBillPaymentForm.disclaimer.disclaimerText';
    this.COBDisclaimerText = 'RetailSingleBillPaymentForm.disclaimer.cobDisclaimerText';
    this.hideCOBDisclaimer = this._appConfig.betweenThreeAndTwentyOnePM(new Date()) ? false : true;
    this.state.casaAccountList = this._appConfig.getCasaAccountList();


    // this.state.casaAccountList = this.appConfig.getCasaAccountList();
    this.state.wholeEligibleAccountsList = this._appConfig.getData('wholeEligibleAccountsList');
    console.log(this.state.wholeEligibleAccountsList)
    this.state.casaAccountList = this.state.wholeEligibleAccountsList.filter((item: any) => item.transferOut === "1")
    console.log(this.state.casaAccountList)

    this.state.casaWithoutUSDAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency !== 'USD');
    this.hideFromAccountChangeBtn = this.state.casaWithoutUSDAccount.length === 1 ? true : false;
    this.state.preferredTransferAccount = this.getPreferredAccount();

    this.state.selectedAccount = this.setSelectedAccount();


    // if (!this.state.selectedAccount) {
    //   this.state.selectedAccount = this.state.casaWithoutUSDAccount[0];
    // }

    this.formGroup.get('debitAccount')?.setValue(this.state.selectedAccount.accountNumber);

    console.log(this.getRoutingParam('multiBillSelection'))

    if (this.getRoutingParam('multiBillSelection')) {
      this.multiBillSelection = true;
      this.showCustomLoader = true;
      this.setValue('multibillrequestdetail', this._appConfig.getSelectedAccountsList());
      console.log(this._appConfig.getSelectedAccountsList());
      console.log(this.formGroup);
    }

    this.setServiceCode("RETAILMULTIBILLPAYMENT");
    this.editMode = this._appConfig.getData('operationMode') == 'M' ? true : false;
    this.removeShellBtn('RESET');
    // this.addShellButton('cancel', 'CANCEL', 'secondary', 'ENTRY', 'button');
    // this.setShellBtnMethod('CANCEL', this.onCancelClick.bind(this));
  }

  override doDestroy(): void {
    this._appConfig.removeData('operationMode');
  }

  handleRowEvent($event: any) {

  }

  getPreferredAccount() {
    let preferredAccount: any;
    this.state.casaWithoutUSDAccount.forEach((item: any) => {
      if (item.preferredAccount) {
        preferredAccount = item;
      }
    })
    return preferredAccount;
  }

  setSelectedAccount() {
    let selectedTransferFromAccount: any;
    if (this._appConfig.getData("selectedAccountFromSummary")) {
      selectedTransferFromAccount = this.state.wholeEligibleAccountsList.find((item: any) => item.accountNumber == this._appConfig.getData("selectedAccountFromSummary"));
      console.log("this.selectedTransferFromAccount", selectedTransferFromAccount)
    } else if (this.state.preferredTransferAccount) {
      selectedTransferFromAccount = this.state.preferredTransferAccount;
      console.log("this.selectedTransferFromAccount", selectedTransferFromAccount)
    } else {
      selectedTransferFromAccount = this.state.casaWithoutUSDAccount[0];;
      selectedTransferFromAccount.preferredAccount = false;
    }

    this.setVariable('fromCurrencyVariable', selectedTransferFromAccount.accountCurrency);
    console.log(2)

    this.setVariable('accountBalanceVariable', selectedTransferFromAccount.availableBalance);

    console.log("selectedTransferFromAccount", selectedTransferFromAccount)
    return selectedTransferFromAccount;
  }

  public override doPostInit(): void {
    this.multiBill = this.formGroup.get("multiBill") as FormArray;
    if(this.editMode) {
      this.multibillrequest = JSON.parse(JSON.stringify(this._appConfig.getData('multibillrequest')));
      this.multibillrequest.hiddenField = '1';
      this.formGroup.setValue(this.multibillrequest);
      this.formGroup.updateValueAndValidity();
      this.afterValuePatch();
      this.billerAccountReceived = this.multibillrequest.multibillrequestdetail || [];
    }
    else {
      let criteriaQuery = new CriteriaQuery();
      this._billeraccountService
        .findAll(criteriaQuery)()
        .subscribe({
          next: (res) => {
            if(res && res.data) {
              res.data
              this.multiBillDtls = {
                multibillrequestdetail: res.data
              }
              if(this.multiBillDtls.multibillrequestdetail.length > 0) {
                this.multiBillDtls.multibillrequestdetail = this.multiBillDtls.multibillrequestdetail.filter((x: any)=> x.status != 'I');
                this.multiBillDtls.multibillrequestdetail.forEach((element: any, i: number) => {
                  this.multiBillDtls.multibillrequestdetail[i]['billReference'] = element.billerId.billerId;
                  // if (!element.nickName) this.multiBillDtls.multibillrequestdetail[i]['nickName'] = element.billerId.name;
                });
              }
            }
              this.billerAccountReceived = this.multiBillDtls.multibillrequestdetail || [];

            this.setValue('multibillrequestdetail', this.multiBillDtls.multibillrequestdetail);
            if (!this.state.accountNumber) {
              // this.state.casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
              // this.state.accountNumber = this.state.casaAccounts[0].accountNumber;
              // let selectedAccount = this.state.casaAccounts.filter((item) => item.accountNumber === this.state.accountNumber);
              // this.state.selectedAccount = selectedAccount[0];


              this.state.wholeEligibleAccountsList = this._appConfig.getData('wholeEligibleAccountsList');
              console.log(this.state.wholeEligibleAccountsList)
              this.state.casaAccountList = this.state.wholeEligibleAccountsList.filter((item: any) => item.transferOut === "1")
              console.log(this.state.casaAccountList)

              this.state.casaWithoutUSDAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency !== 'USD');

              this.state.preferredTransferAccount = this.getPreferredAccount();

              this.state.selectedAccount = this.setSelectedAccount();

              // for (let account of this.state.casaWithoutUSDAccount) {
              //   if (account.preferredAccount) {
              //     this.state.selectedAccount = account;
              //   }
              // }

              // if (!this.state.selectedAccount) {
              //   this.state.selectedAccount = this.state.casaWithoutUSDAccount[0];
              // }
            }
            this.formGroup.get('debitAccount')?.setValue(this.state.selectedAccount.accountNumber);
            console.log(this.formGroup.value)
            // this.setValue('debitAccount', this.state.accountNumber);
            this.setValue('accountNickname', this.state.selectedAccount?.accountNickname);
            this.formGroup.updateValueAndValidity();
            setTimeout(() => {
              this.afterValuePatch();
            }, 1000);


            if (this.getRoutingParam('multiBillSelection')) {
              this.setValue('multibillrequestdetail', this._appConfig.getSelectedAccountsList());
            }
          },
        });
    }
    
  }
  afterValuePatch() {
    this.initialFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
    this.formGroup.valueChanges
      .pipe(
        startWith(this.formGroup.value),
        pairwise(),
        map(([oldValues, newValues]) => {
          return Object.keys(newValues).find(
            (k) => newValues[k] != oldValues[k]
          );
        })
      )
      .subscribe((key) => {
        console.log(key)
        console.log(this.formGroup.value)
        if (key && key != 'hiddenField') {
          this.currentFormValue = JSON.parse(JSON.stringify(this.formGroup.value));
          // this.reCheckForm();
        }
        this.multiBillCount = this.formGroup.value.multibillrequestdetail?.filter((x: any)=> (x.paymentAmount != ''&& !Number.isNaN(x.paymentAmount)))?.length;

        if(key && key == "multibillrequestdetail") {
          let total = 0;
          let totalPayNowAmount = 0;
          let totalPayLaterAmount = 0;

          this.formGroup.value.multibillrequestdetail.forEach((element: any) => {
            console.log(element)
            total =  total + ((element.paymentAmount!= "" && !Number.isNaN(element.paymentAmount))?element.paymentAmount:0)
            if(element.paymentDate > moment().format('YYYY-MM-DD')) {
              totalPayLaterAmount = totalPayLaterAmount + element.paymentAmount || 0;
            } else {
              totalPayNowAmount = totalPayNowAmount + element.paymentAmount || 0;
            }
          });
          this.formGroup.get('totalBillAmount')?.patchValue(total);
          this.formGroup.get('totalPayNowAmount')?.patchValue(totalPayNowAmount);
          this.formGroup.get('totalPayLaterAmount')?.patchValue(totalPayLaterAmount);

          console.log(this.formGroup.value)
          this.formGroup.get('totalPayNowAmount')?.patchValue(totalPayNowAmount);
          this.formGroup.get('totalPayLaterAmount')?.patchValue(totalPayLaterAmount);


          this.validateAmount();

          if((totalPayLaterAmount+totalPayNowAmount) > this.state.selectedAccount.availableBalance) {
            if(this.showInsufficientBalanceError){
              window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }
          }
        }

        console.log(this.state.selectedAccount.availableBalance)
        // console.log(this.formGroup.value.totalPayNowAmount.toFixed(2))
        // if (this.state.selectedAccount.availableBalance < this.formGroup.value.totalPayNowAmount.toFixed(2)) {

        //   this.setHidden('hiddenField', false);
        //   this.showInsufficientBalanceError = true;
        // } else {
        //   this.setHidden('hiddenField', true);
        //   this.showInsufficientBalanceError = false;
        // }
        const payNowAmount = parseFloat(this.formGroup.value.totalPayNowAmount).toFixed(2); 
        const availableBalance = parseFloat(this.state.selectedAccount.availableBalance).toFixed(2); 
        
        if (parseFloat(availableBalance) < parseFloat(payNowAmount)) {
          this.setHidden('hiddenField', false);
          this.showInsufficientBalanceError = true;
          
        } else {
          this.setHidden('hiddenField', true);
          this.showInsufficientBalanceError = false;
        }
        

        console.log(this.formGroup.valid)
      });
  }
  override onReview(): void {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
    
  }


  cancel() {
    this._angularRouter.navigate(['home'])
  }

  validateAmount() {
    let totalPayNowAmount = this.formGroup.get('totalPayNowAmount')?.value;
    let totalPayLaterAmount = this.formGroup.get('totalPayLaterAmount')?.value;
    let totalBillAmount = this.formGroup.get('totalBillAmount')?.value;

    // let payload = {
    //   "fromCurrency": "CAD",
    //   "toCurrency": "CAD",
    //   "amount": totalPayNowAmount,
    //   "beneId": beneficiaryId,
    //   "toAccCurr": toAccCurr,
    //   "fromAccCurr": fromAccCurr
    // }

    // const httpRequest = new HttpRequest();
    // httpRequest.setMethod('POST');
    // httpRequest.setResource('/exchangerate');
    // let bodyContent = { "exchangerate": payload };
    // httpRequest.setBody(bodyContent);
    // httpRequest.setContextPath('Common');
    // httpRequest.addHeaderParamter('serviceCode', 'DEPFXRATE');
    // return this._httpProvider.invokeRestApi(httpRequest).pipe(
    //   map((res: IHttpSuccessPayload<any>) =>
    //     res.body.exchangerate ?? null
    //   )
    // ).pipe(
    //   map((res: any) => {

    //   })
    // )
  }

  reCheckForm() {
    this.currentFormValue.hiddenField = '1';
    if (this.currentFormValue && this.initialFormValue && this._commonService.isSameObject(this.currentFormValue,this.initialFormValue)) {
        this.formGroup.get("hiddenField")?.enable();
        console.log("Not Changed")
    } 
    else {
      this.formGroup.get("hiddenField")?.disable();
      console.log("Changed");
    }
  }

  goToConfirm() {
    
    this._appConfig.setData('multibillrequest',this.formGroup.value)
    this._angularRouter.navigate(['payments-space','entry-shell','payments','retail-bill-payment'])
  }


  public override preSubmitInterceptor(payload: Multibillrequest): any {

    console.log(payload);

    let newPayload: any;

    newPayload = {
      "totalBillAmount": payload.totalBillAmount,
      "debitAccount": this.state.selectedAccount.accountNumber,
      "initiatedDate": moment().format('YYYY-MM-DD'),
      "multibillrequestdetail": this.getMultiBillDetail(payload.multibillrequestdetail)
    }

    this._appConfig.setData('paidBillDetails', newPayload);
    console.log(newPayload);
    // WRITE CODE HERE TO HANDLE
    return newPayload;
  }

  getMultiBillDetail(payload: any) {
    let multiBillDetail: any[] = [];
    let Obj: any;
    payload.forEach((item: any) => {
      let scheduleType = '';
      if (item.paymentDate > moment().format('YYYY-MM-DD')) {
        scheduleType = '2';
      } else {
        scheduleType = '1';
      }
      console.log(item)

      Obj = {
        "orderSl": item.orderSl,
        "billerBeneficiaryId": this.convertNumber(item.billerBeneficiaryId),
        "currency": "CAD",
        "paymentAmount": item.paymentAmount,
        "scheduleType": scheduleType,
        "paymentDate": item.paymentDate,
        "beneficiaryName": item.nickName || item.billerId.name,
        "billerCreditAccount": item.billerCreditAccount,
        "defaultPaymentAccount": this.state.selectedAccount.preferredAccount ? "1" : "0",
        "billReference": item.id,
      }
      multiBillDetail.push(Obj);
    })
    return multiBillDetail;
  }

  convertNumber(number: string): string {
    return number.split('_')[0];
  }

  public override postDataFetchInterceptor(payload: Multibillrequest) {
    // WRITE CODE HERE TO HANDLE
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    console.log(response)
    console.log(routingInfo)

    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.multibillrequest;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response?.error?.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode?.value
      });
    }
    return response;
  }

  openAccountModal() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    if (this._deviceDetectorService.isMobile()) {
      modal.setPanelClass('full-view-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    } modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Pay from',
      accountsList: this.state.casaWithoutUSDAccount,
      selectedAccount: this.state.selectedAccount,
      fromPaymentsModule: true
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
    console.log("openAccountModal")
  }
  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      this.state.casaWithoutUSDAccount = payload.accountsList;
      console.log(this.state.casaWithoutUSDAccount)
      this.formGroup.get('debitAccount')?.setValue(payload.data.accountNumber);
    }

  }  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
