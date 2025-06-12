import { ChangeDetectorRef, Component, Renderer2 } from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FavouritePaymentsValidator } from "src/app/transfers/favouritePayments-validator.service";
import { FpxAppConfig, FpxModal, FpxModalAfterClosed, HttpProviderService, HttpRequest, IHttpSuccessPayload, ILookupResponse } from "@fpx/core";
import { TempScheduleRep } from "src/app/transfers/tempScheduleRep-service/tempScheduleRep.model";
import { FavpaymentsService } from "src/app/transfers/favpayments-service/favpayments.service";
import { Router } from "@angular/router";
import { DepPanningComponent, DeviceDetectorService } from "@dep/core";
import { map } from "rxjs";
import { FileOpenerService } from "@dep/native";

declare let $: any;

@Component({
  selector: "app-retail-bill-history-template",
  templateUrl: "./retail-bill-history-template.component.html",
  styleUrls: ["./retail-bill-history-template.component.scss"],
})
export class RetailBillHistoryTemplateComponent extends DepPanningComponent {
  constructor(
    public _appConfig:FpxAppConfig,
    private renderer2: Renderer2,
    private _fileOpener: FileOpenerService,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    private _httpProvider: HttpProviderService,
    protected _device: DeviceDetectorService,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    this.setLeftActionBtnCount(0);
    this.setRightActionBtnCount(1);
  }


  onClickViewDetail($event:any, selectedData: any) {
    $event.stopPropagation();
    let queryParams: any = {
      "tranRef": selectedData?.transferReference
    }
    let serviceCode=selectedData.serviceCode;

    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.path, {
      queryParams: {
        "serviceCode": "CORPSINGLEPAYMENT",
        action:'VIEW',
        ...service.queryParams,
        ...queryParams
      }
    });
   
  }


  download($event:any, selectedData: any) {
    $event.stopPropagation();
    this.showSpinner();
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/billreceipt');
    httpRequest.setContextPath('BillPayments');
    httpRequest.addQueryParameter('tranReference', selectedData?.transferReference);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILSINGLEBILLRECEIPT')
      this._httpProvider.invokeDownloadApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res;
        })
      ).subscribe((response:any) => {
        this.hideSpinner();


        if (this._device.isHybrid()) {
          this.hideSpinner();
          this._fileOpener.openPDF(
            response,
            "application/pdf",
            "PaymentReceipt.pdf"
          );
        } else {
          this.hideSpinner();
          let documentURL = URL.createObjectURL(
            new Blob([response?.body], { type: "application/pdf" })
          );
          const downloadLink = document.createElement("a");
          downloadLink.href = documentURL;
          const fileName = "PaymentReceipt.pdf";
          downloadLink.download = fileName;
          // downloadLink.click();
        }

      })


  }


}
