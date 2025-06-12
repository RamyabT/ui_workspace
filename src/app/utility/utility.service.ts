import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class UtilityService {

  constructor() { }

  /**
   * Will convert base64 to blob format
   * @param base64 
   * @returns 
   */
  public base64ToBlob(base64: string) {
    let sliceSize: number = 1024;
    let base64Data: any = base64.split(",");
    let b64Data = base64Data[1];
    let contentType = base64Data[0].match(/:(.*?);/)[1];
    const byteCharacters = atob(b64Data);

    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  /**
   * Will reduce the size of the image base64
   * @param base64 
   * @param width 
   * @returns 
   */
  public scaleDownImage(base64: any, width: number = 768): Promise<any> {
    let mime = base64.split(",")[0].match(/:(.*?);/)[1];
    let height;

    return new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => {
        let canvas = document.createElement("canvas");
        let ratio = image.width / image.height;
        canvas.width = width;
        height = width / ratio;
        canvas.height = height;
        let context: any = canvas.getContext("2d");
        context.scale(width / image.width, height / image.height);
        context.drawImage(image, 0, 0);
        const newBase64Image = canvas.toDataURL(mime);

        resolve(newBase64Image);
      };
      image.onerror = (el, err) => {
        reject(err);
      };

      image.src = base64;
    });
  }
}
