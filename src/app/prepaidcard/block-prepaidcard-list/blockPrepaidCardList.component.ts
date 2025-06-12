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

import {  BlockPrepaidCardListService  } from '../blockPrepaidCardList-service/blockPrepaidCardList.service';


// 2. Component Selector
@Component({
selector: 'app-blockPrepaidCardList',
templateUrl: './blockPrepaidCardList.component.html',
styleUrls: ['./blockPrepaidCardList.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => blockPrepaidCardListComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class blockPrepaidCardListComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private blockPrepaidCardListService: BlockPrepaidCardListService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	   
    this.addPKList(['customerCode','cardRef']);
	this.setDataSource(this.blockPrepaidCardListService);
	} 
	
	// 8. End
}