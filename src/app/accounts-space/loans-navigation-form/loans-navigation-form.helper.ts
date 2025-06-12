import { Injectable } from "@angular/core";
import { BaseFpxChangeHandler, BaseFpxComponentState, BaseFpxFormHelper, FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { AccountsSpaceManager } from "../accounts-space.manager";
import { FormControlStatus, FormGroup } from "@angular/forms";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { AppConfigService, CustomMenuService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { Loans } from "src/app/loans/loans-service/loans.model";
import { LOANAccountsListComponent } from "src/app/loans/loan-accounts-list/loan-accounts-list.component";

export class LoanNavigationFormState extends BaseFpxComponentState {
  loanAccounts: Loans[] = [];
  accountNumber: string = '';
  resetActiveMenu: boolean = false;
  selectedAccount: any = undefined;
  loansList: Loans[] = [];
}

@Injectable()
export class LoanNavigationFormHelper extends BaseFpxFormHelper<LoanNavigationFormState>{

  showViewAll = false;

  constructor(
    private _accountsSpaceMgr: AccountsSpaceManager,
    private _device: DeviceDetectorService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ){
    super(new LoanNavigationFormState() )
  }

  override doPreInit(){
    
  }

  override doPostInit(){
    if(!this._device.isMobile()){
      this._appConfig.getData('moduleRefresh$').observable.subscribe(
        (res:any) => {
          if(res.event == 'onFormClose'){
            this.state.resetActiveMenu = true;
            setTimeout(()=>{
              this.state.resetActiveMenu = false;
            });
          }
        }
      );
    }

    this.state.loanAccounts = this._accountsSpaceMgr.getLoans();
    let accountNumber:string = this._activeSpaceInfoService.getAccountNumber();
    if(!accountNumber){
      accountNumber = this.state.loanAccounts[0].loanAccountNumber;
    }

    this.state.accountNumber = accountNumber;

    let selectedAccount = this.state.loanAccounts.filter((item) => item.loanAccountNumber === this.state.accountNumber);
    this.state.selectedAccount = selectedAccount[0];
    this.state.loansList = this.state.loanAccounts;

    if (this.state.loansList.length > 1) {
      this.showViewAll = true;
    }

    console.log(this.state.selectedAccount)

    this.setValue('accountNumber', this.state.accountNumber);
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);
    this.addValueChangeHandler('accountNumber', this.handleAccountNumberOnChange);
  }

  public handleAccountNumberOnChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    const accountNumber = value;
    this.state.accountNumber = accountNumber;
    this._activeSpaceInfoService.setAccountNumber(this.state.accountNumber);

    if(this.getRoutingParam().routeFrom != 'otherModule') {
      if(this.state.loanAccounts.length !=0) {
        let rid:number = Math.floor(Math.random() * 99999999);
        this._angularRouter.navigate(['accounts-space','loans'],
          {
            queryParams: {
              rid: rid
            }
          }
        );
      }
    }
  }

  openLoanAccountsLists() {
    let modal = new FpxModal();
    modal.setComponent(LOANAccountsListComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Selected Account',
      loansList: this.state.loansList,
      selectedAccount: this.state.selectedAccount
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      this.setValue('accountNumber', payload.data.loanAccountNumber);
    }
  }
}
