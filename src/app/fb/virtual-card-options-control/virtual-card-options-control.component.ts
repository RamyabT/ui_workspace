// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { virtualCardOptionsControlHelper } from './virtual-card-options-control.helper';
import { BannerAdsService } from 'src/app/foundation/banner-ads/banner-ads.service';

// import {  ChequebookleavesService  } from '../chequebookleaves-service/chequebookleaves.service';


// 2. Component Selector
@Component({
selector: 'app-virtual-card-options-control',
templateUrl: './virtual-card-options-control.component.html',
styleUrls: ['./virtual-card-options-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => virtualCardOptionsControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class virtualCardOptionsControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
		private _virtualCardOptionsControlHelper:virtualCardOptionsControlHelper,
		private _BannerAdsService:BannerAdsService
	// ,private chequebookleavesService: ChequebookleavesService
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {
	      this.setHelper(this._virtualCardOptionsControlHelper)
	   
    this.addPKList(['id','code']);
	// this.setDataSource(this.chequebookleavesService);
	} 
	protected override doPostInit(): void {
		// let data:any = {
        //     serviceCode : "RETAILCHILDPAYMENT" 
        // }
        //  this._BannerAdsService.fetchBannerAds(data).subscribe({
        //     next: (response) => {
        //       console.log("responce",response);
		// 	  let cardList:any=response;
		// 	  cardList.map((item:any) =>{
		// 		item.id = item.contentId;
		// 		item.text=item.contentId;
		// 		item.image=item.image;
		// 		item.title=item.title;
		// 	  }
		// 	);
		// 		this.setSelectableData(of(cardList))
        //     }
        //   });
	}
	
	// 8. End
}