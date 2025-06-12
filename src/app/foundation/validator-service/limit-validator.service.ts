import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CasaaccountService } from "../casaaccount-service/casaaccount.service";
import { BaseFpxDataService, IHttpErrorPayload } from "@fpx/core";

@Injectable({providedIn:'root'})
export class LimitValidatorService {
    constructor(){
    }

    limitValidator(
        eventEmitter: EventEmitter<{
          eventName: string;
          payload: any;
        }>,
      ): AsyncValidatorFn {
        console.warn('Limit validator Begins');
        return (
          control: AbstractControl
        ):
          | Promise<ValidationErrors | null>
          | Observable<ValidationErrors | null> => {
            const payload = {
              fieldValue : control.value
            }
            console.log("Control Value ", control.get.name)
            if(control.value) {
              eventEmitter.emit({'eventName':'limitDataReceived','payload':{'limitAmount':15000}})
              return of(null);
            }
            else {
              eventEmitter.emit({'eventName':'limitDataReceived','payload':null})
              return of({'limit_error':true})
            }
        };
      }
}
