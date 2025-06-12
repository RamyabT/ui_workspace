import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObapplicantsignatureService } from 'src/app/onboarding/obapplicantsignature-service/obapplicantsignature.service';

@Component({
  selector: 'app-view-cheque-image',
  templateUrl: './view-cheque-image.component.html',
  styleUrls: ['./view-cheque-image.component.scss']
})
export class ViewChequeImageComponent implements OnInit {
  chequeImage: string = "";
  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _obService: ObapplicantsignatureService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any
  ) { }

  ngOnInit(): void {
    this.chequeImage = this._dialogData.chequeImage;
  }

  close() {
    this._dialogRef.close();
  }

  downloadImage() {
    const blobData = this._obService.base64ToBlob(this._dialogData.chequeImage);
    let documentURL = URL.createObjectURL(
      new Blob([blobData], { type: "image/png" })
    );
    const downloadLink = document.createElement("a");
    downloadLink.href = documentURL;
    const fileName = "View_Cheque.png";
    downloadLink.download = fileName;
    downloadLink.click();

  }

}
