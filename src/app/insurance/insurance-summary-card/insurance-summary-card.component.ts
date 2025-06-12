import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareInfo } from '@dep/native';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { TranslateService } from '@ngx-translate/core';
import { CasaContextMenuComponent } from 'src/app/accounts/casa-context-menu/casa-context-menu.component';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';
import { CasaaccountService } from 'src/app/foundation/casaaccount-service/casaaccount.service';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { insurance,insuranceSummary } from '../insurance-summary-service/insurancesummary.model';
import { InsurancesummaryService } from '../insurance-summary-service/insurancesummary.service';
import { DeviceDetectorService } from '@dep/core';
import { InsuranceContextMenuComponent } from '../insurance-context-menu/insurance-context-menu.component';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-insurance-summary-card',
  templateUrl: './insurance-summary-card.component.html',
  styleUrls: ['./insurance-summary-card.component.scss']
})
 
export class InsuranceSummaryCardComponent extends BaseFpxFunctionality implements OnInit {
  @Input() insuranceItem: any;
@Input() index!: number;
@Input() isToggled: boolean = false;
@Input() isChecked: boolean = false;
@Output() toggleRequested = new EventEmitter<number>();
@Output('onInsuranceReceived') onInsuranceReceived: EventEmitter<insuranceSummary> = new EventEmitter();
@Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any|null>();
@Input('contextmenuBtn') contextmenuBtn:boolean = false;
@Input() context: 'container' | 'form' = 'container';
toggleActions: boolean = false;
  policySelected: any;
  selectedProduct: string = "HOME";
  currentProduct!: insuranceSummary;

  constructor(
    protected translate: TranslateService,
    public device: DeviceDetectorService,
    private _shareInfo:ShareInfo,
    private router: Router,
    private appConfig : AppConfigService,
    private _insuranceSummaryService: InsurancesummaryService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onToggle(): void {
    this.toggleRequested.emit(this.index);
  }
  
  notifyContextMenuClick(){
    this.contextmenu.emit();
    let modal = new FpxModal();
    modal.setComponent(InsuranceContextMenuComponent);
    modal.setPanelClass('context-menu-popup');
    modal.setDisableClose(false);
    modal.setData({
      cardData: this.insuranceItem
    });
    modal.setAfterClosed(this.contextmenuModelAfterClose);
    this.openModal(modal);
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...");
  }

  dataShare(){
    let accountInfo: string = 
    "Account Number: " + this.insuranceItem.insuranceId + "\n" +
    "Account Holder Name: " + this.insuranceItem.firstName + "\n" +
    "Account Type: " + this.insuranceItem.insuranceProductType + "\n" +
    "IBAN: " + this.insuranceItem.iban + "\n" +
    "SWIFT/BIC Code: " + (this.insuranceItem.BICCode==null || this.insuranceItem.BICCode== undefined?"" :this.insuranceItem.BICCode);
    this._shareInfo.shareInfo(accountInfo, this.translate.instant('CASASUMMARYCARD.shareSuccess'));
  }

  onSelectCard(){
    this.appConfig.setData('insuranceDetails',this.insuranceItem);
  }

  selectProduct(insuranceItem: insurance): void {
    this.refreshContainer(insuranceItem);    
    if(insuranceItem.productType == "Life"){
    this.selectedProduct = "LIFE";
    }else if(insuranceItem.productType == "Travel"){
      this.selectedProduct = "TRAVEL";
    }else if(insuranceItem.productType == "Vehicle"){
      this.selectedProduct = "VEHICLE";
    }else{
      this.selectedProduct = "HOME";
    }
    this._insuranceSummaryService.triggerContextMenu({
      insuranceId: insuranceItem.insuranceId,
      insuranceStatus: insuranceItem.status
    });
  }

  refreshContainer(_currentProduct: any) {  
      this.currentProduct = _currentProduct || [];
        this.onInsuranceReceived.emit(this.currentProduct);
        let serviceCode: any = 'RETAILINSURANCEDETAILS';
        let insuranceProductType = this.currentProduct.productType;
        this.appConfig.setData('insuranceId', this.currentProduct.insuranceId);
        if (this.appConfig.hasData('insuranceActionPublisher$')) {
          this.appConfig.getData('insuranceActionPublisher$').subject.next({ action: 'REFRESHCONTAINER', data: this.currentProduct, insuranceProductType: insuranceProductType });
        }
        serviceCode = 'RETAILINSURANCEDETAILS';
        let servicePath: any = this.appConfig.getServiceDetails(serviceCode).servicePath;
        this.router.navigate(servicePath);
      
    }


    ngOnDestroy() {
      // destory the insuranceActionPublisher
      if (this._insuranceSummaryService.insuranceActionPublisher$) {
        this._insuranceSummaryService.insuranceActionPublisher$?.unsubscribe();
      }
    }
  
  
}



