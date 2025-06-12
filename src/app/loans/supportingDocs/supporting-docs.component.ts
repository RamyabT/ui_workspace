import { ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Optional } from '@angular/core';
import { Component } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxGridComponent } from '@fpx/core';
import { supportingDocsHelper, supportingDocsState } from './supporting-docs.helper';

@Component({
  selector: 'app-supporting-docs',
  templateUrl: './supporting-docs.component.html',
  styleUrls: ['./supporting-docs.component.scss'],
  providers: [supportingDocsHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => supportingDocsComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: supportingDocsComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class supportingDocsComponent extends BaseFpxGridComponent<supportingDocsHelper, supportingDocsState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public supportingDocsHelper: supportingDocsHelper,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(formBuilder, controlContainer, router, supportingDocsHelper, changeDetectorRef);
  }

  protected override doPreInit(): void {
    //this.addRow();
  }

  protected override setGridDefinition(): void {
    console.log('adding row');
    this.addElement('addRowAction');
    this.addElement('deleteAction');
    this.addElement('actions_column');
    this.addElement('actions_column_header');
    this.addFormControl('serialNumber', '', [], [], 'blur', 1);
    this.addElement('serialNumber_column');
    this.addElement('serialNumber_column_header');
    this.addFormControl('coApplicantImage', '', [Validators.required], [], 'blur', 1);
  }


}
