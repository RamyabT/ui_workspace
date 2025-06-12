import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpProviderService, HttpRequest } from "@fpx/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { catchError, map, Observable, of } from "rxjs";
import { AppConfigService } from "../app-config-service/app-config.service";

@Injectable({
    providedIn: 'root'
})
export class CustomLanguageService {
    private fallbackLoader: TranslateHttpLoader;

    constructor(
        private httpProvider: HttpProviderService,
        private http: HttpClient,
        private appConfig: AppConfigService,
    ) {
        this.fallbackLoader = new TranslateHttpLoader(http, './assets/i18n/', '.json');
    }

    getTranslations(lang: string): Observable<any> {
        if(!this.appConfig.getTenantId()){
            return this.fallbackLoader.getTranslation(lang);
        }
        
        const httpRequest: HttpRequest = new HttpRequest();
        httpRequest.setResource("/uicontent/{contentType}");
        httpRequest.addPathParameter('contentType', '1');
        httpRequest.addHeaderParamter('languageId', lang.toLowerCase());
        httpRequest.addQueryParameter('tenantId',this.appConfig.getTenantId());
        httpRequest.addQueryParameter('applicationCode', 'DEPRETAIL');
        httpRequest.setMethod("GET");
        return this.httpProvider.invokeRestApi(httpRequest).pipe(
            map((res: any) => {
                let langJSON: any = JSON.parse(res?.body?.uicontent?.uiComponentContent);
                return langJSON || this.fallbackLoader.getTranslation(lang);
            }),
            catchError((error: any) => {
                return this.fallbackLoader.getTranslation(lang);
            })
        );
    }

}