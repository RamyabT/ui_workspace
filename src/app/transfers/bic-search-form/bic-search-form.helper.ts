import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import {
  BaseFpxChangeHandler,
  BaseFpxComponentState,
  BaseFpxFormHelper,
  CriteriaQuery,
  FpxModal,
} from '@fpx/core';
import { BaseFpxPostSubmitInterceptor, SpinnerService, RoutingInfo } from '@fpx/core';
import { Router } from '@angular/router';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export class BicSearchFormState extends BaseFpxComponentState {
  errorMessage: string = '';
  _bicBranchsGridData: any;
  doShowBicBranchList: boolean = false;
}

@Injectable()
export class BicSearchFormHelper extends BaseFpxFormHelper<BicSearchFormState> {
  requestCode:string = '0';

  constructor(
    private _router: Router,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    super(new BicSearchFormState());
  }

  override doPreInit() {
    this.requestCode = this._dialogData.requestCode;
    this.addValueChangeHandler("bankName", this.handleBankNameOnvalueChange);
    this.addValueChangeHandler("searchBicCode", this.handleSearchBicCodeOnValueChange);
  }

  override doPostInit() {
    if(this._dialogData.setDefaultCountry){
      // this.setDropdownInitialData("country");
      this.setValue('country','CA');
      this.setReadonly('country',true);
    }
  }
  
  public handleBankNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let countryCode = this.getValue('country');
    const criteriaQuery = new CriteriaQuery();
    if(value && countryCode){
      this.state.doShowBicBranchList = true;
      criteriaQuery.addQueryparam('countryCode', countryCode);
      criteriaQuery.addQueryparam('bankCode', value);
      // criteriaQuery.addSortCriteria('', 'desc', 'String');
      this.setGridCriteria('bicBranchRoGrid', criteriaQuery);
    } else {
      this.state.doShowBicBranchList = false;
    }

  }

  public handleSearchBicCodeOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(this.state._bicBranchsGridData && this.state._bicBranchsGridData.length){
      let searchTextVal = value.toLocaleLowerCase();
      let _data = this.state._bicBranchsGridData.filter((rowData:any) => Object.values([
        rowData?.branchName, 
        rowData?.bic
      ]).some((val:any) => {
        let txt = '';
        if (val && typeof(val) === 'string' || typeof(val) === 'number') {
          txt = val.toString().toLocaleLowerCase();
          return txt.includes(searchTextVal);
        } else {
          return false;
        }
      }));
      this.setGridData('bicBranchRoGrid', _data);
    }
  }

  public override preSubmitInterceptor(payload: any) {
    return payload;
  }

  public override postSubmitInterceptor(response: BaseFpxPostSubmitInterceptor): RoutingInfo | null {
    if (response.success) {
      const routingInfo = new RoutingInfo();
      return routingInfo;
    } else if (response?.error) {
      
      let errorMessage = response.error?.error.errorMsg || response.error?.error.errorMessage || response.error?.error?.ErrorDescription || "";
      this.state.errorMessage = errorMessage;
      
      return null;
    } else {
      return null;
    }
  }

  bicBranchRoGridEvent($event:any){
    if($event.eventName == 'afterDataFetch'){
      this.state._bicBranchsGridData = $event.payload;
    } else if($event.eventName == 'onBICSelect'){
      console.log($event);
      this._dialogRef.close({
        bic: $event.payload.bic,
        requestCode: this.requestCode
      });
    }
  }

}
