import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from '@dep/services';
import { BaseFpxFunctionality } from '@fpx/core';

@Component({
  selector: 'app-budget-product-card',
  templateUrl: './budget-product-card.component.html',
  styleUrls: ['./budget-product-card.component.scss']
})
export class BudgetProductCardComponent extends BaseFpxFunctionality implements OnInit {
  @Input('cardData') cardData!: any;
  strokeDashoffset: any;
  progress: string='';
  constructor(
     private _router: Router,
     public appConfig: AppConfigService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.setProgress(this.cardData.progress);
  }
  setProgress(percent:any) {
    const circumference = 2 * Math.PI * 40; // Circumference of the circle (r=40)

    const offset:any = circumference - (percent / 100) * circumference;
    this.strokeDashoffset = offset; // Adjust stroke offset
    // this.progress = percent + "%"; // Update text
  }
  takeAction(id:any){
    let servicePath:any = this.appConfig.getServiceDetails(id).servicePath;
      this._router.navigate(servicePath);
  }

}
