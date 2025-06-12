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

// import {  BalanceConfirmationDetailsService  } from '../BalanceConfirmationDetails-service/BalanceConfirmationDetails.service';


// 2. Component Selector
@Component({
selector: 'app-balance-confirmation-details-control',
templateUrl: './balance-confirmation-details-control.component.html',
styleUrls: ['./balance-confirmation-details-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => BalanceConfirmationDetailsComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class BalanceConfirmationDetailsComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	// ,private balanceConfirmationDetailsService: BalanceConfirmationDetailsService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['inventoryNumber','detailNo']);
	// this.setDataSource(this.balanceConfirmationDetailsService);
	} 
	
	// 8. End
}