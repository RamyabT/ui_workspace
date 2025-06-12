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
import { additionalEmploymentInfoHelper, additionalEmploymentInfoState } from './additional-employmentInfo.helper';

@Component({
  selector: 'app-additional-employmentInfo',
  templateUrl: './additional-employmentInfo.component.html',
  styleUrls: ['./additional-employmentInfo.component.scss'],
  providers: [additionalEmploymentInfoHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => additionalEmploymentInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: additionalEmploymentInfoComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class additionalEmploymentInfoComponent extends BaseFpxGridComponent<additionalEmploymentInfoHelper, additionalEmploymentInfoState> {
  addEmploymentRadio: boolean = false;
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public additionalEmploymentInfoHelper: additionalEmploymentInfoHelper,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(formBuilder, controlContainer, router, additionalEmploymentInfoHelper, changeDetectorRef);
  }

  protected override doPreInit(): void {
    
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

    this.addFormControl('empstatus', '', [Validators.required], [], 'blur', 1);
    this.addElement('empstatus_column');
    this.addElement('empstatus_column_header');

    this.addFormControl('companyName', '', [Validators.required], [], 'blur', 1);
    this.addElement('companyName_column');
    this.addElement('companyName_column_header');

    this.addFormControl('position', '', [Validators.required], [], 'blur', 1);
    this.addElement('position_column');
    this.addElement('position_column_header');

    this.addFormControl('monthlyIncome', '', [Validators.required], [], 'blur', 1);
    this.addElement('monthlyIncome_column');
    this.addElement('monthlyIncome_column_header');

  }
  addMoreCountry() {
    this.addSubFormGroup();
    if (this.formArray.controls.length >= 5) {
      this.addEmploymentRadio = true;
    }
  }
  deleteAddedCountry(i: number) {
    this.deleteSubFormGroup(i);
  }

}
