import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { COBProductSelectionFormHelper, COBProductSelectionFormState } from './cob-product-selection-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { ProductSelectionService } from '../product-selection-service/product-selection.service';

@Component({
  selector: 'app-cob-product-selection-form',
  templateUrl: './cob-product-selection-form.component.html',
  styleUrls: ['./cob-product-selection-form.component.scss'],
  providers : [ COBProductSelectionFormHelper, 
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => COBProductSelectionFormComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => COBProductSelectionFormComponent)
    }]
})

export class COBProductSelectionFormComponent extends BaseFpxFormComponent<COBProductSelectionFormHelper, COBProductSelectionFormState> {
  readMore: boolean = false;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBProductSelectionFormHelper: COBProductSelectionFormHelper,
    public productSelectionService: ProductSelectionService,
    private cd: ChangeDetectorRef
  ) {
    super(formBuilder, router, controlContainer, cOBProductSelectionFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('productSegment', '', [], [], 'change');
    this.addFormControl('productId', '', [], [], 'change');
  }

  emitChanges() {
    this.cd.detectChanges();
    this.formGroup.updateValueAndValidity();
  }

  emitReadMore() {
    this.readMore = true;
    this.cd.detectChanges();
  }

  onBackClick() {
    if (this.readMore) this.readMore = false;
    else this.router.navigate(['welcome'])
  }

}
