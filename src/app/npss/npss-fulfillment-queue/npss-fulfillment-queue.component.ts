import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import { DepPanningComponent } from 'src/app/dep/core/component/dep-panning.component';
import { PanningService } from 'src/app/dep/services/panning.service';
import { TransferService } from 'src/app/foundation/validator-service/transfers-service';


@Component({
  selector: 'app-npss-fulfillment-queue',
  templateUrl: './npss-fulfillment-queue.component.html',
  styleUrls: ['./npss-fulfillment-queue.component.scss']
})
export class NPSSFulfillmentQueueComponent extends DepPanningComponent implements OnInit {
  items: any[] = [];
  requestReference: any



  @Input('slidesStore') slidesStore: any;

  slideConfig: any = {
    slidesToShow: 1.1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: false,
  }
  constructor(private _transferService: TransferService,
    private _appconfigService: AppConfigService,
    private router: Router,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private appConfigService: AppConfigService
  ) {

    super(renderer2, changeDetectorRef, panningService);

  }

  override ngOnInit(): void {
    this._transferService
      .fetchRequestQueue()
      .subscribe(res => {
        console.log(res);
        this.items = res
      })

  }

  adAction(adData: any) {
  }
  actionOnDecline(item: any) {

    console.log('Decline');
    this.requestReference = item.requestToPayID;

    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      title: "Confirm",
      message: "Do you want to decline the request ?",
      okBtnLbl: "Yes",
      cancelBtnLbl: "No"
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
    let debitAccountDetails = this.appConfigService.getData('npssDetails');
    let recipientMobile=debitAccountDetails.customerDetails.mobileNumber
    if (payload == 1) {
      this._transferService
        .fetchDeclineQueue(this.requestReference,recipientMobile)
        .subscribe(res => {
        })
      this._transferService
        .fetchRequestQueue()
        .subscribe(res => {
          console.log(res);
          this.items = res
        })

    }
    this.doReverseAction();
  }
  actionOnPay(item: any) {
    console.log('Pay');
    console.log('payload', item)
    let payload={
      firstName:item?.senderName,
      lastName:item?.senderSurname,
      mobileNumber:item?.senderMobile,
      transactionAmount:item?.totalAmount,
      currency:item?.currency,
      senderIban:item?.senderIban,
      accountNumber:item?.recipientIban,
      iban:item?.senderIban,
      requestToPayID:item?.requestToPayID
    }
    this._appconfigService.setData('npssSendMoney', payload);

    let service = this._appconfigService.getServiceDetails("RETAILNPSSSENDMONEY");
    setTimeout(() => {
      this.router.navigate(service.servicePath, {
      });
    });


  }

}