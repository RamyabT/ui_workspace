import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 import { AppConfigService } from '@dep/services';
import { DeviceDetectorService } from '@dep/core';
import { Goallog } from '../goallog-service/goallog.model';

@Component({
  selector: 'app-member-goal-view-details',
  templateUrl: './member-goal-view-details.component.html',
  styleUrls: ['./member-goal-view-details.component.scss'],
 })
export class MemberGoalViewDetailsComponent implements OnInit {

  details!: any;
   completedMappedTask: any;
  totalTask: any ;
  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
     protected _appConfig: AppConfigService,
    private cd: ChangeDetectorRef,
    public device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    this.details = this._dialogData.transactionData as Goallog;
     this.cd.detectChanges();
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log("goalsViewDataata",this._appConfig.getData("choreGirdData"))
      this.totalTask = this._appConfig.getData("choreGirdData") ? this._appConfig.getData("choreGirdData").length : 0;
      let completedMappedTaskvalue = this._appConfig.getData("choreGirdData").filter((x:any)=> x.status == "C");
      this.completedMappedTask = completedMappedTaskvalue.length > 0 ? completedMappedTaskvalue.length : 0;
    }, 1000);

  }
  closePopup() {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this._appConfig.removeData('goalsViewDataata');
  }

}
