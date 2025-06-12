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
  FpxModalAfterClosed
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { LinkinvestmentreqService } from '../linkinvestmentreq-service/linkinvestmentreq.service';
import { Linkinvestmentreq } from '../linkinvestmentreq-service/linkinvestmentreq.model';
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { DatePipe, formatDate } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { MatDialogRef } from "@angular/material/dialog";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
export class LinkInvestmentReqFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
	dob:any={
	   minDate:"",
       maxDate:"",
     }
     formGroup:FormGroup | undefined;
     reviewMode: boolean = false;

}


@Injectable()
export class LinkInvestmentReqFormHelper extends BaseFpxFormHelper<LinkInvestmentReqFormState>{

   showAvisoMobDetails: boolean = false;
  showQtradeMobDetails: boolean = false;
   isDisabled: boolean=true;
   constructor( private linkInvestmentReqFormService: LinkinvestmentreqService, private _httpProvider : HttpProviderService,private _router: Router,
     private _appConfig:AppConfigService,
    private userService:CustomerService,
    public _device: DeviceDetectorService,
    private _dialogRef: MatDialogRef<any>
    
   ) 
    {
        super(new LinkInvestmentReqFormState());
    }
   
override doPreInit(): void {
 this.setServiceCode("RETAILLINKINVESTMENT");
 let linkAccount = this.getRoutingParam('linkAccount');
 if(this._appConfig.getData('AvisoMobDtl')){
  this.showAvisoMobDetails =true;
  this.showQtradeMobDetails=false;
 }
 else if(this._appConfig.getData('QtradeMobDtl')){
  this.showAvisoMobDetails =false;
  this.showQtradeMobDetails=true;
 }
//  let refreshAvisoMobDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//     this._appConfig.setData('refreshAvisoMobDtl$', {
//       "observable": refreshAvisoMobDtl$.asObservable(),
//       "subject": refreshAvisoMobDtl$
//     });

    // let refreshQtradeMobDtl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    // this._appConfig.setData('refreshQtradeMobDtl$', {
    //   "observable": refreshQtradeMobDtl$.asObservable(),
    //   "subject": refreshQtradeMobDtl$
    // });


    // if (this._appConfig.hasData('refreshAvisoMobDtl$')) {
    //   this._appConfig.getData('refreshAvisoMobDtl$').observable.subscribe(
    //     (res: any) => {
    //       console.log("refreshAvisoMobDtl", res);
    //       this.showAvisoMobDetails = res?.refreshAvisoMobDtl ? true : false;
    //     })
    // }


    
    // if (this._appConfig.hasData('refreshQtradeMobDtl$')) {
    //   this._appConfig.getData('refreshQtradeMobDtl$').observable.subscribe(
    //     (res: any) => {
    //       console.log("refreshQtradeMobDtl", res);
    //       this.showQtradeMobDetails = res?.refreshQtradeMobDtl ? true : false;
    //     })
    // }

   
 this.removeShellBtn('RESET');
 }

 public handleFormOnLoad(){
   let linkAccount = this.getRoutingParam('linkAccount');
  this.userService
  .fetchCustomer(sessionStorage.getItem('customerCode'))
  .subscribe((res) => {
        if (res) {
          const datePipe = new DatePipe('en-US');
          console.log("customer data:", res);
          this.setValue('linkAccount', linkAccount);
          this.setValue('lastName', res.lastName);
          // this.setValue('dob', res.DOB);
          this.setValue('dob',datePipe.transform(res.DOB,'yyyy-MM-dd'));
          
          let date:any=datePipe.transform(res.DOB,'yyyy-MM-dd')
          console.log("datePipe.transform",datePipe.transform(res.DOB,'yyyy-MM-dd'))
          console.log("formatDate(res.DOB, 'yyyy-MMM-dd', 'en-US')",formatDate(res.DOB, 'yyyy-MMM-dd', 'en-US'))
          this.setValue('postalCode', res.addresses[0].pincode);

        }})

  this.setDisabled('linkAccount',true);   
   this.setReadonly('linkAccount',true); 
  this.setReadonly('lastName',false);
  this.setReadonly('postalCode',false);
  this.setReadonly('dob',true);
 }
   

  public override doPostInit(): void {
  this.handleFormOnLoad();
  }

   override onReview(): void {
    this.state.reviewMode = true;
    this.isDisabled =false;
    
  }

    override backToEntryMode(): void {
    this.state.reviewMode = false;
    this.isDisabled =true;
  }
  
 
  public override preSubmitInterceptor(payload: Linkinvestmentreq):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: Linkinvestmentreq){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}

public handleFormOnPostsubmit(response: any, routingInfo: any) {
  // WRITE CODE HERE TO HANDLE
  if (response.success) {
    let res = response.success?.body?.linkinvestmentreq;
    routingInfo.setQueryParams({
      response: res
    });
  } else if (response.error) {
    let error = response.error.error;
    routingInfo.setQueryParams({
      response: error,
      serviceCode: this.serviceCode.value
    });
  }
  return response;
}


public override postSubmitInterceptor(response: any): RoutingInfo {
  console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
  this.handleFormOnPostsubmit(response, routingInfo);
  return routingInfo;
}
  
onPopup()
{
  if (this._device.isMobile()) {
        let modal = new FpxModal();
        modal.setComponent(DepTooltipComponent);
        modal.setPanelClass("dep-tooltip-popup");
        modal.setDisableClose(false);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: "LinkInvestmentReqForm.dateOfBirthTooltip.title",
          message: "LinkInvestmentReqForm.dateOfBirthTooltip.message",
  
        });
        this.openModal(modal);
      }
      else{
        let modal = new FpxModal();
        modal.setComponent(DepAlertComponent);
        modal.setPanelClass("dep-alert-popup");
        modal.setBackDropClass(["etransfer-send-limits"]);
        modal.setDisableClose(false);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: "LinkInvestmentReqForm.dateOfBirthTooltip.title",
          message: "LinkInvestmentReqForm.dateOfBirthTooltip.message",
          okBtnLbl: "Close"
        });
        this.openModal(modal);
      }
  
}

contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close(0);
  }
  // public override postSubmitInterceptor(response:any): RoutingInfo {
  //  console.log(response);
  // let routingInfo: RoutingInfo = new RoutingInfo();
  //   routingInfo.setNavigationURL("confirmation");
  //   if (response.success) {
  //     routingInfo.setQueryParams({
  //      transRef: response.success?.body?.linkinvestmentreq.tenantId.clientNumber,
  //      //transRef: response.success?.body?.linkinvestmentreq,
  //       status: "success",
  //     });
  //   } else if (response.error) {
  //     routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage,status: "failed" });
  //   }
  //   return routingInfo;
  // }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

