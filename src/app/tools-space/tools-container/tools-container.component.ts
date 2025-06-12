import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';

@Component({
  selector: 'app-tools-container',
  templateUrl: './tools-container.component.html',
  styleUrls: ['./tools-container.component.scss']
})
export class ToolsContainerComponent implements OnInit {
  @ViewChild('spaceHome', { read: ElementRef }) spaceHome!: ElementRef;
  
  toolsList: any =[];
  protected moduleHeaderTop: number = 0;
  protected moduleHeaderHeight: number = 0;

  constructor(
    private _router: Router,
    private _appConfig: AppConfigService,
    public _device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) { }

  ngOnInit(): void {
    this._activeSpaceInfoService.setOrginSpace('tools-space');
    
  }
  ngAfterViewInit() {
    if (this._device.isMobile()) {
      setTimeout(() => {
        this.moduleHeaderTop = -(this.spaceHome.nativeElement.offsetTop + 10);
      });
    }

  }

}
