import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
   import { FbMemberGoalsRoGridHelper } from './fb-member-goals-ro-grid.helper';
 import { FbSummaryService } from '../fb-summary-service/fb-summary.service';
import { Goallog } from '../goallog-service/goallog.model';
import { FbgoalserviceService } from '../fb-goal-service/fbgoalservice.service';
import { GoalsService } from '../goals-service/goals.service';

@Component({
  selector: 'app-fb-member-goals-ro-grid',
  templateUrl: './fb-member-goals-ro-grid.component.html',
  styleUrls: ['./fb-member-goals-ro-grid.component.scss'],
   providers : [ FbMemberGoalsRoGridHelper]
 })
export class FbMemberGoalsRoGridComponent extends BaseFpxROGridComponent< Goallog, FbMemberGoalsRoGridHelper> {
 constructor(
    protected retailFbGoalsRoGridHelper: FbMemberGoalsRoGridHelper,
    protected fbgoalsService: GoalsService
  ) {
    super(retailFbGoalsRoGridHelper);
  }
                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailFbGoalsRoGrid.goalName.label','RetailFbGoalsRoGrid.targetAmt.label','RetailFbGoalsRoGrid.contributionAmount.label','RetailFbGoalsRoGrid.childAcc.label','RetailFbGoalsRoGrid.debitAcc.label']);
    this.setGridIdentifiers(['SELECT','goalName','targetAmt','contributionAmount','childAcc','debitAcc' ]);
    this.setGridColumnTypes(['Checkbox','String','String','String','String']);
    this.addGridDataService(this.fbgoalsService);
    this.setGridTitle('RetailPfmGoalsRoGrid.title');
  }
}
