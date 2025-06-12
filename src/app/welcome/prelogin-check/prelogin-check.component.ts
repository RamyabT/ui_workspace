import { Component, EventEmitter, Inject, Optional } from "@angular/core";
import {
  FormBuilder,
  Validators,
  ControlContainer,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BaseFpxFormComponent, ValidatorService } from "@fpx/core";
import { ResumebackService } from "src/app/onboarding/resumeback-service/resumeback.service";
import { PreloginCheckHelper, PreloginCheckState } from "./prelogin-check.helper";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-prelogin-check",
  templateUrl: "./prelogin-check.component.html",
  styleUrls: ["./prelogin-check.component.scss"],
})
export class PreloginCheckComponent extends BaseFpxFormComponent<
  PreloginCheckHelper,
  PreloginCheckState
> {
  constructor(
    @Optional() controlContainer: ControlContainer,
    formBuilder: FormBuilder,
    private router: Router,
    public _preloginCheckHelper: PreloginCheckHelper,
    public resumebackService: ResumebackService,
    private validatorService: ValidatorService,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
  ) {
    super(formBuilder, router, controlContainer, _preloginCheckHelper);
  }
  protected override doPreInit(): void {
    this.addFormControl("onboardingRef", "", [], [], "blur", 1, false, 0);
    this.addFormControl("mobileNumber", "", [], [], "blur", 1, false, 0);
    this.addFormControl("emailAddress", "", [], [], "blur", 1, false, 0);
    this.setDataService(this.resumebackService);
    this.setServiceCode("CobResumebackForm");
  }

  protected override doPostInit(): void {}

  onCancel() {
    this._dialogRef.close('0');
  }
  close() {
    this._dialogRef.close();
  }

}
