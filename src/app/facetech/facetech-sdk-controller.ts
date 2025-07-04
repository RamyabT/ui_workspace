import { Config } from "./facetec-config/Config";

import { ThemeHelpers } from "./utilities/ThemeHelpers";
import { FaceTecSessionResult } from "facetec-core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { ClearLatestEnrollmentIdentifier, GetLatestEnrollmentIdentifier, OnComplete, SetDocumentDataResult, SetLatestEnrollmentIdentifier } from "./facetech-sdk-controller-refrence";
import { LivenessCheckProcessor } from "./processor/LivenessCheckProcessor";
import { PhotoIDMatchProcessor } from "./processor/PhotoIDMatchProcessor";
import { FaceTechSDKUtilities } from "./utilities/FaceTechSDKUtilities";
import { FaceTecIDScanResult } from "./facetec-core-sdk/FaceTecSDK.js/FaceTecPublicApi";
import { PhotoIDScanProcessor } from "./processor/PhotoIDScanProcessor";
import { EnrollmentProcessor } from "./processor/EnrollmentProcessor";


export var FaceTechSDKController = ((): any => {
  let latestEnrollmentIdentifier = "";
  var latestProcessor: LivenessCheckProcessor | PhotoIDScanProcessor |PhotoIDMatchProcessor | EnrollmentProcessor; // | AuthenticateProcessor | PhotoIDMatchProcessor | PhotoIDScanProcessor;
  var latestSessionResult: FaceTecSessionResult | null = null;
  var latestIDScanResult: FaceTecIDScanResult | null = null;
  var documentDataResult: any;
  var successCallback: any;
  var failureCallback: any;

  // Wait for onload to be complete before attempting to access the Browser SDK.
  function doProcess(process:string, success:Function, failure:Function, facetecConfig:any = undefined){
    if(success) successCallback = success;
    if(failure) failureCallback = failure;
    if(facetecConfig) initializeSDK(facetecConfig);
    console.log(Config);
    // Set a the directory path for other FaceTec Browser SDK Resources.
    FaceTecSDK.setResourceDirectory("./assets/FaceTec_resources");

    // Set the directory path for required FaceTec Browser SDK images.
    FaceTecSDK.setImagesDirectory("./assets/FaceTec_images");

    // Set your FaceTec Device SDK Customizations.
    ThemeHelpers.setAppTheme(ThemeHelpers.getCurrentTheme());

    // Initialize FaceTec Browser SDK and configure the UI features.
    Config.initializeFromAutogeneratedConfig(FaceTecSDK, function(initializedSuccessfully: boolean) {
      if(initializedSuccessfully) {
        console.log("FaceTec Initializaation: ", initializedSuccessfully);
        if(process == "livenessCheck"){
            livenessCheckProcess();
        } else if(process == "photoIdMatch"){
            photoIdMatchProcess();
        }
        else if(process == "photoIdScan") {
            PhotoIdScanProcess();
        }
        else if(process == "enrollCheck") {
          onEnrollUserProcess();
      }
      }
    });
  };

  // Clear previous session results;
  function initializeResultObjects(): void {
    latestSessionResult = null;
    latestIDScanResult = null;
  }

  // Initiate a 3D Liveness Check.
  function livenessCheckProcess(): void {
    initializeResultObjects();

    // Get a Session Token from the FaceTec SDK, then start the 3D Liveness Check.
    getSessionToken((sessionToken?: string): void => {
      latestProcessor = new LivenessCheckProcessor(sessionToken as string, FaceTechSDKController as any);
    });
  }

  // Perform a 3D Liveness Check, then an ID Scan, then Match the 3D FaceMap to the ID Scan.
  function photoIdMatchProcess(): void {
    initializeResultObjects();

    // Get a Session Token from the FaceTec SDK, then start the 3D Liveness Check.  On Success, ID Scanning will start automatically.
    getSessionToken((sessionToken?: string): void => {
      latestEnrollmentIdentifier = "cbxr2_browser_" + FaceTechSDKUtilities.generateUUId();
      latestProcessor = new PhotoIDMatchProcessor(sessionToken as string, FaceTechSDKController as any);
    });
  }

  // Perform a photo scan.
  function PhotoIdScanProcess(): void {
    initializeResultObjects();

    getSessionToken((sessionToken?: string): void => {
        latestEnrollmentIdentifier = "cbxr2_browser_" + FaceTechSDKUtilities.generateUUId();
      console.log("==> ", sessionToken);
        latestProcessor = new PhotoIDScanProcessor(sessionToken as string, FaceTechSDKController as any);
      
    });
  }
  // Initiate a 3D Liveness Check, then storing the 3D FaceMap in the Database, also known as "Enrollment".  A random enrollmentIdentifier is generated each time to guarantee uniqueness.
  function onEnrollUserProcess(): void {
    initializeResultObjects();
    // Get a Session Token from the FaceTec SDK, then start the Enrollment.
    getSessionToken((sessionToken?: string):void => {
      latestEnrollmentIdentifier = "cbxr2_browser_" + FaceTechSDKUtilities.generateUUId();
      latestProcessor = new EnrollmentProcessor(sessionToken as string, FaceTechSDKController as any);
    });
  }

  // Show the final result with the Session Review Screen.
  let onComplete: OnComplete;

  onComplete = (sessionResult: FaceTecSessionResult | null, idScanResult: FaceTecIDScanResult | null, latestNetworkResponseStatus: number): void => {
    latestSessionResult = sessionResult;
    latestIDScanResult = idScanResult;
    let responseMessage:any;

    if(!latestProcessor.isSuccess()) {
      // Check for server offline
      if(isNetworkResponseServerIsOffline(latestNetworkResponseStatus) === true) {
        responseMessage = {
            result: "FAILURE"
        }
        failureCallback(responseMessage);
        showAdditionalScreensServerIsDown();
        return;
      }
    } else if(latestProcessor.isSuccess()){
        let selfie = latestSessionResult?.lowQualityAuditTrail[0];
        responseMessage = {
            result: "SUCCESS",
            selfie: selfie,
            photoScanFront: latestIDScanResult?.frontImages[0],
            photoScanBack: latestIDScanResult?.backImages[0],
            documentData: documentDataResult,
            externalDatabaseRefID: latestEnrollmentIdentifier
        }
        successCallback(responseMessage);
    }
  };

  // Check for server down status
  function isNetworkResponseServerIsOffline(networkResponseStatus: number): boolean {
    return (networkResponseStatus >= 500);
  }

  let sessionTokenErrorHasBeenHandled = false;

  function onSessionTokenError(xhrStatus: number | undefined): void {
    if(sessionTokenErrorHasBeenHandled === false) {
      sessionTokenErrorHasBeenHandled = true;

      if(xhrStatus !== undefined && isNetworkResponseServerIsOffline(xhrStatus)) {
        showAdditionalScreensServerIsDown();
      }
      else {
        onServerSessionTokenError();
      }
    }
  }

 // Method to override devicekey and endpoint 
  function initializeSDK(facetecConfig: any){
    Config.DeviceKeyIdentifier = facetecConfig.deviceKeyIdentifier;
    Config.BaseURL = facetecConfig.endPoint;
    Config.PublicFaceScanEncryptionKey =  facetecConfig.encryptionKey;
    Config.IsProduction = facetecConfig.isProduction;
    Config.ProductionKeyText = facetecConfig.productionKeyText;
  }

  // Get the Session Token from the server
  function getSessionToken(sessionTokenCallback: (sessionToken: string) => void): void {
    sessionTokenErrorHasBeenHandled = false;

    try {
      var XHR = new XMLHttpRequest();
      XHR.open("GET", Config.BaseURL + "/session-token");
      XHR.setRequestHeader("X-Device-Key", Config.DeviceKeyIdentifier);
      XHR.setRequestHeader("X-User-Agent", FaceTecSDK.createFaceTecAPIUserAgentString(""));

      XHR.onreadystatechange = function(): void {
        if(this.readyState === XMLHttpRequest.DONE) {
          var sessionToken = "";

          try {
            // Attempt to get the sessionToken from the response object.
            sessionToken = JSON.parse(this.responseText).sessionToken;

            // Something went wrong in parsing the response. Return an error.
            if(typeof sessionToken !== "string") {
              onSessionTokenError(XHR.status);
              return;
            }
          }
          catch{
            // Something went wrong in parsing the response. Return an error.
            XHR.abort();
            onSessionTokenError(XHR.status);
            return;
          }

          // SampleAppUtilities.hideLoadingSessionToken();
          sessionTokenCallback(sessionToken);
        }
      };

      // Wait 3s, if the request is not completed yet, show the session token loading screen
      window.setTimeout(() => {
        if(XHR.readyState !== XMLHttpRequest.DONE) {
          if(sessionTokenErrorHasBeenHandled === false) {
            // SampleAppUtilities.showLoadingSessionToken();
          }
        }
      }, 3000);

      XHR.onerror = function(): void {
        XHR.abort();
        onSessionTokenError(XHR.status);
      };

      XHR.send();
    }
    catch(e) {
      onSessionTokenError(undefined);
    }
  }

  function showAdditionalScreensServerIsDown(): void {
    // SampleAppUtilities.displayStatus("Server upgrade in progress. Please try again later");
  }

  function onServerSessionTokenError(): void {
    // SampleAppUtilities.handleErrorGettingServerSessionToken();
  }

  var setLatestEnrollmentIdentifier: SetLatestEnrollmentIdentifier = (externalDatabaseRefID:string): void => {
    latestEnrollmentIdentifier = externalDatabaseRefID;
  }

  var getLatestEnrollmentIdentifier: GetLatestEnrollmentIdentifier = (): string => {
    return latestEnrollmentIdentifier;
  };

  var clearLatestEnrollmentIdentifier: ClearLatestEnrollmentIdentifier = () => {
    latestEnrollmentIdentifier = "";
  };

  var setDocumentDataResult: SetDocumentDataResult = (documentData: any) => {
    documentDataResult = documentData;
  };

  return {
    doProcess,
    livenessCheckProcess,
    photoIdMatchProcess,
    onComplete,
    setLatestEnrollmentIdentifier,
    getLatestEnrollmentIdentifier,
    clearLatestEnrollmentIdentifier,
    setDocumentDataResult,
    // latestSessionResult,
    // latestIDScanResult,
    PhotoIdScanProcess,
    onEnrollUserProcess
  };
})();
