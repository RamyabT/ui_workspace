import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from '@dep/services';
import { SkinManager } from '@dep/ui';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tenant-switcher-popup',
  templateUrl: './tenant-switcher-popup.component.html',
  styleUrls: ['./tenant-switcher-popup.component.scss']
})
export class TenantSwitcherPopupComponent implements OnInit {
  selectedTenant: string = "";
  constructor(
    private _appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any
  ) { }

  ngOnInit(): void {
    this.selectedTenant = this._appConfig.getTenantId();
  }

  onTenantChange(tenantId: any) {
    if (tenantId && tenantId.value) {
      if (this._dialogRef) {
        this._dialogRef.close({
          tenantId: tenantId.value
        });
      }
    } else {
      this._dialogRef.close();
    }
  }

}
