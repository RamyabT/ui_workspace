import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { FpxModal, FpxModalAfterClosed, FpxToastService, HttpProviderService, HttpRequest, IHttpSuccessPayload, RoutingInfo } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { PanningService } from 'src/app/dep/services/panning.service';
import { FavouritePaymentsValidator } from 'src/app/transfers/favouritePayments-validator.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { catchError, map, Observable, of } from 'rxjs';
import { EtransfersFavouritePaymentsValidator } from '../validators/etransfersFavouritePayments-validator.service';
import { EtransfercustomerService } from 'src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service';

@Component({
  selector: 'app-etransfer-scheduled-template',
  templateUrl: './etransfer-scheduled-template.component.html',
  styleUrls: ['./etransfer-scheduled-template.component.scss']
})
export class EtransferScheduledTemplateComponent extends DepPanningComponent implements OnInit {

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private _router: Router,
    protected _appConfig: AppConfigService,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService,
    private _etransferfavService: EtransfersFavouritePaymentsValidator,
    protected _device: DeviceDetectorService,
    private _httpProvider: HttpProviderService,
    private EtransfercustomerService: EtransfercustomerService
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }
  //  override ngOnInit(): void {
  // }
  public override doPreInit(): void {
    let leftActions = 2;
    let rightActions = 2;
    if(this.selectedData.serviceCode == 'ETRANSFERRECEIVEMONEY'){
      this.selectedData.paymentAmount = this.selectedData.creditAmount;
      if(!this.selectedData.beneficiaryName)
      this.selectedData.beneficiaryName=this.selectedData.contactName;
      leftActions = 0;
      rightActions = 0;
    } else if(this.selectedData.status == 'S' || this.selectedData.status == 'C') leftActions = 0;
    this.setLeftActionBtnCount(leftActions);
    this.setRightActionBtnCount(rightActions);
  }

  decodePaymentStatus(paymentStatus: string): string {
    const scheduleMap: { [key: string]: string } = {
      'I': 'Initiated',
      'P': 'Pending',
      'S': 'Accepted',
      'C': 'Accepted',
      'A':'Accepted',
      'D':'Decline'
    };
    return scheduleMap[paymentStatus] || this.selectedData?.paymentStatus;
  }
  onClickRepeat($event: any, selectedData: any) {
    $event.stopPropagation();
    let serviceCode = selectedData.serviceCode;
    let queryParam: any = {
      "paymentId": selectedData["paymentId"],
      "serviceCode": selectedData["serviceCode"],
      "mode": 'R'
    }
    let service = this._appConfig.getServiceDetails(serviceCode);
    this._router.navigate(service.servicePath, {
      queryParams: {
        paymentId: queryParam.paymentId,
        serviceCode: queryParam.serviceCode,
        mode: queryParam.mode,
      }
    });
  }
  onClickSendRemainder($event: any, selectedData: any) {
    $event.stopPropagation();
    let sendRemText = "Are you sure you want to set remainder for this transfer?";
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "Confirm",
      message: sendRemText
    });
    fpxModal.setAfterClosed(this.remainderPopUpAfterClose);
    this.openModal(fpxModal);
  }
  onClickDelete($event: any, selectedData: any) {

  }
  onClickFavourite($event: any, selectedData: Etransfer) {
    $event.stopPropagation();

    this.selectedData = selectedData;
    let doFavText = this.selectedData.isFavourite == '1' ? "Are you sure, you want to remove this transaction from Favourite Transfers?" : "Are you sure, you want to add this transaction as Favourite?";
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass('dep-popup-back-drop');
    fpxModal.setData({
      title: "Confirm",
      message: doFavText
    });
    fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(fpxModal);
  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let paymentId = this.selectedData.paymentId;
    let onFavTransfer!: Observable<any>;
    let doFav: boolean = false;

    if (payload == 0) {
      return;
    } 
    else if (payload == 1 && this.selectedData.isFavourite == '1') {
      onFavTransfer = this._etransferfavService.unMarkFavouritePayments(paymentId);
      doFav = false;
    }
    else if (payload == 1 && this.selectedData.isFavourite == '0') {
      onFavTransfer = this._etransferfavService.markFavouritePayments(paymentId);
      doFav = true;
    }
    if (onFavTransfer) {
      onFavTransfer.subscribe({
        next: (res: any) => {
          console.log("onFavETransfes Response: ", res);
          if (this._appConfig.hasData('etransfersUpdate$')) {
            this._appConfig.getData('etransfersUpdate$').subject.next({ event: 'fav-etransfer-change' });
            if (doFav) {
              this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.favTransfer.title"), this._translateService.instant("TOASTMESSAGES.favTransfer.message"), { duration: 1000 });
            } 
            else {
              this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.unFavTransfer.title"), this._translateService.instant("TOASTMESSAGES.unFavTransfer.message"), { duration: 1000 });
            }
            this.selectedData.isFavourite = (doFav) ? "1" : "0";
          }
        },
        error: (error: any) => {
          console.log("onFavTransfes Response error: ", error);
        }
      });
    }

    this.doReverseAction();
  }

  remainderPopUpAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let paymentId = this.selectedData.paymentId;
    let onSendRemainder!: Observable<any>;
    let serviceCode=this.selectedData.serviceCode;
    let body={
      paymentId:this.selectedData.paymentId,
      transferMode:this.selectedData.transferMode,
    }
    if (payload == 0) {
      return;
    } 
    else{
    

    onSendRemainder=this.EtransfercustomerService.sendRemainder(body)();
      

      if (onSendRemainder) {
        onSendRemainder.subscribe({
          next: (res: any) => {
            console.log(res);
            payload = res;
          }
        });
      }
      

    if(onSendRemainder){
      console.log(onSendRemainder)
      this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.sendRemainder.title"), this._translateService.instant("TOASTMESSAGES.sendRemainder.message"), { duration: 1000 });
    }

    
  }
  }


}
