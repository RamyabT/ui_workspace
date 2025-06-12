// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent, CriteriaQuery } from '@fpx/core';
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
import { ValidatorService } from '@fpx/core';

import {  BenedomesticService  } from '../benedomestic-service/benedomestic.service';
import { Benedomestic } from '../benedomestic-service/benedomestic.model';
import { DomesticBeneListHelper } from './domestic-bene-list.helper';


// 2. Component Selector
@Component({
selector: 'app-domestic-bene-list',
templateUrl: './domestic-bene-list.component.html',
styleUrls: ['./domestic-bene-list.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => DomesticBeneListComponent),
multi: true,
},
DomesticBeneListHelper
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class DomesticBeneListComponent extends BaseFpxControlComponent {
	controlBusy:boolean = true;
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private benedomesticService: BenedomesticService
  ,private _validatorService:ValidatorService,
  protected _domesticBeneListHelper: DomesticBeneListHelper
	) {
	super(controlContainer,changeDetectorRef);
	}
	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
		this.setNgTemplateName('beneListTmplt');
	this.setHelper(this._domesticBeneListHelper)
    this.addPKList(['inventoryNumber']);
	// this.setDataSource(this.benedomesticService);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this.benedomesticService,this.formControlName,this.attributesMap));
	} 
	
	public override doPostInit(): void {
		this.controlBusy = false;
		let criteriaQuery =  new CriteriaQuery();
        this.benedomesticService.findAll()().subscribe({
            next:(beneList: any)=> {
                beneList.data.map((item: Benedomestic) => item.id = item.inventoryNumber);
				this.setSelectableData(of(beneList.data));
				if(beneList.data.length==0){
					this.controlBusy = false;  
				}
				else{
					if (!this.formControl?.parent?.get('beneficiaryId')?.value && beneList.data.length == 1) {
						setTimeout(() => {
							this.formControl.setValue(beneList.data[0].inventoryNumber, {emitEvent: true});
						});
					}
					this.controlBusy = false;
				}
            },
            error:(err)=> {
				this.controlBusy = false;  
            },
        })
	}
	// 8. End
}