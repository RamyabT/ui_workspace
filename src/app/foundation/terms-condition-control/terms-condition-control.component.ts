import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { BaseFpxControlComponent } from '@fpx/core';

@Component({
  selector: 'app-terms-condition-control',
  templateUrl: './terms-condition-control.component.html',
  styleUrls: ['./terms-condition-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TermsConditionControlComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsConditionControlComponent extends BaseFpxControlComponent {

  @ContentChild("content") content: ElementRef | undefined;
  @Input() textPosition: any = "after";
  @Output("emitOpenDocument") emitOpenDocument: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected disabled: boolean = false;
  isChecked: boolean = false;

  constructor(private controlContainer: ControlContainer, changeDetectorRef: ChangeDetectorRef,
    private _changeDetectorRef: ChangeDetectorRef) {
    super(controlContainer, changeDetectorRef);
  }

  protected override doPreInit(): void {
    this.formControl.addValidators([Validators.min(1), Validators.max(1)]);
  }

  onCheckBoxChange($event: { checked: any; }) {
    if ($event.checked) {
      this.formControl.setValue('1', { emitModelToViewChange: true });
    }
    else {
      this.formControl.setValue('', { emitModelToViewChange: true });
    }
    this.onTouched();
  }

  override writeValue(value: string): void {
    if (value == '1') {
      this.formControl.setValue(value, { emitModelToViewChange: false });
    }
    else {
      this.formControl.setValue('', { emitModelToViewChange: false });
    }
  }

  override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  openPolicyDoc() {
    this.emitOpenDocument.emit();
  }

}
