import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseFpxFunctionality } from '@fpx/core';
import { InsuranceAdsService } from './insurance-ads.service';

@Component({
  selector: 'app-insurance-ads',
  templateUrl: './insurance-ads.component.html',
  styleUrls: ['./insurance-ads.component.scss']
})
export class InsuranceAdsComponent extends BaseFpxFunctionality implements OnInit {

  @Output('contextmenu') contextmenu: EventEmitter<any> = new EventEmitter<any | null>();
  @Input('contextmenuBtn') contextmenuBtn: boolean = false;

  @Input() insuranceType!: string;
  @Input() size: 'small' | 'large' | 'default' = 'large';


  insuranceData: any = null;

  constructor(
    private _insuranceAdsService: InsuranceAdsService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.insuranceType) {
      this.loadInsuranceContent(this.insuranceType);
    }
  }

  loadInsuranceContent(type: string): void {
    const payload = {
      servicePath: this.getServicePathByType(type),
      serviceCode: this.getServiceCodeByType(type)
    };

    this._insuranceAdsService.fetchInsuranceAds(payload).subscribe(
      (res: any[]) => {
        this.insuranceData = {
          title: this.getTitleByType(type),
          points: res
        };
      },
      (err) => {
        console.error('Error fetching insurance ads:', err);
      }
    );
  }

  getServicePathByType(type: string): string {
    const mapping: { [key: string]: string } = {
      vehicle: 'vehicleProductInfo',
      home: 'homeProductInfo',
      life: 'lifeProductInfo',
      travel: 'travelProductInfo'
    };
    return mapping[type] || '';
  }

  getServiceCodeByType(type: string): string {
    const mapping: { [key: string]: string } = {
      vehicle: 'VEHICLEINSTYPE',
      home: 'HOMEINSTYPE',
      life: 'LIFEINSTYPE',
      travel: 'TRAVELINSTYPE'
    };
    return mapping[type] || '';
  }

  getTitleByType(type: string): string {
    return `${type.charAt(0).toUpperCase() + type.slice(1)} Insurance`;
  }
  
}
