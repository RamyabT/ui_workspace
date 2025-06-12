import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ErrorFormat, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { Observable, catchError, map, of } from "rxjs";



@Injectable({
    providedIn:'root'
})
export class SettingsService{
  totalProfileDocCount = 2
  constructor(private _httpProvider: HttpProviderService) { }
  
}