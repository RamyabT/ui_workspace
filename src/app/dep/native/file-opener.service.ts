import { Injectable } from '@angular/core';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { DeviceDetectorService } from '@dep/core';
import { ShareInfo } from './share-info.service';
import { SmartDeviceService } from '../smart-device/smart-device.service';
import { APPCONSTANTS } from '@dep/constants';

declare let window: any;
declare let cordova: any;

@Injectable({
  providedIn: 'root'
})
export class FileOpenerService {
  constructor(
    private _fileTransfer: FileTransfer,
    private _fileOpener: FileOpener,
    public deviceService: DeviceDetectorService,
    private _shareInfo: ShareInfo,
    private _smartDeviceService: SmartDeviceService
  ) {}

  getMimeType(fileExtension : any){
    let mimeType : any;
    if(fileExtension =="png" || fileExtension== "jpeg" || fileExtension== "jpg"){
      mimeType='image/'+fileExtension;
    }
    else if(fileExtension=="pdf" || fileExtension== "csv"){
      mimeType='application/'+fileExtension;
    }
    return mimeType;
  }

  openPDF(res:any, mt:string="", fn:string=""){
    let mimeType : string = "";
    let filename :string = "";
    
    if(APPCONSTANTS.enableSSLPinning){
      filename = res.headers.get("content-disposition");
      filename = filename.split('filename=')[1];
    } else {
      filename = res.headers.headers.get("content-disposition");
      filename = filename[0].split('filename=')[1];
    }
    
    let fileExtension : string = filename.split('.')[1].toLowerCase();
    mimeType = this.getMimeType(fileExtension);

    this.downloadAndOpenPDF(res.body, mimeType, filename);
  }

  downloadAndOpenPDF(blob:any, mimeType:string, fileName:string) {
    let storageLocation = "";
    let deviceType = this.deviceService.getDeviceInfo()?.os.toLowerCase();
    switch (deviceType) {
      case "android":
        storageLocation = cordova.file.externalDataDirectory;
        break;
      case "ios":
        storageLocation = cordova.file.documentsDirectory;
        break;
    }

    let _this = this;

    let folderPath = storageLocation;
    window.resolveLocalFileSystemURL(
      folderPath,
      function (dir:any) {
        dir.getFile(
          fileName,
          {
            create: true
          },
          function (file:any) {
            file.createWriter(
              function (fileWriter:any) {
                fileWriter.write(blob);

                fileWriter.onwriteend = function () {
                  var url = file.toURL();
                  let  option = {
                    message: fileName,
                    subject: fileName,
                    files: [url],
                    url: "",
                    chooserTitle: "Share via",
                  };
                  _this._fileOpener.open(url, mimeType)
                    .then(() => console.log('File is opened'))
                    .catch((e:any) => _this._shareInfo.shareFile(option));
                }
                fileWriter.onerror = function (err:any) {
                  console.error(err);
                };
              },
              function (err:any) {
                // failed
                console.error(err);
              }
            );
          },
          function (err:any) {
            console.error(err);
          }
        );
      },
      function (err:any) {
        console.error(err);
      }
    );
  }

  openTermsPDF(fileName:string){
    let filePath = cordova.file.applicationDirectory + 'www/assets/documents/' + fileName;
    this._fileOpener.open(filePath, "application/pdf")
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
  }

  openLink(navURL: string) {
    if (this.deviceService.isHybrid()) {
      cordova.InAppBrowser.open(
        navURL,
        "_system",
        "location=yes"
      );
    } else {
      window.open(navURL, "_blank");
    }
  }
}
