// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';
import {
  of,
} from 'rxjs';
import { ValidatorService } from '@fpx/core';
import { LoanListTemplateControlHelper } from './loan-list-template-control.helper';
import { LoansService } from '../../loans/loans-service/loans.service';
import { Loans } from '../../loans/loans-service/loans.model';



// 2. Component Selector
@Component({
selector: 'app-loan-list-template-control',
templateUrl: './loan-list-template-control.component.html',
styleUrls: ['./loan-list-template-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LoanListTemplateControlComponent),
multi: true,
},
LoanListTemplateControlHelper
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LoanListTemplateControlComponent extends BaseFpxControlComponent {
	//4.  Constructor
	constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
	,private _loansService: LoansService
  ,private _validatorService:ValidatorService,
  protected _loanListTemplateControlHelper: LoanListTemplateControlHelper
	) {
	super(controlContainer,changeDetectorRef);
	}

	@Output() dataReceived:EventEmitter <any> = new EventEmitter<  any|null>();
	// event methods
	override doPreInit(): void {
		this.setHelper(this._loanListTemplateControlHelper)
	   
    this.addPKList(['accountNumber']);
    this.addAsyncValidatorFn(this._validatorService.findByKeyUtility(this.commonControlEvent,this._loansService,this.formControlName,this.attributesMap));
	} 

	public override doPostInit(): void {
		this._loansService.findAll()().subscribe({
            next:(loans:Loans[])=> {
                loans.map((item) => item.id = item.loanAccountNumber);
		        this.setSelectableData(of(loans));
				setTimeout(() => {
					this.formControl.setValue(loans[0].loanAccountNumber, {emitEvent: true});
				});
            },
            error:(err)=> {
                
            },
        })
	}
}