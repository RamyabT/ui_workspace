import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { RetailProductSelectionFormHelper, RetailProductSelectionFormState } from './retail-product-selection-form.helper';
import { RetailProductSelectionService } from '../retail-product-selection-service/retail-product-selection.service';

@Component({
  selector: 'app-retail-product-selection-form',
  templateUrl: './retail-product-selection-form.component.html',
  styleUrls: ['./retail-product-selection-form.component.scss'],
})

export class RetailProductSelectionFormComponent extends BaseFpxFormComponent<RetailProductSelectionFormHelper, RetailProductSelectionFormState> {
  readMore: boolean = false;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public retailProductSelectionFormHelper: RetailProductSelectionFormHelper,
    public productSelectionService: RetailProductSelectionService,
    private cd: ChangeDetectorRef
  ) {
    super(formBuilder, router, controlContainer, retailProductSelectionFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('productSegment', '', [], [], 'change');
    this.addFormControl('productId', '', [], [], 'change');
   // this.setDataService(this.productSelectionService);

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
