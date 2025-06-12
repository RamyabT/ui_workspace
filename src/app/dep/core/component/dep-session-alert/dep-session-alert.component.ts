import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { ActivityMonitor } from 'src/app/dep/services/activity-monitor/activity-monitor.manager';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService } from '../../class/device-detector.service';

declare let window: any;

@Component({
  selector: 'app-dep-session-alert',
  templateUrl: './dep-session-alert.component.html',
  styleUrls: ['./dep-session-alert.component.scss']
})
export class DepSessionAlertComponent implements OnInit, OnDestroy {

  // protected title: string = "";
  // protected message: string = "";
  protected cancelBtnLbl: string = "";
  protected okBtnLbl: string = "";

  timer: any;
  timerRef: any;
  countown: any;
  sessionTimeout: boolean = false;
  startTime: number = 0;
  idleTime: number = 0;


  constructor(
    private _dialogRef: MatDialogRef<DepSessionAlertComponent>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,
    private _activityMonitor: ActivityMonitor,
    private testLoginService: TestLoginService,
    private _router: Router,
    private _deviceDetector: DeviceDetectorService
  ) { }

  ngOnInit(): void {
    // if(this._dialogData?.title) this.title = this._dialogData.title;
    // if(this._dialogData?.message) this.message = this._dialogData.message;
    this.okBtnLbl = this._dialogData?.okBtnLbl || "DEFAULT.DIALOG.SESSION.continue";
    this.cancelBtnLbl = this._dialogData?.cancelBtnLbl || "DEFAULT.DIALOG.SESSION.logout";
    if(this._dialogData?.sessionTimeout) {
      this.sessionTimeout = true;
      return;
    }
    this.timer = environment.Coundown;
    this.idleTime = environment.IdleTime;
    let currentTime = new Date().getTime(), timeDifference = 0;
    timeDifference = Math.floor((currentTime - this.testLoginService.refreshTokenService?.sessionStartTime) / 1000);
    this.countown = (this.timer - timeDifference) < 10 ? "00:0"+(this.timer - timeDifference): "00:"+(this.timer - timeDifference);
    this.timerRef = setInterval(() => {
      currentTime = new Date().getTime();
      timeDifference = Math.floor((currentTime - this.testLoginService.refreshTokenService?.sessionStartTime) / 1000);
      if(Math.floor(timeDifference / 60) >= this.idleTime || timeDifference >= this.timer) {
        this._dialogRef.close(0);
        clearInterval(this.timerRef);
        this.testLoginService.logout(false,true);
      } else {
        this.countown = (this.timer - timeDifference) < 10 ? "00:0"+(this.timer - timeDifference): "00:"+(this.timer - timeDifference);
      }
    }, 1000);
  }


  onAccept() {
    clearInterval(this.timerRef);
    this._dialogRef.close(1);
  }

  onDecline(){
    clearInterval(this.timerRef);
    this._dialogRef.close(0);
    this.testLoginService.logout();
  }

  onLogin() {
    this._dialogRef.close(0);
    if(this._deviceDetector.isHybrid()) window.location = "index.html";
    else this._router.navigate(['home']);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerRef);
  }

}
