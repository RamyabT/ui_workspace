import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnInit,
  Renderer2,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DepPanningComponent, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from "@dep/services";
import { BaseFpxFunctionality, ContextMenuModel } from "@fpx/core";


@Component({
  selector: "app-actions-panel",
  templateUrl: "./actions-panel.component.html",
  styleUrls: ["./actions-panel.component.scss"],
})
export class ActionsPanelComponent extends BaseFpxFunctionality implements OnInit {

  actions: any;
  scheduledDetails: any;
  shouldDisableEdit: boolean = false;
  fromPayeeScreen: boolean = false;


  constructor(
    private appConfig: AppConfigService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public _dialogData: any,
  ) {
    super();
  }

  ngOnInit(): void {
    this.scheduledDetails = this._dialogData.data;
    this.actions = this.appConfig.getContextMenu(this._dialogData.menuCode);
    this.fromPayeeScreen = this._dialogData?.fromPayeeScreen;
    if (!this.fromPayeeScreen) {
      this.shouldDisableEdit = this.appConfig.checkForPSTAboveNinePM(new Date());
    }
  }


  openLink(action: any) {
    console.log(action)
    this._dialogRef.close(action.id);


  }

  closeContextMenu() {
    this._dialogRef.close();
  }
}

