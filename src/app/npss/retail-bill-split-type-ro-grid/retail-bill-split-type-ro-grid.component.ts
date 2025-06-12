import { Component, Input } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { RetailBillSplitTypeROGRIDHelper } from './retail-bill-split-type-ro-grid.helper';

@Component({
 selector: 'app-retail-bill-split-type-ro-grid',
  templateUrl: './retail-bill-split-type-ro-grid.component.html',
  styleUrls: ['./retail-bill-split-type-ro-grid.component.scss'],
   providers : [ RetailBillSplitTypeROGRIDHelper]
 })
export class RetailBillSplitTypeROGRIDComponent extends BaseFpxROGridComponent< RetailBillSplitTypeROGRIDHelper, RetailBillSplitTypeROGRIDHelper> {
  @Input() splitType: string = '0';
 constructor(
    protected retailBillSplitTypeROGRIDHelper: RetailBillSplitTypeROGRIDHelper,
  ) {
    super(retailBillSplitTypeROGRIDHelper);
  }
                               
  protected override doPreInit(): void {
 
  }
}
