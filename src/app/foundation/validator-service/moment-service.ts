import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ErrorFormat, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import * as moment from "moment";



@Injectable({
    providedIn: 'root'
})
export class MomentService {
    constructor() { }
    getInstance(dateTime: string = "") {
        let m;
        if(dateTime) m = moment(dateTime);
        else m = moment();
        return m;
    }
}