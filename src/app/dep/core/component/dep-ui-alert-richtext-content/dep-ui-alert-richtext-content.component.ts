import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FpxTranslatePipe } from '@fpx/core';

@Component({
  selector: 'dep-ui-alert-richtext-content',
  templateUrl: './dep-ui-alert-richtext-content.component.html',
  styleUrls: ['./dep-ui-alert-richtext-content.component.scss']
})
export class DepUiAlertRichtextContentComponent implements OnInit {
  protected iconClass?:string;
  protected title?: string;
  protected subtitle?: string;
  protected showResolvedSubtitle?: boolean;
  protected messageHtml?: SafeHtml;
  protected primaryButtonLabel!: string;
  protected enablePrimaryButton!: boolean;
  protected secondaryButtonLabel!: string;
  protected enableSecondaryButton!: boolean;

  constructor(
    private domSanitizer: DomSanitizer,
    private translatePipe: FpxTranslatePipe,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : DepUiAlertRichtextContentData,
  ) { }

  ngOnInit(): void {
    if (this._dialogData?.title) this.title = this._dialogData.title;

    if (this._dialogData?.showResolvedSubtitle) {
      this.showResolvedSubtitle = this._dialogData.showResolvedSubtitle ;
   } else {
      this.showResolvedSubtitle = false;
   }
   if (this._dialogData?.resolvedSubtitle) this.subtitle = this._dialogData.resolvedSubtitle;
   
    if (this._dialogData?.messageHtml) this.messageHtml = this.domSanitizer.bypassSecurityTrustHtml(
      this.translatePipe.transform(this._dialogData.messageHtml, '')
    );
    if (this._dialogData?.iconClass) this.iconClass = this._dialogData.iconClass;

    this.enableSecondaryButton = this._dialogData?.enableSecondaryButton ?? false;
    this.enablePrimaryButton = this._dialogData?.enablePrimaryButton ?? true;

    this.primaryButtonLabel = this._dialogData?.primaryButtonLabel || "DEFAULT.DIALOG.CONFIRM.okBtnLbl";
    this.secondaryButtonLabel = this._dialogData?.secondaryButtonLabel || "DEFAULT.DIALOG.CONFIRM.cancelBtnLbl";
  }

  onClickPrimaryButton() {
    this._dialogRef.close('primary');
  }
  onClickSecondaryButton() {
    this._dialogRef.close('secondary');
  }

}

export interface DepUiAlertRichtextContentData {
  /* Modal Title i18n key */
  title?: string,
  /* Modal subtitle */
  resolvedSubtitle?: string,
  /* Whether to display secondary button, default hidden */
  showResolvedSubtitle?: boolean;
  /* Modal message body i18n key */
  messageHtml?: string;
  /* Modal icon class name */
  iconClass?: string;
  /* Whether to display secondary button, default hidden */
  enableSecondaryButton: boolean;
  /* Whether to display primary button, default showing */
  enablePrimaryButton: boolean;
  /* Primary button i18n key */
  primaryButtonLabel: string;
  /* Secondary button i18n key */
  secondaryButtonLabel: string;
}