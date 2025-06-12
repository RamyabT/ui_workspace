import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { CustomLanguageService } from './custom-language.service';

export class CustomTranslateLoader implements TranslateLoader {
    constructor(private customLanguageService: CustomLanguageService) { }

    getTranslation(lang: string): Observable<any> {
        return this.customLanguageService.getTranslations(lang);
    }
}

export function createTranslateLoader(customLanguageService: CustomLanguageService) {
    return new CustomTranslateLoader(customLanguageService);
}