import { Injectable } from "@angular/core";

declare let cordova: any;
@Injectable({ providedIn: "root" })
export class QrCodeService {
 
  constructor() {}
  qrScan(): Promise<any> {
     return new Promise(()=>{
        cordova.plugins.barcodeScanner.scan(
             (result:any)=> {
              if(!result.cancelled)
              {
                console.log("decoded text is: ",result.text);
              }
              else
              {
                console.log("You have cancelled scan");
              }
            },
             (error:any)=> {
              console.log("Scanning failed: ",error);
            }
          );
     })
  }
}
