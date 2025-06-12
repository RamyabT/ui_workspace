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
//import { ProcessShellService } from "src/app/process-shell/services/process-shell.service";
import { CobaddressinfoService } from '../cobaddressinfo-service/cobaddressinfo.service';
import { Cobaddressinfo } from '../cobaddressinfo-service/cobaddressinfo.model';

export class CorpAddressDetailsFormState extends BaseFpxComponentState {
 	showSuggestion : boolean = false;
}


@Injectable()
export class CorpAddressDetailsFormHelper extends BaseFpxFormHelper<CorpAddressDetailsFormState>{

   constructor( private corpAddressDetailsFormService: CobaddressinfoService,
   private _httpProvider : HttpProviderService,private _router: Router
   //private _processhell: ProcessShellService
   ) 
    {
        super(new CorpAddressDetailsFormState());
    }
   
  override doPreInit(): void {
 this.setServiceCode("");
// this._processhell.setServiceCode(this.serviceCode.value);
 }
   

  public override doPostInit(): void {
  
  }
  
 
  public override preSubmitInterceptor(payload: Cobaddressinfo):any {
     // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public override postSubmitInterceptor(response:any): RoutingInfo {
    console.log(response);
  return response;
   }
 //$START_CUSTOMSCRIPT\n
 //$END_CUSTOMSCRIPT\n
}
 
 
