import { Component, Input, OnInit } from '@angular/core';
import { APPCONSTANTS } from '@dep/constants';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality, FpxModal, HttpProviderService, HttpRequest } from '@fpx/core';
import moment from 'moment';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
import { ViewChequeImageComponent } from 'src/app/accounts/view-cheque-image/view-cheque-image.component';
import { Merchant, TranCat } from 'src/app/dep/services/app-config-service/app-config.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-view-tax-forms-tmplt',
  templateUrl: './view-tax-forms-tmplt.component.html',
  styleUrls: ['./view-tax-forms-tmplt.component.scss']
})
export class ViewTaxFormsTmpltComponent extends BaseFpxFunctionality implements OnInit {

  @Input('selectedData') selectedData: any;
  protected appConsatance: any = APPCONSTANTS;

  constructor(
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    private commonService: CommonService
  ) {
    super();
  }

  ngOnInit(): void {
  }
  getDateOfGen() {
    let date: any = moment(this.selectedData.dateOfGeneration).format('DD MMM YYYY');
    return date;
  }

  onDownloadClick() {
    this.commonService.downloadTaxForm(this.selectedData.fileReference).subscribe({
      next: (response: any) => {
        let documentURL = URL.createObjectURL(
          new Blob([response.body], { type: "application/pdf" })
        );
        const downloadLink = document.createElement("a");
        downloadLink.href = documentURL;
        const fileName = "Tax Form.pdf";
        downloadLink.download = fileName;
      }
    });
  }

}
