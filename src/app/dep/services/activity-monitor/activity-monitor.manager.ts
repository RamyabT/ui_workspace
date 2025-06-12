import { Injectable } from "@angular/core";
import {
  BaseFpxFunctionality,
  FpxAmountConfig,
  FpxAppConfig,
  FpxModal,
  FpxModalAfterClosed,
} from "@fpx/core";
import { DEFAULT_INTERRUPTSOURCES, Idle } from "@ng-idle/core";
import { DepSessionAlertComponent } from "../../core/component/dep-session-alert/dep-session-alert.component";
import { environment } from "src/environments/environment";
import { TestLoginService } from "src/app/login/test-services/test-login.service";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ActivityMonitor extends BaseFpxFunctionality {
  startSessionTime$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private idle: Idle
  ) {
    super();
  }

  setIdleConfiguration() {
    if(!environment.IdleTime) return;
    console.log("setIdleConfiguration: " + (environment.IdleTime - 60))
    this.idle.setIdle(environment.IdleTime - 60);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {});

    this.idle.onIdleStart.subscribe(() => {
      this.startSessionTime$.next(true);
      let modal = new FpxModal();
      modal.setComponent(DepSessionAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["dep-popup-back-drop", "session-backdrop", 'bottom-transparent-overlay']);
      modal.setDisableClose(false);
      modal.setData({
        // title: "DepSessionAlert.title",
        message: "DepSessionAlert.message"
      });
      modal.setDisableClose(true);
      modal.setAfterClosed(this.flashCardModelAfterClose);
      this.openModal(modal);
    });
  }

  flashCardModelAfterClose: FpxModalAfterClosed = (
    payload: any,
    addtionalData: any
  ) => {
    if (payload == 1) {
        this.start();
    }
    else {
        this.stop();
    }
  };

  public start(): void {
    this.idle.watch();
  }

  public stop(): void {
    this.idle.onIdleStart.observers.length = 0;
    this.idle.stop();
  }
}
