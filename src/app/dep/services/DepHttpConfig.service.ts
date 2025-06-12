import { Injectable } from "@angular/core";
import { FpxHttpConfig } from "@fpx/core";
import { DeviceDetectorService } from "../core/class/device-detector.service";
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})

export class DepHttpConfig extends FpxHttpConfig {
  encryptEnabled: boolean = false;

  constructor(
    private _device:DeviceDetectorService
  ) {
    super();
  }

  setHttpDepedency(){
    let decodedDeviceInfo = btoa(JSON.stringify(this._device.getDeviceInfo()));
    this.setCommonHeaderParams('deviceInfo', decodedDeviceInfo);
    this.enableServiceContext = true;
  }

  enablePayloadMask(){
    this.setCommonHeaderParams('sessionId', () => sessionStorage.getItem('sessionId') );
    this.encryptionRequired('YES');
    this.setExcludedUrl(['/healthcheck', '/key-exchange']);
    this.encryptEnabled = true;
  }

  override encrypt(payload: any): string {
    const securityKey = sessionStorage.getItem('symmetricKey') || '';
    const keybytes = crypto.enc.Base64.parse(securityKey);
    if(typeof(payload) === 'object'){
      payload = JSON.stringify(payload);
    }
    const bodyEncrypt = crypto.AES.encrypt(payload, keybytes, {
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7,
      keySize: 256,
    });
    return bodyEncrypt.toString();
  }

  override decrypt(payload: string) {
    const securityKey = sessionStorage.getItem('symmetricKey') || '';
    const keybytes = crypto.enc.Base64.parse(securityKey);
    let decrypt = crypto.AES.decrypt(payload, keybytes, {
      mode: crypto.mode.ECB,
      padding: crypto.pad.Pkcs7,
      keySize: 256,
    }).toString(crypto.enc.Utf8);
    return JSON.parse(decrypt);
  }

}