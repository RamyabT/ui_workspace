import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { Casaaccount } from "../casaaccount-service/casaaccount.model";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CasaaccountService } from "../casaaccount-service/casaaccount.service";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { CustomerService } from "./customer.service";

@Injectable()
export class CustomerValidatorService {
  constructor(
    private _service: CustomerService,
    private _httpProvider: HttpProviderService) {

  }
  //   getControlName(c: AbstractControl): string | null {
  //     const formGroup = c.parent?.controls;
  //     return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  // }
  fetchCustomer(eventEmitter: EventEmitter<{
    eventName: string;
    payload: any | null;
  }>
  ): AsyncValidatorFn {
    console.warn('Customer Details Validator Begins');
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {

      let deliveryOption = control.value;
      if (deliveryOption) {
        if (deliveryOption == '1' || deliveryOption == '3') {
          eventEmitter.emit({
            eventName: 'onCustomerDetailsDataReceived',
            payload: null,
          });
          return of(null);
        }

        else {
          const httpRequest = new HttpRequest();
          httpRequest.setResource("/customer");
          httpRequest.setMethod("GET");
          httpRequest.setContextPath('Customers');
      httpRequest.addHeaderParamter('serviceCode','RETAILCUSTOMERDETAILS');
          return this._httpProvider
            .invokeRestApi(httpRequest)
            .pipe(map((res: any) => res.body?.customer ?? null))
            .pipe(map((response: any) => {
              for (let i = 0; i < response.addresses.length; i++) {
                response.addresses = response.addresses[i];
              }
              let communicationInfo :any={}
              communicationInfo=response.addresses;
              if (communicationInfo.addressType == '111' || communicationInfo.addressType == '1') {
                console.log("communication",communicationInfo);
                
                communicationInfo.emailId =response.emailId;
                communicationInfo.mobileNumber = response.mobileNumber;
                eventEmitter.emit({
                  eventName: "onCustomerDetailsDataReceived",
                  payload: communicationInfo
                });
              }

              return null;
            }),
              catchError((err: any) => {
                let error: any = {};
                // error[err.error.errorCode] = true;

                error['Invalid_Customer_Code'] = true;
                // this.changeDetectorRef.markForCheck(); 
                return of(error);
              })
            )
        }
      }
      else {
        return of(null);
      }
    }
  }

}

