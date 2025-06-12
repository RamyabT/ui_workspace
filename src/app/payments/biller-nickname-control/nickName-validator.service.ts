import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { BilleraccountMaintanence } from "../billeraccount-service/billeraccount.model";
import { BillerNickNameControlComponent } from "./biller-nickname-control.component";



@Injectable()
export class BillerNicknameValidator {
  onloadNickName!:string;
  constructor(
    private _httpProvider: HttpProviderService) {
  }
  nickNameValidation(

    eventEmitter: EventEmitter<{
      eventName: string;
      payload: any;
    }>,
    nameMap: Map<string, string>
  ): AsyncValidatorFn {
    console.warn('Nickname validation begins');

    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {

      console.log('Nickname checked is', control.value);
      let formMode = nameMap.get('formMode')
      if (formMode == 'D' || !control?.value || (formMode == 'M' || this.onloadNickName )) {
          this.onloadNickName  = control.value;
          
          return of(null);
      }
      else {

        let nickName = control.value;
        console.log('nickName', nickName);
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('BillPayments');
        httpRequest.setMethod('GET');
        httpRequest.setResource('/billeraccount');
        const httpCriteria = new CriteriaQuery();
        httpCriteria.addFilterCritertia('nickName', 'String', 'equals', {
          searchText: nickName,
        });
        httpCriteria.addFilterCritertia('status', 'String', 'equals', {
          searchText: 'A',
        });
        httpRequest.setCriteriaQuery(httpCriteria);
        return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(
            map((res: IHttpSuccessPayload<BilleraccountMaintanence>) => {
              console.log(res);
              if (res.body?.billeraccount != null) {
                console.log(res);
                console.log("NickName");
                return { 'biller_nickname_exists_error': true };
              }
              eventEmitter.emit({
                eventName: 'nickNameReceived',
                payload: {
                  'nickName': BillerNickNameControlComponent
                }

              });
              return null;
            }),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;

              error['nickname_fetch_error'] = true;
              // this.changeDetectorRef.markForCheck(); 
              return of(error);
            })
          );
      }
    }

  };
}
