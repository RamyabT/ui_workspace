import { Config } from "../../../../facetec-config/Config";
import { FaceTecSDK } from "../../../../facetec-core-sdk/FaceTecSDK.js/FaceTecSDK";
import { FaceTecCustomization } from "../../../../facetec-core-sdk/FaceTecSDK.js/FaceTecCustomization";
import { FaceTechSDKUtilities } from "./FaceTechSDKUtilities";

export var ThemeHelpers = (function(): any {
  // Set the default theme
  var currentTheme: string = "FaceTec Theme";
  var themeResourceDirectory = "../../../assets/FaceTec_resources/images/themes";

  function setAppTheme(theme: string): void {
    Config.currentCustomization = getCustomizationForTheme(theme);
    Config.currentLowLightCustomization = getLowLightCustomizationForTheme(theme);
    Config.currentDynamicDimmingCustomization = getDynamicDimmingCustomizationForTheme(theme);

    FaceTecSDK.setCustomization(Config.currentCustomization);
    FaceTecSDK.setLowLightCustomization(Config.currentLowLightCustomization);
    FaceTecSDK.setDynamicDimmingCustomization(Config.currentDynamicDimmingCustomization);
  }

  function getCustomizationForTheme(theme: string): FaceTecCustomization {
    var currentCustomization: FaceTecCustomization = new FaceTecSDK.FaceTecCustomization();

    const retryScreenSlideshowImages: string[] = [themeResourceDirectory + "FaceTec_ideal_1.png", themeResourceDirectory + "FaceTec_ideal_2.png", themeResourceDirectory + "FaceTec_ideal_3.png", themeResourceDirectory + "FaceTec_ideal_4.png", themeResourceDirectory + "FaceTec_ideal_5.png"];

    if(theme === "Config Wizard Theme") {
      currentCustomization = Config.retrieveConfigurationWizardCustomization(FaceTecSDK);
    }
    else if(theme === "FaceTec Theme") {
      var additionalReviewSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      additionalReviewSVG.setAttribute("viewBox", "0 0 122.93 79.21");
      additionalReviewSVG.innerHTML = "<defs><style>.d{fill:#ccc;}.e{stroke:#cbcbcb;stroke-width:4px;}.e,.f{fill:none;stroke-miterlimit:10;}.f{stroke:#ccc;}.d1{stroke-linecap:round;stroke-linejoin:round;}.d1,.e1{fill:none;stroke:#0080ba;stroke-width:5px;}.e1{stroke-miterlimit:10;}</style></defs><g id='a'/><g id='b'><g id='c'><g><rect class='e' x='24.05' y='-19.75' width='74.82' height='118.7' rx='6.7' ry='6.7' transform='translate(100.84 -22.01) rotate(89.79)'/><g><g><rect class='d' x='50.05' y='58.39' width='20.25' height='3.4' rx='.88' ry='.88' transform='translate(-.22 .22) rotate(-.21)'/><rect class='d' x='99.86' y='38.43' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .39) rotate(-.21)'/><rect class='d' x='99.82' y='28.53' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .39) rotate(-.21)'/><rect class='d' x='50.01' y='48.46' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.18 .25) rotate(-.21)'/><rect class='d' x='49.98' y='38.57' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .25) rotate(-.21)'/><rect class='d' x='49.94' y='28.67' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .25) rotate(-.21)'/></g><path class='d' d='M25.13,31.3c-7.76,.03-14.06,6.37-14.02,14.13,.04,7.75,6.35,14.03,14.09,14.02,7.74-.01,14.08-6.29,14.06-14.12-.03-7.78-6.36-14.05-14.12-14.02Zm6.85,25.16c-1.29,.79-2.68,1.34-4.16,1.65-.86,.18-1.73,.27-2.62,.27-2.43,0-4.68-.63-6.77-1.87-.17-.1-.23-.19-.17-.4,.34-1.2,.69-2.41,1.15-3.57,.54-1.37,1.15-2.71,2.03-3.9,.28-.38,.57-.74,.85-1.12,.08-.1,.14-.11,.26-.05,1.72,.84,3.45,.82,5.17,0,.15-.07,.22-.05,.32,.07,1.02,1.31,1.9,2.7,2.54,4.25,.6,1.45,1.08,2.93,1.49,4.43,.04,.14-.01,.18-.11,.24Zm-10.15-10.85c-2.33-2.19-2.4-6.13-.16-8.41,2.15-2.18,5.55-1.97,7.41,.48,.8,1.05,1.22,2.29,1.23,3.63-.03,1.79-.64,3.33-2.02,4.51-1.92,1.63-4.61,1.54-6.46-.2Zm11.24,10.1c-.11-.37-.22-.74-.34-1.11-.32-1.04-.68-2.06-1.1-3.06-.56-1.35-1.28-2.61-2.12-3.81-.21-.3-.46-.57-.7-.84-.09-.1-.07-.14,.02-.23,1.72-1.47,2.54-3.35,2.45-5.59-.1-2.49-1.19-4.47-3.4-5.72-2.35-1.33-5.32-.77-7.18,1.3-2.53,2.82-2.28,7.4,.53,9.84q.3,.26,.05,.57c-.65,.82-1.22,1.69-1.75,2.59-.26,.43-.42,.91-.63,1.37-.65,1.46-1.11,2.97-1.56,4.5-.02,.06-.04,.13-.06,.2-3.65-2.67-6.15-7.83-4.8-13.47,1.36-5.67,6.49-9.79,12.36-9.92,6.04-.13,11.15,3.8,12.79,9.27,1.7,5.68-.66,11.2-4.59,14.1Z'/></g><line class='f' x1='7.74' y1='21.19' x2='115.19' y2='21.37'/><rect class='d' x='7.74' y='10.7' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.05 .1) rotate(-.21)'/></g></g></g><g id='a1'/><g id='b1' transform='translate(0 19.5)'><g id='c1'><g><circle class='e1' cx='25.71' cy='25.71' r='23.21'/><line class='d1' x1='42.42' y1='43.28' x2='52.55' y2='53.41'/><animateTransform attributeName='transform' attributeType='XML' dur='1.5s' type='translate' begin='indefinite' from='0 0' to='64.5 0' calcmode='spline' keysplines='0.42,0,0.58,1' keyTimes='0;1' fill='freeze'></animateTransform></g></g></g>";

      // ID Scan Customization
      currentCustomization.idScanCustomization.additionalReviewScreenAnimation = additionalReviewSVG;

      // Set the developer element FaceTec loading session token text color
      document.getElementById("loading-session-token-text")!.style.color = "rgb(64, 127, 178)";
    }

    return currentCustomization;
  }

  function getLowLightCustomizationForTheme(theme: string): FaceTecCustomization|null {
    var currentLowLightCustomization: FaceTecCustomization = getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [themeResourceDirectory + "FaceTec_ideal_1.png", themeResourceDirectory + "FaceTec_ideal_2.png", themeResourceDirectory + "FaceTec_ideal_3.png", themeResourceDirectory + "FaceTec_ideal_4.png", themeResourceDirectory + "FaceTec_ideal_5.png"];

    if(theme === "Config Wizard Theme") {
      currentLowLightCustomization = Config.retrieveLowLightConfigurationWizardCustomization(FaceTecSDK);
    }

    return currentLowLightCustomization;
  }

  function getDynamicDimmingCustomizationForTheme(theme: string): FaceTecCustomization|null {
    var currentDynamicDimmingCustomization: FaceTecCustomization = getCustomizationForTheme(theme);

    const retryScreenSlideshowImages: string[] = [themeResourceDirectory + "FaceTec_ideal_1.png", themeResourceDirectory + "FaceTec_ideal_2.png", themeResourceDirectory + "FaceTec_ideal_3.png", themeResourceDirectory + "FaceTec_ideal_4.png", themeResourceDirectory + "FaceTec_ideal_5.png"];

    if(theme === "FaceTec Theme") {
      var additionalReviewSVG: SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      additionalReviewSVG.setAttribute("viewBox", "0 0 122.93 79.21");
      additionalReviewSVG.innerHTML = "<defs><style>.d{fill:#ccc;}.e{stroke:#cbcbcb;stroke-width:4px;}.e,.f{fill:none;stroke-miterlimit:10;}.f{stroke:#ccc;}.d1{stroke-linecap:round;stroke-linejoin:round;}.d1,.e1{fill:none;stroke:#0080ba;stroke-width:5px;}.e1{stroke-miterlimit:10;}</style></defs><g id='a'/><g id='b'><g id='c'><g><rect class='e' x='24.05' y='-19.75' width='74.82' height='118.7' rx='6.7' ry='6.7' transform='translate(100.84 -22.01) rotate(89.79)'/><g><g><rect class='d' x='50.05' y='58.39' width='20.25' height='3.4' rx='.88' ry='.88' transform='translate(-.22 .22) rotate(-.21)'/><rect class='d' x='99.86' y='38.43' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .39) rotate(-.21)'/><rect class='d' x='99.82' y='28.53' width='11.96' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .39) rotate(-.21)'/><rect class='d' x='50.01' y='48.46' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.18 .25) rotate(-.21)'/><rect class='d' x='49.98' y='38.57' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.15 .25) rotate(-.21)'/><rect class='d' x='49.94' y='28.67' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.11 .25) rotate(-.21)'/></g><path class='d' d='M25.13,31.3c-7.76,.03-14.06,6.37-14.02,14.13,.04,7.75,6.35,14.03,14.09,14.02,7.74-.01,14.08-6.29,14.06-14.12-.03-7.78-6.36-14.05-14.12-14.02Zm6.85,25.16c-1.29,.79-2.68,1.34-4.16,1.65-.86,.18-1.73,.27-2.62,.27-2.43,0-4.68-.63-6.77-1.87-.17-.1-.23-.19-.17-.4,.34-1.2,.69-2.41,1.15-3.57,.54-1.37,1.15-2.71,2.03-3.9,.28-.38,.57-.74,.85-1.12,.08-.1,.14-.11,.26-.05,1.72,.84,3.45,.82,5.17,0,.15-.07,.22-.05,.32,.07,1.02,1.31,1.9,2.7,2.54,4.25,.6,1.45,1.08,2.93,1.49,4.43,.04,.14-.01,.18-.11,.24Zm-10.15-10.85c-2.33-2.19-2.4-6.13-.16-8.41,2.15-2.18,5.55-1.97,7.41,.48,.8,1.05,1.22,2.29,1.23,3.63-.03,1.79-.64,3.33-2.02,4.51-1.92,1.63-4.61,1.54-6.46-.2Zm11.24,10.1c-.11-.37-.22-.74-.34-1.11-.32-1.04-.68-2.06-1.1-3.06-.56-1.35-1.28-2.61-2.12-3.81-.21-.3-.46-.57-.7-.84-.09-.1-.07-.14,.02-.23,1.72-1.47,2.54-3.35,2.45-5.59-.1-2.49-1.19-4.47-3.4-5.72-2.35-1.33-5.32-.77-7.18,1.3-2.53,2.82-2.28,7.4,.53,9.84q.3,.26,.05,.57c-.65,.82-1.22,1.69-1.75,2.59-.26,.43-.42,.91-.63,1.37-.65,1.46-1.11,2.97-1.56,4.5-.02,.06-.04,.13-.06,.2-3.65-2.67-6.15-7.83-4.8-13.47,1.36-5.67,6.49-9.79,12.36-9.92,6.04-.13,11.15,3.8,12.79,9.27,1.7,5.68-.66,11.2-4.59,14.1Z'/></g><line class='f' x1='7.74' y1='21.19' x2='115.19' y2='21.37'/><rect class='d' x='7.74' y='10.7' width='37.84' height='3.4' rx='.88' ry='.88' transform='translate(-.05 .1) rotate(-.21)'/></g></g></g><g id='a1'/><g id='b1' transform='translate(0 19.5)'><g id='c1'><g><circle class='e1' cx='25.71' cy='25.71' r='23.21'/><line class='d1' x1='42.42' y1='43.28' x2='52.55' y2='53.41'/><animateTransform attributeName='transform' attributeType='XML' dur='1.5s' type='translate' begin='indefinite' from='0 0' to='64.5 0' calcmode='spline' keysplines='0.42,0,0.58,1' keyTimes='0;1' fill='freeze'></animateTransform></g></g></g>";

      // ID Scan Customization
      currentDynamicDimmingCustomization.idScanCustomization.additionalReviewScreenAnimation = additionalReviewSVG;
      // OCR Confirmation Screen Customization
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.sectionHeaderTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldLabelTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.fieldValueTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldTextColor = "white";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldPlaceholderTextColor = "rgba(0, 0, 0, 0.4)";
      currentDynamicDimmingCustomization.ocrConfirmationCustomization.inputFieldBorderColor = "white";
    }

    if(theme === "Config Wizard Theme") {
      currentDynamicDimmingCustomization = Config.retrieveDynamicDimmingConfigurationWizardCustomization(FaceTecSDK);
    }

    return currentDynamicDimmingCustomization;
  }

  function showNewTheme(): void {
    var themes: string[] = [""];

    if(Config.wasSDKConfiguredWithConfigWizard === true) {
      themes = ["Config Wizard Theme", "FaceTec Theme", "Pseudo-Fullscreen", "Well-Rounded", "Bitcoin Exchange", "eKYC", "Sample Bank"];
    }
    else {
      themes = ["FaceTec Theme", "Pseudo-Fullscreen", "Well-Rounded", "Bitcoin Exchange", "eKYC", "Sample Bank"];
    }

    var currentThemeIndex = themes.indexOf(currentTheme);
    currentThemeIndex = currentThemeIndex >= themes.length - 1 ? 0 : currentThemeIndex + 1;
    currentTheme = themes[currentThemeIndex];
    setAppTheme(currentTheme);
    updateThemeTransitionView();
  }

  function updateThemeTransitionView(): void {
    var transitionViewImage = "";
    var transitionViewTextColor = Config.currentCustomization.guidanceCustomization.foregroundColor;
    var transitionViewClass = "theme-transition-overlay__";
    var deviceType = "desktop";

    if(FaceTechSDKUtilities.isLikelyMobileDevice() === true) {
      deviceType = "mobile";
    }

    switch (currentTheme) {
      case "FaceTec Theme":
        transitionViewClass = "default";
        break;
      case "Pseudo-Fullscreen":
        transitionViewClass += "default";
        break;
      case "Well-Rounded":
        transitionViewImage = themeResourceDirectory + "well-rounded/well_rounded_" + deviceType + "_bg.svg";
        transitionViewClass += "well-rounded";
        transitionViewTextColor = Config.currentCustomization.frameCustomization.backgroundColor;
        break;
      case "Bitcoin Exchange":
        transitionViewImage = themeResourceDirectory + "bitcoin-exchange/bitcoin_exchange_" + deviceType + "_bg.svg";
        transitionViewClass += "bitcoin-exchange";
        transitionViewTextColor = Config.currentCustomization.frameCustomization.backgroundColor;
        break;
      case "eKYC":
        transitionViewImage = themeResourceDirectory + "ekyc/ekyc_" + deviceType + "_bg.svg";
        transitionViewClass += "ekyc";
        break;
      case "Sample Bank":
        transitionViewImage = themeResourceDirectory + "sample-bank/sample_bank_" + deviceType + "_bg.svg";
        transitionViewClass += "sample-bank";
        transitionViewTextColor = Config.currentCustomization.frameCustomization.backgroundColor;
        break;
      default:
        transitionViewClass = "default";
        break;
    }

    transitionViewClass += "__" + deviceType;

  }

  function getCurrentTheme(): string {
    currentTheme = Config.wasSDKConfiguredWithConfigWizard ? "Config Wizard Theme" : "FaceTec Theme";
    return currentTheme;
  }

  return {
    getCurrentTheme,
    themeResourceDirectory,
    setAppTheme(theme:string): void {
      setAppTheme(theme);
    },
    showNewTheme
  };
})();
