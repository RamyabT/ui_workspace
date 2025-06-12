import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { PfmSummaryService } from 'src/app/pfm/pfm-summary-service/pfm-summary.service';

@Component({
  selector: 'app-pfm-space-container',
  templateUrl: './pfm-space-container.component.html',
  styleUrls: ['./pfm-space-container.component.scss']
})
export class PfmSpaceContainerComponent implements OnInit {
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;

  protected moduleHeaderTop: number = 0;
  protected networthData: any;
  budgetSummary: any;
  goalSummary: any;
  summary: any = [];
  pfmspends: any;

  constructor(
    protected _device: DeviceDetectorService,
    public pfmSummaryService: PfmSummaryService,
    private _appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.pfmSummaryService.fetchPortfolioSummary().subscribe({
      next: (res: any) => {

        let goalProgress: any = Math.ceil((res.data.goals.totalSavedAmount / res.data.goals.totalGoalAmount) * 100);

        if (res?.data?.budget?.totalBudget) {
          let budgetProgress: any = Math.ceil((res.data.budget.onTrack / res.data.budget.totalBudget) * 100);
          this.budgetSummary = {
            title: 'Budget',
            progress: budgetProgress,
            target: res.data.budget.totalBudget,
            achieved: res.data.budget.onTrack,
            actions: [
              {
                id: 'RETAILPFMTRACKBUDGET',
                desc: 'Track Budget'
              },
              {
                id: 'RETAILPFMADDBUDGET',
                desc: 'Add Budget'
              }
            ]
          };
        } else {
          this.budgetSummary = { type: 'budget' };
        }

        if (res?.data?.goals?.totalGoalAmount) {
          let goalProgress: any = Math.ceil((res.data.goals.totalSavedAmount / res.data.goals.totalGoalAmount) * 100);
          this.goalSummary = {
            title: 'Goal',
            progress: goalProgress,
            target: res.data.goals.totalGoalAmount,
            achieved: res.data.goals.totalSavedAmount,
            actions: [
              {
                id: 'RETAILPFMTRACKGOAL',
                desc: 'Track Goal'
              },
              {
                id: 'RETAILPFMADDGOAL',
                desc: 'Add Goal'
              }
            ]
          }
        } else {
          this.goalSummary = { type: 'goal' };
        }

        this.summary.push(this.budgetSummary);
        this.summary.push(this.goalSummary);

        this._appConfig.setData('pfmCardSummary', this.summary);
      }
    });

    let pfmActionPublisher$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('pfmActionPublisher$', {
      "observable": pfmActionPublisher$.asObservable(),
      "subject": pfmActionPublisher$
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });
  }

}
