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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EmploymentInfoService } from '../employmentInfo-service/employmentInfo.service';
import { EmploymentInfo } from '../employmentInfo-service/employmentInfo.model';
export class employmentInfoState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class employmentInfoHelper extends BaseFpxFormHelper<employmentInfoState>{

   constructor( private employmentInfoService: EmploymentInfoService, private _httpProvider : HttpProviderService,private _router: Router) 
    {
        super(new employmentInfoState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("RETAILEMPLOYMENTINFO");
 
 }
   

  public override doPostInit(): void {
    this.addValueChangeHandler("employmentType", this.handleEmploymentTypeOnvalueChange);
    this.setHidden('addressdetail.homeOwnership',true);	
    this.setHidden('addressdetail.udf1',true);
    this.setHidden('addressdetail.udf2',true);
    this.setHidden('addressdetail.udf3',true);
    this.setHidden('natureofbus',true);
    this.setHidden('workingSince',true);
    this.setHidden('OperatingSince',true);
  }
  

  public handleEmploymentTypeOnvalueChange: BaseFpxChangeHandler = (
		name: string,
		status: FormControlStatus,
		value: any,
		formGroup: FormGroup
		) => {
		 // WRITE CODE HERE TO HANDLE 
		   //tool generated code based on Orchestration Instructions
    if(value == "E"){		   		 
      this.setHidden('OperatingSince',true);	 
      this.setHidden('workingSince',false);	
      this.setHidden('natureofbus',true);
    } else if(value == "S"){		   		 
      this.setHidden('workingSince',true);			   		 
      this.setHidden('OperatingSince',false);
      this.setHidden('natureofbus',false);
    } else if(value == "R"){		   		 
      this.setHidden('workingSince',true);			   		 
      this.setHidden('OperatingSince',true);
      this.setHidden('natureofbus',true);
    } else if(value == "D"){		   		 
      this.setHidden('workingSince',true);			   		 
      this.setHidden('OperatingSince',true);
      this.setHidden('natureofbus',true);
    }
}
 
  public override preSubmitInterceptor(payload: EmploymentInfo):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  
  
 public override postDataFetchInterceptor(payload: EmploymentInfo){
   // WRITE CODE HERE TO HANDLE 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
   console.log(response);
  let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.employmentInfo,
        transRef: response.success?.body?.employmentInfo.applicantId,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ 
        response: response.error.error,
        status: "failed" });
      }
    return routingInfo;
  }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 

