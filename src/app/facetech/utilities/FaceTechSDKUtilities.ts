export var FaceTechSDKUtilities = (function(): any {
    function isLikelyMobileDevice(): boolean {
        var isMobileDeviceUA = !!(/Android|iPhone|iPad|iPod|IEMobile|Mobile|mobile/i.test(navigator.userAgent || ""));
    
        // ChromeOS/Chromebook detection.
        if(isMobileDeviceUA && ((navigator.userAgent.indexOf("CrOS") !== -1) || (navigator.userAgent.indexOf("Chromebook") !== -1))) {
          isMobileDeviceUA = false;
        }
    
        // Mobile device determination based on portrait / landscape and user agent.
        if(screen.width < screen.height || isMobileDeviceUA) {
          // Assume mobile device when in portrait mode or when determined by the user agent.
          return true;
        }
        else {
          return false;
        }
      }

      function generateUUId(): string {
        // @ts-ignore
        return ("" + [1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => { return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16); }
        );
      }

      return {
        isLikelyMobileDevice,
        generateUUId
      }
})();