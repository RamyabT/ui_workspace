import { ChangeDetectorRef, Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { BaseFpxFormComponent } from '@fpx/core';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';
import { DocumentChecklistService } from '../document-checklist-service/document-checklist-service';
import { EmiratesIdScanFormHelper, EmiratesIdScanFormState } from './emirates-id-scan-form.helper';

@Component({
  selector: 'app-cob-photo-id-match-form',
  templateUrl: './emirates-id-scan-form.component.html',
  styleUrls: ['./emirates-id-scan-form.component.scss'],
  providers: [
    EmiratesIdScanFormHelper, FacetechReqServcie
  ]
})
export class EmiratesIdScanFormComponent extends BaseFpxFormComponent<EmiratesIdScanFormHelper, EmiratesIdScanFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    private _cobPhotoIdMatchFormHelper: EmiratesIdScanFormHelper,
    private _facetecService: FacetechReqServcie,
    private _documentChecklistService: DocumentChecklistService,
    private cd: ChangeDetectorRef
  ) {
    super(formBuilder, router,controlContainer, _cobPhotoIdMatchFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('flag', '', [Validators.required,Validators.min(1), Validators.max(1)],[],'change');
      this.setDataService(this._facetecService);
      this.setServiceCode('RETAILEMIRATESIDSCAN');

  }

  onClickTermsCondition() {
    this.cd.detectChanges();
  }

}
