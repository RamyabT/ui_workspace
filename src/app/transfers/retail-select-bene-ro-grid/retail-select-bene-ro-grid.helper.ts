import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseFpxRoGridHelper,
  BaseFpxRoGridHandleAction,
  ToolBar,
  GridTransformFn,
  ToolGroup,
  Tools,
  HttpRequest,
  HttpProviderService,
  CriteriaQuery,
  FpxModal,
} from "@fpx/core";
import { SelectBeneTypeFormComponent } from '../select-bene-type-form/select-bene-type-form.component';
import { BeneSelect } from '../beneSelect-service/beneSelect.model';
import { BeneSelectService } from '../beneSelect-service/beneSelect.service';


@Injectable()
export class RetailSelectBeneRoGridHelper extends BaseFpxRoGridHelper {
  constructor(private _router: Router,
    private _httpProvider: HttpProviderService,
    private beneSelectService: BeneSelectService,
    private cd: ChangeDetectorRef) {
    super();
    this.addHandleActions('onclick', this.retailSelectBeneRoGridView);
    this.addHandleActions('modify', this.retailSelectBeneRoGridModify);
    this.addHandleActions('add', this.retailSelectBeneRoGridEntry);
  }

  public getGridColumnWidth(): number[] {
    return [3, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400];
  }

  override getToolBar(): ToolBar[] {
    let toolBar: ToolBar[] = [];
    toolBar.push({ type: 'icon', key: 'add', name: 'add', hoverText: 'Add ' });
    toolBar.push({ type: 'icon', key: 'edit', name: 'modify', hoverText: 'Modify ' });
    toolBar.push({ type: 'icon', key: 'refresh', name: 'refresh', hoverText: 'Refresh' });
    return toolBar;
  }

  public override getSortSearch(): Map<string, 'sort' | 'search' | 'sort&search' | undefined> {
    let _isSortSearch: Map<string, 'sort' | 'search' | 'sort&search' | undefined> = new Map();
    _isSortSearch.set('serviceCode', "sort&search");
    _isSortSearch.set('scheduleType', "sort&search");
    _isSortSearch.set('paymentAmount', "sort&search");
    _isSortSearch.set('sourceAccount', "sort&search");
    _isSortSearch.set('creditAccountNumber', "sort&search");
    _isSortSearch.set('beneficiaryName', "sort&search");
    _isSortSearch.set('nextPaymentDate', "sort&search");
    _isSortSearch.set('paymentFrequency', "sort&search");
    _isSortSearch.set('numberOfPayments', "sort&search");
    _isSortSearch.set('paymentStatus', "sort&search");
    _isSortSearch.set('paymentDate', "sort&search");
    _isSortSearch.set('paymentId', "sort&search");
    return _isSortSearch;
  }

  private retailSelectBeneRoGridView: BaseFpxRoGridHandleAction = (
    name: string,
    data: BeneSelect
  ) => {
    //WRITE YOUR CODE HERE 
    this._router.navigate(['transfers-space', 'entry-shell', 'transfers', data.beneficiaryName])
  };
  private retailSelectBeneRoGridModify: BaseFpxRoGridHandleAction = (
    name: string,
    data: BeneSelect
  ) => {
    //WRITE YOUR CODE HERE 
  };
  private retailSelectBeneRoGridEntry: BaseFpxRoGridHandleAction = (
    name: string,
    data: BeneSelect
  ) => {
    //WRITE YOUR CODE HERE 
  };

  public override getTransformMap(): Map<string, GridTransformFn<any>> {
    let transformMap: Map<string, GridTransformFn<any>> = new Map();
    return transformMap;

  }

  public override getGridWidth(): number {
    return 100;
  }

  override doPreInit(): void {
    this.setNgTemplateName('beneTypeListTmplt');
    this.setNgTemplateClass('bene-type-list-tmplt');
  }


  override doPostInit(): void {
    
  }

}




