// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


   import {  ApplicantGenderDropdownControlService  }  from './applicant-gender-dropdown-control.service';
	

// 2. Component Selector
@Component({
selector: 'app-applicant-gender-dropdown-control',
templateUrl: './applicant-gender-dropdown-control.component.html',
styleUrls: ['./applicant-gender-dropdown-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => ApplicantGenderDropdownControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class ApplicantGenderDropdownControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	   ,private applicantGenderDropdownControlService: ApplicantGenderDropdownControlService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	   this.setDataSource(this.applicantGenderDropdownControlService);

	} 
	
	// 8. End
}