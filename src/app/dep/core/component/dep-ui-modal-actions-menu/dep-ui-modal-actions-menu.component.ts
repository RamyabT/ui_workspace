import { Component, inject, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService, LanguageService } from '@dep/services';
import { Router } from '@angular/router';

@Component({
  selector: 'dep-ui-modal-actions-menu',
  templateUrl: './dep-ui-modal-actions-menu.component.html',
  styleUrls: ['./dep-ui-modal-actions-menu.component.scss']
})
export class DepUiModalActionsMenuComponent implements OnInit {
  protected _appConfig: AppConfigService = inject(AppConfigService);
  heading: string = '';
  actionsMenu: ActionsMenu[] = [];
    
  constructor(
    private _router: Router,
    protected languageService: LanguageService,
    private _dialogRef: MatDialogRef<any>, 
    public _device: DeviceDetectorService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) {}

  ngOnInit(): void {
    if (this._dialogData?.heading) this.heading = this._dialogData.heading;
    if (this._dialogData?.actionsMenu) this.actionsMenu = this._dialogData.actionsMenu;
  }

  close() {
    this._dialogRef.close();
  }

  openLink(actionItem: any) {
    this._dialogRef.close(actionItem);
  }
}

export interface ActionsMenuData {
  heading: string;
  actionsMenu: ActionsMenu[];
}
export interface ActionsMenu {
  heading: string;
  menuItems: {
    serviceCode: string;
    serviceDescriptionI18n?: {
      [lang_code: string]: string;
    };
    serviceDescription: string;
    subtext?: string;
  }[];
};