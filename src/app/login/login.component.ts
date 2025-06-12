import { Component, inject } from '@angular/core';
import { DeviceDetectorService } from '../dep/core/class/device-detector.service';
import { SkinManager } from '@dep/ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected skinManager: SkinManager = inject(SkinManager);
  
  constructor(
    protected _device:DeviceDetectorService
  ){

  }
}
