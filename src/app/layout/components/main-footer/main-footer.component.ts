import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";

@Component({
  selector: "main-footer",
  templateUrl: "./main-footer.component.html",
  styleUrls: ["./main-footer.component.scss"]
})
export class MainFooterComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    
  }

  close() {
    this._dialogRef.close();
  }

  openURL(url: string) {
    window.open(url, '_system')
  }
}
