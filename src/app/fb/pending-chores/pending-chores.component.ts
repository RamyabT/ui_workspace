import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
 
@Component({
  selector: 'app-pending-chores',
  templateUrl: './pending-chores.component.html',
  styleUrls: ['./pending-chores.component.scss']
})
export class PendingChoresComponent implements OnInit {
@Input('cardData') cardData!: any;
childName: any;

     constructor(
    public appConfig: AppConfigService,
    protected _device: DeviceDetectorService
   ) {
     }
  
    ngOnInit(): void {
 
        if(this.cardData?.debitAccNo.accountName){
          this.childName = this.cardData?.debitAccNo.accountName;
        }else{
          if(this.cardData?.childNickName){
            this.childName = this.cardData?.childNickName
          }else{
            this.childName = this.cardData?.childFullName
          }
        }
      }

}
