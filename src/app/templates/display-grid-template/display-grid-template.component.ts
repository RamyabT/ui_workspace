import { Component, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { LanguageService } from '@dep/services';
import { BaseFpxTemplateProjection } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';

@Component({
  selector: 'display-grid-template',
  templateUrl: './display-grid-template.component.html',
  providers: [CasatransactiondtlsService]
})
export class DisplayGridTemplateComponent extends BaseFpxTemplateProjection {
  protected appConsatance:any = APPCONSTANTS;

  constructor(
    private _casaTransactionService:CasatransactiondtlsService,
    private _languageService: LanguageService
  ) { 
    super();
  }
  override doPreInit(): void {
    this.setTemplateType('displayGrid');
  }

  viewCheque(data:any){
    data.doViewCheque = true;
    if(!data.chequeImage){
      this._casaTransactionService.fetchChequeImage(data).subscribe({
        next: (res) => {
          data.chequeImage = res;
        }
      });
    }
  }
  hideCheque(data:any){
    data.doViewCheque = false;
  }

  getBillerCatDesc(selectedData:any):string{
    let lang = this._languageService?.getLanguage()?.toUpperCase();
    let desc = selectedData?.shortDescriptionI18n?.find((item:any) => item.langCode == lang);
    return desc?.shortName || selectedData?.shortDescription;
  }

}
