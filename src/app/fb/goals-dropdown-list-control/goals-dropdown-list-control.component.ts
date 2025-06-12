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

import {  GoalsService  } from '../goals-service/goals.service';
import { Goals } from '../goals-service/goals.model';
import { AppConfigService } from '@dep/services';


// 2. Component Selector
@Component({
selector: 'app-goals-dropdown-list-control',
templateUrl: './goals-dropdown-list-control.component.html',
styleUrls: ['./goals-dropdown-list-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => GoalsDropDownListControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class GoalsDropDownListControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private goalsService: GoalsService, private _appConfig: AppConfigService
	) {
	super(controlContainer,changeDetectorRef);
	}
	// event methods
	override doPreInit(): void {
	      
	      
	   
    this.addPKList(['tenantId','customerCode','inventoryNumber']);
	this.setDataSource(this.goalsService);
	this.addDependencies(['childAccNo']);
	
	} 
	public override doPostInit(): void {
		// this.goalsService.fetchGoals(71200130602).subscribe({
		// 	next: (res: any) => {
		// 		let goalList:any=res?.childList;
		// 		goalList.map((item:any) =>{
		// 			item.id = item.goalname;
		// 			item.text=item.goalname;
		// 		}
		// 	);
				
		// 		this._appConfig.setData('goalList', goalList);
		// 		this.setSelectableData(of(goalList));
		// 	}
		// })
	}
	
	// 8. End
}