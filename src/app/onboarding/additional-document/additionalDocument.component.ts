import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { additionalDocumentHelper, additionalDocumentState } from './additionalDocument.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { AdditionalDocumentService } from '../additionalDocument-service/additionalDocument.service';
import { AdditionalDocument } from '../additionalDocument-service/additionalDocument.model';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-additionalDocument',
  templateUrl: './additionalDocument.component.html',
  styleUrls: ['./additionalDocument.component.scss'],
  providers: [additionalDocumentHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => additionalDocumentComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => additionalDocumentComponent)
    }]
})

export class additionalDocumentComponent extends BaseFpxFormComponent<additionalDocumentHelper, additionalDocumentState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public additionalDocumentHelper: additionalDocumentHelper,
    public additionalDocumentService: AdditionalDocumentService,
    private validatorService: ValidatorService,
    private _dialogRef: MatDialogRef<any>,

  ) {
    super(formBuilder, router, controlContainer, additionalDocumentHelper);
    this.setServiceCode("COBADDITIONALDOCUMENT");
  }
  protected override doPreInit(): void {
    this.setDataService(this.additionalDocumentService);
    this.setServiceCode("COBADDITIONALDOCUMENT");
    // this.addFormControl('dualNationalityHolderFlag', '',  [Validators.required ]    ,[],'change',1,false,0);

  }


  protected override doPostInit(): void {

  }
}
