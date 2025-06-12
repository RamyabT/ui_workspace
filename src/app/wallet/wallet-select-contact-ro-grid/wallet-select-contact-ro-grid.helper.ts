import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
  FpxModal,
  FpxModalAfterClosed,
  FpxToastService,
} from "@fpx/core";
import { AppConfigService } from '@dep/services';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class WalletSelectContactROGRIDHelper extends BaseFpxRoGridHelper {
  customPayload: any = {
    receipientCustomerId: "",
    firstName: "",
    lastName: "",
    iban: "",
    mobileNumber: "",
    currency: "",
    availableBalance: "",
    accountNumber: "",
    productDesc: "",
    beneValue: "",
  };
   isSelected:boolean = false;
  selectedContactsList:any=[];
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private _appconfig: AppConfigService,private _fpxToastService: FpxToastService, private _translateService: TranslateService,
  private _dialogRef: MatDialogRef<any>) {
    super();
    this.addHandleActions('onclick', this.selectContactROGRIDView);
  }

  public getGridColumnWidth(): number[] {
    return [3, 250, 250];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    return _isSortSearch;
  }

  private selectContactROGRIDView: BaseFpxRoGridHandleAction = (
    name: string,
    data: any
  ) => {
      console.log(data);
      if(data.phoneNumber){
      this.triggerGridOutputEvent('CONTACTSELECTED',data.phoneNumber);
      this._dialogRef.close(data.phoneNumber);
      }
   
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setNgTemplateName('selectContactListTmplt');
    this.setNgTemplateClass('select-contact-list-tmplt');
  }
  


  override doPostInit(): void {
  
  }



}




