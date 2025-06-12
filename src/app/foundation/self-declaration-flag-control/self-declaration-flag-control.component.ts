// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  SelfDeclarationFlagService  }  from './self-declaration-flag-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-self-declaration-flag-control',
templateUrl: './self-declaration-flag-control.component.html',
styleUrls: ['./self-declaration-flag-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => SelfDeclarationFlagComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class SelfDeclarationFlagComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private selfDeclarationFlagService: SelfDeclarationFlagService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.selfDeclarationFlagService);

	} 
	
	// 8. End
}