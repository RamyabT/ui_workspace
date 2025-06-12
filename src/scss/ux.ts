declare let $: any;

export const $fontWeightLight = 300;
export const $fontWeightRegular = 400;
export const $fontWeightMedium = 500;
export const $fontWeightSemiBold = 600;
export const $fontWeightBold = 700;
export const $fontWeightExtraBold = 800;
/*SANTHOSH 12-DEC-2021 BEGIN*/
export const toVw = (value: number) => {
  return (value / UXDimensions.DEVICE_WIDTH) * UXDimensions.SCREEN_WIDTH;
};

export const toVh = (value: number) => {
  return (value / UXDimensions.DEVICE_HEIGHT) * UXDimensions.SCREEN_HEIGHT;
};

export const toVwR = (value: number) => {
  return value / UXDimensions.DEVICE_WIDTH;
};

export const toVhR = (value: number) => {
  return value / UXDimensions.DEVICE_HEIGHT;
};
//Mohan
export const toDVw = (value: number) => {
  return ((value * 100/ 1280.0) + "vw");
};
//Mohan
export const toVwU = (value: number) => {
  return (value / UXDimensions.DEVICE_WIDTH) * 100 + "vw";
};

export const toVhU = (value: number) => {
  return (value / UXDimensions.DEVICE_HEIGHT) * 100 + "vh";
};

export const toRem = (value: number) => {
  return value / 15.0 + "rem";
};

export const zip = (array1: any[], array2: { [x: string]: any; }) => {
  let values = array1.map(function (value1: any, i: string | number) {
    return [value1, array2[i]];
  });
  return values;
};

export class UXDimensions {

    public static DEVICE_WIDTH: number = 375.0;
    public static DEVICE_HEIGHT: number = 812.0;

    public static SCREEN_WIDTH: number = window.innerWidth;
    public static SCREEN_HEIGHT: number = window.innerHeight;
}

export class UXUtils{
  static showPopupInline(popupId: string){
    $(`app-popup-inline #popup-inline-${popupId}`).fadeIn(300);
  }
  static hidePopupInline(popupId: string){
    $(`app-popup-inline #popup-inline-${popupId}`).fadeOut(300);
  }
}
/*SANTHOSH 12-DEC-2021 END*/