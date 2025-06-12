import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality } from '@fpx/core';

@Component({
  selector: 'app-finance-summary-board',
  templateUrl: './finance-summary-board.component.html',
  styleUrls: ['./finance-summary-board.component.scss']
})
export class financeSummaryBoardComponent extends BaseFpxFunctionality implements OnInit {
  @Input('cardData') cardData!: any;
  @Output() cardEventHandler: EventEmitter<any> = new EventEmitter();

  strokeDashoffset: any;
  progress: string = '';
  constructor(
    private _router: Router,
    public appConfig: AppConfigService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.setProgress(this.cardData.progress);
    setTimeout(()=>{
      this.setProgress(this.cardData.progress)
    },2000)
  }
  setProgress(percent: any) {
    const circumference = 2 * Math.PI * 40; // Circumference of the circle (r=40)

    const offset: any = circumference - (percent / 100) * circumference;
    this.strokeDashoffset = offset; // Adjust stroke offset
    // this.progress = percent + "%"; // Update text
  }
  takeAction(id: any) {
    let servicePath: any = this.appConfig.getServiceDetails(id).servicePath;
    this._router.navigate(servicePath);
  }

  createSummary($event:any){
    this.cardEventHandler.emit({
      name: 'create',
      data: {
        type: $event
      }
    });
  }

}
