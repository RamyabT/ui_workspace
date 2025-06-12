import { Component, ContentChild, EventEmitter, Optional, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, ControlContainer, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseFpxFormComponent, ValidatorService } from '@fpx/core';
import { DomSanitizer } from '@angular/platform-browser';
import { COBScanYourIdHelper, COBScanYourIdState } from './cob-scan-your-id.helper';

@Component({
  selector: 'app-cob-scan-your-id',
  templateUrl: './cob-scan-your-id.component.html',
  styleUrls: ['./cob-scan-your-id.component.scss'],
})

export class COBScanYourIdComponent extends BaseFpxFormComponent<COBScanYourIdHelper, COBScanYourIdState> {
  
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public cOBScanYourIdHelper: COBScanYourIdHelper,
    private validatorService: ValidatorService,
    private sanitizer: DomSanitizer
  ) {
    super(formBuilder, router, controlContainer, cOBScanYourIdHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('tcFlag', '', [Validators.required], [], 'change');
    // this.setDataService(this.keyFactsStatementsService);
  }

  

}
