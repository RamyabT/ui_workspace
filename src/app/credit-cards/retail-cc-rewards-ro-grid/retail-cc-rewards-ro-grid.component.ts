import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { ccRewardsInfoHelper } from './retail-cc-rewards-ro-grid.helper';
import { CcRewardsInfo } from '../ccRewardBenefits-service/ccRewardBenefits.model';

@Component({
  selector: 'app-retail-cc-rewards-ro-grid',
  templateUrl: './retail-cc-rewards-ro-grid.component.html',
  styleUrls: ['./retail-cc-rewards-ro-grid.component.scss'],
  providers: [ccRewardsInfoHelper]
})

export class ccRewardsInfoComponent extends BaseFpxROGridComponent<CcRewardsInfo, ccRewardsInfoHelper> {
  constructor(
    protected ccRewardsInfoHelper: ccRewardsInfoHelper,
  ) {
    super(ccRewardsInfoHelper);
  }

  protected override doPreInit(): void {
    this.setGridHeaders(['ccRewardsInfo.rewardDescription.label', 'ccRewardsInfo.rewardId.label']);
    this.setGridIdentifiers(['rewardId', 'rewardDescription']);
    this.setGridColumnTypes(['String', 'String']);
    this.setGridTitle('ccRewardsInfo.title');
  }
}
