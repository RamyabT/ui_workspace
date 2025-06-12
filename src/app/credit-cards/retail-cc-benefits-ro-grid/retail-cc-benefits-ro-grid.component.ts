import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import {ccBenefitsInfoHelper } from './retail-cc-benefits-ro-grid.helper';
import { CcBenefitsInfo } from '../ccRewardBenefits-service/ccRewardBenefits.model';

@Component({
 selector: 'app-retail-cc-benefits-ro-grid',
  templateUrl: './retail-cc-benefits-ro-grid.component.html',
  styleUrls: ['./retail-cc-benefits-ro-grid.component.scss'],
   providers : [ ccBenefitsInfoHelper]
 })
export class ccBenefitsInfoComponent extends BaseFpxROGridComponent< CcBenefitsInfo, ccBenefitsInfoHelper> {
 constructor(
    protected ccBenefitsInfoHelper: ccBenefitsInfoHelper,
  ) {
    super(ccBenefitsInfoHelper);
  }
                               
  protected override doPreInit(): void {
    this.setGridHeaders(['ccBenefitsInfo.benefitDescription.label','ccBenefitsInfo.benefitId.label']);
    this.setGridIdentifiers(['benefitDescription','benefitId']);
    this.setGridColumnTypes(['String','String']);
    this.setGridTitle('ccBenefitsInfo.title');
  }
}
