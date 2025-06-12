import { Component, EventEmitter, Optional, forwardRef } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { documentChecklistHelper, documentChecklistState } from './cob-document-checklist-form.helper';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { DocumentchecklistService } from '../documentchecklist-service/documentchecklist.service';
import { Documentchecklist } from '../documentchecklist-service/documentchecklist.model';

@Component({
  selector: 'app-cob-document-checklist-form',
  templateUrl: './cob-document-checklist-form.component.html',
  styleUrls: ['./cob-document-checklist-form.component.scss'],
  providers: [documentChecklistHelper,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => documentChecklistComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => documentChecklistComponent)
    }]
})

export class documentChecklistComponent extends BaseFpxFormComponent<documentChecklistHelper, documentChecklistState> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public documentChecklistHelper: documentChecklistHelper,
    public documentchecklistService: DocumentchecklistService
  ) {
    super(formBuilder, router, controlContainer, documentChecklistHelper);
    this.setServiceCode("RETAILDOCUMENTCHECKLIST");
  }
  protected override doPreInit(): void {
    this.setDataService(this.documentchecklistService);
    this.addElement('FieldId_12');
    this.addFormControl('FieldId_13', '', [], [], 'blur', 1, false);
    this.setServiceCode("RETAILDOCUMENTCHECKLIST");

  }
  protected override doPostInit(): void {

  }
}

