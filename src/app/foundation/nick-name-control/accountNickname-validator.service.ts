import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of, pipe } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { NickNameControlComponent } from "./nick-name-control.component";
import { AccountnicknameMaintanence } from "src/app/accounts/accountnickname-service/accountnickname.model";
import { state } from "@angular/animations";
import { off } from "hammerjs";

@Injectable()
export class accountNicknameValidator {
  private _appconfig: any;
  constructor(
    private _httpProvider: HttpProviderService) {
  }

  accountNicknameValidation(

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

      let accountNickname = control.value;
      let currentNickname: any;
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/accountnickname');
      const httpCriteria = new CriteriaQuery();
      httpCriteria.addFilterCritertia('nickName', 'String', 'equals', {
        searchText: accountNickname,
      });
      httpRequest.setCriteriaQuery(httpCriteria);
      httpRequest.setContextPath('Accounts');
      currentNickname = nameMap.get('currentNickname');
      
      if (!accountNickname){
        return of(null);
      }

      if (currentNickname) {
        if (currentNickname == accountNickname) {
          return of({ 'nickname_exists_error': true });
        }
      } 
      
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(
          map((res: IHttpSuccessPayload<any>) => {
            // if (res.body?.accountnickname != null) {
            //   if (res.body?.accountnickname[0].nickName != accountNickname) {
            //     return { 'nickname_exists_error': true };
            //   }
            //   else {
            //     return { 'nickname_exists_error': false };
            //   }
            // }
            eventEmitter.emit({
              eventName: 'accountNickNameReceived',
              payload: {
                'nickName': NickNameControlComponent
              }

            });
            return null;
          }),
          catchError((err: IHttpErrorPayload) => {
            let error: any = {};
            error['nickname_fetch_error'] = true;
            return of(error);
          })
        );
    }
  };
}
