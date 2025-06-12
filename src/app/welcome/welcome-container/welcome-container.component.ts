import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { BaseFpxFunctionality, FpxModal, FpxModalAfterClosed } from '@fpx/core';
import { gsap } from 'gsap';
import { delay } from 'rxjs';
import { AppConfigService, CommonValidatorService, LanguageService } from '@dep/services';
import { PreloginCheckComponent } from '../prelogin-check/prelogin-check.component';
import { FileOpenerService, NativeStorageManager } from '@dep/native';
import { Observer } from 'gsap/Observer';

import { TestLoginService } from 'src/app/login/test-services/test-login.service';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { APPCONSTANTS } from '@dep/constants';

gsap.registerPlugin(Observer);

@Component({
  selector: 'app-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss']
})
export class WelcomeContainerComponent extends BaseFpxFunctionality implements OnInit {

  @ViewChild('appNavContainer', { static: true, read: ElementRef }) appNavContainer!: ElementRef;
  bigMenuCoOrdinates: any = [];
  smallMenuCoOrdinates: any = [];
  appNavMenuList: any;
  bigMenuList: any;
  smallMenuList: any;
  centerMenu: any;

  appNavBigMenuTimeline: any;
  currentAngle: number = 0;
  appNavRotateDeg: number = 0;
  endDeg: number = 0;

  outerDotCoordinates: any = [];
  innerDotCoordinates: any = [];

  selectedLanguage:string='En';
  error: any;

  constructor(
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _commonValidatorService: CommonValidatorService,
    private cd: ChangeDetectorRef,
    private _appConfig: AppConfigService,
    protected _device: DeviceDetectorService,
    private _nativeStorageMgr: NativeStorageManager,
    private _languageService: LanguageService,
    private _fileOpenerService:FileOpenerService,
    private _testLogin: TestLoginService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
  ) {
    super();
  }

  ngOnInit(): void {
    this._testLogin.clearUserActivity();
  }

  ngAfterViewInit() {
    this._router.navigate(['okta']);
  }
}

