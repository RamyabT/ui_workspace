import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
@Component({
  selector: 'home-module-header',
  templateUrl: './home-module-header.component.html',
  styleUrls: ['./home-module-header.component.scss']
})
export class HomeModuleHeaderComponent implements OnInit {

  constructor(
    protected _activeSpaceInfoService: ActiveSpaceInfoService,
    
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){

  }

}
