import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepositsContextualMenuComponent } from '../deposits-contextual-menu/deposits-contextual-menu.component';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { Deposits } from '../deposits-service/deposits.model';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DepositsService } from '../deposits-service/deposits.service';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-dep-investment-summary-card',
  templateUrl: './dep-investment-summary-card.component.html',
  styleUrls: ['./dep-investment-summary-card.component.scss']
})
export class DepInvestmentSummaryCardComponent extends BaseFpxFunctionality implements OnInit {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
  @Input('contextmenuBtn') contextmenuBtn:boolean = false;
  @Input('cardData') cardData!: Deposits;
   protected accountType: string = ''
   protected security: any

  constructor(
    private _commonService: CommonService,
    private _depService:DepositsService,
    protected device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    public _appconfig: AppConfigService
  ) {
    super();
  }

  ngOnInit(): void {
    this.security=this.cardData;
  }
  ngAfterViewInit(){
    this.security=this.cardData;
  }

  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(DepositsContextualMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.cardData
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

//   dataShare(){
//     this._depService.shareAccountInfo(this.cardData);
//  }

//  getServiceRestriction(accountNumber: string) {
//    this._commonService.fetchServiceRestriction(accountNumber).subscribe({
//      next: (res) => {
//        console.log("fetchServiceRestriction: ", res);
//        this._commonService.casaServiceRestriction.set(accountNumber, res);
//      },
//      error: (reason) => {
//        console.log("fetch service restriction error");
//      }
//    });
//  }

getAbsoluteValue(value: number | undefined): number {
  return value ? Math.abs(value) : 0;
}

checkNegativeValue(value: number | undefined): string {
  return value && value < 0 ? '-' : '';
}

}
