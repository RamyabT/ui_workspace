// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  IsFavouriteControlService  }  from './is-favourite-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-is-favourite-control',
templateUrl: './is-favourite-control.component.html',
styleUrls: ['./is-favourite-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => IsFavouriteControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class IsFavouriteControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private isFavouriteControlService: IsFavouriteControlService
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() textPosition: any = "after"; 
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.isFavouriteControlService);

	} 
	
	// 8. End
}