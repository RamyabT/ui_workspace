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
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { WalletregistrationService } from '../walletregistration-service/walletregistration.service';
import { Walletregistration } from '../walletregistration-service/walletregistration.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
import { formatDate } from "@angular/common";
//import {  Cobaddressinfo } from '../../admin/cobaddressinfo-service/cobaddressinfo.model';
export class RetailWalletRegistrationFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	dob:any={
	   minDate:"",
       maxDate:"",
     }
	createdOn:any={
	   minDate:"",
       maxDate:"",
     }
	authOn:any={
	   minDate:"",
       maxDate:"",
     }
	modifiedOn:any={
	   minDate:"",
       maxDate:"",
     }

     customerDetails: any = {
      firstName: "",
      creditAmount: "",
      exchangeRate: "",
      chargesAmount: ""
    };
    addressInfo: any = {
      buildingDetails: "",
      cityDetails: "",
      countryDetails: "",
      stateDetails: "",
      pinCode: "",
      email: "",
      mobileNumber: ""
    }
    accordionToggle:boolean = false;
    empInfoaccordionToggle:boolean=false;
    onBillSubmit: boolean =false;
}


@Injectable()
export class RetailWalletRegistrationFormHelper extends BaseFpxFormHelper<RetailWalletRegistrationFormState>{
  addressinfo! : FormGroup;
  ShowAccordin:boolean=true;
  accordionOpen: boolean = true;
  
   constructor( private retailWalletRegistrationFormService: WalletregistrationService, private _httpProvider : HttpProviderService,private _router: Router,
    private userService:CustomerService, private _appConfig:AppConfigService
   ) 
    {
        super(new RetailWalletRegistrationFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILWALLETLIMIT");
 this.addSubmitHandler('submit', this.customSubmitHandler);
 }

 personalInfoToggleAccordion(){
  this.state.accordionToggle=!this.state.accordionToggle;
  // this.setHidden('firstName', this.state.accordionToggle);
  // this.setHidden('dob',this.state.accordionToggle);
  // this.setHidden('lastName',this.state.accordionToggle);
  // this.setHidden('email',this.state.accordionToggle);
  // this.setHidden('mobileNumber',this.state.accordionToggle);
  // this.setHidden('addressLine1', this.state.accordionToggle);
  // this.setHidden('addressLine2',this.state.accordionToggle);
  // this.setHidden('state',this.state.accordionToggle);
  // this.setHidden('dob',this.state.accordionToggle);
  // this.setHidden('city',this.state.accordionToggle);
  // this.setHidden('zipcode',this.state.accordionToggle);
}

empInfoToggleAccordion(){
  this.state.empInfoaccordionToggle=!this.state.empInfoaccordionToggle;
  // this.setHidden('empName',this.state.empInfoaccordionToggle);
  // this.setHidden('empstatus',this.state.empInfoaccordionToggle);
  // this.setHidden('empPosition',this.state.empInfoaccordionToggle);
  // this.setHidden('monthlyIncome',this.state.empInfoaccordionToggle);
  // this.setHidden('empaddressLine1', this.state.empInfoaccordionToggle);
  // this.setHidden('empaddressline2',this.state.empInfoaccordionToggle);
  // this.setHidden('empstate',this.state.empInfoaccordionToggle);
  // this.setHidden('empzipcode',this.state.empInfoaccordionToggle);
  // this.setHidden('empcity',this.state.empInfoaccordionToggle);
}


   
 public handleFormOnLoad(){
  this.userService
  .fetchCustomer(sessionStorage.getItem('customerCode'))
  .subscribe((res) => {
        if (res) {
        //  this.state.customerDetails.firstName =res.lastName;
          this.setValue('firstName', res.firstName);
           this.setValue('dob', res.dob); 
           
           this.setValue('lastName', res.lastName);
           this.setValue('email', res.emailId);
           this.setValue('mobileNumber', res.mobileNumber);

           this.setValue('addressLine1', res.addresses[0].address1);
           this.setValue('addressLine2', res.addresses[0].address2);
           this.setValue('state', res.addresses[0].stateName);
           this.setValue('city', res.addresses[0].city);
           this.setValue('zipcode', res.addresses[0].pincode);


           this.setValue('monthlyIncome', res.empInfo[0].empIncome);
           this.setValue('empPosition', res.empInfo[0].empOccupation);
           this.setValue('empName', res.empInfo[0].empName);
           this.setValue('empstatus', res.empInfo[0].empStatus);
           this.setValue('mobileNumber', res.mobileNumber);
           

           this.setValue('empaddressLine1', res.empInfo[0].addressLine1);
           this.setValue('empaddressLine2', res.empInfo[0].addressLine2);
           this.setValue('empstate', res.empInfo[0].stateName);
           this.setValue('empcity', res.empInfo[0].city);
           this.setValue('empzipcode', res.empInfo[0].pincode);

       // this.setValue('addressinfo',this.state.addressInfo.buildingDetails+","+this.state.addressInfo.buildingName+","+this.state.addressInfo.stateDetails+","+this.state.addressInfo.city+","+this.state.addressInfo.pinCode);

        }})

        this.setReadonly('firstName',true);
        this.setReadonly('dob',true);
        this.setReadonly('lastName',true);
        this.setReadonly('email',true);
        this.setReadonly('mobileNumber',true);
        this.setReadonly('addressLine1',true);
        this.setReadonly('addressLine2',true);
        this.setReadonly('state',true);
        this.setReadonly('dob',true);
        this.setReadonly('city',true);
        this.setReadonly('zipcode',true);
         this.setReadonly('empName',true);
        this.setReadonly('empstatus',true);
        this.setReadonly('empPosition',true);
        this.setReadonly('monthlyIncome',true);
        this.setReadonly('empaddressLine1',true );
        this.setReadonly('empaddressLine2',true);
        this.setReadonly('empstate',true);
        this.setReadonly('empzipcode',true);
        this.setReadonly('empcity',true);
 }

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.personalInfoToggleAccordion();
    this.empInfoToggleAccordion();
 this.addressinfo=this.formGroup.get("addressinfo") as FormGroup;
 
  
  }
  
  customSubmitHandler: FpxSubmitHandler = (payload: any) => {
    this._appConfig.setData('RETAILWALLETLIMIT' ,payload);
    this._router.navigate(
      [
        "wallet-space",
        "entry-shell",
        "wallet",
        "wallet-transaction-limits-form",
      ]);
      return {
        success: () => {
        },
        error: () => {
        }
      }
    }
 
  public override preSubmitInterceptor(payload: Walletregistration):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Walletregistration){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.walletregistration.tenantId.inventoryNumber,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
    }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

