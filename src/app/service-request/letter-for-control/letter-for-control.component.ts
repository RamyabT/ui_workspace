// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  letterForService  }  from './letter-for-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-letter-for-control',
templateUrl: './letter-for-control.component.html',
styleUrls: ['./letter-for-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => letterForComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class letterForComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private letterForService: letterForService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.letterForService);

	} 
	
	// 8. End
}