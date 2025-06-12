import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { FileOpenerService, NativeStorageManager } from '@dep/native';
import { AppConfigService, LanguageService } from '@dep/services';
import { SkinManager } from '@dep/ui';
import { BaseFpxFunctionality } from '@fpx/core';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { TestLoginService } from '../login/test-services/test-login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome-board',
  templateUrl: './welcome-board.component.html',
  styleUrls: ['./welcome-board.component.scss']
})


export class WelcomeBoardComponent extends BaseFpxFunctionality implements OnInit {
  @ViewChild('marqueeElement') marqueeElement!: ElementRef;

  private t!: gsap.core.Tween;
  protected skinManager: SkinManager = inject(SkinManager);
  private _appHelm: any;
  appNavMenuList: any;
  selectedLanguage: any;
  isDarkmode: any;
  darkTheme: boolean = false;
 
  constructor( private cd: ChangeDetectorRef, private _activeSpaceInfoService: ActiveSpaceInfoService,
      private _appConfig: AppConfigService,private _testLogin: TestLoginService,
      protected _device: DeviceDetectorService,private _router : Router,
      private _nativeStorageMgr: NativeStorageManager, private _fileOpenerService: FileOpenerService,
      private _languageService: LanguageService,private _httpClient: HttpClient,private _skinManager: SkinManager) { 
    super();

  }

  ngOnInit(): void {
     
  }


  ngAfterViewInit() {

    this.getAppNavMenuList();
    if (this._device.isMobile() == true) {
      this.animatefunction();
    } else {
      setTimeout(() => {
          this.animateDesktopfunction();
      }, 1000);
      
    }

  }


  animatefunction(){
    const images = this.marqueeElement.nativeElement.querySelectorAll('.animate-image');
    const totalWidth = Array.from(images).reduce((acc, img: any) => acc + img.offsetWidth + 10, 0); // Calculate total width of images including margin
    console.log("totalWidth", totalWidth)
    console.log("innerwidth", window.innerWidth)
    const innerwidth =  window.innerWidth;
    const imgwidth = 1752;
    const aniwidth =  imgwidth - innerwidth
    gsap.set('.marquee', { x: -390 }); // Set initial position
    gsap.to('.marquee', {
      x: `-${aniwidth}px`, // Move completely to the left
      duration: 30, // Duration  
      ease: 'none',
      repeat: -1, // Repeat  
      onRepeat: () => {
        gsap.set(".marquee", { x: `-${imgwidth}px` });  // Reset position to the right after the loop
      }
    });
  }
 


  animateDesktopfunction(){
    const images = this.marqueeElement.nativeElement.querySelectorAll('.animate-image-lgscreen');
    const totalWidth = Array.from(images).reduce((acc, img: any) => acc + img.offsetWidth + 10, 0); // Calculate total width of images including margin
    console.log("totalWidth", totalWidth)
    console.log("innerwidth", window.innerWidth)
    const innerwidth =  window.innerWidth;
    const imgwidth = 2094;
    const aniwidth =  imgwidth - innerwidth;
    gsap.set('.marquee', { x: 0 }); // Set initial position
    gsap.to('.marquee', {
      x: `-${aniwidth}px`, // Move completely to the left
      duration: 20, // Duration  
      ease: 'none',
      repeat: -1, // Repeat  
      onRepeat: () => {
        gsap.set(".marquee", { x: `-${imgwidth}px` });  // Reset position to the right after the loop
      }
    });
  }

  themeChange() {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme == true) {
      this.isDarkmode = "dark";
      this.skinManager.applyTheme(this.isDarkmode);
      setTimeout(() => {
        this.animatefunction();
      }, 1000);
    } else if (this.darkTheme == false) {
      this.skinManager.resetTheme();
       setTimeout(() => {
        this.animatefunction();
      }, 1000);
    }
  }

  getAppNavMenuList() {
    let helmJsonPath = this._skinManager.getAssetFolderPath() + 'app-helm.json';
    this._httpClient.get(helmJsonPath).subscribe({
      next: (res: any) => {
        this._appHelm = res;
        this.appNavMenuList = this._appHelm.navigations;
        console.log("this.appNavMenuListnew", this.appNavMenuList)
        this.selectedLanguage = localStorage.getItem('lang') || 'En';
      }
    });

  }



  appnavClickHandler(menu: any) {
    this._activeSpaceInfoService.setOrginSpace('welcomeboard');

    if (menu.id == "login") {
      if (this._device.isHybrid()) {
        this.showSpinner();

        this._nativeStorageMgr.loadData('deviceAuthInfo')
          .then((data: any) => {
            let resultJson = JSON.parse(atob(data));

            this._testLogin.checkUserDevice({
              userId: resultJson.userId,
              deviceId: this._device.getDeviceInfo().deviceId
            }).subscribe({
              next: (res: any) => {
                this.hideSpinner();
                if (res.status == 200) {
                  this._router.navigate(['login-space', 'entry-shell', 'login', 'mpin-login-form']);
                } else {
                  this._nativeStorageMgr.deleteData('deviceAuthEnabled');
                  this._nativeStorageMgr.deleteData('deviceAuthInfo').then(
                    (res: any) => {
                      this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
                    }
                  );
                }
              },
              error: (err: any) => {
                this.hideSpinner();
                this._router.navigate(['login-space', 'entry-shell', 'login', 'mpin-login-form']);
              }
            });
          })
          .catch((reason: any) => {
            this.hideSpinner();
            this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
          })
      } else {
        this._router.navigate(['login-space', 'entry-shell', 'login', 'login-form']);
      }
    } else {
      if (menu.link) {
        this._fileOpenerService.openLink(this._languageService.getLabel(menu.link));
      } else {
        let service = this._appConfig.getServiceDetails(menu.serviceCode);

        this._angularRouter.navigate(service.servicePath, {
          queryParams: {
            serviceCode: menu.serviceCode
          }
        });
      }
    }
  }

  userLogin() {
    let service = this._appConfig.getServiceDetails('RETAILPRELOGIN');
    this._router.navigate(service.servicePath);
  }

  newToBank() {
    let service = this._appConfig.getServiceDetails('RETAILPLNEWTOBANK');
    this._router.navigate(service.servicePath);
  }
  
}
