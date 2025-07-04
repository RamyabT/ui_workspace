import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SkinManager } from '@dep/ui';
import { BaseFpxFunctionality } from '@fpx/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-delegate-space-container',
  templateUrl: './delegate-space-container.component.html',
  styleUrls: ['./delegate-space-container.component.scss']
})
export class DelegateSpaceContainerComponent extends BaseFpxFunctionality implements OnInit {
  @ViewChild('spaceHome', {read: ElementRef}) spaceHome!: ElementRef;

  protected moduleHeaderTop: number = 0;
  protected activeTabIndex: number = 0;
  protected hasDelegates: boolean = false;

  constructor(
    protected _deviceMgr:DeviceDetectorService,
    protected skinManager: SkinManager,
    private _router: Router,
    private _appConfig:AppConfigService

  ) { 
    super();
  }

  ngOnInit(): void {
    // this.hasDelegates = true;
   
  }

  ngAfterViewInit(){
    if(this._deviceMgr.isMobile()){
      setTimeout(()=>{
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      });
    }

    if(this._deviceMgr.isDesktop()){
      let navPath = ['smb-delegat-space', 'smb', 'add-delegates-intro'];
      this._angularRouter.navigate(navPath);
    }
  }

  onActivate($event:any){

  }

  addDelegates(){
    this._router.navigate(['smb-delegat-space', 'entry-shell','smb','retail-delegateuserreq-form']);
  }

}
