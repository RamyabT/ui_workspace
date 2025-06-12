// 1. Import Statements
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,  forwardRef,  Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Validators, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';


    

// 2. Component Selector
@Component({
selector: 'app-link-account-control',
templateUrl: './link-account-control.component.html',
styleUrls: ['./link-account-control.component.scss'],
providers: [
{
provide: NG_VALUE_ACCESSOR,
useExisting: forwardRef(() => LinkAccountControlComponent),
multi: true,
}
],
changeDetection : ChangeDetectionStrategy.OnPush
})
export class LinkAccountControlComponent extends BaseFpxControlComponent {
    //4.  Constructor
    constructor(private controlContainer: ControlContainer,changeDetectorRef:ChangeDetectorRef
    ) {
    super(controlContainer,changeDetectorRef);
    }
    protected  readonly maxLength : any = "8";
    protected  readonly minLength : any = "3";
    protected  readonly pattern : any = /^[A-Za-z0-9*\s{1}]{3,8}$/;
    // event methods
    override doPreInit(): void {
        this.addSyncValidatorFn(Validators.maxLength(this.maxLength));
        this.addSyncValidatorFn(Validators.minLength(this.minLength));
        this.addSyncValidatorFn(Validators.pattern(this.pattern)); 

    } 
    
    // 8. End
}