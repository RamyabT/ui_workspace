import { Component } from '@angular/core';
import { BaseFpxROGridComponent } from '@fpx/core';
import { FbSummaryService } from '../fb-summary-service/fb-summary.service';
  import { FbchoresdetailsService } from '../fb-chores-service/fbchoresdetails.service';
import { FbMemberChoresRoGridHelper } from './fb-member-chores-ro-grid.helper';
import { tasks } from '../fb-chores-service/fbchoresdetails.model';
import { TasksService } from '../tasks-service/tasks.service';
import { Tasks } from '../tasks-service/tasks.model';

@Component({
  selector: 'app-fb-member-chores-ro-grid',
  templateUrl: './fb-member-chores-ro-grid.component.html',
  styleUrls: ['./fb-member-chores-ro-grid.component.scss'],
   providers : [ FbMemberChoresRoGridHelper]
 })
export class FbMemberChoresRoGridComponent extends BaseFpxROGridComponent< Tasks, FbMemberChoresRoGridHelper> {
 constructor(
    protected retailFbGoalsRoGridHelper: FbMemberChoresRoGridHelper,
    protected fbchoresService: TasksService
  ) {
    super(retailFbGoalsRoGridHelper);
  }
                                                                               
  protected override doPreInit(): void {
    this.setGridHeaders(['SELECT','RetailFbGoalsRoGrid.taskName.label','RetailFbGoalsRoGrid.rewardAmount.label','RetailFbGoalsRoGrid.status.label']);
    this.setGridIdentifiers(['SELECT','taskName','rewardAmount','status' ]);
    this.setGridColumnTypes(['Checkbox','String','String']);
    this.addGridDataService(this.fbchoresService);
    this.setGridTitle('RetailPfmGoalsRoGrid.title');
  }
}
