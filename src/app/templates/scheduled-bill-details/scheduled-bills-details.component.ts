import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Renderer2,
} from "@angular/core";
import { PanningService } from "src/app/dep/services/panning.service";
import { FpxModal, FpxModalAfterClosed } from "@fpx/core";
import { DepPanningComponent } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { DepAlertComponent } from 'src/app/dep/core/component/dep-alert/dep-alert.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';
import moment from 'moment';


declare let $: any;

@Component({
  selector: "app-scheduled-bills-details",
  templateUrl: "./scheduled-bills-details.component.html",
  styleUrls: ["./scheduled-bills-details.component.scss"],
})
export class ScheduledBillDetailsComponent extends DepPanningComponent {

  scheduleBillDetails: any = [
    {
      title: "Payee",
      value: "",
      showLabel: true
    },
    {
      title: "Account number",
      value: "",
      showLabel: true
    },
    {
      title: "Pay from",
      value: "",
      showLabel: true
    },
    {
      title: "Amount",
      value: "",
      showLabel: true
    }, {
      title: "Payment date",
      value: "",
      showLabel: true
    },
    {
      title: "Recurring",
      value: "",
      showLabel: false
    }, {
      title: "Ends after",
      value: "",
      showLabel: false
    },
    {
      title: "Ends on",
      value: "",
      showLabel: false
    }
  ]

  constructor(
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private panningService: PanningService,
    private appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public _dialogData: any,
  ) {
    super(renderer2, changeDetectorRef, panningService);
  }

  public override doPreInit(): void {
    console.log(this._dialogData)

    this.scheduleBillDetails[0].value = this._dialogData.data.beneficiaryName;
    this.scheduleBillDetails[1].value = this._dialogData.data.creditAccountNumber;
    this.scheduleBillDetails[2].value = this._dialogData.data.sourceAccount;
    this.scheduleBillDetails[3].value = this._dialogData.data.paymentAmount;
    this.scheduleBillDetails[4].value = this.formatDate(this._dialogData.data.paymentDate, 'd MMM yyyy');
    if (this._dialogData.data.scheduleType === '3') {
      this.scheduleBillDetails[5].value = this._dialogData.data.paymentFrequency;
      this.scheduleBillDetails[5].showLabel = true;
      this.scheduleBillDetails[6].value = this._dialogData.data.numberOfPayments;
      this.scheduleBillDetails[6].showLabel = true;
    } else {
      this.scheduleBillDetails[5].showLabel = false;
      this.scheduleBillDetails[6].showLabel = false;
    }
    this.scheduleBillDetails[7].value = this.formatDate(this._dialogData.data.paymentEndDate, 'd MMM yyyy');
    console.log(this._dialogData)
  }

  formatDate(date: string, format: string) {
    console.log(date)
    console.log(moment(date).format(format))
    return moment(date).format(format);
  }

  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    console.log(payload)
    console.log(payload)
    if (payload == 1) {
      if (this.appConfig.hasData('scheduledBillRefresh$')) {
        this.appConfig.getData('scheduledBillRefresh$').subject.next({ payload: this._dialogData.data, deleteRequest: 1 });
      }
      this.close();
    }
  }

  editPopup(selectedData: any) {
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepAlertComponent);
    fpxModal.setDisableClose(true);
    fpxModal.setPanelClass('dep-alert-popup');
    fpxModal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop"]);
    fpxModal.setData({
      title: "Scheduled Bill cannot be edited on the payment date",
      confirmationIcon: "warning"
    });
    fpxModal.setAfterClosed(this.editPopupModelAfterClose);
    this.openModal(fpxModal);
  }

  editPopupModelAfterClose: FpxModalAfterClosed = (payload) => {
  }

  close() {
    this._dialogRef.close();
  }


  deleteBill() {
    // $event.stopPropagation();
    this.appConfig.setData('setScheduleData', this._dialogData.data)
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop', 'delete-bill-backdrop', 'bottom-transparent-overlay', 'delete-scheduled-bill-backdrop']);
    modal.setDisableClose(true);
    modal.setData({
      title: "Delete your scheduled bill to" + " " + this._dialogData.data?.beneficiaryName + "?",
      // message: "DeleteBillerPopup.message",
      okBtnLbl: "DeleteScheduledBillPopup.okBtnLbl",
      cancelBtnLbl: "DeleteScheduledBillPopup.cancelBtnLbl",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }

}

