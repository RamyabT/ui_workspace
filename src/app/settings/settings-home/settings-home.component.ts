import {AfterViewInit, Component } from '@angular/core';
import { DeviceDetectorService } from '@dep/core';
import { AppConfigService } from '@dep/services';
import { SettingsService } from 'src/app/foundation/validator-service/settings.service';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent implements AfterViewInit {
  constructor(        public device: DeviceDetectorService, public appConfigService: AppConfigService,
    public _settingsService: SettingsService){

  }
  ngAfterViewInit(): void {
    if(this.appConfigService.hasData('settingsActionPublisher$')) {
      this.appConfigService.getData('settingsActionPublisher$').subject.next({action: 'QUICKACTION',data:{serviceCode:'HOME'}});
    }  
 }

}
