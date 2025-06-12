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
  CriteriaQuery
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { Npsscontactviewing } from "../npsscontactviewing-service/npsscontactviewing.model";
import { NpsscontactviewingService } from "../npsscontactviewing-service/npsscontactviewing.service";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { PhoneBookService } from "src/app/dep/native/phone-book.service";
export class NPSSContactViewingState extends BaseFpxComponentState {
  showSuggestion: boolean = false;


}


@Injectable()
export class NPSSContactViewingHelper extends BaseFpxFormHelper<NPSSContactViewingState>{
  private _gridData: any;
  
  constructor(private nPSSContactViewingService: NpsscontactviewingService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private phoneBookService: PhoneBookService
  ) {
    super(new NPSSContactViewingState());
  }

  override doPreInit(): void {
    this.hideShellActions();
    this.removeShellBtn("BACK");
    this.setServiceCode("NPSSSENDCONTACT");
  }
  onOtherOption() {
    let service = this.appConfig.getServiceDetails("RETAILREQUESTMONEY");


    setTimeout(() => {
      this._router.navigate(service.servicePath, {

        queryParams: {
        }
      });
    });

  }


  public override doPostInit(): void {
    this.addValueChangeHandler('searchText', this.dosearchTextChangeHandler);

    if (this.deviceDetectorService.isHybrid()) {
      const options = {
        fields: ['phoneNumbers', 'emails']
      };
      this.showSpinner();
      this.phoneBookService
        .fetchContacts(options)
        .then((contacts: any[]) => {
          console.log("phonenumber patched", contacts);
          let isNotNull = (value:any) => value?.phoneNumbers != null;
          let filteredContact = contacts.filter(isNotNull).map((item: any) => {
            return {
              displayName: item?.displayName || item?.name?.givenName,
              phoneNumber: item.phoneNumbers[0].value.replaceAll(" ", "")
            }
          });

          // let sortedList = filteredContact.sort((a, b) => a.displayName.localeCompare(b.displayName));
          let sortedList = filteredContact.sort((a,b)=>{
            if(a.displayName && b.displayName){
              return a.displayName.localeCompare(b.displayName);
            }
            if(!a.displayName && b.displayName){
              return 1;
            }
            if(a.displayName && !b.displayName){
              return -1;
            }
            return 0;
          });
          this._gridData = sortedList;
          this.setGridData('contactList', this._gridData);
          this.hideSpinner();
        })
        .catch((error: any) => {
          console.error('error', error);
        });
    }
    else {
      let sampleData = [
        {
          displayName: 'Ramesh',
          phoneNumber: '+918015813996'
        },
        {
          displayName: 'Naresh',
          phoneNumber: '+919445809767'
        },
        {
          displayName: 'Suresh',
          phoneNumber: '+919444222636'
        }
      ];
      let isNotNull = (value:any) => value.phoneNumber != null;
      let filteredArray = sampleData.filter(isNotNull);
      let sortedList = filteredArray.sort((a, b) => a.displayName.localeCompare(b.displayName));
      this._gridData = sortedList;
      this.setGridData('contactList', this._gridData);
    }

  }
  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let searchTextVal = value.toLocaleLowerCase();
    
    if(this._gridData){
      let _data = this._gridData.filter((rowData: any) => Object.values([
        rowData?.displayName,
        rowData?.phoneNumber
      ]).some((val: any) => {
        let txt = '';
        if (val && typeof (val) === 'string' || typeof (val) === 'number') {
          txt = val.toString().toLocaleLowerCase();
          return txt.includes(searchTextVal);
        } else {
          return false;
        }
      }));
      this.setGridData('contactList', _data);
    }
    
  }

  public override preSubmitInterceptor(payload: Npsscontactviewing): any {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postDataFetchInterceptor(payload: Npsscontactviewing) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.npsscontactviewing,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


