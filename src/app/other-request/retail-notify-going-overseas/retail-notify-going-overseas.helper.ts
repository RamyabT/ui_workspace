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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { NotifygoingoverseasService } from '../notifygoingoverseas-service/notifygoingoverseas.service';
import { Notifygoingoverseas } from '../notifygoingoverseas-service/notifygoingoverseas.model';
import moment from "moment";
import { AppConfigService } from "@dep/services";

export class notifygoingoverseasState extends BaseFpxComponentState {
      private _appConfig: AppConfigService = inject(AppConfigService);
  
  showSuggestion: boolean = false;
  tenantId:string ="";
  inventoryNumber:string ="";
  depatureDate: any = {
    minDate: "",
    maxDate: "",
  }
  arivalDate: any = {
    minDate: "",
    maxDate: "",
  }

  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  

}


@Injectable()
export class notifygoingoverseasHelper extends BaseFpxFormHelper<notifygoingoverseasState> {

  constructor(private notifygoingoverseasService: NotifygoingoverseasService, private _httpProvider: HttpProviderService, private _router: Router,     private _appConfig: AppConfigService,
) {
    
    super(new notifygoingoverseasState());
  }

  override doPreInit(): void {
     this.addValueChangeHandler(
      "termsFlag",
      this.handleAcknowledgementOnvalueChange
    ); 
  
   this.addValueChangeHandler(
      "depatureDate",  // Add a change handler for departure date
      this.handleDepartureDate
    );
    this.setServiceCode("RETAILNOTIFYGOINGOVERSEAS");
  }

  public handleArrivalDate: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
     if (!this.validateDates(this.getValue('depatureDate'), value)) {
      this.setErrors('arivalDate', "arrival_err");
    }
  
  };

 public handleAcknowledgementOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == "N") {
        this.setValue("termsFlag", null);
      }
    }
  };
   public handleDepartureDate: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(this.getFormMode())
    if(this.getFormMode()=="ADD"){
    this.reset('arivalDate',formGroup);
    }

  }; 

  public override doPostInit(): void { 
      this.addValueChangeHandler(
      "arivalDate",
      this.handleArrivalDate
    );
    let currentDate = moment().format("YYYY-MM-DD");
    this.state.depatureDate.minDate = currentDate
    this.state.arivalDate.minDate = currentDate
    this.state.depatureDate.minDate = new Date().toISOString().split('T')[0];
    this.state.arivalDate.minDate = new Date().toISOString().split('T')[0]; 
  }


  public override preSubmitInterceptor(payload: Notifygoingoverseas): any {
   
    return payload;
  }


  public override postDataFetchInterceptor(payload: Notifygoingoverseas) {
    return payload;
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo)
   
    return routingInfo;

  }
  
  	public handleFormOnPostsubmit(response: any, routingInfo: any) {
		if (response.success) {
			let res: any = response.success?.body?.notifygoingoverseas;
			routingInfo.setQueryParams({
				response: res
			});
		}
		else if (response.error) {
			let error: any = response.error.error;
			routingInfo.setQueryParams({
				response: error,
				serviceCode: this.serviceCode.value
			});
		}
		return response;
	}
  private validateDates(depatureDate: string, arivalDate: string): boolean {
   const currentDate = moment().format("YYYY-MM-DD");
  
  const departure = moment(depatureDate).format("YYYY-MM-DD");
  const arrival = moment(arivalDate).format("YYYY-MM-DD");
 
     return moment(arivalDate).format("MM-DD-YYYY") > moment(depatureDate).format("MM-DD-YYYY");
  }

}
