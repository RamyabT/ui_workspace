import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { reward } from 'src/app/rewards/rewards-detail-service/rewards-detail.model';
import { RewardsDetailService } from 'src/app/rewards/rewards-detail-service/rewards-detail.service';

@Component({
  selector: 'app-rewards-container',
  templateUrl: './rewards-container.component.html',
  styleUrls: ['./rewards-container.component.scss']
})
export class RewardsContainerComponent implements OnInit {
  protected moduleHeaderTop: number = 0;
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;
  amountvalue : string = '10.00';
  rewards: any;
  rewardbalance: any;

  constructor(protected _device: DeviceDetectorService , private _rewardservice : RewardsDetailService) { }

  ngOnInit(): void {
    this.rewardsDetail();
  }

    ngAfterViewInit() {
    setTimeout(() => {
      this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop);
    });
  }


  rewardsDetail(){
    this._rewardservice.findAll()().subscribe({
            next: (res: reward[]) => {
               this.rewards = res;
               this.rewardbalance = this.rewards.availableBalance;

        console.log("rewardsres",this.rewardbalance);

            },
            error: (err) => {
               console.error("child account fetch error");
            },
          });
  }

}
