// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import { CityService } from 'src/app/foundation/city-service/city.service';


	

// 2. Component Selector
@Component({
selector: 'app-city-dropdown-control',
templateUrl: './city-dropdown-control.component.html',
styleUrls: ['./city-dropdown-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => CityDropdownControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class CityDropdownControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef,
		private cityService:CityService
	) {
	super(controlContainer,changeDetectorRef);
	}

	// event methods
	override doPreInit(): void {

	this.addPKList(['countryCode','stateCode']);
	this.setDataSource(this.cityService);
	this.addDependencies(['countryCode','stateCode']);

	} 
	
	// 8. End
}