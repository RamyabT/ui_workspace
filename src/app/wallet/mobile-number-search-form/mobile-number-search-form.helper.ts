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
import { PhoneBookService } from '@dep/native';
import { DeviceDetectorService } from '@dep/core';

export class MobileNumberSearchFormState extends BaseFpxComponentState {
  errorMessage: string = '';
  _bicBranchsGridData: any;
  doShowBicBranchList: boolean = false;
  tableData:any;
}

@Injectable()
export class MobileNumberSearchFormHelper extends BaseFpxFormHelper<MobileNumberSearchFormState> {
  private _gridData: any;


  constructor(
    private _router: Router,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _changeDetectionRef: ChangeDetectorRef,
     private deviceDetectorService: DeviceDetectorService,
        private phoneBookService: PhoneBookService
  ) {
    super(new MobileNumberSearchFormState());
  }

  override doPreInit() {
    this.addValueChangeHandler("searchMobileNumber", this.handlesearchMobileNumberOnValueChange);
  }

  override doPostInit() {
   this.handleFormOnLoad();
  }
  handleFormOnLoad(){
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
      let sampleContacts = [
        {
          displayName: "Preethika Baskaran",
          phoneNumber: "9087654321",
        },
        {
          displayName: "Suriya Lokesh",
          phoneNumber: "9087654321",
        },
        {
          displayName: "Suresh",
          phoneNumber: "9087654321",
        },
        {
          displayName: "Sathish",
          phoneNumber: "+919025779554",
        },
        {
          displayName: "Priya",
          phoneNumber: "+919444222636",
        },
        {
          displayName: "Vikas",
          phoneNumber: "+916382357623",
        },
      ];
      let isNotNull = (value: any) => value.phoneNumber != null;
      let filteredArray = sampleContacts.filter(isNotNull);
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

  public handlesearchMobileNumberOnValueChange: BaseFpxChangeHandler = (
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
        bic: $event.payload.bic
      });
    }
  }

}
