import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomErrorMessageService } from '../error-message-service/custom-error-message.service';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpProviderService, HttpRequest } from '@fpx/core';
import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public direction: string = 'ltr';
  public isRtl: boolean = false;
  private _language: string = 'en';
  public appSpinner$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private translate : TranslateService,
    private errorMsgService: CustomErrorMessageService,
    private appConfig: AppConfigService,
    private httpProvider: HttpProviderService,
    private _device: DeviceDetectorService,
    private _spinnerDialog: SpinnerDialog,
  ) { }

  /**
   * 
   * @param language 
   */
  public switchLanguage(language : string) {
    this.translate.use(language);
    this._language = language;

    if(language == 'ar'){
      this.direction = 'rtl';
      this.isRtl = true;
    } else {
      this.direction = 'ltr';
      this.isRtl = false;
    }

    localStorage.setItem('lang', language);

    let htmlEl:any = document.getElementsByTagName('html')[0];
    htmlEl.setAttribute('dir', this.direction);
    
    let errorJsonPath = './assets/i18n/error_' + language.toLowerCase() + '.json';
    this.getErrorContent(language).subscribe({
      next: res => {
        if (res.uicontent.uiComponentContent) {
          this.errorMsgService.setErroMessage(JSON.parse(res.uicontent.uiComponentContent))
          this.visibleSpinner(false);
        }
        else{
          console.warn(`API load failed for ${language}, falling back to local file`, language);
          this.errorMsgService.setErrorJson(errorJsonPath)
          this.visibleSpinner(false);
        }
      },
      error: error => {
        console.warn(`API load failed for ${language}, falling back to local file`, language);
        this.errorMsgService.setErrorJson(errorJsonPath)
        this.visibleSpinner(false);
      }
    })
  }

  public getLabel(key:string): string{
    return this.translate.instant(key);
  }

  public getLanguage():string{
    return this._language.toUpperCase();
  }

  visibleSpinner(visible:boolean = true){
    if(this._device.isHybrid()){
      if(visible) this._spinnerDialog.show("", "", true);
      else this._spinnerDialog.hide();
    } else {
      this.appSpinner$.next(visible);
    }
  }

  getErrorContent(language:any): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setResource("/uicontent/{contentType}");
    httpRequest.addPathParameter('contentType', '2');
    httpRequest.addHeaderParamter('languageId',language.toLowerCase());
    httpRequest.addQueryParameter('tenantId',this.appConfig.getTenantId());
    httpRequest.addQueryParameter('applicationCode','DEPRETAIL');
    httpRequest.setMethod("GET");
    return this.httpProvider.invokeRestApi(httpRequest).pipe(
      map(
        (response:any) => {
          return response.body;
        },
        catchError((err: any) => {
          return throwError(err);
        })
      )
    );
  }
}
