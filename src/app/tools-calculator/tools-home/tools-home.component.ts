import {AfterViewInit, Component } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';


@Component({
  selector: 'app-tools-home',
  templateUrl: './tools-home.component.html',
  styleUrls: ['./tools-home.component.scss']
})
export class ToolsHomeComponent implements AfterViewInit {
  constructor(        public device: DeviceDetectorService, public appConfigService: AppConfigService){

  }
  ngAfterViewInit(): void {
    if(this.appConfigService.hasData('toolsActionPublisher$')) {
      this.appConfigService.getData('toolsActionPublisher$').subject.next({action: 'QUICKACTION',data:{serviceCode:'HOME'}});
    }  
 }

}
