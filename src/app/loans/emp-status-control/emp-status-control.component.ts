// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { EmpStatusListControlService } from './emp-status-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-emp-status-control',
templateUrl: './emp-status-control.component.html',
styleUrls: ['./emp-status-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => EmpStatusControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmpStatusControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private EmpStatusControlService: EmpStatusListControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.EmpStatusControlService);

	} 
	
	// 8. End
}