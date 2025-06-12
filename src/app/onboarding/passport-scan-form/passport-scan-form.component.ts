import { ChangeDetectorRef, Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { BaseFpxFormComponent } from '@fpx/core';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';
import { DocumentChecklistService } from '../document-checklist-service/document-checklist-service';
import { PassportScanFormHelper, PassportScanFormState } from './passport-scan-form.helper';

@Component({
  selector: 'app-cob-photo-id-match-form',
  templateUrl: './passport-scan-form.component.html',
  styleUrls: ['./passport-scan-form.component.scss'],
  providers: [
    PassportScanFormHelper, FacetechReqServcie
  ]
})
export class PassportScanFormComponent extends BaseFpxFormComponent<PassportScanFormHelper, PassportScanFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    private _cobPhotoIdMatchFormHelper: PassportScanFormHelper,
    private _facetecService: FacetechReqServcie,
    private _documentChecklistService: DocumentChecklistService,
    private cd: ChangeDetectorRef
  ) {
    super(formBuilder, router,controlContainer, _cobPhotoIdMatchFormHelper);
  }

  protected override doPreInit(): void {
    // this.addFormControl('flag', '', [Validators.required,Validators.min(1), Validators.max(1)],[],'change');
      this.setServiceCode('RETAILPASSPORTSCAN');
      this.setDataService(this._facetecService);
  }

  onClickTermsCondition() {
    this.cd.detectChanges();
  }

}
