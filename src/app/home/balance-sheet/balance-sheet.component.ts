import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@dep/services';
import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {
  showContent: boolean = true;

  constructor(private _commonService: CommonService,
  public appConfigService: AppConfigService) { }
  balanceSheet: any;

  ngOnInit(): void {
    
    this._commonService.fetchNetworth().subscribe({
      next: (res) => {
        this.balanceSheet = res;
      },
      error: (error) => {
        console.log("fetch networth issue");
      }
    })
  }

  ngAfterViewInit(){
    if (this.appConfigService.hasData('overviewHeaderActionPublisher$')) {
      this.appConfigService.getData('overviewHeaderActionPublisher$').observable.subscribe(
        (res: any) => {
          if(res?.action == "TOGGLEPRIVACY"){
            this.togglePrivacy();
          }
        }
      )}
  }
  togglePrivacy(){
   this.showContent=!this.showContent;
  }

}
