export interface SmartDeviceInfo {
    os: string;
    osVersion: string;
    deviceId?: string;
    fcmToken?: string;
    appVersion: string | number;
    buildVersion: string | number;
    packageName: string;
    udid?: string;
    modelName?:string;
}