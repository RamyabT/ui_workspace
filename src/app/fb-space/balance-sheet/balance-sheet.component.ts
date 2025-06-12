import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfigService } from '@dep/services';
 import { CommonService } from 'src/app/foundation/validator-service/common-service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {
   @Input('cardData') cardData!: any;
  
  protected totalbalance:any;
  protected seekingResponse: boolean = false;
 
  constructor(
     private _commonService: CommonService,
      public _appConfig : AppConfigService
  ) { 

 
  }

  ngOnInit(): void {

 
  }


  
  ngAfterViewInit() {
    setTimeout(() => {
    if(this.cardData){
      this.seekingResponse = true;
    }
  },500)

  }

}
