import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { APPCONSTANTS } from '@dep/constants';
import { Router } from '@angular/router';
// import { AccountsSpaceManager } from '../accounts-space.manager';

@Component({
  selector: 'creditcard-module-header',
  templateUrl: './creditcard-module-header.component.html',
  styleUrls: ['./creditcard-module-header.component.scss']
})
export class CreditCardModuleHeaderComponent implements OnInit {
  protected headerNavBackCallback:any;
  protected headerNavBackRequired:boolean = false;
  protected _device: DeviceDetectorService = inject(DeviceDetectorService);

  constructor(
    protected _activeSpaceInfoService: ActiveSpaceInfoService,
    // private _accountsSpaceMgr: AccountsSpaceManager,
    private _router: Router
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

  goToHome() {
    this._router.navigate(['/home']);
  }

  newAccount() {
    // This is blank in accounts-container.component.ts also
  }

}