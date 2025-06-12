import { ChangeDetectorRef, Component, OnInit, Optional } from '@angular/core';
import { CobPhotoIdMatchFormHelper, CobPhotoIdMatchFormState } from './cob-photo-id-match-form.helper';
import { Router } from '@angular/router';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { BaseFpxFormComponent } from '@fpx/core';
import { FacetechReqServcie } from '../facetecreq-service/facetechreq.servcie';
import { DocumentChecklistService } from '../document-checklist-service/document-checklist-service';
import { OcrdataextractService } from '../ocrdataextract-service/ocrdataextract.service';

@Component({
  selector: 'app-cob-photo-id-match-form',
  templateUrl: './cob-photo-id-match-form.component.html',
  styleUrls: ['./cob-photo-id-match-form.component.scss'],
  providers: [
    CobPhotoIdMatchFormHelper, FacetechReqServcie
  ]
})
export class CobPhotoIdMatchFormComponent extends BaseFpxFormComponent<CobPhotoIdMatchFormHelper, CobPhotoIdMatchFormState> {

  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    private _cobPhotoIdMatchFormHelper: CobPhotoIdMatchFormHelper,
    private _facetecService: FacetechReqServcie,
    private _documentChecklistService: DocumentChecklistService,
    private cd: ChangeDetectorRef,
    // private _ocrdataextractService:OcrdataextractService,
  ) {
    super(formBuilder, router,controlContainer, _cobPhotoIdMatchFormHelper);
  }

  protected override doPreInit(): void {
    this.addFormControl('flag', '', [Validators.required,Validators.min(1), Validators.max(1)],[],'change');
    // if(this.router.url.split('/')[4].split('?')[0] == 'emirates-id-match') {
    //   this.setDataService(this._facetecService);
    //   this.setServiceCode('RETAILEMIRATESIDSCAN');
    // }
    // else if (this.router.url.split('/')[4].split('?')[0] == 'national-id-match') {
    //   this.setServiceCode('RETAILPASSPORTSCAN');
    //   this.setDataService(this._documentChecklistService);
    // }
    this.setDataService(this._facetecService);
    this.setServiceCode('RETAILIDSCAN');
  }

  onClickTermsCondition() {
    this.cd.detectChanges();
  }

}
