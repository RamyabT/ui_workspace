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
import { Npsscontactviewing } from '../npsscontactviewing-service/npsscontactviewing.model';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';
import { AppConfigService } from '@dep/services';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RetailSelectContactROGRIDHelper extends BaseFpxRoGridHelper {
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
    private _httpProvider: HttpProviderService, private _transferService: TransferService,
    private _appconfig: AppConfigService,private _fpxToastService: FpxToastService, private _translateService: TranslateService,) {
    super();
    this.addHandleActions('onclick', this.selectContactROGRIDView);
    // this.addHandleActions('modify', this.nPSSContactViewingROGRIDModify);
    // this.addHandleActions('add', this.nPSSContactViewingROGRIDEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 250, 250];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    // toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    // toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    // toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    // _isSortSearch.set('FieldId_1', "sort&search");
    // _isSortSearch.set('FieldId_2', "sort&search");
    return _isSortSearch;
  }

  private selectContactROGRIDView: BaseFpxRoGridHandleAction = (
    name: string,
    data: Npsscontactviewing
  ) => {
      console.log(data);
      if(data.phoneNumber){
      let i = 0;
      let iban: any;
      let currency: any;
        this._transferService
        .fetchIBAN(data?.phoneNumber, 1)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            if (res?.bankUserId!='') {
              for (i; i < res.accountDetails.length; i++) {
                if (res.accountDetails[i].defaultAccount == 'Y') {
                  iban = res.accountDetails[i].iban;
                  currency = res.accountDetails[i].currency;
                  this.customPayload = {
                    receipientCustomerId: res?.bankUserId,
                    firstName: res?.customerName,
                    lastName: res?.surname,
                    iban: iban,
                    productDesc: res.accountDetails[i]?.productDesc,
                    mobileNumber: data.phoneNumber,
                    beneValue: data.phoneNumber,
                    accountNumber: res.accountDetails[i]?.accountNumber,
                    availableBalance: res.accountDetails[i].availableBalance,
                  
                  }
                }
              }
              this.tableData[data._index].isSelected = true;
              // this.tableData.forEach((item:any)=>{
              //   if(item.phoneNumber == data.phoneNumber){
              //     item.isSelected = true;
              //   }
              //   else{
              //     item.isSelected = false;
              //   }
              // });
              this.setGridData(this.tableData);
              this.triggerGridOutputEvent('CONTACTSELECTED',this.customPayload);
          }
         
          else{
            this._fpxToastService.showFailAlert(this._translateService.instant("TOASTMESSAGES.aaniServiceContacts.title"), this._translateService.instant("TOASTMESSAGES.aaniServiceContacts.message"), );
          }
        }
      });
      }
   
  };
  private nPSSContactViewingROGRIDModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: Npsscontactviewing
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private nPSSContactViewingROGRIDEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: Npsscontactviewing
  ) => {
    //WRITE YOUR CODE HERE 
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
    // this.addHandleActions('onclick', this.retailContactDetailRoGridView);
  }


  // private retailContactDetailRoGridView: BaseFpxRoGridHandleAction = (
  //   name: string,
  //   data: Npsscontactviewing
  // ) => {
  //   //WRITE YOUR CODE HERE
   


  // }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    // console.log("model closed...", payload);
  }


  // override postFindallInterceptor = (payload: any) => {

  //   let sampleData = [
  //     {
  //       displayName: 'Naresh',
  //       phoneNumbers: [
  //         {
  //           value: '+919445809767'
  //         }
  //       ]
  //     },
  //     {
  //       displayName: 'Ramesh',
  //       phoneNumbers: [
  //         {
  //           value: '+918015813996'
  //         }
  //       ]
  //     },
  //     {
  //       displayName: 'Suresh',
  //       phoneNumbers  : [
  //         {
  //           value: '+919444222636'
  //         }
  //       ]
  //     }
  //   ]

  //   return sampleData;
  // }


}




