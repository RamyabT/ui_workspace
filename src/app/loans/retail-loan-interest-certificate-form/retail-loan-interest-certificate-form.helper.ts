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
  FpxSubmitHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { LoaninterestcertificateService } from '../loaninterestcertificate-service/loaninterestcertificate.service';
import { Loaninterestcertificate } from '../loaninterestcertificate-service/loaninterestcertificate.model';
import moment from "moment";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
export class RetailLoanInterestCertificateFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  dateFrom: any = {
    minDate: "",
    maxDate: "",
  }
  dateTo: any = {
    minDate: "",
    maxDate: "",
  }
}


@Injectable()
export class RetailLoanInterestCertificateFormHelper extends BaseFpxFormHelper<RetailLoanInterestCertificateFormState> {
  private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService);
  constructor(private retailLoanInterestCertificateFormService: LoaninterestcertificateService, 
    private _httpProvider: HttpProviderService, private _router: Router,
    protected _device: DeviceDetectorService,) {
    super(new RetailLoanInterestCertificateFormState());
  }

  override doPreInit(): void {
    this.removeShellBtn('RESET');
    this.setServiceCode("RETAILLOANINTERESTCERTIFICATE");
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    let newDate = new Date()
    
    let date= moment(new Date(newDate.getFullYear(),0,1), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.state.dateTo.maxDate = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.state.dateFrom.minDate = moment(new Date(newDate.setFullYear(newDate.getFullYear() - 7)), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.state.dateFrom.maxDate =  moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
    this.setValue('dateFrom', date);
    this.setValue('dateTo', this.state.dateTo.maxDate);
  }

  public handleDateFromOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.state.dateTo.minDate = value;
    }
  }

  public handleDateToOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.state.dateFrom.maxDate = value;
    }
  }

 


  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.loanAccountNumber = this._activeSpaceInfoService.getAccountNumber();
  }

  public override doPostInit(): void {
    this.addValueChangeHandler("dateFrom", this.handleDateFromOnvalueChange);
    this.addValueChangeHandler("dateTo", this.handleDateToOnvalueChange);
    this.handleFormOnLoad();
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.loaninterestcertificate;
      
      routingInfo.setQueryParams({
        response:res
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

  public override preSubmitInterceptor(payload: Loaninterestcertificate): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Loaninterestcertificate) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n

}

