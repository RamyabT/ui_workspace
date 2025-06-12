import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { HttpProviderService, HttpRequest } from '@fpx/core';
import * as JsEncryptModule from 'jsencrypt';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AESService {
  constructor(private httpClient : HttpProviderService) {}

  generateSecurityToken(): string { 
    let salt = crypto.lib.WordArray.random(256 / 8);
    var secret = crypto.lib.WordArray.random(256 / 8).toString() + (new Date()).toISOString() ;
    let key = crypto.PBKDF2(secret, salt, {
      keySize: 256 / 32
    }); 
    console.log(key.toString()); 
    sessionStorage.setItem('symmetricKey',key.toString(crypto.enc.Base64))
    return key.toString(crypto.enc.Base64);
  }

  getSecureSession():Observable<any> {
     const httpRequest = new HttpRequest();
     httpRequest.setResource('/secure-session');
     httpRequest.setContextPath('IAM');
     httpRequest.setMethod('GET');
     httpRequest.aesEncryptionRequired('NO');
     return this.httpClient.invokeRestApi(httpRequest);
  }

  keyExchange():Observable<any>{
    const httpRequest = new HttpRequest();
     httpRequest.setResource('/key-exchange');
     httpRequest.setContextPath('IAM');
     httpRequest.setMethod('POST');
     let salt = sessionStorage.getItem('secureKey');
      let encrypt:any =  new JsEncryptModule.JSEncrypt();
      encrypt.setPublicKey(salt);
      let encryptedSymmetricKey = encrypt.encrypt(sessionStorage.getItem('symmetricKey'));
  
     httpRequest.setBody({
      "encryptedSymmetricKey" :  encryptedSymmetricKey
     });
     httpRequest.aesEncryptionRequired('NO');
     
     return this.httpClient.invokeRestApi(httpRequest);
  }
}
