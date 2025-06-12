import { Injectable } from "@angular/core";
import { NativeStorage } from "@awesome-cordova-plugins/native-storage/ngx";

@Injectable({
    providedIn: "root",
})

export class NativeStorageManager {
    toastrOverlayTimeout: any;

    constructor(
        private _nativeStorage: NativeStorage
    ) { }

    /**
     * Will store data in native storage by key pair value
     * @param key 
     * @param data 
     */
    storeData(key: string, data: any):Promise<any> {
        return this._nativeStorage.setItem(key, data);
    }
    loadData(key: string):Promise<any> {
        return this._nativeStorage.getItem(key);
    }
    deleteData(key: string):Promise<any>{
        return this._nativeStorage.remove(key);
    }

}