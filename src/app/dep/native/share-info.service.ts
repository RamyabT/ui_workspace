// import { Injectable } from "@angular/core";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing/ngx";
import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "@dep/core";
import { FpxToastService } from "@fpx/core";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: "root",
})

export class ShareInfo {
  toastrOverlayTimeout: any;

  constructor(
    public deviceService: DeviceDetectorService,
    private socialSharing: SocialSharing,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService
  ) { }
  isMobile() {
    // return this.deviceService.isMobile();
  }

  copyTextToClipboard(text: any, successMsg: any, successCallback: any, doShowToast = true) {
    var textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    textArea.style.padding = "0";

    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    textArea.style.background = "transparent";

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      if (successCallback) successCallback(successful);
      if (doShowToast) {
        this._fpxToastService.showSuccessAlert(this._translateService.instant("TOASTMESSAGES.shareInfo.title"), this._translateService.instant("TOASTMESSAGES.shareInfo.message"));
      }
    } catch (err) {
      console.log("Oops, unable to copy");
    }
    document.body.removeChild(textArea);
  }

  shareInfo(content: any, successMsg: any, doShowToast = true, enableSocialShare = false) {
    console.log("enableSocialShare", enableSocialShare)
    if (this.deviceService.isHybrid() && enableSocialShare) {
      console.log("SOCIAL SHARING ENABLED")
      console.log(content)
      this.socialSharing
        .share(content)
        .then(() => {
          console.log("Info share success!");
        })
        .catch(() => {
          console.log("Info share failure!");
        });
    }
    else {
      this.copyTextToClipboard(content, successMsg, null, doShowToast);
    }
  }
  shareFile(options: any) {
    if (this.deviceService.isHybrid()) {
      this.socialSharing
        .shareWithOptions(options)
        .then(() => {
          console.log('share success');
        })
        .catch(() => {
          console.log("share failed");
        });
    }
  }
}
