import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { Casaaccount } from 'src/app/foundation/casaaccount-service/casaaccount.model';

@Component({
  selector: 'app-message-intercepts',
  templateUrl: './message-intercepts.component.html',
  styleUrls: ['./message-intercepts.component.scss']
})
export class MessageInterceptsComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);
  interceptsData: any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) { }

  ngOnInit(): void {
    this.interceptsData = this._dialogData.data[0];
    console.log(this.interceptsData)
  }

  close() {
    let payload = {
      action: 0
    }
    this._dialogRef.close(payload);
  }


}
