import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { APPCONSTANTS } from '@dep/constants';

@Component({
  selector: 'e-transfers-module-header',
  templateUrl: './e-transfers-module-header.component.html',
  styleUrls: ['./e-transfers-module-header.component.scss']
})
export class eTransfersModuleHeaderComponent implements OnInit {
  protected headerNavBackCallback:any;
  protected headerNavBackRequired:boolean = false;
  constructor(
    protected _activeSpaceInfoService: ActiveSpaceInfoService,
  ) { }

  ngOnInit(): void {
    APPCONSTANTS.headerNavBackRequired$.asObservable().subscribe({
      next: (res:any) => {
        this.headerNavBackCallback = res?.callback || undefined;
      }
    });
  }

  ngAfterViewInit(){

  }

}
