import { inject, Injectable } from "@angular/core";
import { ContextMenuModel, FpxAppConfig, HttpProviderService, HttpRequest, IHttpSuccessPayload } from "@fpx/core";
import { UserAuthService } from "../user-auth/user-auth.service";
import { HttpClient } from "@angular/common/http";
import { RetailKillPreviousSessionComponent } from "src/app/prelogin/retail-kill-previous-session/retail-kill-previous-session.component";
import { BehaviorSubject, Observable, catchError, map, throwError } from "rxjs";
import moment from "moment";
import { EnableBiometricFormComponent } from "src/app/foundation/enable-biometric-form/enable-biometric-form.component";
import { RetailOverrideMpinComponent } from "src/app/prelogin/retail-override-mpin/retail-override-mpin.component";
import { DepHttpConfig } from "../DepHttpConfig.service";
import { AESService } from "../aes.service";
import { HealthCheckService } from "../heath-check/health-check.service";
import { Router } from "@angular/router";
import { APPCONSTANTS } from "@dep/constants";
import { environment } from "src/environments/environment";
import { DeviceDetectorService } from "@dep/core";
import { SkinManager } from "@dep/ui";
import { SpinnerDialog } from "@awesome-cordova-plugins/spinner-dialog/ngx";
import { CustomCurrAmountService } from "../fpx-curr-amount/fpx-curr-amount.service";
import { TFADeliveryModeFormComponent } from "src/app/foundation/tfa-delivery-mode-form/tfa-delivery-mode-form.component";
import { PaymentsConfirmationReceiptFormComponent } from "src/app/payments/payments-confirmation-receipt-form/payments-confirmation-receipt-form.component";
import { ETransferConfirmationReceiptFormComponent } from "src/app/etransfers/etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component";
import { ConfirmationReceiptFormComponent } from "src/app/accounts/confirmation-receipt-form/confirmation-receipt-form.component";
import { TransferConfirmationReceiptFormComponent } from "src/app/transfers/transfer-confirmation-receipt-form/transfer-confirmation-receipt-form.component";
import { DepositsSummary } from "src/app/deposits/deposits-service/deposits.model";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends FpxAppConfig {
  private skinManager: SkinManager = inject(SkinManager);
  private _tenantId: string = "";
  private _entity: string = "";

  private _currencyList: any;
  private _merchant: any;
  private _trancat: any;
  public baseCurrency: string = APPCONSTANTS.baseCurrency;
  public baseCurrencyDesc: string = APPCONSTANTS.baseCurrencyDesc;
  checkDeviceDedupe: boolean = true;
  private _CBD:string = moment().format('YYYY-MM-DD');
  public appVersionUpdate$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public appSpinner$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public baseCountry: string = "";
  private _deposits: any
  
  // public activeMenuId: string = 'home';

  private _fieldConfig:any;

  constructor(
    private _userAuth: UserAuthService, 
    private _httpProvider : HttpProviderService,
    private _depHttpConfig: DepHttpConfig,
    private _healthCheckService: HealthCheckService,
    private _router:Router,
    private _aesService: AESService,
    private _device: DeviceDetectorService,
    private _spinnerDialog: SpinnerDialog,
    private _customCurrencyList: CustomCurrAmountService
  ) {
    super();
    this.setToolTipRequired(false);
  }

  visibleSpinner(visible: boolean = true) {
    if (this._device.isHybrid()) {
      if (visible) this._spinnerDialog.show("", "", true);
      else this._spinnerDialog.hide();
    } else {
      this.appSpinner$.next(visible);
    }
  }
  getAppConstant(): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setResource("/uicontent/{contentType}");
    httpRequest.addPathParameter('contentType', '3');
    httpRequest.addHeaderParamter('languageId', 'en');
    httpRequest.addQueryParameter('tenantId', this.getTenantId());
    httpRequest.addQueryParameter('applicationCode', 'DEPRETAIL');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map(
        (response: any) => {
          return JSON.parse(response.body.uicontent.uiComponentContent);
        },
        catchError((err: any) => {
          return throwError(err);
        })
      )
    );
  }

  setDepedentComponent() {
    this.attachComponent('deliveryModeSelection', TFADeliveryModeFormComponent);
    this.attachComponent('killPreviousSession', RetailKillPreviousSessionComponent);
    this.attachComponent('overrideMpin', RetailOverrideMpinComponent);
    this.attachComponent('enableBiometric', EnableBiometricFormComponent);
    this.attachComponent('paymentsConfirmationReceiptForm', PaymentsConfirmationReceiptFormComponent);
    this.attachComponent('transfersConfirmationReceiptForm', ETransferConfirmationReceiptFormComponent);
    this.attachComponent('accountsConfirmationReceiptForm', ConfirmationReceiptFormComponent);
    this.attachComponent('newTransfersConfirmationReceiptForm', TransferConfirmationReceiptFormComponent);
  }

  getCurrencyList(): any[] {
    return this._currencyList
  }
  setCurrencyList(currencyList: any[]) {
    this._currencyList = currencyList
  }

  getMerchantById(id: string): any {
    return this.getMerchant()?.find((x: Merchant) => x.merchantId == id);
  }
  getMerchant(): Merchant[] {
    return this._merchant;
  }
  setMerchant(merchant: Merchant[]) {
    this._merchant = merchant;
  }
  getDepositsSummary():DepositsSummary{
    return this._deposits || null;
  }
  public setDepositsSummary(list: DepositsSummary){
    this._deposits = list;
  }

  setTransactionCat(trancat: TranCat[]) {
    this._trancat = trancat;
  }
  getTransactionCat(): TranCat[] {
    return this._trancat;
  }

  getTransactionCatById(id: string): any {
    return this.getTransactionCat()?.find((x: TranCat) => x.tranCat == id);
  }

  getCBD(): string {
    return this._CBD
  }

  setCBD(cbd: string) {
    this._CBD = cbd
  }

  getBaseCurrency() {
    return this.baseCurrency;
  }

  override getContextMenu(menuCode: string): ContextMenuModel[] {
    let menuItems = this._contextMenuJson[menuCode];

    // let allowedServices: ContextMenuModel[] = [];
    // let permissions = this._userAuth.getPermissions();
    // let permissionsServices = Object.keys(permissions);
    // menuItems.forEach((element: ContextMenuModel) => {
    //   if (permissionsServices.indexOf(element.id) > -1) {
    //     allowedServices.push(element);
    //   }
    // });

    return menuItems;
  }

  loadMerchant() {
    this.fetchMerchantData().subscribe({
      next: (res: any) => {
        this.setMerchant(res);
      }
    });
  }

  loadTransactionCat() {
    this.fetchTransactionCat().subscribe({
      next: (res: any) => {
        this.setTransactionCat(res);
      }
    });
  }

  fetchMerchantData(): Observable<Merchant[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/merchant');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.merchant;
      })
    );
  }

  fetchTransactionCat(): Observable<Merchant[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/transactioncategory');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.transactioncategory;
      })
    );
  }

  helloText() {
    this.setDefaultDropdownList([{ id: "", text: 'Choose one...' }]);
    let msg:string = "";
    let data = [
      [17, 'HELLOTEXT.goodEvening'],
      [12, 'HELLOTEXT.goodAfternoon'],
      [0, 'HELLOTEXT.goodMorning']
    ];
    let hr:any = new Date().getHours();

    for (var i = 0; i < data.length; i++) {
      if (hr >= data[i][0]) {
        msg = data[i][1] as string;
        break;
      }
    }
    return msg || 'HELLOTEXT.default';
  }

  getActiveMenuId() {
    return this.getData("activeMenuId");
  }

  setTenantId(id: string) {
    this._tenantId = id.toUpperCase();
    this._depHttpConfig.setCommonHeaderParams('tenantid', this._tenantId);
    this.skinManager.applySkin(this._tenantId);

    this.setFieldConfig({});

    let nocache = Math.floor(Math.random() * 9999999);
    let tenantConfigPath = "./assets/tenant-config/" + this._tenantId.toLowerCase() + "/ui-attributes/field-config.json?nocache=" + nocache;
    this.loadConfig(tenantConfigPath).subscribe({
      next: (res: any) => {
        this.setFieldConfig(res);
      }
    });
  }

  resetEntityBrand() {
    this._entity = "";
    this._depHttpConfig.removeCommonHeaderParam("entity");
    this.skinManager.removeEntitySkin();
  }

  setEntityBrand(id: string) {
    this._entity = id;
    this._depHttpConfig.setCommonHeaderParams('entity', this._entity);
    this.skinManager.appEntitySkin(this._tenantId, this._entity);

    if (this._entity) {
      let nocache = Math.floor(Math.random() * 9999999);
      let entityConfigPath = this.skinManager.getAssetFolderPath() + "/ui-attributes/field-config.json?nocache=" + nocache;
      this.loadConfig(entityConfigPath).subscribe({
        next: (entityConfigRes: any) => {
          this.setFieldConfig(entityConfigRes);
        },
        error: (err: any) => {
          console.info("No entity config available!");
        }
      });
    }
  }
  
  getTenantId(): string {
    return this._tenantId;
  }

  getEntity(): string {
    return this._entity;
  }

  public setFieldConfig(jsonData: any) {
    this._fieldConfig = jsonData;
  }

  public getFieldConfig(serviceCode: string) {
    let fieldConfig = this._fieldConfig;
    return fieldConfig?.[serviceCode];
  }

  public updateAppConstants(constants: any) {

  }

  // override currenyTransformPipe: (value: any, args: any) => any;

  override currenyTransformPipe = (value: any, args: any) => {
    return APPCONSTANTS.currencyCodeMap[args.id] || value;
  }

  getCasaAccountList() {
    return this.getData("casaAccountList");
  }

  setCasaAccountList(casaAccountList: any) {
    this.setData("casaAccountList", casaAccountList);
  }

  // betweenThreeAndTwentyOnePM(date: Date) {
  //   console.log(date)
  //   const formatter = new Intl.DateTimeFormat('en-US', {
  //     timeZone: 'America/Los_Angeles',
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false
  //   });

  //   const pstTime = formatter.format(date);
  //   const pstTimeParts = pstTime.split(',')[1].split(':');
  //   const pstHour = parseInt(pstTimeParts[0], 10);

  //   console.log(pstTime)
  //   console.log(pstHour)
  //   console.log(pstTimeParts)

  //   if (pstHour >= 3 && pstHour < 21) {
  //     console.log(pstHour,"pstHour")
  //     return true;
  //   }
  //   console.log(pstHour,"pstHour")
  //   return false;
  // }
  betweenThreeAndTwentyOnePM(date: Date): boolean {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hour12: false
    });
  
    const parts = formatter.formatToParts(date);
    const hourPart = parts.find(p => p.type === 'hour');
    const hour = hourPart ? parseInt(hourPart.value, 10) : NaN;
    console.log(hour,"psthour")
  
    return hour >= 3 && hour < 21;
  }
  

  checkForPSTAboveNinePM(date: Date) {
    // Create a Date object for the current time
    // Format the date to PST
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // Format and output the time
    console.log(formatter.format(date));
    const pstTime = formatter.format(date);
    const pstTimeParts = pstTime.split(',')[1].split(':');
    const pstHour = parseInt(pstTimeParts[0], 10);
    const pstMinute = parseInt(pstTimeParts[1], 10);

    console.log(pstTime)
    if (pstHour >= 9) {
      return true;
    }
    return false;
  }

  canEditOrCancelTransfer(transferDate: Date): boolean {
    // Get the current date and time in PST
    const currentDate = new Date();
    const pstOffset = -8; // PST is UTC-8
    const currentDatePST = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours() + pstOffset);

    // Calculate the cutoff date and time (10 PM PST the day before the transfer date)
    const cutoffDate = new Date(transferDate);
    cutoffDate.setDate(cutoffDate.getDate() - 1); // Day before
    cutoffDate.setHours(22, 0, 0, 0); // Set to 10 PM

    console.log("currentDatePST", currentDatePST);
    console.log("cutoffDate", cutoffDate);

    // Check if the current date and time is before the cutoff
    return currentDatePST < cutoffDate;
  }

  setSelectedAccountsList(selectedAccountsList: any[]) {
    this.setData("selectedMultipleBillsAccountsList", selectedAccountsList);
  }

  getSelectedAccountsList() {
    return this.getData("selectedMultipleBillsAccountsList");
  }

  setTransferModifyData(data: any) {
    this.setData("transferModifyData", data);
  }

  getTransferModifyData() {
    return this.getData("transferModifyData");
  }

}

export interface IAppConfig {
  baseURL: string;
  Common?: string;
  Accounts?: string;
  Customers?: string;
  CreditCards?: string;
  DebitCards?: string;
  PrepaidCards?: string;
  WorkflowService?: string;
  Deposits?: string;
  defaultPublisher?: string;
  languageId?: string;
}

export interface Merchant {
  merchantId: string,
  merchantCat: string,
  icon: string,
  merchantName: string
}

export interface TranCat {
  tranCatType: string,
  icon: string,
  tranCat: string,
  tranDesc: string
}
