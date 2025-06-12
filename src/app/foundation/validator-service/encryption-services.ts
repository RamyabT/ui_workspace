import { Component, Injectable } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class EncryptionService {
    encryptMod: any;

    constructor() {
         this.encryptMod = new JsEncryptModule.JSEncrypt();
      //  let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDeN9Kqn2hxFMTgK28mi7aVMgup3l0Gdi/3DSUDRV56ZohGwm1KEsOtJyRzejOKzyFVnlgh7H9XOYwiU4vfhoIUNUvbNCagbNDt05n2zN6PXW9k6X26JgkIIybPRZlFnSwaR0l+AWPTOPQODz0d1qXOgvP6TIaJZFUmISfS1oYKeQIDAQAB';
      let publicKey = environment.publicKey;
      this.encryptMod.setPublicKey(publicKey);
    }

    encrypt(payload: any): string {
        return this.encryptMod.encrypt(payload);
    }

}
