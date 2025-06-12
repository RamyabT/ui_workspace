// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  PepDeclarationFlagService  }  from './pep-declaration-flag.service';
	

// 2. Component Selector
@Component({
selector: 'app-pep-declaration-flag',
templateUrl: './pep-declaration-flag.component.html',
styleUrls: ['./pep-declaration-flag.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PepDeclarationFlagComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PepDeclarationFlagComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private pepDeclarationFlagService: PepDeclarationFlagService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.pepDeclarationFlagService);

	} 
	
	// 8. End
}