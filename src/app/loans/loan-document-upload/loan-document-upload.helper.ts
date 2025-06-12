import { inject, Injectable } from "@angular/core";
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
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { ExpensesDetailsService } from '../expensesDetails-service/expensesDetails.service';
import { ExpensesDetails } from '../expensesDetails-service/expensesDetails.model';
import { EditLoanInfoFormFormComponent } from "../edit-loan-info-form/edit-loan-info-form.component";
import { ApplyloanService } from "../applyloan-service/applyloan.service";
import { AppConfigService } from "src/app/dep/services/app-config-service/app-config.service";
export class LoanDocumentUploadState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
    showSuggestion : boolean = false;
    profileImage: any = {
      minSize: "0",
      maxSize: "5000000",
      extensions: ".jpeg,.png,.pdf"
    }
    salarySlip: any = {
      isCurrEditable: false,
      CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
      initCurrency : this._appConfig.baseCurrency,
      amountInWords:false
    }
    bankStatement: any = {
      isCurrEditable: false,
      CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency}],
      initCurrency : this._appConfig.baseCurrency,
      amountInWords:false
    }
}


@Injectable()
export class LoanDocumentUploadHelper extends BaseFpxFormHelper<LoanDocumentUploadState>{
  coApplData: boolean = true;
  homeloanSeg: boolean = true;
  vehicleloanSeg: boolean = true;

   constructor(private _appConfig: AppConfigService, private expensesDetailsService: ExpensesDetailsService, private _httpProvider : HttpProviderService,private _router: Router,private applyloanService:ApplyloanService) 
    {
        super(new LoanDocumentUploadState());
        this.applyloanService.coApplicantsValue.subscribe( (x) => {
          console.log("coApplicantsValue",x);    
          this.coApplicantsUpload(x);
        });
    }
   
  override doPreInit(): void {
  let loanSegments = this._appConfig.getData("loanSegments");
  if(loanSegments == "H"){
    this.homeloanSeg = false;
  }
  else if(loanSegments == "V"){
    this.vehicleloanSeg = false;
  }
 }

//  edit() {
//      let modal = new FpxModal();
//      modal.setComponent(EditLoanInfoFormFormComponent);
//      modal.setPanelClass('dep-info-popup');
//      modal.setDisableClose(false);
//      modal.setData({
//        title: "Edit Loan Information"
//      });
//      modal.setAfterClosed(this.contextmenuModelAfterClose);
//      this.openModal(modal);
//    }
   
   contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("test",payload,addtionalData+"CAD");
    this.setValue("propCost",payload.propCost+"CAD");
    this.setValue("downPayment",payload.downPayment+"CAD");
    this.setValue("tenor",payload.tenor);
   }

   coApplicantsUpload(CoApp: any){
    if(CoApp>0){
      this.coApplData = false
    }
    else{
      this.coApplData = true
    }
    
    for(let i=0;i<CoApp;i++){
      // this.setValue("coApplicantfile[${i}].serialNumber", i-1);
      this.setValue(`coApplicantfile[${i}].serialNumber`, i);
      // this.setValue(`coApplicantfile[${i}].serialNumber`, i);
    }


    // CoApp.forEach((item: any, index: number) => {
    //   console.log("item", item, index);
    //   // this.setValue(`childreqnotification[${index}].detailSerial`, item.detailSerial);
    //   // this.setValue(`childreqnotification[${index}].notificationEnabled`, item.notificationEnabled === "0" ? false : true);
    // });
    
   }

  public override doPostInit(): void {
  }
  
 
  public override preSubmitInterceptor(payload: ExpensesDetails):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: ExpensesDetails){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        transRef: response.success?.body?.expensesDetails.tenantId.applicantId,
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
 

