import { Component, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, CriteriaQuery, FpxActionMap } from '@fpx/core';
import { CasatransactiondtlsService } from 'src/app/accounts/casatransactiondtls-service/casatransactiondtls.service';
// import { TransferSummaryFormComponentHelper, TransferSummaryFormComponentState } from './transfer-summary-form.helper';
// import { RetailFilterTransactionHelper } from '../retail-filter-transaction-form/retail-filter-transaction-form.helper';
// import { retailDownloadTransactionFormHelper } from '../retail-download-transaction-form/retail-download-transaction-form.helper';
import { RetailTransactionManagementFormComponentHelper, RetailTransactionManagementFormComponentState } from './retail-transaction-management-form.helper';
import { Subject } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-retail-transaction-management-form',
  templateUrl: './retail-transaction-management-form.component.html',
  styleUrls: ['./retail-transaction-management-form.component.scss'],
  providers: [
    RetailTransactionManagementFormComponentHelper,
    CasatransactiondtlsService
  ]
})
export class RetailTransactionManagementForm extends BaseFpxFormComponent<RetailTransactionManagementFormComponentHelper,RetailTransactionManagementFormComponentState> {
  protected activeTabIndex: number = 0;
  completedGridInput!: { name: string; data: any; };
  pendingGridInput!: { name: string; data: any; };
  approvedGridInput!: { name: string; data: any; };
  approvedGridInputActionMap$: Subject<FpxActionMap> = new Subject();
  pendingGridInputActionMap$: Subject<FpxActionMap> = new Subject();
  completedGridInputActionMap$: Subject<FpxActionMap> = new Subject();

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    
    public _retailTransactionManagementFormComponentHelper: RetailTransactionManagementFormComponentHelper,
    // public retailFilterTransactionHelper:RetailFilterTransactionHelper,
    // public _retailDownloadTransactionFormHelper:retailDownloadTransactionFormHelper
  ) { 
    super(formBuilder, router,controlContainer, _retailTransactionManagementFormComponentHelper);
    this.setServiceCode("RETAILTRANMANAGEMENT");
  }

  override doPreInit(){
    this.addElement('approvedTransMgmtGrid');
    this.addElement('pendingTransMgmtGrid');
    this.addElement('completedTransMgmtGrid');
  }
  override ngAfterViewInit(): void {
    this.getapprovedTranSummary();
  }

  getapprovedTranSummary() {
    const criteriaQuery = new CriteriaQuery();
    let monthstart = moment().startOf('month').format("YYYY-MM-DD");
    let currDate = moment().add(1, 'd').format("YYYY-MM-DD");

    // criteriaQuery.addFilterCritertia("initiationDate", "Timestamp", "inRange", {
    //   dateFrom: monthstart,
    //   dateTo: currDate
    // });
   // criteriaQuery.addFilterCritertia("status", "String", "equals", { searchText: 'O' });
   
    //this.s
    this.approvedGridInputActionMap$.next({
      action: 'SETGRIDCRITERIA',
      'nestedControl': '',
      'value': criteriaQuery,
      'rowIndex': undefined
    })
  }

  onTabChanged($event:any){

  }
}
