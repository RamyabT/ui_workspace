// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


	

// 2. Component Selector
@Component({
selector: 'app-pep-declaration-control',
templateUrl: './pep-declaration-control.component.html',
styleUrls: ['./pep-declaration-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => PepDeclarationComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class PepDeclarationComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	) {
	super(controlContainer,changeDetectorRef);
	}

   @Input() textPosition: any = "after"; 
	// event methods
	override doPreInit(): void {

	} 
	
	// 8. End
}