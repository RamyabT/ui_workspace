import { ChangeDetectorRef, Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  RoutingInfo,
  BaseFpxChangeHandler,
  FpxSubmitHandler,
} from "@fpx/core";
import { Observable, map, of, sample } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { PhoneBookService } from "src/app/dep/native/phone-book.service";
export class RetailAddMembersContactState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  selectedContact: any;
  personsCount = 0;
  selectedContactsList: any = [
    {
      displayName: "Me", 
      iban: "GB33BU0000201555599995554444",
      phoneNumber: ""
    },
  ];
  tableData:any;

}

@Injectable()
export class RetailAddMembersContactHelper extends BaseFpxFormHelper<RetailAddMembersContactState> {
  private _gridData: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private appConfig: AppConfigService,
    private deviceDetectorService: DeviceDetectorService,
    private phoneBookService: PhoneBookService
  ) {
    super(new RetailAddMembersContactState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILADDMEMBERSCONTACT");
    this.addShellButton('Next', 'NEXT', 'primary', 'DISPLAY', 'button');
    this.setShellBtnMethod('NEXT', this.nextNavigate.bind(this));
    // this.addSubmitHandler("submit", this.customSubmitHandler);
   
  }
  // customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    nextNavigate(){
      this.appConfig.setData(
        "noOfPersonSelected",
        this.state.selectedContactsList.length
      );
      this.appConfig.setData(
        "selectedContactDetail",
        this.state.selectedContactsList
      );
      this._router.navigate([
        "npss-space",
        "entry-shell",
        "npss",
        "retail-bill-split-type",
      ]);
      return {
        success: () => {
          console.log("on submit");
        },
        error: () => {
          console.log("error");
        }
    }
   
    }
  

  public override doPostInit(): void {
    this.state.selectedContactsList[0].phoneNumber = this.appConfig.getData('npssDetails').customerDetails.mobileNumber;
    this.appConfig.setData('mobileNumber',this.state.selectedContactsList[0].phoneNumber);
    this.setGridData("selectedContact", this.state.selectedContactsList);
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();

    this.addValueChangeHandler("searchText", this.dosearchTextChangeHandler);
    if (this.deviceDetectorService.isHybrid()) {
      const options = {
        fields: ["phoneNumbers", "emails"],
      };
      this.showSpinner();
      this.phoneBookService
        .fetchContacts(options)
        .then((contacts: any[]) => {
          console.log("phonenumber patched", contacts);
          let isNotNull = (value: any) => value?.phoneNumbers != null;
          let filteredContact = contacts.filter(isNotNull).map((item: any) => {
            return {
              displayName: item?.displayName || item?.name?.givenName,
              phoneNumber: item.phoneNumbers[0].value.replaceAll(" ", ""),
            };
          });

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
          this.state.tableData = this._gridData;
          this.state.tableData.map((item:any)=>{
            return {
              ...item,
              isSelected: false
            }
          })
          this.setGridData("contactList",this.state.tableData);
          this.hideSpinner();

        })
        .catch((error: any) => {
          console.error("error", error);
        });
    } else {
      let sampleData = [
        {
          displayName: "Preethika Baskaran",
          phoneNumber: "+919025779554",
        },
        {
          displayName: "Suriya Lokesh",
          phoneNumber: "+916382357623",
        },
        {
          displayName: "Suresh",
          phoneNumber: "+919444222636",
        },
      ];
      let isNotNull = (value: any) => value.phoneNumber != null;
      let filteredArray = sampleData.filter(isNotNull);
      let sortedList = filteredArray.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
      this._gridData = sortedList;
      this.state.tableData = this._gridData;
      this.state.tableData.map((item:any)=>{
        return {
          ...item,
          isSelected:false
        }
      })
      this.setGridData("contactList", this.state.tableData);
    }
  }
  
  UnSelectContactGridEvent($event:any){
    let unSelectContact = $event.payload;
    this.state.tableData.forEach((item:any)=>{
      if(item.phoneNumber == unSelectContact){
        item.isSelected = false;
      }
    });
     let updatedContactsList:any=[];
    this.state.selectedContactsList.filter((item:any)=>{
      if(item.phoneNumber!=unSelectContact){
        updatedContactsList.push(item);
      }
    });
    this._gridData.filter((item:any) => {
      if (item.phoneNumber == unSelectContact) {
        item.isSelected=false;
      }
    });
    this.state.selectedContactsList=updatedContactsList;
    this.setGridData("contactList", this.state.tableData);
  }


  SelectedContactGridEvent($event: any) {
    this.state.selectedContact = $event.payload;
    let i = this.state.selectedContactsList.findIndex(
      (item: any) =>{
        return item.mobileNumber==this.state.selectedContact.mobileNumber;
     }
     )
     this._gridData.filter((item:any) => {
      if (item.phoneNumber == this.state.selectedContact.mobileNumber) {
        item.isSelected=true;
      }
    });
     if(i==-1) {
      this.state.selectedContactsList.push({
        displayName: this.state.selectedContact.firstName,
        phoneNumber: this.state.selectedContact.mobileNumber,
        ...this.state.selectedContact
      });
      this.state.personsCount = this.state.selectedContactsList.length;
        this.setValue('personsCount',this.state.personsCount);
     }

    console.log("SelectedContactDeatils: ", this.state.selectedContactsList);
    this.setGridData("selectedContact", this.state.selectedContactsList);
    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  public dosearchTextChangeHandler: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let searchTextVal = value.toLocaleLowerCase();

    if (this._gridData) {
      let _data = this._gridData.filter((rowData: any) =>
        Object.values([rowData?.displayName, rowData?.phoneNumber]).some(
          (val: any) => {
            let txt = "";
            if ((val && typeof val === "string") || typeof val === "number") {
              txt = val.toString().toLocaleLowerCase();
              return txt.includes(searchTextVal);
            } else {
              return false;
            }
          }
        )
      );
      this.setGridData("contactList", _data);
    }
  };

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
